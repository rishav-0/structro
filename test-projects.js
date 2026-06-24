import fs from 'fs';
import admin from 'firebase-admin';

const envPath = './.env.local';
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
  if (match) {
    let value = match[2].trim();
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.substring(1, value.length - 1);
    } else if (value.startsWith("'") && value.endsWith("'")) {
      value = value.substring(1, value.length - 1);
    }
    env[match[1]] = value;
  }
});

process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID = env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
process.env.FIREBASE_CLIENT_EMAIL = env.FIREBASE_CLIENT_EMAIL;
process.env.FIREBASE_PRIVATE_KEY = env.FIREBASE_PRIVATE_KEY;

try {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
  
  const adminDb = admin.firestore();
  console.log("Fetching projects...");
  const snapshot = await adminDb.collection("projects").get();
  console.log("Total projects in DB:", snapshot.docs.length);
  snapshot.docs.forEach(doc => {
    console.log({
      id: doc.id,
      title: doc.data().title,
      alt: doc.data().alt,
      src: doc.data().src,
      type: doc.data().type
    });
  });
} catch (error) {
  console.error("Error:", error);
}
