import mongoose from "mongoose";
import fs from "fs";
import path from "path";

// 1. Connect to MongoDB
const MONGODB_URI = "mongodb+srv://shahtarang20_db_user:Shahtarang2003@cluster0.cdqvn6e.mongodb.net/mystic_oracle?retryWrites=true&w=majority&appName=Cluster0";

const TarotContentSchema = new mongoose.Schema({ language: String, card_id: Number, name: String, upright: String, reversed: String, desc: String });
TarotContentSchema.index({ language: 1, card_id: 1 }, { unique: true });
const TarotContent = mongoose.model("TarotContent", TarotContentSchema);

const NumerologyContentSchema = new mongoose.Schema({ language: String, category: String, number_id: String, meaning: String });
NumerologyContentSchema.index({ language: 1, category: 1, number_id: 1 }, { unique: true });
const NumerologyContent = mongoose.model("NumerologyContent", NumerologyContentSchema);

const KundliContentSchema = new mongoose.Schema({ language: String, category: String, rashi_id: String, meaning: String });
KundliContentSchema.index({ language: 1, category: 1, rashi_id: 1 }, { unique: true });
const KundliContent = mongoose.model("KundliContent", KundliContentSchema);

const NakshatraContentSchema = new mongoose.Schema({ language: String, nakshatra_id: String, desc: String });
NakshatraContentSchema.index({ language: 1, nakshatra_id: 1 }, { unique: true });
const NakshatraContent = mongoose.model("NakshatraContent", NakshatraContentSchema);

async function run() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected! Starting migration...");

  const localesDir = path.join(process.cwd(), "src/locales");
  const files = fs.readdirSync(localesDir);

  let totalTarot = 0;
  let totalNumerology = 0;
  let totalKundli = 0;
  let totalNakshatra = 0;

  for (const file of files) {
    if (!file.endsWith(".json")) continue;
    
    const lang = file.replace(".json", "");
    const filePath = path.join(localesDir, file);
    const content = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // 1. Tarot
    for (let i = 0; i <= 77; i++) {
      if (content[`tarot.name.${i}`]) {
        await TarotContent.findOneAndUpdate(
          { language: lang, card_id: i },
          { 
            name: content[`tarot.name.${i}`] || "",
            upright: content[`tarot.upright.${i}`] || "",
            reversed: content[`tarot.reversed.${i}`] || "",
            desc: content[`tarot.desc.${i}`] || ""
          },
          { upsert: true, new: true }
        );
        totalTarot++;
      }
    }

    // 2. Numerology
    const numCategories = ["lifePath", "destiny", "soulUrge", "personality"];
    for (const cat of numCategories) {
      // Possible numbers: 1 to 9, 11, 22, 33
      const nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "11", "22", "33"];
      for (const n of nums) {
        const key = `num.desc.${cat}.${n}`;
        if (content[key]) {
          await NumerologyContent.findOneAndUpdate(
            { language: lang, category: cat, number_id: n },
            { meaning: content[key] },
            { upsert: true, new: true }
          );
          totalNumerology++;
        }
      }
    }

    // 3. Kundli
    const kundliCats = ["moonMeaning", "lagnaMeaning", "sunMeaning", "rashiFlavor"];
    const rashis = ["mesha", "vrishabha", "mithuna", "karka", "simha", "kanya", "tula", "vrishchika", "dhanu", "makara", "kumbha", "meena"];
    for (const cat of kundliCats) {
      for (const r of rashis) {
        const key = `kundli.${cat}.${r}`;
        if (content[key]) {
          await KundliContent.findOneAndUpdate(
            { language: lang, category: cat, rashi_id: r },
            { meaning: content[key] },
            { upsert: true, new: true }
          );
          totalKundli++;
        }
      }
    }

    // 4. Nakshatra
    const nakshatras = [
      "ashwini", "bharani", "krittika", "rohini", "mrigashira", "ardra", "punarvasu", "pushya",
      "ashlesha", "magha", "purva-phalguni", "uttara-phalguni", "hasta", "chitra", "swati", "vishakha",
      "anuradha", "jyeshtha", "mula", "purva-ashadha", "uttara-ashadha", "shravana", "dhanishta", "shatabhisha",
      "purva-bhadrapada", "uttara-bhadrapada", "revati"
    ];
    for (const nak of nakshatras) {
      const key = `nakshatra.desc.${nak}`;
      if (content[key]) {
        await NakshatraContent.findOneAndUpdate(
          { language: lang, nakshatra_id: nak },
          { desc: content[key] },
          { upsert: true, new: true }
        );
        totalNakshatra++;
      }
    }

    console.log(`Migrated everything for language: ${lang}`);
  }

  console.log(`Migration Complete!`);
  console.log(`Tarot: ${totalTarot}`);
  console.log(`Numerology: ${totalNumerology}`);
  console.log(`Kundli: ${totalKundli}`);
  console.log(`Nakshatra: ${totalNakshatra}`);
  process.exit(0);
}

run().catch(console.error);
