// app/api/gallery/route.ts
import { createAdminClient } from "@/lib/server/appwrite";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("Attempting to fetch gallery items...");

    const { databases } = await createAdminClient();
    console.log("Admin client created successfully");

    const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
    if (!databaseId) {
      throw new Error("Database ID not configured");
    }

    console.log(`Fetching documents from database: ${databaseId}`);
    const response = await databases.listDocuments(databaseId, "gallery");

    console.log(`Found ${response.documents.length} items`);
    return NextResponse.json(response.documents);
  } catch (error: any) {
    console.error("API Error:", {
      message: error.message,
      stack: error.stack,
      raw: error,
    });
    return NextResponse.json(
      { error: "Failed to fetch gallery items", details: error.message },
      { status: 500 }
    );
  }
}
