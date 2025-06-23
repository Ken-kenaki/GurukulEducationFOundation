// app/api/universities/route.ts
import { NextRequest, NextResponse } from "next/server";
import { DatabaseService } from "@/lib/appwrite/database";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const universities = await DatabaseService.getUniversities(limit, offset);
    return NextResponse.json(universities);
  } catch (error: any) {
    console.error("Universities API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch universities", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const university = await DatabaseService.createUniversity(data);
    return NextResponse.json(university, { status: 201 });
  } catch (error: any) {
    console.error("Create University Error:", error);
    return NextResponse.json(
      { error: "Failed to create university", details: error.message },
      { status: 500 }
    );
  }
}