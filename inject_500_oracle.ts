import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://shahtarang20_db_user:Shahtarang2003@cluster0.cdqvn6e.mongodb.net/mystic_oracle?retryWrites=true&w=majority&appName=Cluster0";

const OracleQuestionSchema = new mongoose.Schema({
  language: { type: String, required: true },
  question_id: { type: String, required: true },
  question_text: { type: String, required: true },
});
OracleQuestionSchema.index({ language: 1, question_id: 1 }, { unique: true });
const OracleQuestion = mongoose.models.OracleQuestion || mongoose.model("OracleQuestion", OracleQuestionSchema);

const OracleAnswerSchema = new mongoose.Schema({
  language: { type: String, required: true },
  question_id: { type: String, required: true },
  responses: { type: [String], required: true },
});
OracleAnswerSchema.index({ language: 1, question_id: 1 }, { unique: true });
const OracleAnswer = mongoose.models.OracleAnswer || mongoose.model("OracleAnswer", OracleAnswerSchema);

const langs = ["en", "hi", "gu", "de", "zh"];

const subjects = {
  en: ["my career", "my love life", "my health", "my finances", "my personal growth", "my relationships", "my current goals", "my spiritual journey", "my family life", "my business"],
  hi: ["मेरे करियर", "मेरे प्रेम जीवन", "मेरे स्वास्थ्य", "मेरी आर्थिक स्थिति", "मेरे व्यक्तिगत विकास", "मेरे रिश्तों", "मेरे वर्तमान लक्ष्यों", "मेरी आध्यात्मिक यात्रा", "मेरे पारिवारिक जीवन", "मेरे व्यवसाय"],
  gu: ["મારી કારકિર્દી", "મારા પ્રેમ જીવન", "મારા સ્વાસ્થ્ય", "મારી નાણાકીય સ્થિતિ", "મારા વ્યક્તિગત વિકાસ", "મારા સંબંધો", "મારા વર્તમાન લક્ષ્યો", "મારી આધ્યાત્મિક યાત્રા", "મારા પારિવારિક જીવન", "મારા વ્યવસાય"],
  de: ["meiner Karriere", "meinem Liebesleben", "meiner Gesundheit", "meinen Finanzen", "meinem persönlichen Wachstum", "meinen Beziehungen", "meinen aktuellen Zielen", "meiner spirituellen Reise", "meinem Familienleben", "meinem Geschäft"],
  zh: ["我的事业", "我的爱情生活", "我的健康", "我的财务状况", "我的个人成长", "我的关系", "我当前的目标", "我的精神之旅", "我的家庭生活", "我的生意"]
};

const timeframes = {
  en: ["today", "tomorrow", "this week", "next week", "this month", "next month", "this year", "in the near future", "over the next few days", "unexpectedly soon"],
  hi: ["आज", "कल", "इस सप्ताह", "अगले सप्ताह", "इस महीने", "अगले महीने", "इस वर्ष", "निकट भविष्य में", "अगले कुछ दिनों में", "अप्रत्याशित रूप से जल्द ही"],
  gu: ["આજે", "આવતીકાલે", "આ અઠવાડિયે", "આવતા અઠવાડિયે", "આ મહિને", "આવતા મહિને", "આ વર્ષે", "નજીકના ભવિષ્યમાં", "આગામી થોડા દિવસોમાં", "અણધારી રીતે ટૂંક સમયમાં"],
  de: ["heute", "morgen", "diese Woche", "nächste Woche", "diesen Monat", "nächsten Monat", "dieses Jahr", "in naher Zukunft", "in den nächsten Tagen", "unerwartet bald"],
  zh: ["今天", "明天", "本周", "下周", "本月", "下个月", "今年", "在不久的将来", "在接下来的几天里", "意外地很快"]
};

const templates = {
  en: [
    "What is the future of {subject} {timeframe}?",
    "How can I improve {subject} {timeframe}?",
    "Will I find success in {subject} {timeframe}?",
    "What hidden challenges await {subject} {timeframe}?",
    "What blessings are coming to {subject} {timeframe}?"
  ],
  hi: [
    "{timeframe} {subject} का भविष्य क्या है?",
    "{timeframe} मैं {subject} को कैसे सुधार सकता हूँ?",
    "क्या मुझे {timeframe} {subject} में सफलता मिलेगी?",
    "{timeframe} {subject} में कौन सी छिपी हुई चुनौतियां हैं?",
    "{timeframe} {subject} में कौन सा आशीर्वाद आने वाला है?"
  ],
  gu: [
    "{timeframe} {subject} નું ભવિષ્ય શું છે?",
    "{timeframe} હું {subject} ને કેવી રીતે સુધારી શકું?",
    "શું મને {timeframe} {subject} માં સફળતા મળશે?",
    "{timeframe} {subject} માં કયા છુપાયેલા પડકારો છે?",
    "{timeframe} {subject} માં કયા આશીર્વાદ આવવાના છે?"
  ],
  de: [
    "Was ist die Zukunft von {subject} {timeframe}?",
    "Wie kann ich {subject} {timeframe} verbessern?",
    "Werde ich {timeframe} Erfolg in {subject} finden?",
    "Welche verborgenen Herausforderungen erwarten {subject} {timeframe}?",
    "Welche Segnungen kommen {timeframe} zu {subject}?"
  ],
  zh: [
    "{timeframe}{subject}的未来是什么？",
    "{timeframe}我该如何改善{subject}？",
    "{timeframe}我会在{subject}方面获得成功吗？",
    "{timeframe}{subject}有哪些隐藏的挑战？",
    "{timeframe}{subject}会迎来什么祝福？"
  ]
};

