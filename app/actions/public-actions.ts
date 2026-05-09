"use server";

import { adminDb } from "@/lib/firebase-admin";

interface EnquiryData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  message?: string;
  type?: "lead" | "vendor" | "contractor";
  additionalFields?: Record<string, string>;
}

export async function submitEnquiry(data: EnquiryData) {
  if (!data.name || !data.email || !data.phone) {
    throw new Error("Missing required fields");
  }

  await adminDb.collection("enquiries").add({
    name: data.name,
    email: data.email,
    phone: data.phone,
    company: data.company || "",
    service: data.service,
    message: data.message || "",
    type: data.type || "lead",
    additionalFields: data.additionalFields || {},
    status: "new",
    followUpNotes: "",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
}
