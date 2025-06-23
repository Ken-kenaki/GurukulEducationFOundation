// app/api/countries/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { DatabaseService } from "@/lib/appwrite/database";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const country = await DatabaseService.updateCountry(params.id, data);
    return NextResponse.json(country);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update country", details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await DatabaseService.deleteCountry(params.id);
    return NextResponse.json({ message: "Country deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to delete country", details: error.message },
      { status: 500 }
    );
  }
}