const answers = {
  en: [
    "The stars align in your favor. Proceed with confidence.",
    "Patience is required. The timing is not right yet.",
    "A surprising change will bring exactly what you need.",
    "Trust your intuition; it knows the way.",
    "Obstacles are an illusion. Push forward.",
    "You must let go of the past to embrace this.",
    "Seek advice from a trusted mentor before deciding.",
    "Yes, but it will require hard work and dedication.",
    "The universe is testing your resolve. Stand firm.",
    "A sudden realization will solve this for you.",
    "Do not rush. Let things unfold naturally.",
    "An unexpected person holds the key to this.",
    "Abundance flows toward you now. Accept it.",
    "You already know the answer in your heart.",
    "Focus on balance, and success will follow.",
    "A brief period of confusion will lead to clarity.",
    "Stay positive; your thoughts are manifesting quickly.",
    "Now is the time for bold action.",
    "Rest and recharge before taking the next step.",
    "The outcome will be better than you imagine."
  ],
  hi: [
    "तारे आपके पक्ष में हैं। आत्मविश्वास के साथ आगे बढ़ें।",
    "धैर्य की आवश्यकता है। अभी सही समय नहीं है।",
    "एक आश्चर्यजनक बदलाव वही लाएगा जिसकी आपको आवश्यकता है।",
    "अपने अंतर्ज्ञान पर भरोसा करें; यह रास्ता जानता है।",
    "बाधाएं एक भ्रम हैं। आगे बढ़ें।",
    "इसे अपनाने के लिए आपको अतीत को जाने देना होगा।",
    "निर्णय लेने से पहले किसी विश्वसनीय गुरु से सलाह लें।",
    "हाँ, लेकिन इसके लिए कड़ी मेहनत और समर्पण की आवश्यकता होगी।",
    "ब्रह्मांड आपके संकल्प की परीक्षा ले रहा है। दृढ़ रहें।",
    "एक अचानक अहसास आपके लिए इसे हल कर देगा।",
    "जल्दबाजी न करें। चीजों को स्वाभाविक रूप से सामने आने दें।",
    "एक अप्रत्याशित व्यक्ति के पास इसकी कुंजी है।",
    "प्रचुरता अब आपकी ओर बहती है। इसे स्वीकार करें।",
    "आप पहले से ही अपने दिल में जवाब जानते हैं।",
    "संतुलन पर ध्यान दें, और सफलता मिलेगी।",
    "भ्रम की एक संक्षिप्त अवधि स्पष्टता की ओर ले जाएगी।",
    "सकारात्मक रहें; आपके विचार जल्दी से प्रकट हो रहे हैं।",
    "अब साहसिक कार्रवाई का समय है।",
    "अगला कदम उठाने से पहले आराम करें और रिचार्ज करें।",
    "परिणाम आपकी कल्पना से बेहतर होगा।"
  ],
  gu: [
    "તારાઓ તમારી તરફેણમાં છે. આત્મવિશ્વાસ સાથે આગળ વધો.",
    "ધીરજ જરૂરી છે. હજી યોગ્ય સમય નથી.",
    "આશ્ચર્યજનક ફેરફાર તમને જે જોઈએ છે તે લાવશે.",
    "તમારી અંતર્જ્ઞાન પર વિશ્વાસ કરો; તે રસ્તો જાણે છે.",
    "અવરોધો એક ભ્રમ છે. આગળ વધો.",
    "આને અપનાવવા માટે તમારે ભૂતકાળને જવા દેવો પડશે.",
    "નિર્ણય લેતા પહેલા વિશ્વાસપાત્ર માર્ગદર્શકની સલાહ લો.",
    "હા, પરંતુ તેના માટે સખત મહેનત અને સમર્પણની જરૂર પડશે.",
    "બ્રહ્માંડ તમારા સંકલ્પની કસોટી કરી રહ્યું છે. મક્કમ રહો.",
    "અચાનક અનુભૂતિ તમારા માટે આનો ઉકેલ લાવશે.",
    "ઉતાવળ ન કરો. વસ્તુઓને કુદરતી રીતે બહાર આવવા દો.",
    "અનપેક્ષિત વ્યક્તિ પાસે આની ચાવી છે.",
    "વિપુલતા હવે તમારી તરફ વહી રહી છે. તેનો સ્વીકાર કરો.",
    "તમે તમારા હૃદયમાં પહેલેથી જ જવાબ જાણો છો.",
    "સંતુલન પર ધ્યાન કેન્દ્રિત કરો, અને સફળતા મળશે.",
    "મુંઝવણનો ટૂંકો સમયગાળો સ્પષ્ટતા તરફ દોરી જશે.",
    "સકારાત્મક રહો; તમારા વિચારો ઝડપથી પ્રગટ થઈ રહ્યા છે.",
    "હવે હિંમતવાન પગલાં લેવાનો સમય છે.",
    "આગળનું પગલું ભરતા પહેલા આરામ કરો અને રિચાર્જ કરો.",
    "પરિણામ તમારી કલ્પના કરતા વધુ સારું રહેશે."
  ],
  de: [
    "Die Sterne stehen günstig für Sie. Gehen Sie mit Zuversicht vor.",
    "Geduld ist erforderlich. Der richtige Zeitpunkt ist noch nicht da.",
    "Eine überraschende Änderung wird genau das bringen, was Sie brauchen.",
    "Vertrauen Sie Ihrer Intuition; sie kennt den Weg.",
    "Hindernisse sind eine Illusion. Drängen Sie vorwärts.",
    "Sie müssen die Vergangenheit loslassen, um dies anzunehmen.",
    "Holen Sie Rat bei einem vertrauenswürdigen Mentor ein, bevor Sie entscheiden.",
    "Ja, aber es wird harte Arbeit und Hingabe erfordern.",
    "Das Universum testet Ihre Entschlossenheit. Bleiben Sie standhaft.",
    "Eine plötzliche Erkenntnis wird dies für Sie lösen.",
    "Überstürzen Sie nichts. Lassen Sie die Dinge sich natürlich entwickeln.",
    "Eine unerwartete Person hält den Schlüssel dazu.",
    "Überfluss fließt jetzt zu Ihnen. Akzeptieren Sie ihn.",
    "Sie kennen die Antwort bereits in Ihrem Herzen.",
    "Konzentrieren Sie sich auf das Gleichgewicht, und der Erfolg wird folgen.",
    "Eine kurze Zeit der Verwirrung wird zu Klarheit führen.",
    "Bleiben Sie positiv; Ihre Gedanken manifestieren sich schnell.",
    "Jetzt ist die Zeit für mutiges Handeln.",
    "Ruhen Sie sich aus und tanken Sie neue Energie vor dem nächsten Schritt.",
    "Das Ergebnis wird besser sein, als Sie es sich vorstellen."
  ],
  zh: [
    "星辰对你有利。请充满信心地前进。",
    "需要耐心。时机还未到。",
    "一个令人惊讶的变化将带来你所需要的。",
    "相信你的直觉；它知道该怎么走。",
    "障碍只是幻觉。继续前进。",
    "你必须放下过去，才能拥抱这一切。",
    "在做决定之前，请向你信任的导师寻求建议。",
    "是的，但这需要努力和奉献。",
    "宇宙正在考验你的决心。要坚定。",
    "突然的顿悟会为你解决这个问题。",
    "不要着急。顺其自然。",
    "一个意想不到的人掌握着关键。",
    "财富现在正向你涌来。接受它吧。",
    "你的内心已经知道了答案。",
    "专注于平衡，成功自然会随之而来。",
    "短暂的迷茫将带来清晰。",
    "保持积极；你的想法正在迅速实现。",
    "现在是采取大胆行动的时候了。",
    "在采取下一步之前，先休息和充电。",
    "结果将比你想象的更好。"
  ]
};

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB.");

  let startId = 101; // Starting from 101 to avoid conflicting with existing 1-100 questions

  for (const lang of langs) {
    const langSubjects = subjects[lang as keyof typeof subjects];
    const langTimeframes = timeframes[lang as keyof typeof timeframes];
    const langTemplates = templates[lang as keyof typeof templates];
    const langAnswers = answers[lang as keyof typeof answers];

    let currentId = startId;
    
    for (let t = 0; t < langTemplates.length; t++) {
      for (let s = 0; s < langSubjects.length; s++) {
        for (let tf = 0; tf < langTimeframes.length; tf++) {
          
          let questionText = langTemplates[t]
            .replace("{subject}", langSubjects[s])
            .replace("{timeframe}", langTimeframes[tf]);

          // Save Question
          await OracleQuestion.findOneAndUpdate(
            { language: lang, question_id: currentId.toString() },
            { question_text: questionText },
            { upsert: true, new: true }
          );

          // Save Answers (Use the 20 generic answers for every single question)
          await OracleAnswer.findOneAndUpdate(
            { language: lang, question_id: currentId.toString() },
            { responses: langAnswers },
            { upsert: true, new: true }
          );

          currentId++;
        }
      }
    }
    console.log(`Finished adding 500 questions and 20 answers for language: ${lang}`);
  }

  console.log("SUCCESS! Injected 500 new questions in all 5 languages into MongoDB!");
  process.exit(0);
}

run().catch(console.error);
