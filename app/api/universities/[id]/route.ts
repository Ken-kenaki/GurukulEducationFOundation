// app/api/universities/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { DatabaseService } from "@/lib/appwrite/database";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const university = await DatabaseService.updateUniversity(params.id, data);
    return NextResponse.json(university);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update university", details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await DatabaseService.deleteUniversity(params.id);
    return NextResponse.json({ message: "University deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to delete university", details: error.message },
      { status: 500 }
    );
  }
}