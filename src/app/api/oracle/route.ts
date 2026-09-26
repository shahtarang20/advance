import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { OracleAnswer } from "@/models/OracleAnswer";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const qId = searchParams.get("qId");
    const lang = searchParams.get("lang") || "en";

    if (!qId) {
      return NextResponse.json({ error: "Missing qId parameter" }, { status: 400 });
    }

    await dbConnect();

    const data = await OracleAnswer.findOne({ language: lang, question_id: qId }).lean();
    
    if (!data || !data.responses || data.responses.length === 0) {
      return NextResponse.json({ 
        answer: "The stars align in mysterious ways. Trust your intuition, for it is your greatest compass." 
      }, { status: 200 });
    }

    // Pick a random answer from the array of 10
    const randomIndex = Math.floor(Math.random() * data.responses.length);
    const selectedAnswer = data.responses[randomIndex];

    return NextResponse.json({ answer: selectedAnswer }, { status: 200 });

  } catch (error) {
    console.error("Oracle API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
