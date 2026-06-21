import fs from "fs";
import path from "path";
import admin from "firebase-admin";
import { v2 as cloudinary } from "cloudinary";

// 1. Load env variables from .env.local
function loadEnv() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    console.log("Loading environment from .env.local...");
    const envContent = fs.readFileSync(envPath, "utf8");
    envContent.split("\n").forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return;
      const index = trimmed.indexOf("=");
      if (index === -1) return;
      const key = trimmed.substring(0, index).trim();
      let val = trimmed.substring(index + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.substring(1, val.length - 1);
      }
      val = val.replace(/\\n/g, "\n");
      process.env[key] = val;
    });
  } else {
    console.error("No .env.local file found. Make sure you run from the project root.");
    process.exit(1);
  }
}

loadEnv();

// Validate Firebase env
if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
  console.error("Missing Firebase configuration in environment variables.");
  process.exit(1);
}

// Validate Cloudinary env
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error("Missing Cloudinary configuration in environment variables.");
  process.exit(1);
}

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
  }),
});
const db = admin.firestore();

// Initialize Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Helper: recursively extract Cloudinary URLs from document data
function extractCloudinaryUrls(obj, urls = new Set()) {
  if (!obj) return urls;
  if (typeof obj === "string") {
    if (obj.includes("cloudinary.com")) {
      urls.add(obj);
    }
  } else if (Array.isArray(obj)) {
    obj.forEach((item) => extractCloudinaryUrls(item, urls));
  } else if (typeof obj === "object") {
    Object.values(obj).forEach((value) => extractCloudinaryUrls(value, urls));
  }
  return urls;
}

// Helper: extract public ID from URL
function getPublicIdFromUrl(url) {
  if (!url || !url.includes("cloudinary.com")) return null;

  const isRaw = url.includes("/raw/upload/");
  const uploadPattern = /\/upload\//;
  const match = url.match(uploadPattern);
  if (!match || match.index === undefined) return null;

  const uploadIndex = match.index;
  let pathStr = url.substring(uploadIndex + 8); // length of "/upload/"

  const versionMatch = pathStr.match(/^v\d+\//);
  if (versionMatch) {
    pathStr = pathStr.substring(versionMatch[0].length);
  }

  if (!isRaw) {
    const lastDotIndex = pathStr.lastIndexOf(".");
    if (lastDotIndex !== -1) {
      pathStr = pathStr.substring(0, lastDotIndex);
    }
  }

  return {
    publicId: pathStr,
    resourceType: isRaw ? "raw" : "image",
  };
}

async function run() {
  console.log("\n--- Starting Cloudinary Clean-up Script ---");

  // 1. Fetch all Firestore collections and extract active Cloudinary URLs
  console.log("\n1. Fetching Firestore collections...");
  const collections = await db.listCollections();
  console.log(`Found ${collections.length} collections in Firestore.`);

  const activeUrls = new Set();
  for (const collection of collections) {
    const snapshot = await collection.get();
    console.log(`- Scanning collection "${collection.id}" (${snapshot.size} documents)...`);
    snapshot.docs.forEach((doc) => {
      extractCloudinaryUrls(doc.data(), activeUrls);
    });
  }

  console.log(`Total active Cloudinary URLs found in Firestore: ${activeUrls.size}`);

  // Map active URLs to their parsed publicId
  const activePublicIds = new Set();
  activeUrls.forEach((url) => {
    const parsed = getPublicIdFromUrl(url);
    if (parsed) {
      activePublicIds.add(parsed.publicId);
    }
  });

  console.log(`Parsed active Cloudinary public IDs: ${activePublicIds.size}`);

  // 2. Fetch all resources from Cloudinary
  console.log("\n2. Fetching resources from Cloudinary...");
  const resourceTypes = ["image", "raw", "video"];
  const allCloudinaryResources = [];

  for (const type of resourceTypes) {
    let nextCursor = null;
    let pageCount = 1;
    do {
      console.log(`- Fetching page ${pageCount} of resource type "${type}"...`);
      const options = {
        resource_type: type,
        type: "upload",
        max_results: 500,
      };
      if (nextCursor) {
        options.next_cursor = nextCursor;
      }

      try {
        const result = await cloudinary.api.resources(options);
        if (result.resources && result.resources.length > 0) {
          allCloudinaryResources.push(...result.resources);
        }
        nextCursor = result.next_cursor;
        pageCount++;
      } catch (err) {
        // If resource type is not supported or not present, it might throw an error.
        // We log and continue.
        console.warn(`Note: Could not list resources for type "${type}":`, err.message);
        break;
      }
    } while (nextCursor);
  }

  console.log(`Total Cloudinary resources listed: ${allCloudinaryResources.length}`);

  // 3. Filter Cloudinary resources under the "structro/" folder
  const structroResources = allCloudinaryResources.filter((r) => r.public_id.startsWith("structro/"));
  console.log(`Cloudinary resources under "structro/" folder: ${structroResources.length}`);

  // 4. Identify orphaned resources (present in Cloudinary but NOT in Firestore active list)
  const orphans = structroResources.filter((r) => !activePublicIds.has(r.public_id));
  console.log(`\nFound ${orphans.length} orphaned resources (no connection to the website at all):`);

  if (orphans.length === 0) {
    console.log("No orphaned assets to clean up! Cloudinary is clean.");
    process.exit(0);
  }

  orphans.forEach((r, idx) => {
    console.log(`[${idx + 1}] ID: ${r.public_id} (${r.resource_type})`);
  });

  // 5. Delete orphaned resources in batches of 100 (Cloudinary limit per API call)
  console.log(`\n3. Deleting ${orphans.length} orphaned resources from Cloudinary...`);
  
  // Group orphans by resource_type
  const orphansGrouped = orphans.reduce((acc, resource) => {
    if (!acc[resource.resource_type]) {
      acc[resource.resource_type] = [];
    }
    acc[resource.resource_type].push(resource.public_id);
    return acc;
  }, {});

  for (const [resourceType, publicIds] of Object.entries(orphansGrouped)) {
    const batchSize = 100;
    for (let i = 0; i < publicIds.length; i += batchSize) {
      const batch = publicIds.slice(i, i + batchSize);
      console.log(`Deleting batch of ${batch.length} (${resourceType}) assets...`);
      try {
        const result = await cloudinary.api.delete_resources(batch, {
          resource_type: resourceType,
          invalidate: true,
        });
        console.log(`Result:`, result.deleted);
      } catch (err) {
        console.error(`Error deleting batch of ${resourceType}:`, err.message);
      }
    }
  }

  console.log("\n--- Clean-up Complete! ---");
  process.exit(0);
}

run().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
