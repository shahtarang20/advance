import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { OracleQuestion } from "@/models/OracleQuestion";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get("lang") || "en";
    const idsParam = searchParams.get("ids");

    await dbConnect();

    let query: any = { language: lang };
    if (idsParam) {
      const ids = idsParam.split(",");
      query.question_id = { $in: ids };
    }

    const data = await OracleQuestion.find(query).lean();
    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error("Oracle Questions API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
