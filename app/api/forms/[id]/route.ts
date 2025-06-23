// app/api/forms/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { DatabaseService } from "@/lib/appwrite/database";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const form = await DatabaseService.updateFormSubmission(params.id, data);
    return NextResponse.json(form);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update form submission", details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await DatabaseService.deleteFormSubmission(params.id);
    return NextResponse.json({ message: "Form submission deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to delete form submission", details: error.message },
      { status: 500 }
    );
  }
}