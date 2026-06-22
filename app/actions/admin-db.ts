"use server";

import { auth } from "@/auth";
import { adminDb } from "@/lib/firebase-admin";
import { deleteCloudinaryFile, getPublicIdFromUrl } from "@/lib/cloudinary";

export async function verifyAdmin() {
  const session = await auth();
  if (!session || session.user?.role !== "admin") {
    throw new Error("Unauthorized");
  }
}

export async function getAdminDocs(collectionName: string, orderByField?: string, orderDirection: "asc" | "desc" = "desc") {
  await verifyAdmin();
  let ref: FirebaseFirestore.Query | FirebaseFirestore.CollectionReference = adminDb.collection(collectionName);
  if (orderByField) {
    ref = ref.orderBy(orderByField, orderDirection);
  }
  const snapshot = await ref.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getAdminDoc(collectionName: string, docId: string) {
  await verifyAdmin();
  const snapshot = await adminDb.collection(collectionName).doc(docId).get();
  if (!snapshot.exists) return null;
  return { id: snapshot.id, ...snapshot.data() };
}

export async function addAdminDoc(collectionName: string, data: Record<string, unknown>) {
  await verifyAdmin();
  const ref = await adminDb.collection(collectionName).add(data);
  return ref.id;
}

export async function updateAdminDoc(collectionName: string, docId: string, data: Record<string, unknown>) {
  await verifyAdmin();
  await adminDb.collection(collectionName).doc(docId).update(data);
}

export async function deleteAdminDoc(collectionName: string, docId: string) {
  await verifyAdmin();
  await adminDb.collection(collectionName).doc(docId).delete();
}

export async function deleteMultipleCloudinaryAssetsByUrls(urls: string[]) {
  await verifyAdmin();
  const validUrls = urls.filter(url => typeof url === "string" && url.includes("cloudinary.com"));
  if (validUrls.length === 0) return [];

  const deletePromises = validUrls.map(async (url) => {
    const parsed = getPublicIdFromUrl(url);
    if (!parsed) return { url, success: false, error: "Invalid Cloudinary URL" };
    try {
      const result = await deleteCloudinaryFile(parsed.publicId, parsed.resourceType);
      return { url, success: true, result };
    } catch (error) {
      console.error(`Failed to delete Cloudinary asset ${url}:`, error);
      return { url, success: false, error: error instanceof Error ? error.message : String(error) };
    }
  });

  return Promise.all(deletePromises);
}

