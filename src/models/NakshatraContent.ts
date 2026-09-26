import mongoose from "mongoose";

const NakshatraContentSchema = new mongoose.Schema({
  language: { type: String, required: true },
  nakshatra_id: { type: String, required: true }, // "ashwini", "bharani", etc
  desc: { type: String, required: true },
});
NakshatraContentSchema.index({ language: 1, nakshatra_id: 1 }, { unique: true });
export const NakshatraContent = mongoose.models.NakshatraContent || mongoose.model("NakshatraContent", NakshatraContentSchema);
