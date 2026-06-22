import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  const filename = searchParams.get("filename") || "Structro_Brochure.pdf";

  if (!url) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  // Only allow Cloudinary URLs for security
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  if (!parsedUrl.hostname.endsWith("cloudinary.com")) {
    return NextResponse.json({ error: "URL not allowed" }, { status: 403 });
  }

  try {
    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Upstream error: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }

    const contentType = response.headers.get("content-type") || "application/pdf";
    const buffer = await response.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        // Forces browser to download instead of opening inline
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": buffer.byteLength.toString(),
        // Allow the browser to cache for 10 minutes
        "Cache-Control": "public, max-age=600",
      },
    });
  } catch (error) {
    console.error("Brochure proxy download failed:", error);
    return NextResponse.json({ error: "Failed to fetch brochure. Please try again." }, { status: 500 });
  }
}
