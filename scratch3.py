import json
import os

DESC = {
  "destiny": {
    "1": {"hi": "आपका भाग्य नेतृत्व करना है।", "de": "Ihr Schicksal ist es, zu führen.", "zh": "你的命运是领导。"},
    "2": {"hi": "आपका भाग्य लोगों को एक साथ लाना है।", "de": "Sie sind dazu bestimmt, Menschen zusammenzubringen.", "zh": "你注定要将人们聚集在一起。"},
    "3": {"hi": "आत्म-अभिव्यक्ति आपके जीवन का काम है।", "de": "Selbstausdruck ist Ihr Lebenswerk.", "zh": "自我表达是你一生的工作。"},
    "4": {"hi": "आपका भाग्य कुछ ठोस बनाने का है।", "de": "Sie sind dazu bestimmt, etwas Solides aufzubauen.", "zh": "你注定要建立一些坚实的东西。"},
    "5": {"hi": "आपका उद्देश्य स्वतंत्रता और अनुभव से जुड़ा है।", "de": "Ihr Zweck ist mit Freiheit und Erfahrung verbunden.", "zh": "你的目标与自由和体验有关。"},
    "6": {"hi": "आपका भाग्य देखभाल करने से जुड़ा है।", "de": "Sie sind für die Fürsorge auf einer bedeutsamen Ebene bestimmt.", "zh": "你注定要在有意义的规模上照顾他人。"},
    "7": {"hi": "आपके भाग्य में गहराई शामिल है - शोध, आध्यात्मिकता या किसी ऐसे कौशल में महारत जिसे ज्यादातर लोग समझना नहीं चाहते।", "de": "Ihr Schicksal beinhaltet Tiefe.", "zh": "你的命运涉及深度。"},
    "8": {"hi": "आपका भाग्य भौतिक दुनिया में सफलता पाना है।", "de": "Sie sind für Erfolge in der materiellen Welt bestimmt.", "zh": "你注定要在物质世界上取得成就。"},
    "9": {"hi": "आपकी नियति व्यापक स्तर पर सेवा करना है।", "de": "Ihr Schicksal ist Dienst auf breiter Ebene.", "zh": "你的命运是广泛的服务。"},
    "11": {"hi": "आपका भाग्य रोशन करना है।", "de": "Ihr Schicksal ist es, zu erleuchten.", "zh": "你的命运是启发。"},
    "22": {"hi": "आपका भाग्य बड़े पैमाने पर निर्माण करना है।", "de": "Sie sind dazu bestimmt, im großen Maßstab aufzubauen.", "zh": "你注定要大规模建设。"},
    "33": {"hi": "आपका भाग्य दूसरों का उत्थान करना है।", "de": "Ihr Schicksal ist es, durch mitfühlende Führung zu heilen.", "zh": "你的命运是治愈和提升他人。"}
  },
  "soulUrge": {
    "1": {"hi": "आप स्वतंत्रता और नेतृत्व की लालसा रखते हैं।", "de": "Tief im Inneren sehnen Sie sich nach Unabhängigkeit.", "zh": "在内心深处，你渴望独立。"},
    "2": {"hi": "आप साझेदारी और सद्भाव चाहते हैं।", "de": "Was Ihr Herz wirklich will, ist Nähe.", "zh": "你真正想要的是亲密。"},
    "3": {"hi": "आपकी आत्मा खुशी और रचनात्मकता चाहती है।", "de": "Ihre Seele sehnt sich nach Freude und Ausdruck.", "zh": "你的灵魂渴望快乐和表达。"},
    "4": {"hi": "आप स्थिरता और व्यवस्था की लालसा रखते हैं।", "de": "Tief im Inneren sehnen Sie sich nach Stabilität.", "zh": "在内心深处，你渴望稳定。"},
    "5": {"hi": "आप स्वतंत्रता और विविधता चाहते हैं।", "de": "Ihr Herz sehnt sich vor allem nach Freiheit.", "zh": "你的心渴望自由和多样性。"},
    "6": {"hi": "आप गहराई से प्यार करना और प्यार पाना चाहते हैं।", "de": "Was Sie am meisten wollen, ist zu lieben.", "zh": "你最想要的是爱和被爱。"},
    "7": {"hi": "आप सच्चाई और गहराई की लालसा रखते हैं।", "de": "Ihre innere Welt sehnt sich nach Wahrheit.", "zh": "你的内心世界渴望真理。"},
    "8": {"hi": "आप मान्यता और शक्ति चाहते हैं।", "de": "Tief im Inneren sehnen Sie sich nach Anerkennung.", "zh": "在内心深处，你渴望认可。"},
    "9": {"hi": "आप बड़े पैमाने पर अर्थ चाहते हैं।", "de": "Ihre Seele sehnt sich nach Bedeutung.", "zh": "你的灵魂渴望意义。"},
    "11": {"hi": "आप आध्यात्मिक संबंध चाहते हैं।", "de": "Ihr Herz sehnt sich nach spiritueller Verbindung.", "zh": "你的心渴望精神联系。"},
    "22": {"hi": "आप कुछ बड़ा बनाने की लालसा रखते हैं।", "de": "Tief im Inneren sehnen Sie sich nach der Chance, etwas Großes aufzubauen.", "zh": "在内心深处，你渴望建立巨大的东西。"},
    "33": {"hi": "आप प्रेम और करुणा फैलाना चाहते हैं।", "de": "Ihre Seele sehnt sich nach der Chance zu lieben und zu heilen.", "zh": "你的灵魂渴望治愈和爱。"}
  },
  "personality": {
    "1": {"hi": "लोग आपको आत्मविश्वासी देखते हैं।", "de": "Andere sehen Sie als selbstbewusst.", "zh": "别人认为你自信。"},
    "2": {"hi": "आप स्नेही और बात करने में आसान लगते हैं।", "de": "Sie wirken warm und zugänglich.", "zh": "你给人一种温暖的感觉。"},
    "3": {"hi": "आप मजेदार और आकर्षक लगते हैं।", "de": "Sie werden als lustig und ausdrucksstark wahrgenommen.", "zh": "你被认为是有趣的。"},
    "4": {"hi": "लोग आपको भरोसेमंद देखते हैं।", "de": "Menschen sehen Sie als zuverlässig.", "zh": "人们认为你很可靠。"},
    "5": {"hi": "आप साहसी लगते हैं।", "de": "Sie wirken abenteuerlustig.", "zh": "你显得很有冒险精神。"},
    "6": {"hi": "लोग आपको देखभाल करने वाला देखते हैं।", "de": "Andere nehmen Sie als fürsorglich wahr.", "zh": "别人认为你很体贴。"},
    "7": {"hi": "आप विचारशील और रहस्यमय लगते हैं।", "de": "Menschen sehen Sie als nachdenklich.", "zh": "人们认为你很深思熟虑。"},
    "8": {"hi": "आप शक्तिशाली लगते हैं।", "de": "Sie werden als mächtig wahrgenommen.", "zh": "你被认为很强大。"},
    "9": {"hi": "लोग आपको दयालु देखते हैं।", "de": "Andere sehen Sie als mitfühlend.", "zh": "别人认为你很有同情心。"},
    "11": {"hi": "आप आध्यात्मिक और गहरे लगते हैं।", "de": "Menschen spüren etwas intuitives an Ihnen.", "zh": "人们感觉你很有直觉。"},
    "22": {"hi": "आप बहुत सक्षम लगते हैं।", "de": "Sie wirken bemerkenswert fähig.", "zh": "你给人非常有能力的印象。"},
    "33": {"hi": "लोग आपको एक मार्गदर्शक देखते हैं।", "de": "Menschen nehmen Sie als zutiefst fürsorglich wahr.", "zh": "人们认为你是一个天生的引导者。"}
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

print("Remaining Destiny, SoulUrge, and Personality descriptions added!")
