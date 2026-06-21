import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as fs from "fs";
import * as path from "path";

// Function to safely load and parse environment variables from .env.local
function loadEnv() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) {
    console.warn("⚠️ No .env.local file found at:", envPath);
    return;
  }

  const content = fs.readFileSync(envPath, "utf-8");
  content.split("\n").forEach((line) => {
    // Ignore comments and empty lines
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;

    const firstEq = trimmed.indexOf("=");
    if (firstEq === -1) return;

    const key = trimmed.slice(0, firstEq).trim();
    let val = trimmed.slice(firstEq + 1).trim();

    // Strip surrounding quotes
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }

    process.env[key] = val;
  });
}

// Load env vars
loadEnv();

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!projectId || !clientEmail || !privateKey) {
  console.error("❌ Error: Missing Firebase credentials in environment variables.");
  console.log("PROJECT_ID:", projectId);
  console.log("CLIENT_EMAIL:", clientEmail);
  console.log("PRIVATE_KEY exists:", !!privateKey);
  process.exit(1);
}

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
}

const db = getFirestore();

const productsToUpdate = [
  {
    id: "portable-peb",
    subtitle: "Engineered for resilience. Built with precision-grade materials to meet 1 BHK, 2 BHK, 3 BHK structural requirements.",
    materialGrade: "Galvalume & Light Gauge Steel",
    tags: ["Eco-Friendly", "Quick Deployment", "Modular Home"],
    badge: "Premium Modular",
    imageAlt: "Modern Prefabricated Light Gauge Steel Residential PEB House Layout",
  },
  {
    id: "movable-sheds",
    subtitle: "Engineered for resilience. Built with precision-grade materials to meet 100 sqm onwards structural requirements.",
    materialGrade: "Mild Steel (IS 2062) & Galvalume",
    tags: ["Relocatable", "Modular Expansion", "High Wind Resistance"],
    badge: "Heavy Duty",
    imageAlt: "Multipurpose Steel Frame Movable Industrial Storage Shed",
  },
  {
    id: "multipurpose-containers",
    subtitle: "Engineered for resilience. Built with precision-grade materials to meet 500 Ltr to 10,000 Ltrs. structural requirements.",
    materialGrade: "SS304 / SS316 Food Grade",
    tags: ["Corrosion-Resistant", "High Impact Strength", "Heavy Duty"],
    badge: "Industrial Grade",
    imageAlt: "Industrial Steel Storage and Transport Tanks Collection",
  },
  {
    id: "readymade-staircases",
    subtitle: "Engineered for resilience. Built with precision-grade materials to meet 1 set onwards structural requirements.",
    materialGrade: "Mild Steel (IS 2062) with Powder Coating",
    tags: ["Anti-Slip Treads", "Safety Compliant", "Bolt-on Assembly"],
    badge: "Safety Certified",
    imageAlt: "Powder Coated Modern Safety Steel Staircase Assembly",
  },
];

async function runMigration() {
  console.log("🚀 Starting products data migration...");
  
  for (const product of productsToUpdate) {
    const docRef = db.collection("products").doc(product.id);
    const docSnap = await docRef.get();
    
    if (!docSnap.exists) {
      console.log(`⚠️ Document for ${product.id} does not exist. Creating it...`);
      // Fallback: If document doesn't exist, we skip or set it. Since this is an update, let's just merge it.
    }
    
    await docRef.set({
      subtitle: product.subtitle,
      materialGrade: product.materialGrade,
      tags: product.tags,
      badge: product.badge,
      imageAlt: product.imageAlt,
      updatedAt: Date.now()
    }, { merge: true });
    
    console.log(`✅ Updated product: ${product.id}`);
  }
  
  console.log("🎉 Products migration complete!");
}

runMigration().catch((error) => {
  console.error("❌ Migration failed:", error);
  process.exit(1);
});
