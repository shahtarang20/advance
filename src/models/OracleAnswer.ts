import mongoose, { Document, Model } from "mongoose";

export interface IOracleAnswer extends Document {
  language: string;
  question_id: string; // e.g. "marriage", "1", "2"
  responses: string[]; // array of human-like responses
}

const OracleAnswerSchema = new mongoose.Schema<IOracleAnswer>({
  language: { type: String, required: true },
  question_id: { type: String, required: true },
  responses: { type: [String], required: true },
});

// Ensure uniqueness per language + question_id
OracleAnswerSchema.index({ language: 1, question_id: 1 }, { unique: true });

export const OracleAnswer: Model<IOracleAnswer> = mongoose.models.OracleAnswer || mongoose.model<IOracleAnswer>("OracleAnswer", OracleAnswerSchema);
