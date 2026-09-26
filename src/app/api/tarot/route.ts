import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { TarotContent } from "@/models/TarotContent";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get("lang") || "en";
    const idsParam = searchParams.get("ids"); // e.g. "0,15,42"

    await dbConnect();

    let query: any = { language: lang };
    if (idsParam) {
      const ids = idsParam.split(",").map(Number);
      query.card_id = { $in: ids };
    }

    const cards = await TarotContent.find(query).lean();
    return NextResponse.json(cards, { status: 200 });

  } catch (error) {
    console.error("Tarot API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
