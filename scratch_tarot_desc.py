import json
import os

cards = [
    {
        "id": 0, "name": "The Fool", 
        "upright": "New beginnings, innocence, spontaneity, a free spirit.",
        "reversed": "Recklessness, risk-taking, holding back.",
        "desc": "The Fool represents new beginnings, having faith in the future, being inexperienced, not knowing what to expect, having beginner's luck, improvisation and believing in the universe. It is the card of unlimited potential.",
        "hi_name": "मूर्ख (The Fool)", "hi_upright": "नई शुरुआत, मासूमियत, सहजता, एक स्वतंत्र आत्मा।", "hi_reversed": "लापरवाही, जोखिम लेना, पीछे हटना।", "hi_desc": "यह नई शुरुआत, भविष्य में विश्वास रखने, अनुभवहीन होने, ब्रह्मांड पर विश्वास करने का प्रतिनिधित्व करता है। यह असीमित क्षमता का कार्ड है।",
        "de_name": "Der Narr", "de_upright": "Neuanfänge, Unschuld, Spontaneität, ein freier Geist.", "de_reversed": "Rücksichtslosigkeit, Risikobereitschaft, Zurückhaltung.", "de_desc": "Der Narr steht für Neuanfänge, Vertrauen in die Zukunft, Unerfahrenheit, Anfängerglück und den Glauben an das Universum. Er ist die Karte des unbegrenzten Potenzials.",
        "zh_name": "愚者", "zh_upright": "新的开始，天真，自发性，自由的精神。", "zh_reversed": "鲁莽，冒险，退缩。", "zh_desc": "愚者代表着新的开始，对未来充满信心，缺乏经验，不知道会有什么期待，拥有初学者的运气，即兴发挥并相信宇宙。它是无限潜力的牌。"
    },
    {
        "id": 1, "name": "The Magician",
        "upright": "Manifestation, resourcefulness, power, inspired action.",
        "reversed": "Manipulation, poor planning, untapped talents.",
        "desc": "The Magician brings the tools, resources, and energy you need to make your dreams come true. You possess the spiritual, physical, mental, and emotional power to manifest your desires.",
        "hi_name": "जादूगर (The Magician)", "hi_upright": "प्रकटीकरण, साधन संपन्नता, शक्ति, प्रेरित कार्रवाई।", "hi_reversed": "हेरफेर, खराब योजना, अप्रयुक्त प्रतिभा।", "hi_desc": "जादूगर आपके सपनों को सच करने के लिए आवश्यक उपकरण और ऊर्जा लाता है। आपके पास अपनी इच्छाओं को प्रकट करने की आध्यात्मिक, शारीरिक, मानसिक और भावनात्मक शक्ति है।",
        "de_name": "Der Magier", "de_upright": "Manifestation, Einfallsreichtum, Macht, inspiriertes Handeln.", "de_reversed": "Manipulation, schlechte Planung, ungenutzte Talente.", "de_desc": "Der Magier bringt die Werkzeuge, Ressourcen und Energie, die Sie brauchen, um Ihre Träume wahr werden zu lassen. Sie besitzen die Kraft, Ihre Wünsche zu manifestieren.",
        "zh_name": "魔术师", "zh_upright": "显化，足智多谋，力量，灵感行动。", "zh_reversed": "操纵，计划不周，未开发的才能。", "zh_desc": "魔术师带来实现梦想所需的工具、资源和能量。你拥有在精神、身体、思想和情感上显化欲望的力量。"
    },
    {
        "id": 2, "name": "The High Priestess",
        "upright": "Intuition, sacred knowledge, divine feminine, the subconscious mind.",
        "reversed": "Secrets, disconnected from intuition, withdrawal and silence.",
        "desc": "The High Priestess sits at the gate before the great Mystery, indicating that it is time to retreat and reflect upon your inner world. Trust your intuition over your intellect.",
        "hi_name": "प्रधान याजिका (The High Priestess)", "hi_upright": "अंतर्ज्ञान, पवित्र ज्ञान, दिव्य स्त्री, अवचेतन मन।", "hi_reversed": "रहस्य, अंतर्ज्ञान से कटा हुआ, वापसी।", "hi_desc": "प्रधान याजिका महान रहस्य के द्वार पर बैठती है, जो यह दर्शाता है कि यह पीछे हटने और अपनी आंतरिक दुनिया पर विचार करने का समय है। अपनी बुद्धि से अधिक अपने अंतर्ज्ञान पर भरोसा करें।",
        "de_name": "Die Hohepriesterin", "de_upright": "Intuition, heiliges Wissen, das göttlich Weibliche, das Unterbewusstsein.", "de_reversed": "Geheimnisse, von der Intuition getrennt, Rückzug.", "de_desc": "Die Hohepriesterin sitzt am Tor vor dem großen Mysterium und weist darauf hin, dass es Zeit ist, sich zurückzuziehen und über Ihre innere Welt nachzudenken.",
        "zh_name": "女祭司", "zh_upright": "直觉，神圣的知识，神圣的女性，潜意识。", "zh_reversed": "秘密，与直觉脱节，退缩和沉默。", "zh_desc": "女祭司坐在巨大奥秘的门前，表示是时候退却并反思你的内心世界了。相信你的直觉而不是你的理智。"
    },
    {
        "id": 3, "name": "The Empress",
        "upright": "Femininity, beauty, nature, nurturing, abundance.",
        "reversed": "Creative block, dependence on others, emptiness.",
        "desc": "The Empress represents a deep connection with our femininity, translating to elegance, sensuality, fertility, creative expression, and nurturing. She calls on you to connect with nature and your senses.",
        "hi_name": "महारानी (The Empress)", "hi_upright": "स्त्रीत्व, सौंदर्य, प्रकृति, पोषण, प्रचुरता।", "hi_reversed": "रचनात्मक ब्लॉक, दूसरों पर निर्भरता, खालीपन।", "hi_desc": "महारानी हमारी स्त्रीत्व के साथ गहरे संबंध का प्रतिनिधित्व करती है, जो लालित्य, कामुकता, उर्वरता और रचनात्मक अभिव्यक्ति में बदल जाती है।",
        "de_name": "Die Herrscherin", "de_upright": "Weiblichkeit, Schönheit, Natur, Pflege, Fülle.", "de_reversed": "Kreative Blockade, Abhängigkeit von anderen, Leere.", "de_desc": "Die Herrscherin repräsentiert eine tiefe Verbindung mit unserer Weiblichkeit, was sich in Eleganz, Sinnlichkeit, Fruchtbarkeit und Pflege ausdrückt.",
        "zh_name": "皇后", "zh_upright": "女性气质，美丽，自然，养育，丰富。", "zh_reversed": "创作瓶颈，依赖他人，空虚。", "zh_desc": "皇后代表着与我们女性气质的深刻联系，转化为优雅、感性、生育、创造力表达和滋养。她呼唤你与自然和感官建立联系。"
    },
    {
        "id": 4, "name": "The Emperor",
        "upright": "Authority, establishment, structure, a father figure.",
        "reversed": "Domination, excessive control, lack of discipline, inflexibility.",
        "desc": "The Emperor is a symbol of authority, structure, and solid foundations. He suggests that you have the power to organize your world, bring order to chaos, and lay down rules and systems.",
        "hi_name": "सम्राट (The Emperor)", "hi_upright": "अधिकार, स्थापना, संरचना, एक पिता का आंकड़ा।", "hi_reversed": "प्रभुत्व, अत्यधिक नियंत्रण, अनुशासन की कमी।", "hi_desc": "सम्राट अधिकार, संरचना और ठोस नींव का प्रतीक है। वह सुझाव देता है कि आपके पास अपनी दुनिया को व्यवस्थित करने और अराजकता में आदेश लाने की शक्ति है।",
        "de_name": "Der Herrscher", "de_upright": "Autorität, Etablierung, Struktur, eine Vaterfigur.", "de_reversed": "Herrschaft, übermäßige Kontrolle, mangelnde Disziplin.", "de_desc": "Der Herrscher ist ein Symbol für Autorität, Struktur und solide Fundamente. Er schlägt vor, dass Sie die Macht haben, Ihre Welt zu organisieren.",
        "zh_name": "皇帝", "zh_upright": "权威，建立，结构，父亲的形象。", "zh_reversed": "统治，过度控制，缺乏纪律，僵化。", "zh_desc": "皇帝是权威、结构和坚实基础的象征。他暗示你有力量组织你的世界，给混乱带来秩序，并制定规则和系统。"
    },
    {
        "id": 5, "name": "The Hierophant",
        "upright": "Spiritual wisdom, religious beliefs, conformity, tradition, institutions.",
        "reversed": "Personal beliefs, freedom, challenging the status quo.",
        "desc": "The Hierophant stands for tradition, convention, and orthodox institutions. It suggests following established structures and honoring long-held beliefs, seeking guidance from a trusted mentor.",
        "hi_name": "धर्मगुरु (The Hierophant)", "hi_upright": "आध्यात्मिक ज्ञान, धार्मिक मान्यताएँ, परंपरा, संस्थान।", "hi_reversed": "व्यक्तिगत मान्यताएँ, स्वतंत्रता, यथास्थिति को चुनौती देना।", "hi_desc": "धर्मगुरु परंपरा, सम्मेलन और रूढ़िवादी संस्थानों के लिए खड़ा है। यह स्थापित संरचनाओं का पालन करने और लंबे समय से चली आ रही मान्यताओं का सम्मान करने का सुझाव देता है।",
        "de_name": "Der Hierophant", "de_upright": "Spirituelle Weisheit, religiöse Überzeugungen, Konformität, Tradition.", "de_reversed": "Persönliche Überzeugungen, Freiheit, den Status quo in Frage stellen.", "de_desc": "Der Hierophant steht für Tradition, Konvention und orthodoxe Institutionen. Es schlägt vor, etablierten Strukturen zu folgen und lang gehegte Überzeugungen zu ehren.",
        "zh_name": "教皇", "zh_upright": "精神智慧，宗教信仰，顺从，传统，制度。", "zh_reversed": "个人信仰，自由，挑战现状。", "zh_desc": "教皇代表传统、惯例和正统机构。它建议遵循既定的结构并尊重长期持有的信念，向受信任的导师寻求指导。"
    },
    {
        "id": 6, "name": "The Lovers",
        "upright": "Love, harmony, relationships, values alignment, choices.",
        "reversed": "Self-love, disharmony, imbalance, misalignment of values.",
        "desc": "The Lovers represent deep connections and meaningful relationships. Beyond romance, this card signifies a choice between two paths, requiring alignment of personal values and careful consideration.",
        "hi_name": "प्रेमी (The Lovers)", "hi_upright": "प्रेम, सद्भाव, रिश्ते, मूल्यों का संरेखण, विकल्प।", "hi_reversed": "आत्म-प्रेम, असामंजस्य, असंतुलन।", "hi_desc": "प्रेमी गहरे संबंधों और सार्थक रिश्तों का प्रतिनिधित्व करते हैं। रोमांस से परे, यह कार्ड दो रास्तों के बीच चयन का प्रतीक है।",
        "de_name": "Die Liebenden", "de_upright": "Liebe, Harmonie, Beziehungen, Werteausrichtung, Entscheidungen.", "de_reversed": "Selbstliebe, Disharmonie, Ungleichgewicht.", "de_desc": "Die Liebenden repräsentieren tiefe Verbindungen und bedeutungsvolle Beziehungen. Über die Romantik hinaus bedeutet diese Karte die Wahl zwischen zwei Wegen.",
        "zh_name": "恋人", "zh_upright": "爱，和谐，人际关系，价值观一致，选择。", "zh_reversed": "自爱，不和谐，不平衡，价值观不一致。", "zh_desc": "恋人代表着深刻的联系和有意义的人际关系。除了浪漫，这张牌还意味着在两条道路之间做出选择。"
    },
    {
        "id": 7, "name": "The Chariot",
        "upright": "Control, willpower, success, action, determination.",
        "reversed": "Self-discipline, opposition, lack of direction.",
        "desc": "The Chariot represents overcoming challenges and gaining victory through maintaining control of your surroundings. It requires absolute focus, determination, and willpower.",
        "hi_name": "रथ (The Chariot)", "hi_upright": "नियंत्रण, इच्छाशक्ति, सफलता, कार्रवाई, दृढ़ संकल्प।", "hi_reversed": "आत्म-अनुशासन, विरोध, दिशा की कमी।", "hi_desc": "रथ अपने परिवेश पर नियंत्रण बनाए रखकर चुनौतियों पर काबू पाने और जीत हासिल करने का प्रतिनिधित्व करता है। इसके लिए पूर्ण ध्यान की आवश्यकता है।",
        "de_name": "Der Wagen", "de_upright": "Kontrolle, Willenskraft, Erfolg, Handeln, Entschlossenheit.", "de_reversed": "Selbstdisziplin, Widerstand, mangelnde Richtung.", "de_desc": "Der Wagen repräsentiert die Überwindung von Herausforderungen und den Sieg durch die Aufrechterhaltung der Kontrolle über Ihre Umgebung.",
        "zh_name": "战车", "zh_upright": "控制，意志力，成功，行动，决心。", "zh_reversed": "自律，反对，缺乏方向。", "zh_desc": "战车代表通过保持对周围环境的控制来克服挑战并取得胜利。它需要绝对的专注、决心和意志力。"
    },
    {
        "id": 8, "name": "Strength",
        "upright": "Strength, courage, persuasion, influence, compassion.",
        "reversed": "Inner strength, self-doubt, low energy, raw emotion.",
        "desc": "Strength represents mastering raw emotions and bringing calm to yourself or a situation. It is not about brute force, but rather soft control, patience, and deep compassion.",
        "hi_name": "शक्ति (Strength)", "hi_upright": "शक्ति, साहस, अनुनय, प्रभाव, करुणा।", "hi_reversed": "आंतरिक शक्ति, आत्म-संदेह, कम ऊर्जा।", "hi_desc": "शक्ति कच्ची भावनाओं में महारत हासिल करने और खुद को शांत करने का प्रतिनिधित्व करती है। यह पाशविक बल के बारे में नहीं है, बल्कि नरम नियंत्रण और धैर्य के बारे में है।",
        "de_name": "Die Kraft", "de_upright": "Stärke, Mut, Überzeugung, Einfluss, Mitgefühl.", "de_reversed": "Innere Stärke, Selbstzweifel, niedrige Energie.", "de_desc": "Die Kraft repräsentiert die Beherrschung roher Emotionen. Es geht nicht um rohe Gewalt, sondern um sanfte Kontrolle, Geduld und tiefes Mitgefühl.",
        "zh_name": "力量", "zh_upright": "力量，勇气，说服力，影响力，同情心。", "zh_reversed": "内在力量，自我怀疑，低能量，原始情绪。", "zh_desc": "力量代表着控制原始情绪并给自己或环境带来平静。这不是蛮力，而是温和的控制、耐心和深深的同情心。"
    },
    {
        "id": 9, "name": "The Hermit",
        "upright": "Soul-searching, introspection, being alone, inner guidance.",
        "reversed": "Isolation, loneliness, withdrawal.",
        "desc": "The Hermit shows that you are taking a break from everyday life to draw your energy and attention inward. You are seeking answers from within, looking for your inner truth.",
        "hi_name": "साधु (The Hermit)", "hi_upright": "आत्म-खोज, आत्मनिरीक्षण, अकेले रहना, आंतरिक मार्गदर्शन।", "hi_reversed": "अलगाव, अकेलापन, वापसी।", "hi_desc": "साधु दिखाता है कि आप अपनी ऊर्जा और ध्यान को अंदर की ओर खींचने के लिए रोजमर्रा की जिंदगी से ब्रेक ले रहे हैं।",
        "de_name": "Der Eremit", "de_upright": "Seelensuche, Selbstbeobachtung, Alleinsein, innere Führung.", "de_reversed": "Isolation, Einsamkeit, Rückzug.", "de_desc": "Der Eremit zeigt, dass Sie sich eine Auszeit vom Alltag nehmen, um Ihre Energie nach innen zu lenken. Sie suchen nach Antworten in sich selbst.",
        "zh_name": "隐士", "zh_upright": "自我反省，内省，独处，内在指引。", "zh_reversed": "孤立，孤独，退缩。", "zh_desc": "隐士表明你正在从日常生活中抽出时间，将能量和注意力转向内心。你正在向内寻求答案，寻找你的内在真理。"
    },
    {
        "id": 10, "name": "Wheel of Fortune",
        "upright": "Good luck, karma, life cycles, destiny, a turning point.",
        "reversed": "Bad luck, resistance to change, breaking cycles.",
        "desc": "The Wheel of Fortune reminds us that the wheel is always turning and life is in a constant state of change. What goes up must come down; stay centered through the ups and downs.",
        "hi_name": "भाग्य का पहिया (Wheel of Fortune)", "hi_upright": "सौभाग्य, कर्म, जीवन चक्र, भाग्य, एक महत्वपूर्ण मोड़।", "hi_reversed": "दुर्भाग्य, परिवर्तन का विरोध, चक्रों को तोड़ना।", "hi_desc": "भाग्य का पहिया हमें याद दिलाता है कि पहिया हमेशा घूम रहा है और जीवन परिवर्तन की निरंतर स्थिति में है।",
        "de_name": "Das Rad des Schicksals", "de_upright": "Viel Glück, Karma, Lebenszyklen, Schicksal, ein Wendepunkt.", "de_reversed": "Pech, Widerstand gegen Veränderungen.", "de_desc": "Das Rad des Schicksals erinnert uns daran, dass sich das Rad immer dreht und das Leben in einem ständigen Zustand der Veränderung ist.",
        "zh_name": "命运之轮", "zh_upright": "好运，业力，生命周期，命运，转折点。", "zh_reversed": "厄运，抵制改变，打破循环。", "zh_desc": "命运之轮提醒我们，轮子总是在转动，生活处于不断变化的状态。有起必有落；在起伏中保持中心。"
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

print("Batch 1 Tarot descriptions translated!")
