const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://shahtarang20_db_user:Shahtarang2003@cluster0.cdqvn6e.mongodb.net/mystic_oracle?retryWrites=true&w=majority&appName=Cluster0";

const guData = [
  { cat: "handShape", sub: "earth", title: "પૃથ્વી હાથ", meaning: "ટૂંકી, જાડી આંગળીઓવાળી ચોરસ, નક્કર હથેળી. તમે વ્યવહારુ, જમીન સાથે જોડાયેલા અને ખૂબ જ વિશ્વસનીય છો." },
  { cat: "handShape", sub: "air", title: "વાયુ હાથ", meaning: "લાંબી આંગળીઓવાળી ચોરસ અથવા લંબચોરસ હથેળી. તમે બૌદ્ધિક, ઊંડા વિચારક અને એક કુદરતી સંચારક છો." },
  { cat: "handShape", sub: "fire", title: "અગ્નિ હાથ", meaning: "ટૂંકી આંગળીઓ સાથે લાંબી હથેળી. તમે આવેગજન્ય, અત્યંત મહેનતુ અને ઊંડા ઉત્સાહી છો." },
  { cat: "handShape", sub: "water", title: "જળ હાથ", meaning: "લાંબી, લવચીક આંગળીઓ સાથે લાંબી, અંડાકાર હથેળી. તમે અત્યંત સંવેદનશીલ અને આધ્યાત્મિક છો." },
  { cat: "handShape", sub: "conic", title: "શંક્વાકાર (કલાત્મક) હાથ", meaning: "સહેજ પોઇન્ટેડ ટીપ સાથે સરળ, ટેપરિંગ આંગળીઓ. તમારી પાસે deeplyંડી સર્જનાત્મક અને કલાત્મક આત્મા છે." },
  { cat: "handShape", sub: "spatulate", title: "સ્પેટ્યુલેટ (સક્રિય) હાથ", meaning: "સ્પેટુલાની જેમ ટિપ્સ પર બહાર નીકળતી આંગળીઓ. તમારી પાસે અકલ્પનીય ગતિ ઊર્જા છે અને તમે ક્રિયાને પસંદ કરો છો." },
  { cat: "handShape", sub: "psychic", title: "માનસિક (આદર્શવાદી) હાથ", meaning: "પોઇન્ટેડ ટિપ્સ સાથે ખૂબ લાંબી, પાતળી, સુંદર આંગળીઓ. તમે અત્યંત સાહજિક છો અને આધ્યાત્મિક વિશ્વમાં રહો છો." },
  { cat: "handShape", sub: "knotty", title: "દાર્શનિક (ગાંઠવાળા) હાથ", meaning: "અત્યંત દૃશ્યમાન, સોજો સાંધાવાળી આંગળીઓ. તમે ઊંડા, વિશ્લેષણાત્મક વિચારક છો." },

  { cat: "heartLine", sub: "long_curved", title: "લાંબી અને વળાંકવાળી", meaning: "તમે પ્રેમમાં ગરમ ​​અને અભિવ્યક્ત છો. તમે ઊંડાણપૂર્વક અનુભવો છો અને ભાવનાત્મક જોખમથી ડરતા નથી." },
  { cat: "heartLine", sub: "straight_short", title: "ટૂંકી અને સીધી", meaning: "તમારો પ્રેમ પ્રત્યેનો દૃષ્ટિકોણ વ્યવહારુ છે. તમે વફાદારી દ્વારા સ્નેહ વ્યક્ત કરો છો." },
  { cat: "heartLine", sub: "deeply_etched", title: "ઊંડી અને સ્પષ્ટ", meaning: "તમે ભાવનાત્મક તીવ્રતાનો અનુભવ કરો છો. તમારી લાગણીઓ અતિ ઊંડી અને સ્થિર છે." },
  { cat: "heartLine", sub: "chained", title: "સાંકળવાળી અથવા લહેરિયાં", meaning: "તમારા રોમેન્ટિક જીવનમાં ઘણા ઉતાર-ચઢાવ આવ્યા છે. તમારી પાસે અપાર ભાવનાત્મક સંવેદનશીલતા છે." },
  { cat: "heartLine", sub: "forked_end", title: "અંતમાં વિભાજિત", meaning: "તમારી પાસે જુસ્સાદાર અને સમજદારીપૂર્વક પ્રેમ કરવાની દુર્લભ ક્ષમતા છે, જે હૃદય અને દિમાગને સંતુલિત કરે છે." },
  { cat: "heartLine", sub: "broken", title: "તૂટેલી રેખા", meaning: "તૂટેલી રેખા નોંધપાત્ર ભાવનાત્મક વળાંક અથવા ભૂતકાળના હાર્ટબ્રેકને સૂચવે છે." },
  { cat: "heartLine", sub: "double_line", title: "ડબલ હાર્ટ લાઇન", meaning: "તમારી પાસે પ્રેમ અને સહાનુભૂતિ માટે અપાર ક્ષમતા છે. તમે અપ્રતિમ તીવ્રતા સાથે પ્રેમ કરો છો." },
  { cat: "heartLine", sub: "drops_to_head", title: "મગજ રેખામાં જતી", meaning: "તમારું હૃદય તમારા મગજ દ્વારા શાસન કરે છે. તમે સંબંધોમાં તર્ક અને વ્યવહારિકતાને મંજૂરી આપો છો." },

  { cat: "headLine", sub: "long_straight", title: "લાંબી અને સીધી", meaning: "તમારી પાસે કેન્દ્રિત, તાર્કિક અને અત્યંત વાસ્તવિક મન છે. તમે વિશ્લેષણાત્મક વિચારસરણીમાં શ્રેષ્ઠ છો." },
  { cat: "headLine", sub: "sloping", title: "કાંડા તરફ ઢળતી", meaning: "તમારું મન deeplyંડે કલ્પનાશીલ અને સર્જનાત્મક છે. તમે ચિત્રો અને શક્યતાઓમાં વિચારો છો." },
  { cat: "headLine", sub: "short", title: "ટૂંકી અને સીધી", meaning: "તમે નિર્ણાયક વિચારક છો. તમે અતિ-વિશ્લેષણને બદલે ઝડપી કાર્યવાહી કરવાનું પસંદ કરો છો." },
  { cat: "headLine", sub: "forked_writers", title: "અંતે વિભાજિત (લેખક)", meaning: "તમારી પાસે કોઈપણ પરિસ્થિતિની બહુવિધ બાજુઓ જોવાની શાનદાર ક્ષમતા છે." },
  { cat: "headLine", sub: "chained", title: "સાંકળવાળી અથવા લહેરિયાં", meaning: "તમારી બૌદ્ધિક યાત્રામાં પ્રેરણા અને મૂંઝવણના સમયગાળા છે. તમને શાંતિની જરૂર છે." },
  { cat: "headLine", sub: "broken", title: "તૂટેલી રેખા", meaning: "તીવ્ર વિરામ તમારા જીવનમાં કોઈ સમયે વિશ્વ દૃષ્ટિકોણ અથવા કારકિર્દીમાં મોટા ફેરફારનું સૂચન કરે છે." },
  { cat: "headLine", sub: "separated_from_life", title: "જીવન રેખાથી અલગ", meaning: "તમે ભીષણ સ્વતંત્ર છો અને સ્વતંત્રતાની ઝંખના કરો છો. તમે તમારા પોતાના નિયમો બનાવવા માંગો છો." },

  { cat: "lifeLine", sub: "deep_long", title: "ઊંડી અને લાંબી", meaning: "તમારી પાસે મજબૂત શારીરિક સહનશક્તિ અને સ્થિરતાની deepંડી મૂળની ભાવના છે." },
  { cat: "lifeLine", sub: "short", title: "ટૂંકી અથવા ઝાંખી", meaning: "આનો અર્થ ટૂંકું જીવન નથી, પરંતુ શારીરિક નાજુકતા અથવા એવા સમય તરફ નિર્દેશ કરે છે જ્યાં તમારે તમારી ઉર્જાનું રક્ષણ કરવું જોઈએ." },
  { cat: "lifeLine", sub: "chained", title: "સાંકળવાળી", meaning: "તમારા માર્ગમાં નાજુક સ્વાસ્થ્ય અથવા જટિલ ભાવનાત્મક સંઘર્ષોનો સમાવેશ થાય છે." },
  { cat: "lifeLine", sub: "broken", title: "તૂટેલી રેખા", meaning: "તમે તમારા જીવનમાં મોટા, પરિવર્તનકારી ફેરફારનો અનુભવ કરશો જે પુનર્જન્મ તરીકે કાર્ય કરે છે." },
  { cat: "lifeLine", sub: "double_line", title: "ડબલ લાઇફ લાઇન", meaning: "તમારી પાસે શક્તિશાળી 'ગાર્ડિયન એન્જલ' લાઇન છે, જે અત્યંત કોસ્મિક સુરક્ષા પ્રદાન કરે છે." },

  { cat: "fateLine", sub: "clear_deep", title: "સ્પષ્ટ અને ઊંડી", meaning: "તમારી પાસે હેતુની મજબૂત ભાવના અને સ્પષ્ટ જીવન માર્ગ છે. તમે વિશ્વ પર છાપ છોડવા માટે નિર્ધારિત છો." },
  { cat: "fateLine", sub: "faint", title: "ઝાંખી અથવા લહેરિયાં", meaning: "તમારો માર્ગ અત્યંત અનુકૂલનક્ષમ છે. તમે તમારું સાચું કૉલિંગ શોધતા પહેલા ઘણા કારકિર્દી વિકલ્પો અજમાવો છો." },
  { cat: "fateLine", sub: "absent", title: "ભાગ્ય રેખા ગેરહાજર", meaning: "તમે સાચા મુક્ત આત્મા છો. તમે પરંપરાગત કારકિર્દી માર્ગથી બંધાયેલા નથી." },
  { cat: "fateLine", sub: "starting_life_line", title: "જીવન રેખાથી શરૂ", meaning: "તમારી સફળતા સંપૂર્ણપણે સ્વ-નિર્મિત છે. તમારી સિદ્ધિઓ તમારી પોતાની અપાર ઇચ્છાશક્તિનું પરિણામ છે." },

  { cat: "minorLines", sub: "mystic_cross", title: "મિસ્ટિક ક્રોસ", meaning: "મસ્તક અને હૃદય રેખાઓ વચ્ચે સ્થિત, આ ગુપ્ત ક્ષમતાઓ અને અત્યંત સાહજિક આત્મા સૂચવે છે." },
  { cat: "minorLines", sub: "girdle_venus", title: "ગર્ડલ ઓફ વીનસ", meaning: "અત્યંત ભાવનાત્મક સંવેદનશીલતા અને કલા અને રોમાંસ માટે deepંડી ક્ષમતા દર્શાવે છે." },
  { cat: "minorLines", sub: "intuition_line", title: "અંતર્જ્ઞાન રેખા", meaning: "માનસિક અગમચેતી, આબેહૂબ ભવિષ્યવાણીનાં સપનાં અને સાચી આંતરડાની લાગણીઓ છતી કરે છે." },
  { cat: "minorLines", sub: "ring_solomon", title: "રિંગ ઓફ સોલોમન", meaning: "મહાન શાણપણ, અધિકાર અને આધ્યાત્મિક આંતરદૃષ્ટિ દ્વારા અન્યને માર્ગદર્શન આપવાની ક્ષમતા." },
  { cat: "minorLines", sub: "health_line", title: "આરોગ્ય રેખા", meaning: "આ તમારા નર્વસ સિસ્ટમ અને શારીરિક સ્વાસ્થ્ય માટે બેરોમીટર તરીકે કામ કરે છે. તણાવ સંતુલિત કરો." }
];

