import mongoose from "mongoose";

const NumerologyContentSchema = new mongoose.Schema({
  language: { type: String, required: true },
  category: { type: String, required: true }, // "lifePath", "destiny", "soulUrge", "personality"
  number_id: { type: String, required: true }, // "1", "2", "11", etc
  meaning: { type: String, required: true },
});
NumerologyContentSchema.index({ language: 1, category: 1, number_id: 1 }, { unique: true });
export const NumerologyContent = mongoose.models.NumerologyContent || mongoose.model("NumerologyContent", NumerologyContentSchema);
