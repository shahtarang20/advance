import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { PalmistryContent } from "@/models/PalmistryContent";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get("lang") || "en";
    const category = searchParams.get("category");
    const subCategory = searchParams.get("subCategory");

    if (!category || !subCategory) {
      return NextResponse.json({ error: "Missing category or subCategory" }, { status: 400 });
    }

    await dbConnect();

    const data = await PalmistryContent.findOne({ language: lang, category, subCategory }).lean();

    if (!data && lang !== "en") {
      // Fallback to english
      const fallback = await PalmistryContent.findOne({ language: "en", category, subCategory }).lean();
      if (fallback) {
        return NextResponse.json(fallback);
      }
    }

    if (!data) {
      return NextResponse.json({ title: "Reading not found", meaning: "The stars are quiet regarding this marking." });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Palmistry API Error:", error);
    return NextResponse.json({ error: "Failed to fetch palmistry data" }, { status: 500 });
  }
}
