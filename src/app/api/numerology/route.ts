import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { NumerologyContent } from "@/models/NumerologyContent";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get("lang") || "en";
    const category = searchParams.get("category"); // e.g. "lifePath"
    const number_id = searchParams.get("number_id");

    await dbConnect();

    let query: any = { language: lang };
    if (category) query.category = category;
    if (number_id) query.number_id = number_id;

    const data = await NumerologyContent.find(query).lean();
    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error("Numerology API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
