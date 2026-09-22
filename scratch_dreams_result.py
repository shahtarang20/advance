import json
import os

NEW_TRANS = {
  "en": {
    "dreams.result.invalid": "Please enter a dream to analyze.",
    "dreams.result.subtitle": "Universe's Message",
    "dreams.result.title": "Dream Interpretation",
    "dreams.result.none_detected": "No major universal symbols detected in this dream.",
    "dreams.result.none_desc": "Sometimes dreams are simply our brain processing the day's events.",
    "dreams.result.analyze_another": "Analyze Another Dream"
  },
  "hi": {
    "dreams.result.invalid": "कृपया विश्लेषण करने के लिए एक सपना दर्ज करें।",
    "dreams.result.subtitle": "ब्रह्मांड का संदेश",
    "dreams.result.title": "स्वप्न की व्याख्या",
    "dreams.result.none_detected": "इस सपने में कोई प्रमुख सार्वभौमिक प्रतीक नहीं मिला।",
    "dreams.result.none_desc": "कभी-कभी सपने सिर्फ हमारे दिमाग द्वारा दिन की घटनाओं को संसाधित करना होते हैं।",
    "dreams.result.analyze_another": "एक और सपने का विश्लेषण करें"
  },
  "gu": {
    "dreams.result.invalid": "કૃપા કરીને વિશ્લેષણ કરવા માટે એક સ્વપ્ન દાખલ કરો.",
    "dreams.result.subtitle": "બ્રહ્માંડનો સંદેશ",
    "dreams.result.title": "સ્વપ્ન અર્થઘટન",
    "dreams.result.none_detected": "આ સ્વપ્નમાં કોઈ મુખ્ય સાર્વત્રિક પ્રતીકો મળ્યા નથી.",
    "dreams.result.none_desc": "ક્યારેક સપના એ આપણા મગજ દ્વારા દિવસની ઘટનાઓ પર પ્રક્રિયા કરવાનું જ હોય છે.",
    "dreams.result.analyze_another": "બીજા સ્વપ્નનું વિશ્લેષણ કરો"
  },
  "de": {
    "dreams.result.invalid": "Bitte geben Sie einen Traum zur Analyse ein.",
    "dreams.result.subtitle": "Botschaft des Universums",
    "dreams.result.title": "Traumdeutung",
    "dreams.result.none_detected": "In diesem Traum wurden keine wichtigen universellen Symbole erkannt.",
    "dreams.result.none_desc": "Manchmal verarbeitet unser Gehirn im Traum einfach die Ereignisse des Tages.",
    "dreams.result.analyze_another": "Einen anderen Traum analysieren"
  },
  "zh": {
    "dreams.result.invalid": "请输入要分析的梦境。",
    "dreams.result.subtitle": "宇宙的信息",
    "dreams.result.title": "梦境解析",
    "dreams.result.none_detected": "在这个梦中没有检测到主要的普遍象征。",
    "dreams.result.none_desc": "有时梦只是我们的大脑在处理当天的事件。",
    "dreams.result.analyze_another": "分析另一个梦"
  }
}

for lang, trans in NEW_TRANS.items():
    filepath = f"src/locales/{lang}.json"
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
        data.update(trans)
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

print("Dreams Result translations injected!")
