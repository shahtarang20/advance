import mongoose from "mongoose";

const OracleQuestionSchema = new mongoose.Schema({
  language: { type: String, required: true },
  question_id: { type: String, required: true },
  text: { type: String, required: true },
});
OracleQuestionSchema.index({ language: 1, question_id: 1 }, { unique: true });
export const OracleQuestion = mongoose.models.OracleQuestion || mongoose.model("OracleQuestion", OracleQuestionSchema);
