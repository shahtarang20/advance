import mongoose from "mongoose";

const PalmistryContentSchema = new mongoose.Schema({
  language: { type: String, required: true },
  category: { type: String, required: true }, // e.g. "handShape", "heartLine"
  subCategory: { type: String, required: true }, // e.g. "earth", "long_curved", "conic"
  title: { type: String, required: true },
  meaning: { type: String, required: true },
});

// Compound index for fast queries
PalmistryContentSchema.index({ language: 1, category: 1, subCategory: 1 }, { unique: true });

export const PalmistryContent = mongoose.models.PalmistryContent || mongoose.model("PalmistryContent", PalmistryContentSchema);
