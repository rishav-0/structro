"use server";

import { adminDb } from "@/lib/firebase-admin";

interface EnquiryData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

export async function submitEnquiry(data: EnquiryData) {
  if (!data.name || !data.email || !data.phone || !data.service || !data.message) {
    throw new Error("Missing required fields");
  }

  await adminDb.collection("enquiries").add({
    ...data,
    status: "new",
    followUpNotes: "",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
}
