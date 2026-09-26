import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { NakshatraContent } from "@/models/NakshatraContent";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get("lang") || "en";
    const nakshatra_id = searchParams.get("nakshatra_id");

    await dbConnect();

    let query: any = { language: lang };
    if (nakshatra_id) query.nakshatra_id = nakshatra_id;

    const data = await NakshatraContent.find(query).lean();
    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error("Nakshatra API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
