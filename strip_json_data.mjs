import fs from "fs";
import path from "path";

const localesDir = path.join(process.cwd(), "src/locales");
const files = fs.readdirSync(localesDir);

let totalRemoved = 0;

for (const file of files) {
  if (!file.endsWith(".json")) continue;
  
  const filePath = path.join(localesDir, file);
  const content = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  
  const initialKeys = Object.keys(content).length;

  for (const key of Object.keys(content)) {
    if (
      key.startsWith("oracle.a.") ||
      key.startsWith("oracle.q.") ||
      key.startsWith("tarot.name.") ||
      key.startsWith("tarot.upright.") ||
      key.startsWith("tarot.reversed.") ||
      key.startsWith("tarot.desc.") ||
      key.startsWith("num.desc.") ||
      key.startsWith("kundli.moonMeaning.") ||
      key.startsWith("kundli.lagnaMeaning.") ||
      key.startsWith("kundli.sunMeaning.") ||
      key.startsWith("kundli.rashiFlavor.") ||
      key.startsWith("nakshatra.desc.")
    ) {
      delete content[key];
    }
  }

  const finalKeys = Object.keys(content).length;
  totalRemoved += (initialKeys - finalKeys);

  fs.writeFileSync(filePath, JSON.stringify(content, null, 2), "utf-8");
  console.log(`Cleaned ${file}: removed ${initialKeys - finalKeys} heavy text keys.`);
}

console.log(`\nSUCCESS! Completely removed ${totalRemoved} lines of heavy text from your app bundle.`);
