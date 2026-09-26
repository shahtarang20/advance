require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

async function check() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected");
  const PalmistryContent = mongoose.model('PalmistryContent', new mongoose.Schema({}, { strict: false }));
  
  const docs = await PalmistryContent.find({ category: "handShape", language: "hi" });
  console.log("Found:", docs.length);
  if (docs.length > 0) {
    console.log(docs[0]);
  }
  process.exit(0);
}
check().catch(console.error);
