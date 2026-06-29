import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

/**
 * On-demand revalidation API endpoint.
 * 
 * Usage:
 *   POST /api/revalidate
 *   Body: { "secret": "<REVALIDATION_SECRET>", "tag": "public-data" }
 * 
 * Or revalidate a specific collection:
 *   Body: { "secret": "<REVALIDATION_SECRET>", "tag": "collection-projects" }
 * 
 * This provides a manual escape hatch to force cache invalidation
 * on the Vercel deployment without needing to redeploy.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { secret, tag } = body;

    // Validate secret — uses REVALIDATION_SECRET env var, falls back to
    // accepting any request if the var is not set (development convenience)
    const expectedSecret = process.env.REVALIDATION_SECRET;
    if (expectedSecret && secret !== expectedSecret) {
      return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
    }

    const tagToRevalidate = tag || "public-data";
    revalidateTag(tagToRevalidate, { expire: 0 });

    return NextResponse.json({
      revalidated: true,
      tag: tagToRevalidate,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { error: "Failed to revalidate" },
      { status: 500 }
    );
  }
}
