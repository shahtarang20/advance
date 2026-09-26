import mongoose from "mongoose";

const TarotContentSchema = new mongoose.Schema({
  language: { type: String, required: true },
  card_id: { type: Number, required: true }, // 0 to 77
  name: { type: String, required: true },
  upright: { type: String, required: true },
  reversed: { type: String, required: true },
  desc: { type: String, required: true },
});
TarotContentSchema.index({ language: 1, card_id: 1 }, { unique: true });
export const TarotContent = mongoose.models.TarotContent || mongoose.model("TarotContent", TarotContentSchema);
