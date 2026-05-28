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

interface BrochureDownloadData {
  name: string;
  phone: string;
  email: string;
  interest?: string;
  address?: string;
}

export async function submitBrochureDownload(data: BrochureDownloadData) {
  if (!data.name || !data.phone || !data.email) {
    throw new Error("Name, phone, and email are required");
  }

  await adminDb.collection("brochure-downloads").add({
    name: data.name,
    phone: data.phone,
    email: data.email,
    interest: data.interest || "",
    address: data.address || "",
    createdAt: Date.now(),
  });
}
