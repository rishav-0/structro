import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";

let configured = false;

function requireEnv(name: "CLOUDINARY_CLOUD_NAME" | "CLOUDINARY_API_KEY" | "CLOUDINARY_API_SECRET") {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing Cloudinary configuration: ${name}`);
  }

  return value;
}

function configureCloudinary() {
  if (configured) {
    return;
  }

  cloudinary.config({
    cloud_name: requireEnv("CLOUDINARY_CLOUD_NAME"),
    api_key: requireEnv("CLOUDINARY_API_KEY"),
    api_secret: requireEnv("CLOUDINARY_API_SECRET"),
    secure: true,
  });

  configured = true;
}

function sanitizeUploadFolder(folder: string) {
  const normalizedFolder = folder
    .split("/")
    .map((segment) => segment.trim().toLowerCase().replace(/[^a-z0-9-_]/g, "-"))
    .filter(Boolean)
    .join("/");

  return normalizedFolder || "admin";
}

export async function uploadAdminImage({
  buffer,
  folder,
}: {
  buffer: Buffer;
  folder: string;
}): Promise<UploadApiResponse> {
  configureCloudinary();

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `structro/${sanitizeUploadFolder(folder)}`,
        resource_type: "image",
        use_filename: true,
        unique_filename: true,
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        if (!result) {
          reject(new Error("Cloudinary did not return an upload result."));
          return;
        }

        resolve(result);
      }
    );

    uploadStream.end(buffer);
  });
}

export async function uploadAdminFile({
  buffer,
  folder,
}: {
  buffer: Buffer;
  folder: string;
}): Promise<UploadApiResponse> {
  configureCloudinary();

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `structro/${sanitizeUploadFolder(folder)}`,
        resource_type: "raw", // PDFs must use "raw" — "auto" may classify them as "image" causing 401 Unauthorized on public access
        use_filename: true,
        unique_filename: true,
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        if (!result) {
          reject(new Error("Cloudinary did not return an upload result."));
          return;
        }

        resolve(result);
      }
    );

    uploadStream.end(buffer);
  });
}