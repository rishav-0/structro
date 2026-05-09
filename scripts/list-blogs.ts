import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const db = getFirestore();

async function listBlogs() {
  console.log("🔍 Fetching existing blogs from database...");
  const snapshot = await db.collection("blogs").get();
  if (snapshot.empty) {
    console.log("ℹ️ No blogs found in the database.");
    return;
  }
  
  console.log(`✅ Found ${snapshot.size} blog(s) in the database:`);
  snapshot.forEach((doc) => {
    const data = doc.data();
    console.log(`- [${doc.id}] Title: "${data.title}" | Status: "${data.status}"`);
  });
}

listBlogs().catch(console.error);
