import json
import os

cards = [
    {
        "id": 11, "name": "Justice",
        "upright": "Justice, fairness, truth, cause and effect, law.",
        "reversed": "Unfairness, lack of accountability, dishonesty.",
        "desc": "Justice indicates that the fairest decision will be made. You are being called to account for your actions and will be judged accordingly. It is a time for truth and integrity.",
        "hi_name": "न्याय (Justice)", "hi_upright": "न्याय, निष्पक्षता, सत्य, कारण और प्रभाव, कानून।", "hi_reversed": "अनुचितता, जवाबदेही की कमी, बेईमानी।", "hi_desc": "न्याय इंगित करता है कि सबसे निष्पक्ष निर्णय लिया जाएगा। आपको अपने कार्यों के लिए जवाबदेह ठहराया जा रहा है।",
        "de_name": "Die Gerechtigkeit", "de_upright": "Gerechtigkeit, Fairness, Wahrheit, Ursache und Wirkung.", "de_reversed": "Ungerechtigkeit, mangelnde Rechenschaftspflicht, Unehrlichkeit.", "de_desc": "Die Gerechtigkeit zeigt an, dass die fairste Entscheidung getroffen wird. Es ist eine Zeit für Wahrheit und Integrität.",
        "zh_name": "正义", "zh_upright": "正义，公平，真理，因果，法律。", "zh_reversed": "不公平，缺乏责任感，不诚实。", "zh_desc": "正义表明将做出最公平的决定。你将被要求为你的行为负责。这是一个关于真相和正直的时代。"
    },
    {
        "id": 12, "name": "The Hanged Man",
        "upright": "Pause, surrender, letting go, new perspectives.",
        "reversed": "Delays, resistance, stalling, indecision.",
        "desc": "The Hanged Man asks you to suspend action and view the world from a different angle. It represents a necessary pause, a surrender to the current situation to gain profound insight.",
        "hi_name": "फांसी पर लटका हुआ आदमी (The Hanged Man)", "hi_upright": "विराम, समर्पण, जाने देना, नए दृष्टिकोण।", "hi_reversed": "देरी, प्रतिरोध, रुकना, अनिर्णय।", "hi_desc": "यह आपको कार्रवाई को निलंबित करने और दुनिया को एक अलग कोण से देखने के लिए कहता है। यह एक आवश्यक विराम का प्रतिनिधित्व करता है।",
        "de_name": "Der Gehängte", "de_upright": "Pause, Hingabe, Loslassen, neue Perspektiven.", "de_reversed": "Verzögerungen, Widerstand, Blockierung, Unentschlossenheit.", "de_desc": "Der Gehängte fordert Sie auf, die Handlung auszusetzen und die Welt aus einem anderen Blickwinkel zu betrachten.",
        "zh_name": "倒吊人", "zh_upright": "暂停，臣服，放手，新视角。", "zh_reversed": "延误，阻力，拖延，优柔寡断。", "zh_desc": "倒吊人要求你暂停行动，从不同的角度看世界。它代表了必要的停顿，对当前情况的屈服，以获得深刻的见解。"
    },
    {
        "id": 13, "name": "Death",
        "upright": "Endings, change, transformation, transition.",
        "reversed": "Resistance to change, personal transformation, inner purging.",
        "desc": "Death rarely means physical death. Instead, it signifies the end of a major phase or aspect of your life that you realize is no longer serving you, clearing the way for new beginnings.",
        "hi_name": "मृत्यु (Death)", "hi_upright": "अंत, परिवर्तन, रूपांतरण, संक्रमण।", "hi_reversed": "परिवर्तन का प्रतिरोध, व्यक्तिगत परिवर्तन, आंतरिक शुद्धि।", "hi_desc": "मृत्यु का अर्थ शायद ही कभी शारीरिक मृत्यु होता है। इसके बजाय, यह आपके जीवन के एक प्रमुख चरण के अंत का प्रतीक है।",
        "de_name": "Der Tod", "de_upright": "Ende, Veränderung, Transformation, Übergang.", "de_reversed": "Widerstand gegen Veränderungen, innere Reinigung.", "de_desc": "Der Tod bedeutet selten den physischen Tod. Stattdessen bedeutet es das Ende einer wichtigen Phase Ihres Lebens.",
        "zh_name": "死神", "zh_upright": "结束，改变，转变，过渡。", "zh_reversed": "抵制改变，个人转变，内在净化。", "zh_desc": "死亡很少意味着肉体的死亡。相反，它标志着你生命中不再为你服务的一个主要阶段或方面的结束，为新的开始扫清了道路。"
    },
    {
        "id": 14, "name": "Temperance",
        "upright": "Balance, moderation, patience, purpose.",
        "reversed": "Imbalance, excess, self-healing, re-alignment.",
        "desc": "Temperance calls for balance, tranquility, and moderation. You are taking the middle road, avoiding extremes, and calmly synthesizing opposites to create something new and harmonious.",
        "hi_name": "संयम (Temperance)", "hi_upright": "संतुलन, संयम, धैर्य, उद्देश्य।", "hi_reversed": "असंतुलन, अधिकता, स्व-उपचार, पुन: संरेखण।", "hi_desc": "संयम संतुलन, शांति और संयम का आह्वान करता है। आप मध्य मार्ग अपना रहे हैं, चरम सीमाओं से बच रहे हैं।",
        "de_name": "Die Mäßigkeit", "de_upright": "Gleichgewicht, Mäßigung, Geduld, Zweck.", "de_reversed": "Ungleichgewicht, Übermaß, Selbstheilung.", "de_desc": "Die Mäßigkeit fordert Ausgewogenheit, Ruhe und Mäßigung. Sie gehen den goldenen Mittelweg und vermeiden Extreme.",
        "zh_name": "节制", "zh_upright": "平衡，节制，耐心，目的。", "zh_reversed": "不平衡，过度，自我疗愈，重新调整。", "zh_desc": "节制要求平衡、宁静和节制。你正在走中间道路，避免极端，平静地综合对立面以创造和谐的新事物。"
    },
    {
        "id": 15, "name": "The Devil",
        "upright": "Shadow self, attachment, addiction, restriction, sexuality.",
        "reversed": "Releasing limiting beliefs, exploring dark thoughts, detachment.",
        "desc": "The Devil represents feeling trapped, empty, and unfulfilled. It brings to light the hidden forces of negativity, materialism, and harmful habits holding you back from your true potential.",
        "hi_name": "शैतान (The Devil)", "hi_upright": "छाया स्व, लगाव, व्यसन, प्रतिबंध, कामुकता।", "hi_reversed": "सीमित मान्यताओं को जारी करना, अलग होना।", "hi_desc": "शैतान फंसा हुआ, खाली और अधूरा महसूस करने का प्रतिनिधित्व करता है। यह आपको पीछे खींचने वाली नकारात्मकता की छिपी ताकतों को प्रकाश में लाता है।",
        "de_name": "Der Teufel", "de_upright": "Schattenselbst, Anhaftung, Sucht, Einschränkung, Sexualität.", "de_reversed": "Einschränkende Überzeugungen loslassen, Ablösung.", "de_desc": "Der Teufel repräsentiert das Gefühl, gefangen, leer und unerfüllt zu sein. Er bringt die verborgenen Kräfte der Negativität ans Licht.",
        "zh_name": "恶魔", "zh_upright": "阴暗面，依恋，成瘾，限制，性欲。", "zh_reversed": "释放限制性信念，探索黑暗思想，超脱。", "zh_desc": "恶魔代表感到被困住、空虚和未实现。它暴露了阻碍你发挥真正潜力的消极、唯物主义和有害习惯的隐藏力量。"
    },
    {
        "id": 16, "name": "The Tower",
        "upright": "Sudden change, upheaval, chaos, revelation, awakening.",
        "reversed": "Personal transformation, fear of change, averting disaster.",
        "desc": "The Tower strikes to tear down structures built on false foundations. Though painful and disruptive, this sudden upheaval brings radical awakening and necessary clearing for the truth.",
        "hi_name": "टॉवर (The Tower)", "hi_upright": "अचानक परिवर्तन, उथल-पुथल, अराजकता, रहस्योद्घाटन।", "hi_reversed": "व्यक्तिगत परिवर्तन, परिवर्तन का डर, आपदा को टालना।", "hi_desc": "टॉवर झूठी नींव पर बनी संरचनाओं को तोड़ने के लिए हमला करता है। यद्यपि दर्दनाक, यह अचानक उथल-पुथल कट्टरपंथी जागरण लाती है।",
        "de_name": "Der Turm", "de_upright": "Plötzliche Veränderung, Umwälzung, Chaos, Offenbarung.", "de_reversed": "Persönliche Transformation, Angst vor Veränderungen.", "de_desc": "Der Turm schlägt zu, um auf falschen Fundamenten errichtete Strukturen niederzureißen. Diese plötzliche Umwälzung bringt eine radikale innere Leere für die Wahrheit.",
        "zh_name": "高塔", "zh_upright": "突变，动荡，混乱，启示，觉醒。", "zh_reversed": "个人转变，害怕改变，避免灾难。", "zh_desc": "高塔被击中，摧毁了建立在虚假基础上的结构。虽然痛苦和破坏性，但这种突然的动荡带来了彻底的觉醒。"
    },
    {
        "id": 17, "name": "The Star",
        "upright": "Hope, faith, purpose, renewal, spirituality.",
        "reversed": "Lack of faith, despair, self-trust, disconnection.",
        "desc": "The Star follows the destruction of the Tower with renewed hope and faith. It represents a period of peace, spiritual healing, and connection to the divine universe.",
        "hi_name": "तारा (The Star)", "hi_upright": "आशा, विश्वास, उद्देश्य, नवीकरण, आध्यात्मिकता।", "hi_reversed": "विश्वास की कमी, निराशा, आत्म-विश्वास, वियोग।", "hi_desc": "तारा नए सिरे से आशा और विश्वास के साथ टॉवर के विनाश का अनुसरण करता है। यह शांति, आध्यात्मिक उपचार और दिव्य ब्रह्मांड से जुड़ाव की अवधि का प्रतिनिधित्व करता है।",
        "de_name": "Der Stern", "de_upright": "Hoffnung, Glaube, Zweck, Erneuerung, Spiritualität.", "de_reversed": "Mangel an Glauben, Verzweiflung, Selbstvertrauen.", "de_desc": "Der Stern folgt der Zerstörung des Turms mit erneuerter Hoffnung und Glauben. Er repräsentiert eine Zeit des Friedens und der Heilung.",
        "zh_name": "星星", "zh_upright": "希望，信仰，目标，更新，灵性。", "zh_reversed": "缺乏信仰，绝望，自我信任，断开连接。", "zh_desc": "星星在高塔被摧毁后带来了新的希望和信仰。它代表着和平、精神治愈以及与神圣宇宙连接的时期。"
    },
    {
        "id": 18, "name": "The Moon",
        "upright": "Illusion, fear, anxiety, subconscious, intuition.",
        "reversed": "Release of fear, repressed emotion, inner confusion.",
        "desc": "The Moon reveals that things are not as they seem. It speaks to the realm of the subconscious, hidden fears, and deep intuition. You must trust your inner feeling to navigate the darkness.",
        "hi_name": "चंद्रमा (The Moon)", "hi_upright": "भ्रम, भय, चिंता, अवचेतन, अंतर्ज्ञान।", "hi_reversed": "भय की मुक्ति, दमित भावना, आंतरिक भ्रम।", "hi_desc": "चंद्रमा से पता चलता है कि चीजें वैसी नहीं हैं जैसी वे दिखती हैं। यह अवचेतन, छिपे हुए भय और गहरे अंतर्ज्ञान के दायरे से बात करता है।",
        "de_name": "Der Mond", "de_upright": "Illusion, Angst, Sorge, Unterbewusstsein, Intuition.", "de_reversed": "Befreiung von Angst, verdrängte Emotionen.", "de_desc": "Der Mond offenbart, dass die Dinge nicht so sind, wie sie scheinen. Er spricht den Bereich des Unterbewusstseins und verborgener Ängste an.",
        "zh_name": "月亮", "zh_upright": "幻觉，恐惧，焦虑，潜意识，直觉。", "zh_reversed": "释放恐惧，压抑的情绪，内心的困惑。", "zh_desc": "月亮揭示了事情并不像它们看起来的那样。它涉及到潜意识的领域，隐藏的恐惧和深刻的直觉。"
    },
    {
        "id": 19, "name": "The Sun",
        "upright": "Positivity, fun, warmth, success, vitality.",
        "reversed": "Inner child, feeling down, overly optimistic.",
        "desc": "The Sun shines with success, radiance, and abundance. It gives you strength and tells you that no matter where you go, positive energy will follow you and bring joy to your path.",
        "hi_name": "सूर्य (The Sun)", "hi_upright": "सकारात्मकता, मज़ा, गर्मी, सफलता, जीवन शक्ति।", "hi_reversed": "भीतरी बच्चा, उदास महसूस करना, अत्यधिक आशावादी।", "hi_desc": "सूर्य सफलता, चमक और प्रचुरता के साथ चमकता है। यह आपको ताकत देता है और बताता है कि सकारात्मक ऊर्जा आपके मार्ग में खुशी लाएगी।",
        "de_name": "Die Sonne", "de_upright": "Positivität, Spaß, Wärme, Erfolg, Vitalität.", "de_reversed": "Inneres Kind, sich niedergeschlagen fühlen.", "de_desc": "Die Sonne scheint mit Erfolg, Ausstrahlung und Fülle. Sie gibt Ihnen Kraft und positive Energie.",
        "zh_name": "太阳", "zh_upright": "积极，乐趣，温暖，成功，活力。", "zh_reversed": "内心的小孩，感到沮丧，过于乐观。", "zh_desc": "太阳闪耀着成功、光芒和丰富。它给你力量，告诉你无论走到哪里，积极的能量都会跟随着你，给你的道路带来欢乐。"
    },
    {
        "id": 20, "name": "Judgement",
        "upright": "Judgement, rebirth, inner calling, absolution.",
        "reversed": "Self-doubt, inner critic, ignoring the call.",
        "desc": "Judgement calls for you to rise up and embrace a higher level of consciousness. It is a time for self-evaluation, letting go of past grievances, and stepping into your true calling.",
        "hi_name": "निर्णय (Judgement)", "hi_upright": "निर्णय, पुनर्जन्म, आंतरिक बुलाहट, क्षमादान।", "hi_reversed": "आत्म-संदेह, आंतरिक आलोचक, पुकार की अनदेखी।", "hi_desc": "निर्णय आपको ऊपर उठने और चेतना के उच्च स्तर को अपनाने के लिए कहता है। यह आत्म-मूल्यांकन का समय है।",
        "de_name": "Das Gericht", "de_upright": "Urteil, Wiedergeburt, innere Berufung, Absolution.", "de_reversed": "Selbstzweifel, innerer Kritiker.", "de_desc": "Das Gericht fordert Sie auf, sich zu erheben und eine höhere Bewusstseinsebene anzunehmen. Es ist eine Zeit der Selbsteinschätzung.",
        "zh_name": "审判", "zh_upright": "审判，重生，内心的呼唤，赦免。", "zh_reversed": "自我怀疑，内在的批评家，忽视呼唤。", "zh_desc": "审判要求你站起来拥抱更高层次的意识。这是一个自我评估、放下过去的委屈、步入你真正使命的时刻。"
    },
    {
        "id": 21, "name": "The World",
        "upright": "Completion, integration, accomplishment, travel.",
        "reversed": "Seeking personal closure, short-cuts, delays.",
        "desc": "The World signifies completion and harmony. You have come to the end of a long journey, integrating all lessons learned, and are now ready to celebrate your wholeness and step into a new cycle.",
        "hi_name": "दुनिया (The World)", "hi_upright": "पूर्णता, एकीकरण, उपलब्धि, यात्रा।", "hi_reversed": "व्यक्तिगत समापन की तलाश, शॉर्ट-कट, देरी।", "hi_desc": "दुनिया पूर्णता और सद्भाव का प्रतीक है। आप एक लंबी यात्रा के अंत में आ गए हैं, सीखे गए सभी पाठों को एकीकृत कर रहे हैं।",
        "de_name": "Die Welt", "de_upright": "Vollendung, Integration, Leistung, Reise.", "de_reversed": "Suche nach persönlichem Abschluss, Verzögerungen.", "de_desc": "Die Welt bedeutet Vollendung und Harmonie. Sie sind am Ende einer langen Reise angelangt und bereit, in einen neuen Zyklus einzutreten.",
        "zh_name": "世界", "zh_upright": "完成，整合，成就，旅行。", "zh_reversed": "寻求个人封闭，捷径，延误。", "zh_desc": "世界标志着完成与和谐。你已经来到了一段漫长旅程的终点，整合了所有学到的教训，现在准备庆祝你的完整并步入一个新的循环。"
    }
]

langs = ["hi", "de", "zh"]

for lang in langs:
    filepath = f"src/locales/{lang}.json"
    data = {}
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
    
    for c in cards:
        data[f"tarot.name.{c['id']}"] = c[f"{lang}_name"]
        data[f"tarot.upright.{c['id']}"] = c[f"{lang}_upright"]
        data[f"tarot.reversed.{c['id']}"] = c[f"{lang}_reversed"]
        data[f"tarot.desc.{c['id']}"] = c[f"{lang}_desc"]
        
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

print("Batch 2 Tarot descriptions translated!")
