import { NextResponse } from "next/server";
import { verifyAdmin } from "@/app/actions/admin-db";
import { uploadAdminFile } from "@/lib/cloudinary";
import { checkRateLimit, rateLimitResponse } from "@/lib/rate-limiter";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const rateKey = "upload-brochure";
    const limit = checkRateLimit(rateKey, 20, 60_000);
    if (!limit.allowed) {
      return rateLimitResponse(limit.resetIn);
    }

    await verifyAdmin();

    const formData = await request.formData();
    const file = formData.get("file");
    const folder = formData.get("folder");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "A file is required." }, { status: 400 });
    }

    if (file.size === 0) {
      return NextResponse.json({ error: "The uploaded file is empty." }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Files must be 10MB or smaller." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await uploadAdminFile({
      buffer,
      folder: typeof folder === "string" ? folder : "brochures",
    });

    return NextResponse.json({
      secureUrl: result.secure_url,
      publicId: result.public_id,
      format: result.format,
    });
  } catch (error) {
    console.error("File upload failed", error);

    return NextResponse.json(
      { error: "Unable to upload the file right now. Please try again." },
      { status: 500 }
    );
  }
}
