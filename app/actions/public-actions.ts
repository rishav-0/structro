"use server";

import { adminDb } from "@/lib/firebase-admin";
import { z } from "zod";

const EnquirySchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email").max(254),
  phone: z.string().min(10, "Phone must be at least 10 digits").max(15).regex(/^[\d\s+\-()]+$/, "Invalid phone format"),
  company: z.string().max(200).optional().default(""),
  service: z.string().max(100).optional().default(""),
  message: z.string().max(5000).optional().default(""),
  type: z.enum(["lead", "vendor", "contractor"]).optional().default("lead"),
  additionalFields: z.record(z.string(), z.string()).optional().default({}),
});

interface EnquiryResult {
  success: boolean;
  error?: string;
}

export async function submitEnquiry(data: Record<string, unknown>): Promise<EnquiryResult> {
  const parsed = EnquirySchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || "Invalid input" };
  }

  try {
    await adminDb.collection("enquiries").add({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      company: parsed.data.company,
      service: parsed.data.service,
      message: parsed.data.message,
      type: parsed.data.type,
      additionalFields: parsed.data.additionalFields,
      status: "new",
      followUpNotes: "",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to submit enquiry:", error);
    return { success: false, error: "Failed to submit enquiry. Please try again." };
  }
}

const BrochureDownloadSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  phone: z.string().min(10, "Phone must be at least 10 digits").max(15).regex(/^[\d\s+\-()]+$/, "Invalid phone format"),
  email: z.string().email("Invalid email").max(254),
  interest: z.string().max(200).optional().default(""),
  address: z.string().max(500).optional().default(""),
});

export async function submitBrochureDownload(data: Record<string, unknown>): Promise<EnquiryResult> {
  const parsed = BrochureDownloadSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || "Invalid input" };
  }

  try {
    await adminDb.collection("brochure-downloads").add({
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email,
      interest: parsed.data.interest,
      address: parsed.data.address,
      createdAt: Date.now(),
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to submit brochure download:", error);
    return { success: false, error: "Failed to submit request. Please try again." };
  }
}

const CareerApplicationSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email").max(254),
  phone: z.string().min(10, "Phone must be at least 10 digits").max(15).regex(/^[\d\s+\-()]+$/, "Invalid phone format"),
  position: z.string().min(1, "Position is required").max(100),
  experience: z.string().max(50).optional().default(""),
  resumeUrl: z.string().url("Invalid URL").max(500).optional().default(""),
  message: z.string().max(5000).optional().default(""),
});

export async function submitCareerApplication(data: Record<string, unknown>): Promise<EnquiryResult> {
  const parsed = CareerApplicationSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || "Invalid input" };
  }

  try {
    await adminDb.collection("career-applications").add({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      position: parsed.data.position,
      experience: parsed.data.experience,
      resumeUrl: parsed.data.resumeUrl,
      message: parsed.data.message,
      status: "new",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to submit career application:", error);
    return { success: false, error: "Failed to submit application. Please try again." };
  }
}
