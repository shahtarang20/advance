const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://shahtarang20_db_user:Shahtarang2003@cluster0.cdqvn6e.mongodb.net/mystic_oracle?retryWrites=true&w=majority&appName=Cluster0";

const hiData = [
  // Biometrics
  { cat: "phi", sub: "high", title: "उच्च स्वर्ण अनुपात संरेखण", meaning: "गणितीय रूप से, आपकी हथेली और फालेंज Phi (1.618) के साथ मजबूती से संरेखित होते हैं, जो प्राकृतिक संतुलन का गणितीय हस्ताक्षर है। पारंपरिक रूप से, यह एक सहज सौंदर्य बोध और स्वाभाविक रूप से सद्भाव की ओर खींचे गए जीवन को इंगित करता है।" },
  { cat: "phi", sub: "moderate", title: "व्यावहारिक अनुपात", meaning: "आपका हाथ सख्त Phi संरेखण पर व्यावहारिक अनुपात का पक्षधर है। गणितीय रूप से, यह एक व्यावहारिक, उपयोगिता-संचालित मानसिकता से संबंधित है जहां समारोह सौंदर्यशास्त्र से अधिक मायने रखता है।" },
  { cat: "index_ring", sub: "ring_longer", title: "अपोलो प्रभुत्व (रिंग > इंडेक्स)", meaning: "क्लासिक चिरोग्नोमी में, एक लंबी अनामिका गणितीय रूप से उच्च जोखिम सहिष्णुता, स्थानिक जागरूकता और वित्तीय सफलता और प्रतिस्पर्धा के लिए एक मजबूत ड्राइव से संबंधित है।" },
  { cat: "index_ring", sub: "index_longer", title: "बृहस्पति प्रभुत्व (इंडेक्स > रिंग)", meaning: "एक गणितीय रूप से लंबी तर्जनी पारंपरिक रूप से मजबूत नेतृत्व, उच्च मौखिक बुद्धि और दूसरों पर प्राकृतिक अधिकार की ओर इशारा करती है।" },
  { cat: "index_ring", sub: "equal", title: "संतुलित अंक", meaning: "आपकी तर्जनी और अनामिका गणितीय रूप से समान हैं, एक दुर्लभ संतुलन जो एक ऐसे व्यक्तित्व का सुझाव देता है जो आसानी से सामाजिक सद्भाव के साथ महत्वाकांक्षा को संतुलित करता है।" },
  { cat: "thumb_angle", sub: "wide", title: "चौड़ा कोण (लगभग 90°)", meaning: "आपका अंगूठा हथेली से एक विस्तृत ज्यामितीय कोण पर टिकी हुई है। यह गणितीय रूप से अत्यधिक स्वतंत्रता, व्यक्तिगत स्वतंत्रता के प्रेम और सूक्ष्म प्रबंधन से इनकार करने का प्रतीक है।" },
  { cat: "thumb_angle", sub: "narrow", title: "संकीर्ण कोण (< 45°)", meaning: "एक संकीर्ण आराम कोण एक सतर्क, विचारशील और सुरक्षात्मक मानसिकता को इंगित करता है। आप अचानक जोखिमों पर सुरक्षित, सिद्ध रास्तों को पसंद करते हैं।" },
  { cat: "money_triangle", sub: "acute", title: "तंग तीव्र कोण (< 60°)", meaning: "'धन त्रिकोण' बनाने वाला ज्यामितीय प्रतिच्छेदन अत्यंत तंग है। गणितीय रूप से, यह उत्कृष्ट धन प्रतिधारण और बचत के लिए एक अत्यधिक रणनीतिक दृष्टिकोण का प्रतीक है।" },
  { cat: "money_triangle", sub: "obtuse", title: "खुला कोण (> 80°)", meaning: "एक खुला ज्यामितीय प्रतिच्छेदन इंगित करता है कि संसाधन आपके हाथों में स्वतंत्र रूप से प्रवाहित होते हैं - धन को जमाखोरी के बजाय अनुभव के लिए एक उपकरण के रूप में देखा जाता है।" }
];

async function updateDb() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");
  
  const PalmistryContent = mongoose.models.PalmistryContent || mongoose.model("PalmistryContent", new mongoose.Schema({
    language: String,
    category: String,
    subCategory: String,
    title: String,
    meaning: String,
  }, { strict: false }));

  for (const item of hiData) {
    await PalmistryContent.updateOne(
      { language: "hi", category: item.cat, subCategory: item.sub },
      { $set: { title: item.title, meaning: item.meaning } },
      { upsert: true }
    );
  }
  
  console.log("Updated biometrics Hindi translations");
  process.exit(0);
}

updateDb().catch(console.error);
