// app/api/forms/route.ts
import { NextRequest, NextResponse } from "next/server";
import { DatabaseService } from "@/lib/appwrite/database";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const forms = await DatabaseService.getFormSubmissions(limit, offset);
    return NextResponse.json(forms);
  } catch (error: any) {
    console.error("Forms API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch form submissions", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const form = await DatabaseService.createFormSubmission(data);
    return NextResponse.json(form, { status: 201 });
  } catch (error: any) {
    console.error("Create Form Submission Error:", error);
    return NextResponse.json(
      { error: "Failed to create form submission", details: error.message },
      { status: 500 }
    );
  }
}