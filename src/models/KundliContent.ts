import mongoose from "mongoose";

const KundliContentSchema = new mongoose.Schema({
  language: { type: String, required: true },
  category: { type: String, required: true }, // "moonMeaning", "lagnaMeaning", "sunMeaning", "rashiFlavor"
  rashi_id: { type: String, required: true }, // "mesha", "vrishabha", etc
  meaning: { type: String, required: true },
});
KundliContentSchema.index({ language: 1, category: 1, rashi_id: 1 }, { unique: true });
export const KundliContent = mongoose.models.KundliContent || mongoose.model("KundliContent", KundliContentSchema);
