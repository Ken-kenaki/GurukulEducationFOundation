// app/api/news-events/route.ts
import { NextRequest, NextResponse } from "next/server";
import { DatabaseService } from "@/lib/appwrite/database";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const newsEvents = await DatabaseService.getNewsEvents(limit, offset);
    return NextResponse.json(newsEvents);
  } catch (error: any) {
    console.error("News Events API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch news events", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const newsEvent = await DatabaseService.createNewsEvent(data);
    return NextResponse.json(newsEvent, { status: 201 });
  } catch (error: any) {
    console.error("Create News Event Error:", error);
    return NextResponse.json(
      { error: "Failed to create news event", details: error.message },
      { status: 500 }
    );
  }
}