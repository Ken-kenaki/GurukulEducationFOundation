// app/api/countries/route.ts
import { NextRequest, NextResponse } from "next/server";
import { DatabaseService } from "@/lib/appwrite/database";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const countries = await DatabaseService.getCountries(limit, offset);
    return NextResponse.json(countries);
  } catch (error: any) {
    console.error("Countries API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch countries", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const country = await DatabaseService.createCountry(data);
    return NextResponse.json(country, { status: 201 });
  } catch (error: any) {
    console.error("Create Country Error:", error);
    return NextResponse.json(
      { error: "Failed to create country", details: error.message },
      { status: 500 }
    );
  }
}