// app/api/stories/route.ts
import { NextRequest, NextResponse } from "next/server";
import { DatabaseService } from "@/lib/appwrite/database";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const stories = await DatabaseService.getStories(limit, offset);
    return NextResponse.json(stories);
  } catch (error: any) {
    console.error("Stories API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stories", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const story = await DatabaseService.createStory(data);
    return NextResponse.json(story, { status: 201 });
  } catch (error: any) {
    console.error("Create Story Error:", error);
    return NextResponse.json(
      { error: "Failed to create story", details: error.message },
      { status: 500 }
    );
  }
}