import { NextResponse } from "next/server";

import { getPublicCollectionData } from "@/lib/public-db-server";

// This API route is server-side only. Ensure no client-side code imports this file.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ collection: string }> }
) {
  try {
    const { collection } = await params;
    const data = await getPublicCollectionData(collection);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching public collection:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}