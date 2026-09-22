import json
import os

NEW_TRANS = {
  "en": {
    "nav.biorhythm": "Biorhythm",
    "nav.dreams": "Dreams",
    "biorhythm.page.title": "Biorhythm Energy Chart",
    "biorhythm.page.desc": "Discover your Physical, Emotional, and Intellectual cycles based on the exact days since your birth.",
    "biorhythm.tool.dob": "Date of Birth",
    "biorhythm.tool.reveal": "Calculate My Biorhythms",
    "dreams.page.title": "Dream Symbolism Analyzer",
    "dreams.page.desc": "Type out your dream in as much detail as possible. The universe speaks in symbols—let's decipher what it's trying to tell you.",
    "dreams.tool.label": "Your Dream",
    "dreams.tool.placeholder": "I was flying over a vast ocean, but then...",
    "dreams.tool.reveal": "Analyze My Dream"
  },
  "hi": {
    "nav.biorhythm": "बायोरिदम",
    "nav.dreams": "सपना",
    "biorhythm.page.title": "बायोरिदम ऊर्जा चार्ट",
    "biorhythm.page.desc": "अपने जन्म के सटीक दिनों के आधार पर अपने शारीरिक, भावनात्मक और बौद्धिक चक्रों की खोज करें।",
    "biorhythm.tool.dob": "जन्म की तारीख",
    "biorhythm.tool.reveal": "मेरी बायोरिदम की गणना करें",
    "dreams.page.title": "स्वप्न प्रतीकवाद विश्लेषक",
    "dreams.page.desc": "अपने सपने को विस्तार से टाइप करें। ब्रह्मांड प्रतीकों में बोलता है - आइए समझें कि यह आपको क्या बताने की कोशिश कर रहा है।",
    "dreams.tool.label": "आपका सपना",
    "dreams.tool.placeholder": "मैं एक विशाल महासागर के ऊपर उड़ रहा था, लेकिन फिर...",
    "dreams.tool.reveal": "मेरे सपने का विश्लेषण करें"
  },
  "de": {
    "nav.biorhythm": "Biorhythmus",
    "nav.dreams": "Träume",
    "biorhythm.page.title": "Biorhythmus Energie-Diagramm",
    "biorhythm.page.desc": "Entdecken Sie Ihre physischen, emotionalen und intellektuellen Zyklen.",
    "biorhythm.tool.dob": "Geburtsdatum",
    "biorhythm.tool.reveal": "Meinen Biorhythmus berechnen",
    "dreams.page.title": "Traum-Symbolik Analysator",
    "dreams.page.desc": "Tippen Sie Ihren Traum so detailliert wie möglich ein.",
    "dreams.tool.label": "Dein Traum",
    "dreams.tool.placeholder": "Ich flog über einen weiten Ozean, aber dann...",
    "dreams.tool.reveal": "Meinen Traum analysieren"
  },
  "zh": {
    "nav.biorhythm": "生物节律",
    "nav.dreams": "梦境",
    "biorhythm.page.title": "生物节律能量图",
    "biorhythm.page.desc": "根据您出生的确切天数，发现您的身体、情感和智力周期。",
    "biorhythm.tool.dob": "出生日期",
    "biorhythm.tool.reveal": "计算我的生物节律",
    "dreams.page.title": "梦境象征分析仪",
    "dreams.page.desc": "尽可能详细地打出你的梦。宇宙用符号说话——让我们破译它想告诉你什么。",
    "dreams.tool.label": "你的梦",
    "dreams.tool.placeholder": "我在浩瀚的海洋上空飞翔，但是后来...",
    "dreams.tool.reveal": "分析我的梦"
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

print("Translations for Biorhythm and Dreams injected!")
