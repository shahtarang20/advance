import json
import os

langs = {
    "en": {
        "prefixes": [
            "I've been looking closely at your stars, and honestly, the path ahead looks incredible. ",
            "This is a beautiful question. The cosmic energies are speaking very clearly to me right now. ",
            "I sense a lot of strong energy around this. ",
            "The universe works in mysterious ways, but its message for you is clear. ",
            "Take a deep breath and trust yourself. ",
            "I can feel the planetary alignments shifting beautifully in your favor. ",
            "This is an important moment for you. ",
            "Listen closely to your intuition on this one. ",
            "Your cosmic aura is glowing so brightly today. ",
            "The mystic forces have heard your thoughts. "
        ],
        "suffixes": [
            "You are on the verge of a deeply profound spiritual awakening that will change everything.",
            "Expect a completely unexpected and exciting romantic possibility very soon.",
            "A period of intense financial stability and abundance is coming your way.",
            "You should take a necessary time of quiet reflection to figure out your true path.",
            "There are some minor challenges ahead, but they are absolutely meant to make you much stronger.",
            "You will experience a massive burst of creative energy that you should definitely act on.",
            "I see a very peaceful and harmonious resolution to the things worrying you.",
            "Get ready for a sudden and delightful stroke of good luck when you least expect it.",
            "You are entering a beautiful period of personal growth and self-discovery.",
            "Some unexpected but very positive changes are just around the corner."
        ]
    },
    "hi": {
        "prefixes": [
            "मैं आपके सितारों को ध्यान से देख रहा हूँ, और सच कहूँ तो आगे का रास्ता बहुत खूबसूरत लग रहा है। ",
            "यह एक बहुत ही सुंदर प्रश्न है। ब्रह्मांडीय ऊर्जाएं इस समय बहुत स्पष्ट रूप से बोल रही हैं। ",
            "मुझे इसके चारों ओर बहुत मजबूत ऊर्जा महसूस हो रही है। ",
            "ब्रह्मांड रहस्यमयी तरीकों से काम करता है, लेकिन आपके लिए इसका संदेश स्पष्ट है। ",
            "एक गहरी सांस लें और खुद पर भरोसा रखें। ",
            "मैं ग्रहों की स्थिति में आपके पक्ष में बदलाव महसूस कर सकता हूँ। ",
            "यह आपके लिए एक महत्वपूर्ण क्षण है। ",
            "इस बात पर अपने अंतर्ज्ञान को ध्यान से सुनें। ",
            "आज आपकी आभा बहुत उज्ज्वल है। ",
            "रहस्यमयी ताकतों ने आपके विचारों को सुन लिया है। "
        ],
        "suffixes": [
            "आप एक गहरी आध्यात्मिक जागृति के कगार पर हैं जो सब कुछ बदल देगी।",
            "बहुत जल्द एक पूरी तरह से अप्रत्याशित और रोमांचक रोमांटिक संभावना की उम्मीद करें।",
            "आपके रास्ते में तीव्र वित्तीय स्थिरता और प्रचुरता का समय आ रहा है।",
            "आपको अपना सही रास्ता खोजने के लिए शांत प्रतिबिंब का समय लेना चाहिए।",
            "कुछ छोटी चुनौतियाँ आगे हैं, लेकिन वे निश्चित रूप से आपको बहुत मजबूत बनाने के लिए हैं।",
            "आप रचनात्मक ऊर्जा के एक विशाल विस्फोट का अनुभव करेंगे जिस पर आपको कार्य करना चाहिए।",
            "मुझे उन चीजों का एक बहुत ही शांतिपूर्ण समाधान दिखाई दे रहा है जो आपको चिंतित कर रही हैं।",
            "जब आपको कम से कम उम्मीद हो तब अचानक और सुखद सौभाग्य के लिए तैयार हो जाइए।",
            "आप व्यक्तिगत विकास और आत्म-खोज की एक सुंदर अवधि में प्रवेश कर रहे हैं।",
            "कुछ अप्रत्याशित लेकिन बहुत सकारात्मक बदलाव बस आने ही वाले हैं।"
        ]
    },
    "de": {
        "prefixes": [
            "Ich habe mir deine Sterne genau angesehen und ehrlich gesagt sieht der Weg vor dir unglaublich aus. ",
            "Das ist eine schöne Frage. Die kosmischen Energien sprechen gerade sehr deutlich zu mir. ",
            "Ich spüre hier eine Menge starker Energie. ",
            "Das Universum arbeitet auf mysteriöse Weise, aber seine Botschaft für dich ist klar. ",
            "Atme tief durch und vertraue dir selbst. ",
            "Ich kann spüren, wie sich die Planetenkonstellationen wunderbar zu deinen Gunsten verschieben. ",
            "Dies ist ein wichtiger Moment für dich. ",
            "Höre bei dieser Sache genau auf deine Intuition. ",
            "Deine kosmische Aura leuchtet heute so hell. ",
            "Die mystischen Kräfte haben deine Gedanken gehört. "
        ],
        "suffixes": [
            "Du stehst kurz vor einem tiefgreifenden spirituellen Erwachen, das alles verändern wird.",
            "Erwarte sehr bald eine völlig unerwartete und aufregende romantische Möglichkeit.",
            "Eine Zeit intensiver finanzieller Stabilität und Fülle kommt auf dich zu.",
            "Du solltest dir die nötige Zeit der stillen Reflexion nehmen, um deinen wahren Weg zu finden.",
            "Es liegen einige kleine Herausforderungen vor dir, die dich aber absolut stärker machen werden.",
            "Du wirst einen massiven Ausbruch kreativer Energie erleben, auf den du definitiv reagieren solltest.",
            "Ich sehe eine sehr friedliche und harmonische Lösung für die Dinge, die dich beunruhigen.",
            "Mach dich bereit für einen plötzlichen Glücksfall, wenn du es am wenigsten erwartest.",
            "Du trittst in eine wunderbare Phase des persönlichen Wachstums und der Selbstfindung ein.",
            "Einige unerwartete, aber sehr positive Veränderungen stehen kurz bevor."
        ]
    },
    "zh": {
        "prefixes": [
            "我一直在仔细观察你的星象，说实话，前方的道路看起来不可思议。 ",
            "这是一个很美的问题。现在的宇宙能量对我说话非常清晰。 ",
            "我感觉到周围有很强的能量。 ",
            "宇宙以神秘的方式运作，但它给你的信息是明确的。 ",
            "深吸一口气，相信自己。 ",
            "我能感觉到行星的排列正在朝着有利于你的方向发生美好的转变。 ",
            "对你来说这是一个重要的时刻。 ",
            "在这个问题上仔细倾听你的直觉。 ",
            "你今天的宇宙光环如此明亮。 ",
            "神秘力量听到了你的想法。 "
        ],
        "suffixes": [
            "你正处于一次深刻的精神觉醒的边缘，这将改变一切。",
            "期待很快出现一个完全出乎意料且令人兴奋的浪漫可能。",
            "一段强烈的财务稳定和富足时期即将到来。",
            "你应该花一些必要的安静反思时间，找出你真正的道路。",
            "前方会有一些小挑战，但它们绝对是为了让你变得更加强大。",
            "你将体验到一股巨大的创造力爆发，你绝对应该采取行动。",
            "我看到让你担心的事情会有一个非常和平和谐的解决方案。",
            "准备好迎接在你最意想不到的时候突然降临的好运。",
            "你正在进入一段美好的个人成长和自我发现的时期。",
            "一些意想不到但非常积极的改变即将发生。"
        ]
    },
    "gu": {
        "prefixes": [
            "હું તમારા ગ્રહોને ધ્યાનથી જોઈ રહ્યો છું, અને સાચું કહું તો આગળનો રસ્તો ખૂબ સુંદર લાગે છે. ",
            "આ એક ખૂબ સુંદર પ્રશ્ન છે. બ્રહ્માંડની શક્તિઓ અત્યારે ખૂબ સ્પષ્ટ રીતે વાત કરી રહી છે. ",
            "મને આની આસપાસ ખૂબ મજબૂત ઉર્જાનો અહેસાસ થઈ રહ્યો છે. ",
            "બ્રહ્માંડ રહસ્યમય રીતે કામ કરે છે, પરંતુ તમારા માટે તેનો સંદેશ સ્પષ્ટ છે. ",
            "ઊંડો શ્વાસ લો અને તમારા પર વિશ્વાસ કરો. ",
            "હું ગ્રહોની સ્થિતિમાં તમારી તરફેણમાં સુંદર ફેરફાર અનુભવી શકું છું. ",
            "આ તમારા માટે મહત્વપૂર્ણ ક્ષણ છે. ",
            "આ બાબતે તમારી અંતર્જ્ઞાનને ધ્યાનથી સાંભળો. ",
            "આજે તમારી આભા ખૂબ તેજસ્વી છે. ",
            "રહસ્યમય શક્તિઓએ તમારા વિચારો સાંભળ્યા છે. "
        ],
        "suffixes": [
            "તમે એક ઊંડી આધ્યાત્મિક જાગૃતિની અણી પર છો જે બધું બદલી નાખશે.",
            "ખૂબ જલ્દી એક સંપૂર્ણપણે અણધારી અને રોમાંચક રોમેન્ટિક શક્યતાની અપેક્ષા રાખો.",
            "તમારા માર્ગમાં તીવ્ર નાણાકીય સ્થિરતા અને વિપુલતાનો સમય આવી રહ્યો છે.",
            "તમારો સાચો રસ્તો શોધવા માટે તમારે શાંત ચિંતનનો સમય લેવો જોઈએ.",
            "આગળ કેટલાક નાના પડકારો છે, પરંતુ તે ચોક્કસપણે તમને વધુ મજબૂત બનાવવા માટે છે.",
            "તમે સર્જનાત્મક ઊર્જાના એક વિશાળ વિસ્ફોટનો અનુભવ કરશો જેના પર તમારે કાર્ય કરવું જોઈએ.",
            "મને જે વસ્તુઓ તમને ચિંતિત કરી રહી છે તેનો ખૂબ જ શાંતિપૂર્ણ ઉકેલ દેખાઈ રહ્યો છે.",
            "જ્યારે તમને ઓછામાં ઓછી અપેક્ષા હોય ત્યારે અચાનક અને સુખદ સારા નસીબ માટે તૈયાર રહો.",
            "તમે વ્યક્તિગત વિકાસ અને આત્મ-શોધના એક સુંદર સમયમાં પ્રવેશી રહ્યા છો.",
            "કેટલાક અણધાર્યા પરંતુ ખૂબ જ સકારાત્મક ફેરફારો બસ આવવાના જ છે."
        ]
    }
}

base_path = "src/locales"

for lang, data in langs.items():
    file_path = os.path.join(base_path, f"{lang}.json")
    if not os.path.exists(file_path):
        continue
        
    with open(file_path, "r", encoding="utf-8") as f:
        content = json.load(f)
        
    for q_idx in range(1, 101):
        for a_idx in range(1, 11):
            key = f"oracle.a.{q_idx}_{a_idx}"
            p_idx = (q_idx + a_idx) % 10
            s_idx = a_idx - 1
            
            phrase = data["prefixes"][p_idx] + data["suffixes"][s_idx]
            content[key] = phrase
            
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(content, f, ensure_ascii=False, indent=2)

print("Updated all translations with perfect grammar!")