const zhData = [
  { cat: "handShape", sub: "earth", title: "土象手", meaning: "手掌呈方形，结实，手指短而粗。你务实、脚踏实地且非常可靠。你只相信你能看到和触摸到的东西。" },
  { cat: "handShape", sub: "air", title: "风象手", meaning: "手掌呈方形或长方形，手指细长。你是一个知识分子、深思熟虑者和天生的沟通者，靠思想茁壮成长。" },
  { cat: "handShape", sub: "fire", title: "火象手", meaning: "手掌长，手指短。你冲动、精力充沛、热情洋溢。你靠直觉而不是分析来领导。" },
  { cat: "handShape", sub: "water", title: "水象手", meaning: "手掌细长呈椭圆形，手指长而柔软。你极其敏感、富有想象力，并在情感上与精神世界保持一致。" },
  { cat: "handShape", sub: "conic", title: "圆锥形（艺术）手", meaning: "手指光滑、呈锥形，指尖略尖。你拥有极具创造力和艺术感的灵魂。你热爱美丽、奢华和美学。" },
  { cat: "handShape", sub: "spatulate", title: "铲形（活动）手", meaning: "指尖像抹刀一样向外张开。你拥有令人难以置信的动能，喜欢行动、发明和探索。" },
  { cat: "handShape", sub: "psychic", title: "精神（理想主义）手", meaning: "手指非常细长漂亮，指尖尖锐。你直觉极强，脱离物质现实，大多生活在精神或梦想世界中。" },
  { cat: "handShape", sub: "knotty", title: "哲学（多结）手", meaning: "手指关节明显肿大。你是一个深刻、分析型的思想家，对一切都提出质疑并寻求终极真理。" },

  { cat: "heartLine", sub: "long_curved", title: "长而略微弯曲", meaning: "在爱情中，你热情而善于表达。你感受深刻，公开表达，并且不怕情感风险。" },
  { cat: "heartLine", sub: "straight_short", title: "短而直", meaning: "你对爱情采取谨慎、务实的态度。你通过忠诚和行动来表达爱意，而不是宏大的浪漫宣言。" },
  { cat: "heartLine", sub: "deeply_etched", title: "深而清晰的刻画", meaning: "你体验到情感的强度和恒久性。你的感情无比深厚而稳定。" },
  { cat: "heartLine", sub: "chained", title: "锁链状或波浪状", meaning: "你的浪漫生活经历了许多起伏。你拥有巨大的情感敏感性，有时会让你不知所措。" },
  { cat: "heartLine", sub: "forked_end", title: "末端分叉", meaning: "你拥有一种罕见的能力，既能充满激情地去爱，又能理智地去爱，在内心的渴望与头脑的逻辑判断之间取得平衡。" },
  { cat: "heartLine", sub: "broken", title: "断裂或中断", meaning: "断裂表明你经历过重大的情感转折点或过去的心碎，这深刻地重塑了你对待爱情和脆弱的态度。" },
  { cat: "heartLine", sub: "double_line", title: "双重感情线", meaning: "你拥有巨大的爱和同理心，就好像你有两颗心同时在跳动。你以无与伦比的强度去爱。" },
  { cat: "heartLine", sub: "drops_to_head", title: "落入智慧线", meaning: "你的心由你的头脑统治。在感情中，你经常让逻辑、理性和实用性凌驾于你的情感欲望之上。" },

  { cat: "headLine", sub: "long_straight", title: "长而直", meaning: "你拥有专注、逻辑和高度现实的头脑。你擅长分析思维，不喜欢模棱两可。" },
  { cat: "headLine", sub: "sloping", title: "向手腕倾斜", meaning: "你的头脑极具想象力和创造力。你用画面、可能性和梦想来思考，而不是严格地用冷冰冰的事实。" },
  { cat: "headLine", sub: "short", title: "短而直接", meaning: "你是一个果断、专一的思想家。你宁愿对结论迅速采取行动，也不愿过度分析问题。" },
  { cat: "headLine", sub: "forked_writers", title: "末端分叉（作家分叉）", meaning: "你拥有出色的能力，能看到任何情况的多个方面。这个标记与作家、沟通者和创造性思想家密切相关。" },
  { cat: "headLine", sub: "chained", title: "锁链状或波浪状", meaning: "你的智力之旅以辉煌的灵感时期和随后的困惑为特征。你需要平静来集中精神。" },
  { cat: "headLine", sub: "broken", title: "断裂或中断", meaning: "明显的断裂表明你生活中的某个时刻你的世界观、职业道路或信仰体系发生了重大转变。" },
  { cat: "headLine", sub: "separated_from_life", title: "与生命线分离", meaning: "你极其独立、冲动，并且渴望自由。从小你就渴望制定自己的规则。" },

  { cat: "lifeLine", sub: "deep_long", title: "深而长", meaning: "你拥有强健的体魄、令人难以置信的体力和在人生的旅途中根深蒂固的稳定感和耐力。" },
  { cat: "lifeLine", sub: "short", title: "短或模糊", meaning: "这并不意味着寿命短，而是指出身体虚弱或需要有意识地保护和恢复能量的时期。" },
  { cat: "lifeLine", sub: "chained", title: "锁链状或编织状", meaning: "你的道路包括度过健康状况不佳或复杂的情感挣扎时期，这需要有意识的治愈和自我保健。" },
  { cat: "lifeLine", sub: "broken", title: "断裂或中断", meaning: "你将在生活中经历巨大的、变革性的转变——环境、信仰或生活方式的彻底改变，就像是一次深刻的重生。" },
  { cat: "lifeLine", sub: "double_line", title: "双重生命线", meaning: "你有一条强大的“守护天使”线。这提供了极大的宇宙保护，赋予你度过巨大困难并变得更强大的能力。" },

  { cat: "fateLine", sub: "clear_deep", title: "清晰且深", meaning: "你有非常强烈的使命感和清晰的人生道路。你非常有上进心，注定要在世界上留下重要的印记。" },
  { cat: "fateLine", sub: "faint", title: "模糊或波浪状", meaning: "你在生活中的道路适应性强，并且容易改变方向。在找到你真正的使命之前，你会探索许多不同的职业和哲学。" },
  { cat: "fateLine", sub: "absent", title: "无命运线", meaning: "你是一个真正的自由灵魂。你不受僵化的命运或传统的职业道路的束缚；你在世界上创造自己独特的意义。" },
  { cat: "fateLine", sub: "starting_life_line", title: "从生命线开始", meaning: "你的成功完全是自我创造的。你早年的生活与你的家庭紧密相连，你的成就是你自己巨大意志力的直接结果。" },

  { cat: "minorLines", sub: "mystic_cross", title: "神秘十字架", meaning: "位于智慧线和感情线之间，这个罕见的标记表明深刻的神秘能力、与占星术的深厚联系以及高度直觉的灵魂。" },
  { cat: "minorLines", sub: "girdle_venus", title: "金星带", meaning: "感情线上方的曲线，表明极端的情感敏感性、高度紧张的神经以及对艺术和浪漫深厚而热情的渴望。" },
  { cat: "minorLines", sub: "intuition_line", title: "直觉线", meaning: "手掌边缘的新月形曲线，揭示了心理预见能力、生动的预言梦以及几乎总是正确的直觉。" },
  { cat: "minorLines", sub: "ring_solomon", title: "所罗门环", meaning: "食指下方的曲线，表明伟大的智慧、权威，以及通过精神或心理洞察力教导和指导他人的能力。" },
  { cat: "minorLines", sub: "health_line", title: "健康线", meaning: "从粉红色的手指一直延伸到手腕，这条线是你的神经系统和身体健康的晴雨表。它的存在敦促你平衡压力和休息。" }
];

