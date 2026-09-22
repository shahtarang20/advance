import json
import os

NEW_TRANS = {
  "en": {
    "biorhythm.result.subtitle": "Your Energy Cycles",
    "biorhythm.result.title": "Biorhythm Chart",
    "biorhythm.result.physical": "Physical",
    "biorhythm.result.physical_desc": "Energy, strength, and endurance.",
    "biorhythm.result.emotional": "Emotional",
    "biorhythm.result.emotional_desc": "Mood, creativity, and sensitivity.",
    "biorhythm.result.intellectual": "Intellectual",
    "biorhythm.result.intellectual_desc": "Logic, memory, and communication.",
    "biorhythm.result.invalid_dob": "Please enter a valid Date of Birth.",
    "biorhythm.result.loading": "Loading..."
  },
  "hi": {
    "biorhythm.result.subtitle": "आपके ऊर्जा चक्र",
    "biorhythm.result.title": "बायोरिदम चार्ट",
    "biorhythm.result.physical": "शारीरिक",
    "biorhythm.result.physical_desc": "ऊर्जा, शक्ति और सहनशक्ति।",
    "biorhythm.result.emotional": "भावनात्मक",
    "biorhythm.result.emotional_desc": "मनोदशा, रचनात्मकता और संवेदनशीलता।",
    "biorhythm.result.intellectual": "बौद्धिक",
    "biorhythm.result.intellectual_desc": "तर्क, स्मृति और संचार।",
    "biorhythm.result.invalid_dob": "कृपया एक वैध जन्म तिथि दर्ज करें।",
    "biorhythm.result.loading": "लोड हो रहा है..."
  },
  "gu": {
    "biorhythm.result.subtitle": "તમારા ઊર્જા ચક્રો",
    "biorhythm.result.title": "બાયોરિધમ ચાર્ટ",
    "biorhythm.result.physical": "શારીરિક",
    "biorhythm.result.physical_desc": "ઊર્જા, શક્તિ અને સહનશક્તિ.",
    "biorhythm.result.emotional": "ભાવનાત્મક",
    "biorhythm.result.emotional_desc": "મૂડ, સર્જનાત્મકતા અને સંવેદનશીલતા.",
    "biorhythm.result.intellectual": "બૌદ્ધિક",
    "biorhythm.result.intellectual_desc": "તર્ક, મેમરી અને સંચાર.",
    "biorhythm.result.invalid_dob": "કૃપા કરીને માન્ય જન્મ તારીખ દાખલ કરો.",
    "biorhythm.result.loading": "લોડ થઈ રહ્યું છે..."
  },
  "de": {
    "biorhythm.result.subtitle": "Deine Energiezyklen",
    "biorhythm.result.title": "Biorhythmus-Diagramm",
    "biorhythm.result.physical": "Körperlich",
    "biorhythm.result.physical_desc": "Energie, Kraft und Ausdauer.",
    "biorhythm.result.emotional": "Emotional",
    "biorhythm.result.emotional_desc": "Stimmung, Kreativität und Sensibilität.",
    "biorhythm.result.intellectual": "Intellektuell",
    "biorhythm.result.intellectual_desc": "Logik, Gedächtnis und Kommunikation.",
    "biorhythm.result.invalid_dob": "Bitte geben Sie ein gültiges Geburtsdatum ein.",
    "biorhythm.result.loading": "Wird geladen..."
  },
  "zh": {
    "biorhythm.result.subtitle": "你的能量周期",
    "biorhythm.result.title": "生物节律图",
    "biorhythm.result.physical": "体力",
    "biorhythm.result.physical_desc": "能量、力量和耐力。",
    "biorhythm.result.emotional": "情绪",
    "biorhythm.result.emotional_desc": "情绪、创造力和敏感度。",
    "biorhythm.result.intellectual": "智力",
    "biorhythm.result.intellectual_desc": "逻辑、记忆和沟通。",
    "biorhythm.result.invalid_dob": "请输入有效的出生日期。",
    "biorhythm.result.loading": "加载中..."
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

print("Result translations injected!")
