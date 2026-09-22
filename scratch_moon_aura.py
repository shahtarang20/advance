import json
import os

NEW_TRANS = {
  "en": {
    "nav.aura": "Aura",
    "aura.page.title": "Aura Color & Chakras",
    "aura.page.desc": "Discover your primary Aura Color and Chakra alignment based on your birth date.",
    "aura.tool.dob": "Date of Birth",
    "aura.tool.reveal": "Reveal My Aura",
    "moon.label": "Current Moon Phase",
    "moon.tip.label": "Manifestation Tip",
    "moon.phase.new": "New Moon",
    "moon.phase.waxing_crescent": "Waxing Crescent",
    "moon.phase.first_quarter": "First Quarter",
    "moon.phase.waxing_gibbous": "Waxing Gibbous",
    "moon.phase.full": "Full Moon",
    "moon.phase.waning_gibbous": "Waning Gibbous",
    "moon.phase.last_quarter": "Last Quarter",
    "moon.phase.waning_crescent": "Waning Crescent"
  },
  "hi": {
    "nav.aura": "आभा",
    "aura.page.title": "आभा का रंग और चक्र",
    "aura.page.desc": "अपनी जन्म तिथि के आधार पर अपनी प्राथमिक आभा का रंग और चक्र संरेखण खोजें।",
    "aura.tool.dob": "जन्म की तारीख",
    "aura.tool.reveal": "मेरी आभा प्रकट करें",
    "moon.label": "वर्तमान चंद्र चरण",
    "moon.tip.label": "प्रकटीकरण टिप",
    "moon.phase.new": "नया चाँद",
    "moon.phase.waxing_crescent": "बढ़ता हुआ वर्धमान",
    "moon.phase.first_quarter": "पहली तिमाही",
    "moon.phase.waxing_gibbous": "बढ़ता हुआ गिबस",
    "moon.phase.full": "पूर्णिमा",
    "moon.phase.waning_gibbous": "घटता हुआ गिबस",
    "moon.phase.last_quarter": "अंतिम तिमाही",
    "moon.phase.waning_crescent": "घटता हुआ वर्धमान"
  },
  "de": {
    "nav.aura": "Aura",
    "aura.page.title": "Aura-Farbe & Chakren",
    "aura.page.desc": "Entdecken Sie Ihre primäre Aura-Farbe und Chakra-Ausrichtung basierend auf Ihrem Geburtsdatum.",
    "aura.tool.dob": "Geburtsdatum",
    "aura.tool.reveal": "Meine Aura enthüllen",
    "moon.label": "Aktuelle Mondphase",
    "moon.tip.label": "Manifestations-Tipp",
    "moon.phase.new": "Neumond",
    "moon.phase.waxing_crescent": "Zunehmende Sichel",
    "moon.phase.first_quarter": "Erstes Viertel",
    "moon.phase.waxing_gibbous": "Zunehmender Mond",
    "moon.phase.full": "Vollmond",
    "moon.phase.waning_gibbous": "Abnehmender Mond",
    "moon.phase.last_quarter": "Letztes Viertel",
    "moon.phase.waning_crescent": "Abnehmende Sichel"
  },
  "zh": {
    "nav.aura": "灵气",
    "aura.page.title": "灵气颜色与脉轮",
    "aura.page.desc": "根据你的出生日期发现你的主要灵气颜色和脉轮对齐。",
    "aura.tool.dob": "出生日期",
    "aura.tool.reveal": "揭示我的灵气",
    "moon.label": "当前月相",
    "moon.tip.label": "显化技巧",
    "moon.phase.new": "新月",
    "moon.phase.waxing_crescent": "蛾眉月",
    "moon.phase.first_quarter": "上弦月",
    "moon.phase.waxing_gibbous": "盈凸月",
    "moon.phase.full": "满月",
    "moon.phase.waning_gibbous": "亏凸月",
    "moon.phase.last_quarter": "下弦月",
    "moon.phase.waning_crescent": "残月"
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

print("Aura & Moon translations injected!")