const deData = [
  { cat: "handShape", sub: "earth", title: "Erdhand", meaning: "Eine quadratische, feste Handfläche mit kurzen, dicken Fingern. Sie sind praktisch, geerdet und sehr zuverlässig. Sie vertrauen auf das, was Sie sehen und anfassen können." },
  { cat: "handShape", sub: "air", title: "Lufthand", meaning: "Eine quadratische oder rechteckige Handfläche mit langen Fingern. Sie sind ein Intellektueller, ein tiefer Denker und ein natürlicher Kommunikator, der von Ideen lebt." },
  { cat: "handShape", sub: "fire", title: "Feuerhand", meaning: "Eine lange Handfläche mit kurzen Fingern. Sie sind impulsiv, sehr energisch und tief enthusiastisch. Sie führen mehr durch Instinkt als durch Analyse." },
  { cat: "handShape", sub: "water", title: "Wasserhand", meaning: "Eine lange, ovale Handfläche mit langen, flexiblen Fingern. Sie sind hochsensibel, zutiefst einfallsreich und emotional auf das spirituelle Reich eingestimmt." },
  { cat: "handShape", sub: "conic", title: "Konische (Künstlerische) Hand", meaning: "Glatte, sich verjüngende Finger mit einer leicht spitzen Spitze. Sie besitzen eine zutiefst kreative und künstlerische Seele. Sie lieben Schönheit, Luxus und Ästhetik." },
  { cat: "handShape", sub: "spatulate", title: "Spatelförmige (Aktive) Hand", meaning: "Finger, die an den Spitzen wie ein Spatel nach außen ragen. Sie haben unglaublich viel kinetische Energie und lieben Action, Erfindung und Erkundung." },
  { cat: "handShape", sub: "psychic", title: "Psychische (Idealistische) Hand", meaning: "Sehr lange, dünne, schöne Finger mit spitzen Spitzen. Sie sind extrem intuitiv und von der materiellen Realität getrennt und leben hauptsächlich in der spirituellen oder Traumwelt." },
  { cat: "handShape", sub: "knotty", title: "Philosophische (Knotige) Hand", meaning: "Finger mit stark sichtbaren, geschwollenen Gelenken. Sie sind ein tiefer, analytischer Denker, der alles in Frage stellt und nach ultimativen Wahrheiten sucht." },

  { cat: "heartLine", sub: "long_curved", title: "Lang und leicht gebogen", meaning: "Sie sind warmherzig und ausdrucksstark in der Liebe. Sie fühlen tief, zeigen es offen und haben keine Angst vor emotionalen Risiken." },
  { cat: "heartLine", sub: "straight_short", title: "Kurz und gerade", meaning: "Sie haben einen vorsichtigen, praktischen Ansatz in der Liebe. Sie drücken Zuneigung durch Loyalität und Taten aus, anstatt durch große romantische Erklärungen." },
  { cat: "heartLine", sub: "deeply_etched", title: "Tief und klar gezeichnet", meaning: "Sie erleben emotionale Intensität und Konstanz. Ihre Gefühle sind unglaublich tief und stetig." },
  { cat: "heartLine", sub: "chained", title: "Kettenartig oder wellig", meaning: "Ihr romantisches Leben hat viele Höhen und Tiefen gesehen. Sie besitzen eine enorme emotionale Sensibilität, die Sie manchmal überwältigen kann." },
  { cat: "heartLine", sub: "forked_end", title: "Am Ende gegabelt", meaning: "Sie haben die seltene Fähigkeit, sowohl leidenschaftlich als auch vernünftig zu lieben und die Wünsche Ihres Herzens mit dem logischen Urteilsvermögen Ihres Kopfes in Einklang zu bringen." },
  { cat: "heartLine", sub: "broken", title: "Gebrochen oder unterbrochen", meaning: "Ein Bruch weist auf einen bedeutenden emotionalen Wendepunkt oder einen früheren Herzschmerz hin, der Ihre Herangehensweise an Liebe und Verletzlichkeit tiefgreifend verändert hat." },
  { cat: "heartLine", sub: "double_line", title: "Doppelte Herzlinie", meaning: "Sie besitzen eine enorme Fähigkeit zu Liebe und Empathie, fast so, als hätten Sie zwei gleichzeitig schlagende Herzen. Sie lieben mit unvergleichlicher Intensität." },
  { cat: "heartLine", sub: "drops_to_head", title: "Fällt in die Kopflinie", meaning: "Ihr Herz wird von Ihrem Kopf regiert. Sie lassen oft zu, dass Logik, Vernunft und Praktikabilität Ihre emotionalen Wünsche in Beziehungen außer Kraft setzen." },

  { cat: "headLine", sub: "long_straight", title: "Lang und gerade", meaning: "Sie besitzen einen fokussierten, logischen und sehr realistischen Verstand. Sie zeichnen sich durch analytisches Denken aus und mögen keine Unklarheiten." },
  { cat: "headLine", sub: "sloping", title: "Zum Handgelenk abfallend", meaning: "Ihr Verstand ist tief einfallsreich und kreativ. Sie denken in Bildern, Möglichkeiten und Träumen und nicht nur in kalten Fakten." },
  { cat: "headLine", sub: "short", title: "Kurz und direkt", meaning: "Sie sind ein entscheidungsfreudiger, zielstrebiger Denker. Sie handeln lieber schnell nach einer Schlussfolgerung, als ein Problem zu überanalysieren." },
  { cat: "headLine", sub: "forked_writers", title: "Am Ende gegabelt (Schriftstellergabel)", meaning: "Sie haben eine brillante Fähigkeit, mehrere Seiten einer Situation zu sehen. Dieses Zeichen wird stark mit Schriftstellern, Kommunikatoren und kreativen Denkern in Verbindung gebracht." },
  { cat: "headLine", sub: "chained", title: "Kettenartig oder wellig", meaning: "Ihre intellektuelle Reise ist von Zeiten brillanter Inspiration gefolgt von Verwirrung geprägt. Sie brauchen Frieden, um Ihren Geist zu fokussieren." },
  { cat: "headLine", sub: "broken", title: "Gebrochen oder unterbrochen", meaning: "Ein scharfer Bruch deutet auf eine große Verschiebung Ihres Weltbildes, Ihres Karriereweges oder Ihres Glaubenssystems an einem Punkt in Ihrem Leben hin." },
  { cat: "headLine", sub: "separated_from_life", title: "Von der Lebenslinie getrennt", meaning: "Sie sind extrem unabhängig, impulsiv und sehnen sich nach Freiheit. Von klein auf wollten Sie Ihre eigenen Regeln machen." },

  { cat: "lifeLine", sub: "deep_long", title: "Tief und lang", meaning: "Sie besitzen eine starke Konstitution, unglaubliche körperliche Ausdauer und ein tief verwurzeltes Gefühl von Stabilität und Ausdauer auf Ihrer Lebensreise." },
  { cat: "lifeLine", sub: "short", title: "Kurz oder schwach", meaning: "Dies bedeutet kein kurzes Leben, sondern weist auf körperliche Zartheit oder Zeiten hin, in denen Sie Ihre Energie bewusst schützen und wiederherstellen müssen." },
  { cat: "lifeLine", sub: "chained", title: "Kettenartig oder geflochten", meaning: "Ihr Weg beinhaltet das Navigieren durch Phasen empfindlicher Gesundheit oder komplexer emotionaler Kämpfe, die bewusste Heilung und Selbstfürsorge erfordern." },
  { cat: "lifeLine", sub: "broken", title: "Gebrochen oder unterbrochen", meaning: "Sie werden eine massive, transformative Veränderung in Ihrem Leben erleben – eine vollständige Veränderung der Umgebung, des Glaubens oder des Lebensstils, die wie eine tiefgreifende Wiedergeburt wirkt." },
  { cat: "lifeLine", sub: "double_line", title: "Doppelte Lebenslinie", meaning: "Sie haben eine mächtige 'Schutzengel'-Linie. Diese bietet extremen kosmischen Schutz und gewährt Ihnen die Fähigkeit, immense Härten zu überleben und gestärkt daraus hervorzugehen." },

  { cat: "fateLine", sub: "clear_deep", title: "Klar und tief", meaning: "Sie haben einen sehr starken Sinn für den Zweck und einen klaren Lebensweg. Sie sind sehr zielstrebig und dazu bestimmt, einen bedeutenden Eindruck in der Welt zu hinterlassen." },
  { cat: "fateLine", sub: "faint", title: "Schwach oder wellig", meaning: "Ihr Weg im Leben ist sehr anpassungsfähig und neigt dazu, die Richtung zu ändern. Sie erkunden viele verschiedene Karrieren und Philosophien, bevor Sie Ihre wahre Berufung finden." },
  { cat: "fateLine", sub: "absent", title: "Fehlende Schicksalslinie", meaning: "Sie sind ein wahrer Freigeist. Sie sind nicht an ein starres Schicksal oder einen traditionellen Karriereweg gebunden; Sie erschaffen Ihre eigene einzigartige Bedeutung in der Welt." },
  { cat: "fateLine", sub: "starting_life_line", title: "Ausgehend von der Lebenslinie", meaning: "Ihr Erfolg ist komplett selbst gemacht. Ihre frühen Jahre waren tief mit Ihrer Familie verbunden, und Ihre Erfolge sind ein direktes Ergebnis Ihrer eigenen enormen Willenskraft." },

  { cat: "minorLines", sub: "mystic_cross", title: "Mystisches Kreuz", meaning: "Dieses seltene Zeichen zwischen Kopf- und Herzlinie weist auf tiefe okkulte Fähigkeiten, eine tiefe Verbindung zur Astrologie und eine sehr intuitive Seele hin." },
  { cat: "minorLines", sub: "girdle_venus", title: "Venusgürtel", meaning: "Eine Kurve über der Herzlinie, die extreme emotionale Sensibilität, stark angespannte Nerven und eine tiefe, leidenschaftliche Kapazität für Kunst und Romantik anzeigt." },
  { cat: "minorLines", sub: "intuition_line", title: "Linie der Intuition", meaning: "Eine Halbmondkurve am Rand der Handfläche, die übersinnliche Vorhersagen, lebhafte prophetische Träume und Bauchgefühle offenbart, die fast immer richtig sind." },
  { cat: "minorLines", sub: "ring_solomon", title: "Salomonsring", meaning: "Eine Kurve unter dem Zeigefinger, die auf große Weisheit, Autorität und die Fähigkeit hinweist, andere durch spirituelle oder psychologische Einsicht zu lehren und zu führen." },
  { cat: "minorLines", sub: "health_line", title: "Gesundheitslinie", meaning: "Diese Linie, die vom kleinen Finger bis zum Handgelenk verläuft, fungiert als Barometer für Ihr Nervensystem und Ihre körperliche Gesundheit. Ihre Präsenz drängt Sie, Stress und Ruhe in Einklang zu bringen." }
];

async function updateDb() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");
  
  const PalmistryContent = mongoose.models.PalmistryContent || mongoose.model("PalmistryContent", new mongoose.Schema({
    language: String,
    category: String,
    subCategory: String,
    title: String,
    meaning: String,
  }, { strict: false }));

  for (const item of guData) {
    await PalmistryContent.updateOne(
      { language: "gu", category: item.cat, subCategory: item.sub },
      { $set: { title: item.title, meaning: item.meaning } },
      { upsert: true }
    );
  }
  for (const item of zhData) {
    await PalmistryContent.updateOne(
      { language: "zh", category: item.cat, subCategory: item.sub },
      { $set: { title: item.title, meaning: item.meaning } },
      { upsert: true }
    );
  }
  for (const item of deData) {
    await PalmistryContent.updateOne(
      { language: "de", category: item.cat, subCategory: item.sub },
      { $set: { title: item.title, meaning: item.meaning } },
      { upsert: true }
    );
  }
  
  console.log("Updated Gujarati, Chinese, and German translations");
  process.exit(0);
}

updateDb().catch(console.error);
