// app/api/stories/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { DatabaseService } from "@/lib/appwrite/database";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const story = await DatabaseService.getStory(params.id);
    return NextResponse.json(story);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Story not found", details: error.message },
      { status: 404 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const story = await DatabaseService.updateStory(params.id, data);
    return NextResponse.json(story);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update story", details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await DatabaseService.deleteStory(params.id);
    return NextResponse.json({ message: "Story deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to delete story", details: error.message },
      { status: 500 }
    );
  }
}