// app/api/news-events/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { DatabaseService } from "@/lib/appwrite/database";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const newsEvent = await DatabaseService.updateNewsEvent(params.id, data);
    return NextResponse.json(newsEvent);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update news event", details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await DatabaseService.deleteNewsEvent(params.id);
    return NextResponse.json({ message: "News event deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to delete news event", details: error.message },
      { status: 500 }
    );
  }
}