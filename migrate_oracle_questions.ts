import mongoose from "mongoose";
import fs from "fs";
import path from "path";

const MONGODB_URI = "mongodb+srv://shahtarang20_db_user:Shahtarang2003@cluster0.cdqvn6e.mongodb.net/mystic_oracle?retryWrites=true&w=majority&appName=Cluster0";

const OracleQuestionSchema = new mongoose.Schema({ language: String, question_id: String, text: String });
OracleQuestionSchema.index({ language: 1, question_id: 1 }, { unique: true });
const OracleQuestion = mongoose.model("OracleQuestion", OracleQuestionSchema);

async function run() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected!");

  const localesDir = path.join(process.cwd(), "src/locales");
  const files = fs.readdirSync(localesDir);

  let totalQs = 0;

  for (const file of files) {
    if (!file.endsWith(".json")) continue;
    const lang = file.replace(".json", "");
    const content = JSON.parse(fs.readFileSync(path.join(localesDir, file), "utf-8"));

    for (let i = 1; i <= 100; i++) {
      const key = `oracle.q.${i}`;
      if (content[key]) {
        await OracleQuestion.findOneAndUpdate(
          { language: lang, question_id: String(i) },
          { text: content[key] },
          { upsert: true, new: true }
        );
        totalQs++;
      }
    }
    
    // Also the marriage question
    if (content["oracle.q.marriage"]) {
      await OracleQuestion.findOneAndUpdate(
        { language: lang, question_id: "marriage" },
        { text: content["oracle.q.marriage"] },
        { upsert: true, new: true }
      );
      totalQs++;
    }
    
    console.log(`Migrated questions for ${lang}`);
  }

  console.log(`Migration Complete! Total: ${totalQs}`);
  process.exit(0);
}

run().catch(console.error);
