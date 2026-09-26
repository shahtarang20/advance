import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { KundliContent } from "@/models/KundliContent";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get("lang") || "en";
    const category = searchParams.get("category"); // moonMeaning, lagnaMeaning...
    const rashi_id = searchParams.get("rashi_id");

    await dbConnect();

    let query: any = { language: lang };
    if (category) query.category = category;
    if (rashi_id) query.rashi_id = rashi_id;

    const data = await KundliContent.find(query).lean();
    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error("Kundli API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
