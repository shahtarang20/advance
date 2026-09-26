import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://shahtarang20_db_user:Shahtarang2003@cluster0.cdqvn6e.mongodb.net/mystic_oracle?retryWrites=true&w=majority&appName=Cluster0";

const OracleAnswerSchema = new mongoose.Schema({
  language: { type: String, required: true },
  question_id: { type: String, required: true },
  responses: { type: [String], required: true },
});
OracleAnswerSchema.index({ language: 1, question_id: 1 }, { unique: true });
const OracleAnswer = mongoose.models.OracleAnswer || mongoose.model("OracleAnswer", OracleAnswerSchema);

const longAnswers = {
  en: [
    "The stars have aligned perfectly in your favor, bringing a wave of positive energy. Trust in the current path you are walking, and proceed with absolute confidence as the universe supports your next move.",
    "Patience is highly required at this exact moment, as the cosmic timing is not quite right yet. Allow the universe to arrange the necessary pieces before you take a leap of faith.",
    "A surprising and sudden change is on the horizon, bringing exactly what you need rather than what you expected. Embrace the unknown, for it holds the hidden blessings you have been seeking.",
    "Deep down, your intuition already knows the true path forward, even if your mind doubts it. Silence the outside noise and listen to your inner voice; it will safely guide you to your destination.",
    "The obstacles currently standing in your way are merely an illusion meant to test your true resolve. Push forward with unwavering determination, and you will see the walls crumble before you.",
    "You must actively let go of the heavy burdens of the past in order to fully embrace this new chapter. Forgiveness and release will clear the cosmic blockages currently holding back your potential.",
    "This is not a journey you should undertake entirely alone at this moment. Seek the wise counsel of a trusted mentor or friend before making any final decisions that will alter your course.",
    "Yes, the outcome you desire is within reach, but it will require significant hard work and unyielding dedication. The universe rewards those who are willing to put in the focused effort.",
    "The universe is currently testing your resolve to see how deeply you truly want this outcome. Stand firm in the face of adversity, and your resilience will be rewarded tenfold.",
    "A sudden and powerful realization is coming to you very soon, completely shifting your perspective. This newfound clarity will effortlessly solve the dilemma that has been weighing heavily on your mind.",
    "Do not rush the delicate process of your growth. Step back, breathe, and let things unfold naturally at their own divine pace without forcing an immediate outcome.",
    "An unexpected person from your periphery holds the essential key to unlocking this situation. Keep your heart open to new connections and conversations in the coming days.",
    "A massive current of abundance is beginning to flow directly toward you right now. Open your arms and accept it with profound gratitude, knowing you are truly worthy of this blessing.",
    "You have been searching outward for an answer that you already possess deep within your heart. Trust your own wisdom, for you are far more connected to the divine truth than you realize.",
    "Focus entirely on restoring balance in your daily life, nurturing both your mind and your spirit. Once you achieve this inner harmony, the external success you seek will naturally follow.",
    "You are entering a brief period of confusion and chaos, but do not be afraid. This temporary turbulence is necessary to clear the old energy and will quickly lead to profound clarity.",
    "Stay incredibly positive and watch your words, as your thoughts are manifesting into reality faster than ever. Focus only on what you truly desire, and watch the universe deliver it to you.",
    "The period of waiting and planning is officially over, and the cosmos is signaling a green light. Now is the exact time for bold, courageous action that will propel you toward your ultimate destiny.",
    "Before you can successfully take the next major step, your spirit requires deep rest and healing. Take time to pause, recharge your energy, and gather your strength for the upcoming journey.",
    "The final outcome of this situation will be far more beautiful and fulfilling than you can currently imagine. Surrender your worries to the universe and prepare to be wonderfully surprised."
  ],
  hi: [
    "तारे आपके पक्ष में पूरी तरह से संरेखित हो गए हैं, जिससे सकारात्मक ऊर्जा की लहर आ रही है। आप जिस मार्ग पर चल रहे हैं उस पर भरोसा करें, और पूर्ण आत्मविश्वास के साथ आगे बढ़ें क्योंकि ब्रह्मांड आपके अगले कदम का समर्थन करता है।",
    "इस सटीक क्षण में अत्यधिक धैर्य की आवश्यकता है, क्योंकि लौकिक समय अभी पूरी तरह से सही नहीं है। विश्वास की छलांग लगाने से पहले ब्रह्मांड को आवश्यक टुकड़ों को व्यवस्थित करने दें।",
    "एक आश्चर्यजनक और अचानक परिवर्तन क्षितिज पर है, जो ठीक वही ला रहा है जिसकी आपको आवश्यकता है। अज्ञात को गले लगाओ, क्योंकि इसमें वह छिपे हुए आशीर्वाद हैं जिन्हें आप खोज रहे हैं।",
    "गहराई में, आपका अंतर्ज्ञान पहले से ही आगे बढ़ने का सही रास्ता जानता है, भले ही आपका मन इस पर संदेह करे। बाहरी शोर को शांत करें और अपनी आंतरिक आवाज़ को सुनें; यह आपको सुरक्षित रूप से आपके गंतव्य तक ले जाएगा।",
    "वर्तमान में आपके रास्ते में खड़ी बाधाएं केवल एक भ्रम हैं जो आपके सच्चे संकल्प का परीक्षण करने के लिए हैं। अटूट दृढ़ संकल्प के साथ आगे बढ़ें, और आप देखेंगे कि आपके सामने दीवारें ढह गई हैं।",
    "इस नए अध्याय को पूरी तरह से अपनाने के लिए आपको अतीत के भारी बोझ को सक्रिय रूप से छोड़ना होगा। क्षमा और मुक्ति उन लौकिक रुकावटों को दूर कर देगी जो वर्तमान में आपकी क्षमता को रोक रही हैं।",
    "यह ऐसी यात्रा नहीं है जिसे आपको इस समय पूरी तरह से अकेले करना चाहिए। अपने पाठ्यक्रम को बदलने वाले किसी भी अंतिम निर्णय लेने से पहले किसी विश्वसनीय गुरु या मित्र की बुद्धिमानी भरी सलाह लें।",
    "हां, जो परिणाम आप चाहते हैं वह पहुंच के भीतर है, लेकिन इसके लिए महत्वपूर्ण कड़ी मेहनत और अदम्य समर्पण की आवश्यकता होगी। ब्रह्मांड उन लोगों को पुरस्कृत करता है जो केंद्रित प्रयास करने को तैयार हैं।",
    "ब्रह्मांड वर्तमान में यह देखने के लिए आपके संकल्प का परीक्षण कर रहा है कि आप वास्तव में यह परिणाम कितनी गहराई से चाहते हैं। विपरीत परिस्थितियों में दृढ़ रहें, और आपके लचीलेपन को दस गुना पुरस्कृत किया जाएगा।",
    "एक अचानक और शक्तिशाली अहसास बहुत जल्द आपके पास आ रहा है, जो आपके दृष्टिकोण को पूरी तरह से बदल रहा है। यह नई स्पष्टता आसानी से उस दुविधा को हल कर देगी जो आपके दिमाग पर भारी पड़ रही है।",
    "अपने विकास की नाजुक प्रक्रिया में जल्दबाजी न करें। पीछे हटें, सांस लें, और चीजों को तत्काल परिणाम के लिए मजबूर किए बिना अपनी दिव्य गति से स्वाभाविक रूप से सामने आने दें।",
    "आपकी परिधि से एक अप्रत्याशित व्यक्ति इस स्थिति को अनलॉक करने की आवश्यक कुंजी रखता है। आने वाले दिनों में नए कनेक्शन और बातचीत के लिए अपना दिल खुला रखें।",
    "प्रचुरता की एक विशाल धारा अभी सीधे आपकी ओर बहने लगी है। अपनी बाहों को खोलें और इसे गहरी कृतज्ञता के साथ स्वीकार करें, यह जानकर कि आप वास्तव में इस आशीर्वाद के योग्य हैं।",
    "आप उस उत्तर के लिए बाहर खोज रहे हैं जो आपके पास पहले से ही आपके दिल में गहराई से है। अपने स्वयं के ज्ञान पर भरोसा करें, क्योंकि आप जितना महसूस करते हैं उससे कहीं अधिक दिव्य सत्य से जुड़े हैं।",
    "अपने दैनिक जीवन में संतुलन बहाल करने पर पूरी तरह से ध्यान केंद्रित करें, अपने दिमाग और अपनी आत्मा दोनों का पोषण करें। एक बार जब आप इस आंतरिक सद्भाव को प्राप्त कर लेते हैं, तो आप जो बाहरी सफलता चाहते हैं वह स्वाभाविक रूप से मिलेगी।",
    "आप भ्रम और अराजकता की एक संक्षिप्त अवधि में प्रवेश कर रहे हैं, लेकिन डरो मत। पुरानी ऊर्जा को साफ करने के लिए यह अस्थायी अशांति आवश्यक है और जल्दी से गहन स्पष्टता की ओर ले जाएगी।",
    "अविश्वसनीय रूप से सकारात्मक रहें और अपने शब्दों को देखें, क्योंकि आपके विचार पहले से कहीं अधिक तेज़ी से वास्तविकता में प्रकट हो रहे हैं। केवल उसी पर ध्यान केंद्रित करें जो आप वास्तव में चाहते हैं, और देखें कि ब्रह्मांड इसे आपको कैसे प्रदान करता है।",
    "प्रतीक्षा और योजना की अवधि आधिकारिक तौर पर समाप्त हो गई है, और ब्रह्मांड एक हरी बत्ती का संकेत दे रहा है। अब साहसिक, साहसी कार्रवाई का सही समय है जो आपको आपके अंतिम भाग्य की ओर ले जाएगा।",
    "इससे पहले कि आप सफलतापूर्वक अगला बड़ा कदम उठा सकें, आपकी आत्मा को गहरे आराम और उपचार की आवश्यकता है। रुकने के लिए समय निकालें, अपनी ऊर्जा को रिचार्ज करें, और आगामी यात्रा के लिए अपनी ताकत इकट्ठा करें।",
    "इस स्थिति का अंतिम परिणाम आपकी वर्तमान कल्पना से कहीं अधिक सुंदर और संतोषजनक होगा। अपनी चिंताओं को ब्रह्मांड को सौंपें और आश्चर्यजनक रूप से आश्चर्यचकित होने के लिए तैयार रहें।"
  ],
  gu: [
    "તારાઓ તમારી તરફેણમાં સંપૂર્ણ રીતે ગોઠવાઈ ગયા છે, જે સકારાત્મક ઉર્જાની લહેર લાવી રહ્યા છે. તમે જે માર્ગ પર ચાલી રહ્યા છો તેના પર વિશ્વાસ કરો, અને પૂર્ણ આત્મવિશ્વાસ સાથે આગળ વધો કારણ કે બ્રહ્માંડ તમારા આગલા પગલાને સમર્થન આપે છે.",
    "આ ચોક્કસ ક્ષણે અત્યંત ધીરજની જરૂર છે, કારણ કે વૈશ્વિક સમય હજી સંપૂર્ણ રીતે યોગ્ય નથી. તમે વિશ્વાસની છલાંગ લગાવો તે પહેલાં બ્રહ્માંડને જરૂરી ટુકડાઓ ગોઠવવા દો.",
    "એક આશ્ચર્યજનક અને અચાનક પરિવર્તન ક્ષિતિજ પર છે, જે તમને જે જોઈએ છે તે બરાબર લાવી રહ્યું છે. અજાણ્યાને સ્વીકારો, કારણ કે તેમાં તમે જે શોધી રહ્યા છો તે છુપાયેલા આશીર્વાદ છે.",
    "ઊંડાણમાં, તમારી અંતર્જ્ઞાન પહેલાથી જ આગળ વધવાનો સાચો રસ્તો જાણે છે, ભલે તમારું મન તેના પર શંકા કરે. બહારના અવાજને શાંત કરો અને તમારા આંતરિક અવાજને સાંભળો; તે તમને સુરક્ષિત રીતે તમારા મુકામ સુધી લઈ જશે.",
    "હાલમાં તમારા માર્ગમાં ઉભા રહેલા અવરોધો તમારા સાચા સંકલ્પની કસોટી કરવા માટે માત્ર એક ભ્રમ છે. અડગ દ્રઢ નિશ્ચય સાથે આગળ વધો, અને તમે જોશો કે તમારી સામે દિવાલો તૂટી પડી છે.",
    "આ નવા પ્રકરણને સંપૂર્ણ રીતે સ્વીકારવા માટે તમારે ભૂતકાળના ભારે બોજને સક્રિયપણે છોડી દેવો જોઈએ. ક્ષમા અને મુક્તિ તે વૈશ્વિક અવરોધોને દૂર કરશે જે હાલમાં તમારી ક્ષમતાને રોકી રહ્યા છે.",
    "આ એવી યાત્રા નથી જે તમારે આ સમયે સંપૂર્ણપણે એકલા જ કરવી જોઈએ. તમારો માર્ગ બદલશે તેવા કોઈપણ અંતિમ નિર્ણયો લેતા પહેલા વિશ્વાસપાત્ર માર્ગદર્શક અથવા મિત્રની સમજદાર સલાહ લો.",
    "હા, તમે જે પરિણામ ઈચ્છો છો તે પહોંચની અંદર છે, પરંતુ તેના માટે નોંધપાત્ર સખત મહેનત અને અડગ સમર્પણની જરૂર પડશે. બ્રહ્માંડ તે લોકોને પુરસ્કાર આપે છે જેઓ કેન્દ્રિત પ્રયત્નો કરવા તૈયાર છે.",
    "બ્રહ્માંડ હાલમાં તમારા સંકલ્પની કસોટી કરી રહ્યું છે તે જોવા માટે કે તમે ખરેખર આ પરિણામ કેટલી ઊંડાણપૂર્વક ઈચ્છો છો. પ્રતિકૂળતાના ચહેરામાં મક્કમ રહો, અને તમારી સ્થિતિસ્થાપકતાને દસ ગણો પુરસ્કાર આપવામાં આવશે.",
    "એક અચાનક અને શક્તિશાળી અનુભૂતિ ખૂબ જ ટૂંક સમયમાં તમારી પાસે આવી રહી છે, જે તમારા પરિપ્રેક્ષ્યને સંપૂર્ણપણે બદલી નાખશે. આ નવી સ્પષ્ટતા વિના પ્રયાસે તે મૂંઝવણને હલ કરશે જે તમારા મન પર ભારે પડી રહી છે.",
    "તમારા વિકાસની નાજુક પ્રક્રિયામાં ઉતાવળ કરશો નહીં. પાછળ હટો, શ્વાસ લો, અને તાત્કાલિક પરિણામની ફરજ પાડ્યા વિના વસ્તુઓને તેમની પોતાની દૈવી ગતિએ કુદરતી રીતે બહાર આવવા દો.",
    "તમારી પરિઘમાંથી એક અણધારી વ્યક્તિ આ પરિસ્થિતિને અનલૉક કરવાની આવશ્યક ચાવી ધરાવે છે. આવનારા દિવસોમાં નવા જોડાણો અને વાતચીત માટે તમારું હૃદય ખુલ્લું રાખો.",
    "વિપુલતાનો વિશાળ પ્રવાહ અત્યારે સીધો તમારી તરફ વહેવા માંડ્યો છે. તમારા હાથ ખોલો અને તેને ઊંડી કૃતજ્ઞતા સાથે સ્વીકારો, એ જાણીને કે તમે ખરેખર આ આશીર્વાદને પાત્ર છો.",
    "તમે તે જવાબ માટે બહાર શોધી રહ્યા છો જે તમારી પાસે તમારા હૃદયમાં પહેલેથી જ ઊંડાણમાં છે. તમારા પોતાના જ્ઞાન પર વિશ્વાસ કરો, કારણ કે તમે ખ્યાલ કરતા વધુ દૈવી સત્ય સાથે જોડાયેલા છો.",
    "તમારા રોજિંદા જીવનમાં સંતુલન પુનઃસ્થાપિત કરવા પર સંપૂર્ણ ધ્યાન કેન્દ્રિત કરો, તમારા મન અને તમારી ભાવના બંનેનું પોષણ કરો. એકવાર તમે આ આંતરિક સંવાદિતા પ્રાપ્ત કરી લો, પછી તમે જે બાહ્ય સફળતા ઈચ્છો છો તે સ્વાભાવિક રીતે અનુસરશે.",
    "તમે મૂંઝવણ અને અરાજકતાના સંક્ષિપ્ત સમયગાળામાં પ્રવેશી રહ્યા છો, પરંતુ ડરશો નહીં. જૂની ઊર્જાને સાફ કરવા માટે આ અસ્થાયી અશાંતિ જરૂરી છે અને ઝડપથી ગહન સ્પષ્ટતા તરફ દોરી જશે.",
    "અતુલ્ય સકારાત્મક રહો અને તમારા શબ્દો પર ધ્યાન આપો, કારણ કે તમારા વિચારો પહેલા કરતા વધુ ઝડપથી વાસ્તવિકતામાં પ્રગટ થઈ રહ્યા છે. તમે જે ખરેખર ઈચ્છો છો તેના પર જ ધ્યાન કેન્દ્રિત કરો, અને જુઓ કે બ્રહ્માંડ તેને તમને કેવી રીતે પહોંચાડે છે.",
    "રાહ જોવા અને આયોજન કરવાનો સમય સત્તાવાર રીતે પૂરો થઈ ગયો છે, અને બ્રહ્માંડ લીલી ઝંડી આપી રહ્યું છે. હવે હિંમતવાન, સાહસિક પગલાં માટેનો ચોક્કસ સમય છે જે તમને તમારા અંતિમ ભાગ્ય તરફ લઈ જશે.",
    "તમે સફળતાપૂર્વક આગલું મોટું પગલું ભરી શકો તે પહેલાં, તમારી ભાવનાને ઊંડા આરામ અને ઉપચારની જરૂર છે. થોભાવવા માટે સમય કાઢો, તમારી ઊર્જા રિચાર્જ કરો, અને આગામી યાત્રા માટે તમારી શક્તિ એકઠી કરો.",
    "આ પરિસ્થિતિનું અંતિમ પરિણામ તમે અત્યારે કલ્પના કરી શકો તેના કરતા ઘણું વધુ સુંદર અને પરિપૂર્ણ હશે. તમારી ચિંતાઓને બ્રહ્માંડને સોંપી દો અને અદભૂત રીતે આશ્ચર્યચકિત થવા માટે તૈયાર રહો."
  ],
  de: [
    "Die Sterne haben sich perfekt zu Ihren Gunsten ausgerichtet und bringen eine Welle positiver Energie. Vertrauen Sie auf den aktuellen Weg, den Sie gehen, und schreiten Sie mit absoluter Zuversicht voran, da das Universum Ihren nächsten Schritt unterstützt.",
    "Geduld ist in genau diesem Moment sehr gefragt, da das kosmische Timing noch nicht ganz richtig ist. Erlauben Sie dem Universum, die notwendigen Teile zu arrangieren, bevor Sie einen Vertrauensvorschuss wagen.",
    "Eine überraschende und plötzliche Veränderung zeichnet sich ab, die genau das bringt, was Sie brauchen, anstatt das, was Sie erwartet haben. Umarmen Sie das Unbekannte, denn es birgt die verborgenen Segnungen, nach denen Sie gesucht haben.",
    "Tief im Inneren kennt Ihre Intuition bereits den wahren Weg nach vorne, auch wenn Ihr Verstand daran zweifelt. Bringen Sie die Außengeräusche zum Schweigen und hören Sie auf Ihre innere Stimme; sie wird Sie sicher an Ihr Ziel führen.",
    "Die Hindernisse, die Ihnen derzeit im Weg stehen, sind nur eine Illusion, die Ihre wahre Entschlossenheit auf die Probe stellen soll. Drängen Sie mit unerschütterlicher Entschlossenheit vorwärts, und Sie werden sehen, wie die Mauern vor Ihnen bröckeln.",
    "Sie müssen die schweren Lasten der Vergangenheit aktiv loslassen, um dieses neue Kapitel vollständig annehmen zu können. Vergebung und Loslassen werden die kosmischen Blockaden beseitigen, die derzeit Ihr Potenzial zurückhalten.",
    "Dies ist keine Reise, die Sie in diesem Moment ganz allein unternehmen sollten. Holen Sie den weisen Rat eines vertrauenswürdigen Mentors oder Freundes ein, bevor Sie endgültige Entscheidungen treffen, die Ihren Kurs ändern werden.",
    "Ja, das gewünschte Ergebnis ist in Reichweite, aber es erfordert erhebliche harte Arbeit und unnachgiebige Hingabe. Das Universum belohnt diejenigen, die bereit sind, die konzentrierte Anstrengung auf sich zu nehmen.",
    "Das Universum testet derzeit Ihre Entschlossenheit, um zu sehen, wie sehr Sie dieses Ergebnis wirklich wollen. Bleiben Sie im Angesicht von Widrigkeiten standhaft, und Ihre Widerstandsfähigkeit wird zehnfach belohnt.",
    "Eine plötzliche und kraftvolle Erkenntnis wird sehr bald zu Ihnen kommen und Ihre Perspektive völlig verändern. Diese neu gewonnene Klarheit wird das Dilemma, das schwer auf Ihrem Geist lastet, mühelos lösen.",
    "Überstürzen Sie den heiklen Prozess Ihres Wachstums nicht. Treten Sie zurück, atmen Sie durch und lassen Sie die Dinge sich natürlich in ihrem eigenen göttlichen Tempo entfalten, ohne ein sofortiges Ergebnis zu erzwingen.",
    "Eine unerwartete Person aus Ihrem Umfeld hält den wesentlichen Schlüssel zur Lösung dieser Situation in der Hand. Halten Sie Ihr Herz in den kommenden Tagen offen für neue Verbindungen und Gespräche.",
    "Ein massiver Strom des Überflusses beginnt jetzt direkt auf Sie zuzuströmen. Öffnen Sie Ihre Arme und nehmen Sie ihn mit tiefer Dankbarkeit an, im Wissen, dass Sie dieses Segens wirklich würdig sind.",
    "Sie haben im Außen nach einer Antwort gesucht, die Sie bereits tief in Ihrem Herzen tragen. Vertrauen Sie Ihrer eigenen Weisheit, denn Sie sind viel mehr mit der göttlichen Wahrheit verbunden, als Sie erkennen.",
    "Konzentrieren Sie sich ganz darauf, das Gleichgewicht in Ihrem täglichen Leben wiederherzustellen und sowohl Ihren Geist als auch Ihre Seele zu nähren. Sobald Sie diese innere Harmonie erreicht haben, wird der äußere Erfolg, den Sie suchen, natürlich folgen.",
    "Sie treten in eine kurze Zeit der Verwirrung und des Chaos ein, aber haben Sie keine Angst. Diese vorübergehende Turbulenz ist notwendig, um die alte Energie zu klären und wird schnell zu tiefer Klarheit führen.",
    "Bleiben Sie unglaublich positiv und achten Sie auf Ihre Worte, da sich Ihre Gedanken schneller denn je in der Realität manifestieren. Konzentrieren Sie sich nur auf das, was Sie wirklich begehren, und beobachten Sie, wie das Universum es Ihnen liefert.",
    "Die Zeit des Wartens und Planens ist offiziell vorbei, und der Kosmos signalisiert grünes Licht. Jetzt ist genau die Zeit für mutiges, couragiertes Handeln, das Sie Ihrem ultimativen Schicksal näher bringen wird.",
    "Bevor Sie den nächsten großen Schritt erfolgreich gehen können, benötigt Ihr Geist tiefe Ruhe und Heilung. Nehmen Sie sich Zeit innezuhalten, Ihre Energie aufzuladen und Kraft für die bevorstehende Reise zu sammeln.",
    "Das Endergebnis dieser Situation wird viel schöner und erfüllender sein, als Sie es sich derzeit vorstellen können. Übergeben Sie Ihre Sorgen dem Universum und machen Sie sich bereit, wunderbar überrascht zu werden."
  ],
  zh: [
    "星辰已经完美地向着对你有利的方向排列，带来了一股积极的能量。相信你目前正在走的路，并带着绝对的信心前进，因为宇宙支持你的下一步行动。",
    "此时此刻非常需要耐心，因为宇宙的时机还未完全成熟。在你放手一搏之前，让宇宙先把必要的棋子摆好。",
    "一个令人惊讶的突然变化即将来临，它带来的正是你所需要的，而不是你所期望的。拥抱未知，因为它蕴含着你一直在寻找的隐藏祝福。",
    "在内心深处，你的直觉已经知道了前进的真正方向，即使你的大脑对此表示怀疑。消除外界的噪音，倾听你内心的声音；它会安全地指引你到达目的地。",
    "目前阻碍你前进的障碍只是一种幻觉，旨在考验你的真正决心。带着坚定不移的决心向前推进，你会看到面前的墙壁轰然倒塌。",
    "你必须主动放下过去沉重的包袱，才能完全拥抱这个新的篇章。宽恕和释怀将清除目前阻碍你发挥潜力的宇宙障碍。",
    "在这个时候，你不应该完全独自踏上这段旅程。在做出任何将改变你航向的最终决定之前，请寻求值得信赖的导师或朋友的明智建议。",
    "是的，你渴望的结果触手可及，但这将需要大量的艰苦努力和不屈不挠的奉献精神。宇宙会奖励那些愿意投入专注努力的人。",
    "宇宙目前正在考验你的决心，看看你到底有多渴望得到这个结果。在逆境中坚定立场，你的坚韧将获得十倍的回报。",
    "一个突然而强大的顿悟很快就会降临到你身上，彻底改变你的视角。这种新获得的清晰度将毫不费力地解决一直沉重地压在心头的困境。",
    "不要急于求成你成长的微妙过程。退后一步，深呼吸，让事情以它们自己神圣的节奏自然展开，而不要强求立即产生结果。",
    "你周围的一个意想不到的人掌握着解开这个局面的关键。在接下来的几天里，保持敞开心扉，迎接新的联系和对话。",
    "一股巨大的财富和好运之流现在正开始直接流向你。张开双臂，怀着深深的感激之情接受它，因为你要知道，你确实配得上这份祝福。",
    "你一直在向外寻找一个你内心深处已经拥有的答案。相信你自己的智慧，因为你与神圣真理的联系远比你意识到的要紧密得多。",
    "把全部精力集中在恢复你日常生活的平衡上，滋养你的思想和精神。一旦你达到了这种内在的和谐，你所寻求的外在成功自然会随之而来。",
    "你正在进入一个短暂的混乱和迷茫时期，但不要害怕。这种暂时的动荡对于清除旧能量是必要的，并将很快带来深刻的清晰度。",
    "保持令人难以置信的积极心态，注意你的言辞，因为你的想法正在比以往任何时候都更快地在现实中显化。只专注于你真正渴望的东西，然后看着宇宙把它送到你面前。",
    "等待和计划的时期已经正式结束，宇宙正在发出绿灯信号。现在正是采取大胆、勇敢行动的绝佳时机，这将推动你走向最终的命运。",
    "在你能够成功迈出下一个重要步骤之前，你的精神需要深度的休息和疗愈。花点时间停下来，补充你的能量，为即将到来的旅程积蓄力量。",
    "这种情况的最终结果将比你目前所能想象的要美丽和令人满足得多。把你的担忧交给宇宙，准备好迎接奇妙的惊喜吧。"
  ]
};

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB. Updating all Oracle Answers...");

  const langs = ["en", "hi", "gu", "de", "zh"];

  for (const lang of langs) {
    const langAnswers = longAnswers[lang as keyof typeof longAnswers];
    
    // We update all documents for this language with the new 20 longer answers
    const result = await OracleAnswer.updateMany(
      { language: lang },
      { $set: { responses: langAnswers } }
    );
    
    console.log(`Updated responses for ${lang}: ${result.modifiedCount} documents modified.`);
  }

  console.log("SUCCESS! All answers have been updated to long 2-3 sentence deep mystical answers.");
  process.exit(0);
}

run().catch(console.error);
