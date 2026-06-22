import { NextResponse } from "next/server";

import { verifyAdmin } from "@/app/actions/admin-db";
import { uploadAdminImage } from "@/lib/cloudinary";
import { checkRateLimit, rateLimitResponse } from "@/lib/rate-limiter";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const rateKey = "uploads";
    const limit = checkRateLimit(rateKey, 20, 60_000);
    if (!limit.allowed) {
      return rateLimitResponse(limit.resetIn);
    }

    await verifyAdmin();

    const formData = await request.formData();
    const file = formData.get("file");
    const folder = formData.get("folder");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "An image file is required." }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image uploads are supported." }, { status: 400 });
    }

    if (file.size === 0) {
      return NextResponse.json({ error: "The uploaded image is empty." }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Images must be 10MB or smaller." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await uploadAdminImage({
      buffer,
      folder: typeof folder === "string" ? folder : "admin",
    });

    return NextResponse.json({
      secureUrl: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
    });
  } catch (error) {
    console.error("Cloudinary upload failed", error);

    return NextResponse.json(
      { error: "Unable to upload the image right now. Please try again." },
      { status: 500 }
    );
  }
}