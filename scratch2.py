import json
import os

DESC = {
  "maturity": {
    "1": {"hi": "परिपक्वता नेतृत्व लाती है।", "de": "Reife bringt Führung.", "zh": "成熟带来领导力。"},
    "2": {"hi": "परिपक्वता साझेदारी लाती है।", "de": "Reife bringt Partnerschaft.", "zh": "成熟带来伙伴关系。"},
    "3": {"hi": "परिपक्वता अभिव्यक्ति लाती है।", "de": "Reife bringt Ausdruck.", "zh": "成熟带来表达能力。"},
    "4": {"hi": "परिपक्वता संरचना लाती है।", "de": "Reife bringt Struktur.", "zh": "成熟带来结构。"},
    "5": {"hi": "परिपक्वता स्वतंत्रता लाती है।", "de": "Reife bringt Freiheit.", "zh": "成熟带来自由。"},
    "6": {"hi": "परिपक्वता जिम्मेदारी लाती है।", "de": "Reife bringt Verantwortung.", "zh": "成熟带来责任感。"},
    "7": {"hi": "परिपक्वता ज्ञान लाती है।", "de": "Reife bringt Weisheit.", "zh": "成熟带来智慧。"},
    "8": {"hi": "परिपक्वता शक्ति लाती है।", "de": "Reife bringt Macht.", "zh": "成熟带来力量。"},
    "9": {"hi": "परिपक्वता करुणा लाती है।", "de": "Reife bringt Mitgefühl.", "zh": "成熟带来同情心。"},
    "11": {"hi": "परिपक्वता आध्यात्मिक स्पष्टता लाती है।", "de": "Reife bringt spirituelle Klarheit.", "zh": "成熟带来精神上的清晰。"},
    "22": {"hi": "परिपक्वता बड़ी परियोजनाओं को पूरा करने की क्षमता लाती है।", "de": "Reife bringt die Fähigkeit, große Projekte abzuschließen.", "zh": "成熟带来完成大项目的能力。"},
    "33": {"hi": "परिपक्वता दूसरों का मार्गदर्शन करने का खिंचाव लाती है।", "de": "Reife bringt den Drang, andere zu führen.", "zh": "成熟带来指导他人的动力。"}
  },
  "personalYear": {
    "1": {"hi": "नई शुरुआत का वर्ष।", "de": "Jahr des Neuanfangs.", "zh": "重新开始的一年。"},
    "2": {"hi": "साझेदारी का वर्ष।", "de": "Jahr der Partnerschaft.", "zh": "合作的一年。"},
    "3": {"hi": "रचनात्मकता का वर्ष।", "de": "Jahr der Kreativität.", "zh": "充满创造力的一年。"},
    "4": {"hi": "कड़ी मेहनत का वर्ष।", "de": "Jahr der harten Arbeit.", "zh": "努力工作的一年。"},
    "5": {"hi": "परिवर्तन का वर्ष।", "de": "Jahr der Veränderung.", "zh": "改变的一年。"},
    "6": {"hi": "परिवार का वर्ष।", "de": "Jahr der Familie.", "zh": "家庭的一年。"},
    "7": {"hi": "आत्मनिरीक्षण का वर्ष।", "de": "Jahr der Selbstbeobachtung.", "zh": "内省的一年。"},
    "8": {"hi": "उपलब्धि का वर्ष।", "de": "Jahr des Erfolgs.", "zh": "成就的一年。"},
    "9": {"hi": "समापन का वर्ष।", "de": "Jahr des Abschlusses.", "zh": "结束的一年。"},
    "11": {"hi": "अंतर्ज्ञान का वर्ष।", "de": "Jahr der Intuition.", "zh": "直觉的一年。"},
    "22": {"hi": "निर्माण का वर्ष।", "de": "Jahr des Aufbaus.", "zh": "建设的一年。"},
    "33": {"hi": "सेवा का वर्ष।", "de": "Jahr des Dienstes.", "zh": "服务的一年。"}
  },
  "personalMonth": {
    "1": {"hi": "नई शुरुआत का महीना।", "de": "Monat des Neuanfangs.", "zh": "重新开始的月份。"},
    "2": {"hi": "साझेदारी का महीना।", "de": "Monat der Partnerschaft.", "zh": "合作的月份。"},
    "3": {"hi": "रचनात्मकता का महीना।", "de": "Monat der Kreativität.", "zh": "充满创造力的月份。"},
    "4": {"hi": "कड़ी मेहनत का महीना।", "de": "Monat der harten Arbeit.", "zh": "努力工作的月份。"},
    "5": {"hi": "परिवर्तन का महीना।", "de": "Monat der Veränderung.", "zh": "改变的月份。"},
    "6": {"hi": "परिवार का महीना।", "de": "Monat der Familie.", "zh": "家庭的月份。"},
    "7": {"hi": "आत्मनिरीक्षण का महीना।", "de": "Monat der Selbstbeobachtung.", "zh": "内省的月份。"},
    "8": {"hi": "उपलब्धि का महीना।", "de": "Monat des Erfolgs.", "zh": "成就的月份。"},
    "9": {"hi": "समापन का महीना।", "de": "Monat des Abschlusses.", "zh": "结束的月份。"},
    "11": {"hi": "अंतर्ज्ञान का महीना।", "de": "Monat der Intuition.", "zh": "直觉的月份。"},
    "22": {"hi": "निर्माण का महीना।", "de": "Monat des Aufbaus.", "zh": "建设的月份。"},
    "33": {"hi": "सेवा का महीना।", "de": "Monat des Dienstes.", "zh": "服务的月份。"}
  },
  "personalDay": {
    "1": {"hi": "नई शुरुआत का दिन।", "de": "Tag des Neuanfangs.", "zh": "重新开始的一天。"},
    "2": {"hi": "साझेदारी का दिन।", "de": "Tag der Partnerschaft.", "zh": "合作的一天。"},
    "3": {"hi": "रचनात्मकता का दिन।", "de": "Tag der Kreativität.", "zh": "充满创造力的一天。"},
    "4": {"hi": "कड़ी मेहनत का दिन।", "de": "Tag der harten Arbeit.", "zh": "努力工作的一天。"},
    "5": {"hi": "परिवर्तन का दिन।", "de": "Tag der Veränderung.", "zh": "改变的一天。"},
    "6": {"hi": "परिवार का दिन।", "de": "Tag der Familie.", "zh": "家庭的一天。"},
    "7": {"hi": "आत्मनिरीक्षण का दिन।", "de": "Tag der Selbstbeobachtung.", "zh": "内省的一天。"},
    "8": {"hi": "उपलब्धि का दिन।", "de": "Tag des Erfolgs.", "zh": "成就的一天。"},
    "9": {"hi": "समापन का दिन।", "de": "Tag des Abschlusses.", "zh": "结束的一天。"},
    "11": {"hi": "अंतर्ज्ञान का दिन।", "de": "Tag der Intuition.", "zh": "直觉的一天。"},
    "22": {"hi": "निर्माण का दिन।", "de": "Tag des Aufbaus.", "zh": "建设的一天。"},
    "33": {"hi": "सेवा का दिन।", "de": "Tag des Dienstes.", "zh": "服务的一天。"}
  },
  "hiddenPassion": {
    "1": {"hi": "नेतृत्व का छिपा जुनून।", "de": "Verborgene Leidenschaft für Führung.", "zh": "对领导的隐藏热情。"},
    "2": {"hi": "कूटनीति का छिपा जुनून।", "de": "Verborgene Leidenschaft für Diplomatie.", "zh": "对外交的隐藏热情。"},
    "3": {"hi": "रचनात्मकता का छिपा जुनून।", "de": "Verborgene Leidenschaft für Kreativität.", "zh": "对创造力的隐藏热情。"},
    "4": {"hi": "संरचना का छिपा जुनून।", "de": "Verborgene Leidenschaft für Struktur.", "zh": "对结构的隐藏热情。"},
    "5": {"hi": "स्वतंत्रता का छिपा जुनून।", "de": "Verborgene Leidenschaft für Freiheit.", "zh": "对自由的隐藏热情。"},
    "6": {"hi": "देखभाल का छिपा जुनून।", "de": "Verborgene Leidenschaft für Fürsorge.", "zh": "对关怀的隐藏热情。"},
    "7": {"hi": "विश्लेषण का छिपा जुनून।", "de": "Verborgene Leidenschaft für Analyse.", "zh": "对分析的隐藏热情。"},
    "8": {"hi": "शक्ति का छिपा जुनून।", "de": "Verborgene Leidenschaft für Macht.", "zh": "对权力的隐藏热情。"},
    "9": {"hi": "करुणा का छिपा जुनून।", "de": "Verborgene Leidenschaft für Mitgefühl.", "zh": "对同情心的隐藏热情。"}
  },
  "balance": {
    "1": {"hi": "स्वतंत्रता में संतुलन खोजें।", "de": "Finden Sie Balance in der Unabhängigkeit.", "zh": "在独立中找到平衡。"},
    "2": {"hi": "साझेदारी में संतुलन खोजें।", "de": "Finden Sie Balance in der Partnerschaft.", "zh": "在伙伴关系中找到平衡。"},
    "3": {"hi": "अभिव्यक्ति में संतुलन खोजें।", "de": "Finden Sie Balance im Ausdruck.", "zh": "在表达中找到平衡。"},
    "4": {"hi": "दिनचर्या में संतुलन खोजें।", "de": "Finden Sie Balance in der Routine.", "zh": "在日常中找到平衡。"},
    "5": {"hi": "परिवर्तन में संतुलन खोजें।", "de": "Finden Sie Balance in der Veränderung.", "zh": "在变化中找到平衡。"},
    "6": {"hi": "देखभाल में संतुलन खोजें।", "de": "Finden Sie Balance in der Fürsorge.", "zh": "在关怀中找到平衡。"},
    "7": {"hi": "एकांत में संतुलन खोजें।", "de": "Finden Sie Balance in der Einsamkeit.", "zh": "在独处中找到平衡。"},
    "8": {"hi": "कार्रवाई में संतुलन खोजें।", "de": "Finden Sie Balance in der Aktion.", "zh": "在行动中找到平衡。"},
    "9": {"hi": "व्यापक दृष्टिकोण में संतुलन खोजें।", "de": "Finden Sie Balance in einer breiteren Perspektive.", "zh": "在更广阔的视角中找到平衡。"}
  },
  "rationalThought": {
    "1": {"hi": "सीधी और निर्णायक सोच।", "de": "Direktes und entscheidungsfreudiges Denken.", "zh": "直接果断的思维。"},
    "2": {"hi": "विचारशील सोच।", "de": "Rücksichtsvolles Denken.", "zh": "周到的思维。"},
    "3": {"hi": "रचनात्मक सोच।", "de": "Kreatives Denken.", "zh": "创造性思维。"},
    "4": {"hi": "पद्धतिगत सोच।", "de": "Methodisches Denken.", "zh": "有条理的思维。"},
    "5": {"hi": "त्वरित सोच।", "de": "Schnelles Denken.", "zh": "敏捷的思维。"},
    "6": {"hi": "जिम्मेदार सोच।", "de": "Verantwortungsbewusstes Denken.", "zh": "负责任的思维。"},
    "7": {"hi": "विश्लेषणात्मक सोच।", "de": "Analytisches Denken.", "zh": "分析性思维。"},
    "8": {"hi": "व्यावहारिक सोच।", "de": "Praktisches Denken.", "zh": "务实的思维。"},
    "9": {"hi": "मानवीय सोच।", "de": "Humanitäres Denken.", "zh": "人道主义的思维。"}
  }
}

langs = ["hi", "de", "zh"]

for lang in langs:
    filepath = f"src/locales/{lang}.json"
    data = {}
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
    
    for cat, numbers in DESC.items():
        for num, trans in numbers.items():
            data[f"num.desc.{cat}.{num}"] = trans.get(lang, "")
        
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

print("Second batch of numerology dictionaries updated successfully!")
