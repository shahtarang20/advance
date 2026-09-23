// Palm reading content — deliberately framed as folklore/tradition, the same way this app
// frames horoscopes, tarot, and angel numbers: real, honest, well-researched content about
// what palmistry traditions say, but never presented as a scientifically validated prediction
// of the future. There is no camera analysis here — palm-line detection from a photo is
// unreliable even with a trained model, and wouldn't make the underlying claims any more true.
// Instead, the reading is deterministic and seedable (same pattern as tarot.ts), and draws on
// three real traditions so it isn't just repackaged Western pop-astrology:
//  - Western chirology/chiromancy (heart/head/life/fate/sun lines, the seven mounts)
//  - Hast Rekha Shastra, the Indian Vedic palmistry tradition (same lines, Sanskrit names,
//    tied to the same graha/planet system used elsewhere in this app's Kundli feature)
//  - Chinese palmistry (掌相), which names the three principal lines Heaven, Human, and Earth

export interface HistoryEra {
  id: string;
  period: string;
  title: string;
  text: string;
}

// A real, source-grounded history of palmistry across the cultures that shaped it — not
// invented lore. Included so the feature is honest about where these traditions actually come
// from, rather than presenting palmistry as a single unified or timeless system.
export const PALMISTRY_HISTORY: HistoryEra[] = [
  {
    id: "india_vedic",
    period: "c. 5000–3000 years ago",
    title: "Vedic India — Hast Rekha Shastra",
    text: "Palmistry's oldest surviving textual roots are usually traced to India, where Hast Rekha Shastra (\"the science of hand lines\") developed as part of the broader Vedic sciences alongside Jyotisha (Vedic astrology). Tradition credits the sage Valmiki with an early Sanskrit treatise on the subject. This is also the tradition that mapped the palm's mounts to the same nine grahas (planets) used in Vedic birth-chart astrology — the same graha system this app's Kundli feature uses — which is why palmistry and astrology have always been closely linked in Indian practice.",
  },
  {
    id: "china",
    period: "c. 3000+ years ago",
    title: "Ancient China — 掌相 (Zhang Xiang)",
    text: "Chinese palmistry developed independently, as part of a wider system of physiognomy (面相, reading the face and body) rooted in Taoist and folk-cosmological ideas about qi and the five elements. It names the palm's three principal lines the Heaven line, Human line, and Earth line, and reads the hand's overall shape and texture as an expression of a person's elemental balance, distinct from — but conceptually parallel to — the Western and Indian line systems.",
  },
  {
    id: "greece",
    period: "c. 4th century BCE",
    title: "Ancient Greece — chiromancy enters the West",
    text: "In the Greek world, palmistry (then called chiromancy) was taken seriously enough that Aristotle is traditionally said to have written on the subject, and it's mentioned by later classical writers as an established, if debated, practice. Through Greek and later Arabic scholarship, this is the route by which hand-reading entered the Western intellectual tradition alongside astrology and medicine.",
  },
  {
    id: "medieval_arabic",
    period: "8th–13th century CE",
    title: "The Islamic Golden Age — preserved and expanded",
    text: "During the Islamic Golden Age, Arabic scholars translated, preserved, and expanded on Greek texts covering chiromancy alongside astrology and medicine, at a time when much of this material was being lost in Europe. Their work is a major reason classical hand-reading texts survived to reach medieval Europe at all.",
  },
  {
    id: "medieval_europe",
    period: "12th–17th century CE",
    title: "Medieval and Renaissance Europe",
    text: "Chiromancy re-entered Europe through Latin translations of Arabic texts and became a common (if often condemned by the Church) folk and court practice through the medieval and Renaissance periods. Romani travelers, arriving in Europe from the 15th century onward, became closely associated with palmistry in the popular imagination — a link that persists in Western pop culture today, though the practice by then already had many independent European roots of its own.",
  },
  {
    id: "modern_western",
    period: "19th–20th century CE",
    title: "Modern Western chirology",
    text: "The line-and-mount system most familiar in the West today — Heart, Head, Life, Fate, and Sun lines; the seven planetary mounts; the four elemental hand shapes (Earth, Air, Fire, Water) — was systematized in the late 19th and early 20th century by writers such as William G. Benham (\"The Laws of Scientific Hand Reading\", 1900) and the popular fortune-teller Cheiro (Count Louis Hamon). This is the version of palmistry most Western books and apps, including this one, actually draw on.",
  },
];

export const historyTitleKey = (id: string) => `palmistry.history.${id}.title`;
export const historyTextKey = (id: string) => `palmistry.history.${id}.text`;

export type Hand = "left" | "right";

export type HandShape = "earth" | "air" | "fire" | "water";

export interface HandShapeInfo {
  name: string;
  westernName: string;
  chineseElement: string;
  traits: string;
}

export const HAND_SHAPES: Record<HandShape, HandShapeInfo> = {
  earth: {
    name: "Earth Hand",
    westernName: "Square palm, short fingers",
    chineseElement: "Earth (土)",
    traits:
      "A square, solid palm with short, thick fingers. Traditionally read as practical, grounded, and reliable — someone who trusts what they can see and touch, works steadily, and is uncomfortable with abstraction for its own sake.",
  },
  air: {
    name: "Air Hand",
    westernName: "Square palm, long fingers",
    chineseElement: "Metal (金)",
    traits:
      "A square or rectangular palm with long fingers and often visible knuckles. Traditionally linked to communication, intellect, and restlessness — a quick mind that needs new ideas and conversation the way other hands need routine.",
  },
  fire: {
    name: "Fire Hand",
    westernName: "Long palm, short fingers",
    chineseElement: "Fire (火)",
    traits:
      "A long or rectangular palm with short fingers, often warm and flushed. Traditionally associated with energy, enthusiasm, and impulsiveness — a hand that reaches for the next thing before finishing the last, and leads with instinct over analysis.",
  },
  water: {
    name: "Water Hand",
    westernName: "Long palm, long fingers",
    chineseElement: "Water (水)",
    traits:
      "A long, oval palm with long, flexible fingers. Traditionally read as sensitive, imaginative, and emotionally attuned — a hand said to belong to dreamers, artists, and people who absorb the moods of a room without trying to.",
  },
};

interface LineVariant {
  title: string;
  meaning: string;
}

// Heart Line — Western chiromancy; Hridaya Rekha in Hast Rekha Shastra; the "Heaven line" (天纹)
// in Chinese palmistry. Runs beneath the fingers, read for love, emotion, and relationships.
export const HEART_LINE_VARIANTS: Record<string, LineVariant> = {
  long_curved: {
    title: "Long and gently curved",
    meaning:
      "A long, softly curving Heart Line is traditionally read as warm and expressive in love — someone who feels deeply, shows it openly, and isn't afraid of emotional risk. Hast Rekha Shastra links this to a generous, affectionate Venusian temperament.",
  },
  straight_short: {
    title: "Short and straight",
    meaning:
      "A short, straight Heart Line is traditionally associated with a more guarded, practical approach to love — affection expressed through action and loyalty rather than grand declarations, and a real dislike of performative romance.",
  },
  deeply_etched: {
    title: "Deep and clearly etched",
    meaning:
      "A deep, well-defined Heart Line is traditionally read as emotional intensity and constancy — feelings that run strong and steady rather than shallow or fickle, once trust has been given.",
  },
  chained: {
    title: "Chained or wavy",
    meaning:
      "A chained or wavy Heart Line is traditionally interpreted as a history of emotional ups and downs in relationships — sensitivity that can tip into overwhelm, and a need to consciously build emotional steadiness rather than expect it to come easily.",
  },
  forked_end: {
    title: "Forked at the end",
    meaning:
      "A Heart Line that forks near the index or middle finger is traditionally read as balance — the ability to love both passionately and sensibly, holding both the heart's wants and the head's judgment at once.",
  },
  broken: {
    title: "Broken or interrupted",
    meaning:
      "A break in the Heart Line is traditionally read as a significant emotional turning point — often a past heartbreak or a relationship that reshaped how you love, rather than a permanent flaw.",
  },
};

// Head Line — Western chiromancy; Mastishk Rekha in Hast Rekha Shastra; the "Human line" (人纹)
// in Chinese palmistry. Runs across the middle of the palm, read for thought and intellect.
export const HEAD_LINE_VARIANTS: Record<string, LineVariant> = {
  long_straight: {
    title: "Long and straight",
    meaning:
      "A long, straight Head Line is traditionally read as focused, logical, and realistic thinking — a mind that likes clear evidence and dislikes ambiguity, well-suited to detailed or technical work.",
  },
  sloping: {
    title: "Sloping toward the wrist",
    meaning:
      "A Head Line that curves down toward the wrist (toward the Mount of the Moon) is traditionally associated with imagination and creativity — a mind that thinks in pictures and possibilities rather than strictly in facts.",
  },
  short: {
    title: "Short and direct",
    meaning:
      "A short Head Line is traditionally read as decisive, single-minded thinking — someone who prefers to act quickly on a conclusion rather than turning a problem over for a long time.",
  },
  forked_writers: {
    title: "Forked at the end (the \"writer's fork\")",
    meaning:
      "A Head Line that splits into two branches near its end is traditionally called the writer's fork, read as the ability to hold both practical and imaginative thinking at once — often associated with skill in writing or persuasive communication.",
  },
  chained: {
    title: "Chained or faint",
    meaning:
      "A chained or faint Head Line is traditionally read as a mind prone to distraction or overthinking — sharp in bursts, but needing structure to stay focused on one thread at a time.",
  },
  deeply_etched: {
    title: "Deep and unbroken",
    meaning:
      "A deep, unbroken Head Line is traditionally read as strong mental discipline and clarity — steady concentration and a memory that holds onto detail well.",
  },
};

// Life Line — Western chiromancy; Jeevan Rekha in Hast Rekha Shastra; the "Earth line" (地纹) in
// Chinese palmistry. Curves around the base of the thumb; traditionally read for vitality and
// life changes — importantly, its LENGTH is not read as lifespan in any credible modern reading
// of the tradition, only its depth and character as vitality and resilience.
export const LIFE_LINE_VARIANTS: Record<string, LineVariant> = {
  wide_curve: {
    title: "Wide, sweeping curve",
    meaning:
      "A Life Line that arcs well out into the palm is traditionally read as strong vitality and an enthusiastic, energetic approach to life — comfortable taking up space and pursuing what you want.",
  },
  close_curve: {
    title: "Close to the thumb",
    meaning:
      "A Life Line that hugs close to the thumb is traditionally associated with a more cautious, careful temperament — energy conserved rather than spent freely, and a preference for the familiar over the unknown.",
  },
  deeply_etched: {
    title: "Deep and clearly etched",
    meaning:
      "A deep, well-defined Life Line is traditionally read as robust physical vitality and resilience — the capacity to recover well from setbacks.",
  },
  doubled: {
    title: "Doubled (a second line running alongside)",
    meaning:
      "A faint second line running alongside the Life Line is traditionally called a 'sister line' and is read as extra support and protection through hard periods — traditionally a favorable sign in both Western and Hast Rekha Shastra readings.",
  },
  broken: {
    title: "Broken or interrupted",
    meaning:
      "A break in the Life Line is traditionally read as a major life change or turning point — a shift in circumstances or direction, not (in any serious reading of the tradition) a literal marker of illness or lifespan.",
  },
  chained: {
    title: "Chained near the start",
    meaning:
      "Chaining in the Life Line near the thumb is traditionally associated with a more sensitive constitution in early life, often said to settle into steadier vitality as the line clears further along its curve.",
  },
};

// Fate Line (Destiny Line) — Bhagya Rekha in Hast Rekha Shastra. Runs vertically up the palm;
// not everyone has a strong one, and its absence is traditionally read as a self-directed life
// rather than a life shaped heavily by external circumstance.
export const FATE_LINE_VARIANTS: Record<string, LineVariant> = {
  absent_faint: {
    title: "Absent or very faint",
    meaning:
      "No clear Fate Line is traditionally read as a life built more by your own choices than by circumstance or a fixed path — freedom, but also more responsibility for charting your own direction.",
  },
  straight_deep: {
    title: "Straight and deeply etched",
    meaning:
      "A strong, straight Fate Line running from the base of the palm toward the fingers is traditionally read as a clear, purposeful sense of direction in career and life path, often set early and pursued with consistency.",
  },
  starts_late: {
    title: "Starts partway up the palm",
    meaning:
      "A Fate Line that only begins partway up the palm is traditionally read as a life direction that becomes clear later — often after a formative period of searching or a distinct turning point.",
  },
  wavy_broken: {
    title: "Wavy or broken",
    meaning:
      "A wavy or broken Fate Line is traditionally associated with a career or life path that changes direction more than once — traditionally read as adaptability rather than instability.",
  },
};

// Sun Line (Apollo Line) — read for recognition, creativity, and fulfillment. Also not present
// on every hand.
export const SUN_LINE_VARIANTS: Record<string, LineVariant> = {
  absent: {
    title: "Absent or very faint",
    meaning:
      "No strong Sun Line is traditionally read as fulfillment found more through quiet, personal satisfaction than through public recognition — success measured on your own terms.",
  },
  clear_present: {
    title: "Clear and present",
    meaning:
      "A clear Sun (Apollo) Line beneath the ring finger is traditionally read as a gift for creative or public success — recognition, charisma, and a life where your work tends to be noticed.",
  },
  faint_multiple: {
    title: "Several faint lines",
    meaning:
      "Multiple faint Sun Lines are traditionally read as talent spread across several creative pursuits rather than concentrated in one — versatility, though sometimes at the cost of specializing deeply in a single one.",
  },
};

// Marriage / relationship lines — small horizontal lines on the outer edge of the palm below the
// little finger. Traditionally read for significant emotional partnerships, not literal marriage
// count.
export const MARRIAGE_LINE_VARIANTS: Record<string, LineVariant> = {
  one_deep: {
    title: "One deep, clear line",
    meaning:
      "A single deep line here is traditionally read as one especially significant, lasting emotional partnership — depth and commitment rather than frequency.",
  },
  two_lines: {
    title: "Two lines of similar depth",
    meaning:
      "Two lines of similar strength are traditionally read as two major emotional partnerships across a lifetime, both significant rather than one being a 'lesser' relationship.",
  },
  faint_multiple: {
    title: "Several faint lines",
    meaning:
      "Several faint lines are traditionally read as an emotionally rich romantic history — meaningful connections and attachments, without any one reading as more 'permanent' than the others.",
  },
};

// Quick-read summary sections — Career, Growth, Money, Marriage & Relationships. Shown at the
// top of the result page as a fast, skimmable "headline" before the detailed line-by-line
// reading further down. Drawn from the same three traditions as the rest of this file (mainly
// the Fate/Sun/Marriage lines and the Jupiter/Saturn/Mercury/Venus mounts), just written as
// self-contained two-sentence summaries rather than requiring the reader to piece together
// several line entries themselves. Same folklore framing, same seeded determinism.
export const CAREER_SUMMARY_VARIANTS: Record<string, LineVariant> = {
  steady_climb: {
    title: "A steady, self-built climb",
    meaning:
      "Traditionally read as a career built through consistent effort rather than a single lucky break — progress that compounds quietly year over year. Recognition tends to arrive a little after the work that earned it, not before.",
  },
  late_bloomer: {
    title: "Direction that clarifies later",
    meaning:
      "Traditionally read as a path that takes longer to settle into focus, often after an earlier phase of searching or trying different things. Once it clicks, it tends to be pursued with real conviction.",
  },
  reinvention: {
    title: "More than one chapter",
    meaning:
      "Traditionally read as a career that changes direction at least once, not from instability but from genuine range — skills from an earlier chapter often resurface usefully in a later one. Adaptability is the throughline, not any single job title.",
  },
  leadership: {
    title: "A pull toward leading",
    meaning:
      "Traditionally read as a natural draw toward responsibility and being the one others look to for direction. This tends to show up early, even in informal settings, well before any official title catches up to it.",
  },
  craft_focused: {
    title: "Depth over breadth",
    meaning:
      "Traditionally read as fulfillment found in going deep on a single craft or specialty rather than spreading across many roles. Mastery, in this reading, matters more than visibility.",
  },
};

export const GROWTH_SUMMARY_VARIANTS: Record<string, LineVariant> = {
  through_challenge: {
    title: "Growth through what tests you",
    meaning:
      "Traditionally read as a person who develops most in periods of real difficulty rather than comfort — the hard chapters tend to be the ones that reshape you the most. Ease is welcome, but rarely where the biggest change happens.",
  },
  steady_maturing: {
    title: "Quiet, steady maturing",
    meaning:
      "Traditionally read as gradual, consistent inner development rather than sudden transformation — the kind of growth that's hard to notice week to week but is unmistakable looking back a few years.",
  },
  turning_point: {
    title: "A defining turning point",
    meaning:
      "Traditionally read as a life shaped around one or two pivotal moments that genuinely changed its direction, rather than many small shifts. You likely already know, or will recognize, when it happens.",
  },
  self_taught: {
    title: "Growth through self-direction",
    meaning:
      "Traditionally read as someone who grows more through their own initiative — reading, reflecting, trying things alone — than through formal guidance. Self-trust is both the challenge and the reward here.",
  },
  through_others: {
    title: "Growth through relationships",
    meaning:
      "Traditionally read as a person shaped significantly by the people closest to them — mentors, partners, close friends — more than by solitary experience. Who you spend time with matters more than usual for how you develop.",
  },
};

export const MONEY_SUMMARY_VARIANTS: Record<string, LineVariant> = {
  builder: {
    title: "Wealth built, not inherited",
    meaning:
      "Traditionally read as financial security earned gradually through effort and patience rather than windfalls — steady accumulation over any single big win. Discipline with money tends to matter more than income itself.",
  },
  cautious: {
    title: "Careful, protective instincts",
    meaning:
      "Traditionally read as a cautious, security-minded relationship with money — a preference for saving and stability over risk. This reading favors preparation over chasing opportunity.",
  },
  feast_famine: {
    title: "Uneven, but resilient",
    meaning:
      "Traditionally read as financial fortunes that move in cycles rather than a flat, predictable line — genuine highs and real tight periods both. Resilience through the lean stretches is the actual skill this placement points to.",
  },
  generous: {
    title: "Open-handed with resources",
    meaning:
      "Traditionally read as someone who holds money loosely — generous with others, sometimes to their own detriment. Learning when to hold on is the growth edge this reading suggests.",
  },
  entrepreneurial: {
    title: "Independent income instincts",
    meaning:
      "Traditionally read as a pull toward earning on your own terms — business, freelance work, or ventures outside a conventional single employer. Traditionally linked to the Mount of Mercury's business instincts.",
  },
};

export const MARRIAGE_SUMMARY_VARIANTS: Record<string, LineVariant> = {
  one_deep_bond: {
    title: "One deep, defining bond",
    meaning:
      "Traditionally read as a life organized around one especially significant partnership rather than several — depth and permanence read as more important here than variety.",
  },
  later_marriage: {
    title: "Commitment that comes later",
    meaning:
      "Traditionally read as a relationship history where serious commitment tends to arrive later than average, often after independence has been firmly established first. Traditionally seen as a strength, not a delay.",
  },
  early_strong: {
    title: "Early clarity in love",
    meaning:
      "Traditionally read as someone who recognizes serious partnership early and commits with real conviction once they do. Second-guessing tends not to be the pattern here.",
  },
  companionable: {
    title: "Friendship-first partnership",
    meaning:
      "Traditionally read as relationships that grow out of genuine friendship and shared life rather than sudden passion — steady companionship read as the strongest foundation for this hand.",
  },
  several_significant: {
    title: "Several meaningful chapters",
    meaning:
      "Traditionally read as an emotionally rich relationship history with more than one significant partnership, each genuinely meaningful rather than any one being a 'placeholder' for the next.",
  },
};

// The seven classical mounts — fleshy pads at the base of each finger and along the palm edge,
// each named for a planet. This is the clearest cross-cultural overlap in palmistry: Western
// tradition and Hast Rekha Shastra both use the same seven-planet mapping (the Vedic system
// shares its graha/planet framework with this app's Kundli feature).
export interface MountInfo {
  name: string;
  planet: string;
  prominent: string;
  flat: string;
}

export const MOUNTS: Record<string, MountInfo> = {
  jupiter: {
    name: "Mount of Jupiter",
    planet: "Jupiter — beneath the index finger",
    prominent: "A well-developed Mount of Jupiter is traditionally read as natural leadership, ambition, and confidence — a wish to guide and be looked up to.",
    flat: "A flatter Mount of Jupiter is traditionally read as modesty and a preference for working alongside others rather than leading from the front.",
  },
  saturn: {
    name: "Mount of Saturn",
    planet: "Saturn — beneath the middle finger",
    prominent: "A well-developed Mount of Saturn is traditionally read as discipline, seriousness, and a strong sense of responsibility — someone who takes life, and commitments, seriously.",
    flat: "A flatter Mount of Saturn is traditionally read as a lighter, less burdened temperament — someone who doesn't let duty overshadow enjoyment.",
  },
  apollo: {
    name: "Mount of Apollo (Sun)",
    planet: "Sun — beneath the ring finger",
    prominent: "A well-developed Mount of Apollo is traditionally read as charisma, creativity, and a wish to be recognized for what you make or achieve.",
    flat: "A flatter Mount of Apollo is traditionally read as contentment working outside the spotlight, valuing craft over applause.",
  },
  mercury: {
    name: "Mount of Mercury",
    planet: "Mercury — beneath the little finger",
    prominent: "A well-developed Mount of Mercury is traditionally read as quick communication, wit, and business sense — a natural talker and negotiator.",
    flat: "A flatter Mount of Mercury is traditionally read as a more reserved, deliberate communication style — thinking things through before speaking.",
  },
  venus: {
    name: "Mount of Venus",
    planet: "Venus — the base of the thumb, encircled by the Life Line",
    prominent: "A full, well-rounded Mount of Venus is traditionally read as warmth, vitality, and a strong capacity for love and pleasure in life.",
    flat: "A flatter Mount of Venus is traditionally read as a more reserved, self-contained warmth — affection given carefully rather than freely.",
  },
  mars: {
    name: "Mount of Mars",
    planet: "Mars — the inner edge of the palm, between thumb and Life Line",
    prominent: "A well-developed Mount of Mars is traditionally read as courage and resilience — the ability to stand your ground under pressure.",
    flat: "A flatter Mount of Mars is traditionally read as a more conflict-averse temperament, preferring to defuse tension rather than meet it head-on.",
  },
  moon: {
    name: "Mount of the Moon",
    planet: "Moon — the outer base of the palm, opposite the thumb",
    prominent: "A well-developed Mount of the Moon is traditionally read as strong imagination and intuition — a rich inner world and sensitivity to atmosphere and mood.",
    flat: "A flatter Mount of the Moon is traditionally read as a more grounded, literal-minded temperament, less prone to flights of fancy.",
  },
};

export const TIMELINE_EVENTS: Record<string, string> = {
  career_breakthrough: "A significant breakthrough in your career path, where past efforts finally yield visible recognition and advancement.",
  financial_growth: "A period of strong financial growth, marked by smart decisions and increased stability.",
  deep_connection: "A profound emotional connection is formed or deepened, bringing great joy and support to your personal life.",
  spiritual_awakening: "A time of deep inner growth and spiritual clarity, leading to a new perspective on your life's purpose.",
  creative_peak: "A peak in creative energy and inspiration, resulting in successful projects and personal fulfillment.",
  unexpected_opportunity: "An unexpected opportunity arises, pushing you to step outside your comfort zone and achieve new heights.",
  leadership_role: "Stepping into a natural leadership role, guiding others and taking on greater responsibilities with confidence.",
  major_milestone: "A major personal milestone is reached, bringing a sense of completion and setting the stage for the next chapter.",
  inner_peace: "A profound sense of inner peace and acceptance is achieved, allowing for greater enjoyment of life's simple pleasures.",
  community_impact: "Your actions begin to have a meaningful, positive impact on your wider community or chosen field.",
};

// --- NEW IN-DEPTH DICTIONARIES ---

export const SPECIFIC_PREDICTIONS: Record<string, Record<string, LineVariant>> = {
  marriage: {
    foreigner: { title: "Marriage from Afar", meaning: "Your Fate Line alignment traditionally suggests a significant partnership with someone from a different cultural background, foreign land, or outside your usual social circle." },
    childhood: { title: "Deep-Rooted Connection", meaning: "A strong connection between your Heart and Life lines early on indicates marriage or long-term partnership with someone known from youth, or who deeply shares your core roots." },
    sudden: { title: "Sudden Commitment", meaning: "A distinct mark near the relationship lines suggests a sudden, unexpected, but deeply significant commitment that changes your life trajectory rapidly." },
    steady: { title: "Gradual Alignment", meaning: "Your relationships are shown to build on steady companionship. Traditional readings suggest your most significant partnership is built over years of friendship and shared goals." }
  },
  children: {
    two_phases: { title: "Two Distinct Phases", meaning: "Traditional reading of the lines beneath Mercury, combined with a strong Venus mount, points to two distinct phases of family expansion or significant periods of raising/mentoring children." },
    large_family: { title: "Abundant Family Energy", meaning: "A wide, sweeping Life Line encircling a prominent Venus mount is classically interpreted as a strong inclination toward a large, bustling family life." },
    focused: { title: "Focused Nurturing", meaning: "A single, deep line in the traditional 'children' area suggests a life focused intensely on nurturing one or two significant dependents, whether biological children or deeply adopted causes." }
  },
  house: {
    early_property: { title: "Early Foundation", meaning: "An upward branch from the early part of your Life Line toward Jupiter traditionally marks the successful purchase or building of a significant home at a relatively young age." },
    multiple_homes: { title: "Multiple Residences", meaning: "Travel lines combined with a strong Fate Line suggest owning property in more than one location or living between different major residences." },
    later_settlement: { title: "The Dream Home Later", meaning: "A steady, unbroken Life Line that anchors deeply at the base suggests that while you may move frequently early on, you will acquire a 'forever home' that brings immense peace later in life." }
  }
};

export const MINOR_LINES_VARIANTS: Record<string, Record<string, LineVariant>> = {
  health: {
    clear: { title: "Line of Health (Hepatica): Clear", meaning: "A clear Health line traditionally indicates strong digestion and physical resilience, suggesting a body that recovers quickly from stress." },
    absent: { title: "Line of Health: Absent", meaning: "The absence of a Health line is actually considered excellent in traditional palmistry, denoting a robust constitution free from chronic physical nervous tension." },
  },
  intuition: {
    crescent: { title: "Line of Intuition: Present", meaning: "A crescent line on the outer edge of the palm points to high emotional intelligence, vivid dreams, and a 'gut feeling' that is rarely wrong." },
    faint: { title: "Line of Intuition: Subtle", meaning: "Your intuition works best when you are quiet and grounded, rather than through sudden flashes. You read people accurately but process it logically." }
  },
  travel: {
    strong: { title: "Travel Lines: Strong", meaning: "Clear horizontal lines on the Mount of the Moon traditionally indicate significant time spent living abroad or life-changing international travel." },
    local: { title: "Travel Lines: Faint", meaning: "You are deeply rooted in your local community. While you may travel for pleasure, your true foundation and success are found close to home." }
  },
  girdle: {
    present: { title: "Girdle of Venus: Present", meaning: "A curve above the Heart Line indicating intense passion, high emotional sensitivity, and a deeply artistic or romantic temperament." },
    absent: { title: "Girdle of Venus: Absent", meaning: "You process emotions with a steady, even keel, avoiding the dramatic highs and lows that characterize more volatile temperaments." }
  }
};

export const FINGERS_VARIANTS: Record<string, Record<string, LineVariant>> = {
  shape: {
    pointed: { title: "Pointed Fingers", meaning: "Your finger shape suggests a highly idealistic, intuitive nature. You are sensitive to your environment and often driven by inspiration rather than strict logic." },
    conic: { title: "Conic Fingers", meaning: "A conic finger shape points to creativity, quick thinking, and a reliance on instinct. You adapt quickly and charm others easily." },
    square: { title: "Square Fingers", meaning: "Square fingertips indicate a practical, organized, and grounded personality. You value order, routine, and tangible results over abstraction." },
    spatulate: { title: "Spatulate Fingers", meaning: "Flared, spatulate fingertips suggest boundless energy and a need for action. You are an unconventional thinker who loves physical or intellectual exploration." }
  },
  thumb: {
    willpower: { title: "Thumb: Strong Willpower", meaning: "Your top thumb phalange is dominant, indicating immense willpower and determination. When you set your mind to a goal, you rarely back down." },
    logic: { title: "Thumb: Strong Logic", meaning: "The second phalange of your thumb is longer, showing that reason and logic rule your decisions. You plan carefully before taking action." },
    flexible: { title: "Thumb: Flexible", meaning: "A thumb that bends back easily reveals a highly adaptable, generous, and spontaneous nature, willing to go with the flow." },
    stiff: { title: "Thumb: Stiff", meaning: "A stiff, straight thumb traditionally denotes a strong sense of purpose, reliability, and sometimes a stubborn streak when your principles are challenged." }
  }
};

export const MYSTIC_MARKS_VARIANTS: Record<string, LineVariant> = {
  mystic_cross: { title: "The Mystic Cross", meaning: "A distinct cross between your Head and Heart lines. This ancient mark points to a natural affinity for the occult, psychology, and reading the unseen motives of others." },
  ring_of_solomon: { title: "Ring of Solomon", meaning: "A rare curve under your index finger indicating deep wisdom, authority, and a natural ability to counsel and teach others." },
  star_apollo: { title: "Star of Apollo", meaning: "A star formation on the Mount of the Sun, traditionally heralding a sudden and brilliant burst of fame, recognition, or immense creative success." },
  triangle_life: { title: "Triangle on the Life Line", meaning: "A triangle resting on your Life Line is a highly auspicious mark, indicating a period of significant intellectual achievement or sudden financial gain." },
  healers_mark: { title: "The Healer's Mark", meaning: "Several fine vertical lines under the pinky finger. Traditionally associated with those who have a calming, healing influence on people or animals." }
};

export const BIOMETRICS_VARIANTS: Record<string, Record<string, LineVariant>> = {
  phi: {
    high: { title: "High Golden Ratio Alignment", meaning: "Mathematically, your palm and phalanges strongly align with Phi (1.618), the mathematical signature of natural balance. Traditionally, this indicates an innate aesthetic sense and a life pulled naturally toward harmony." },
    moderate: { title: "Practical Proportions", meaning: "Your hand favors practical proportions over strict Phi alignment. Mathematically, this correlates to a pragmatic, utility-driven mindset where function matters more than aesthetics." }
  },
  digit_ratio: {
    ring_longer: { title: "Apollo Dominance (Ring > Index)", meaning: "In classic chirognomy, a longer ring finger mathematically correlates with higher risk tolerance, spatial awareness, and a strong drive for financial success and competition." },
    index_longer: { title: "Jupiter Dominance (Index > Ring)", meaning: "A mathematically longer index finger traditionally points to strong leadership, high verbal intelligence, and a natural authority over others." },
    equal: { title: "Balanced Digits", meaning: "Your index and ring fingers are mathematically equal, a rare equilibrium suggesting a personality that easily balances ambition with social harmony." }
  },
  thumb_angle: {
    wide: { title: "Wide Angle (Approaching 90°)", meaning: "Your thumb rests at a wide geometric angle from the palm. This mathematically signifies extreme independence, a love of personal freedom, and a refusal to be micromanaged." },
    narrow: { title: "Narrow Angle (< 45°)", meaning: "A narrow resting angle indicates a cautious, deliberate, and protective mindset. You prefer secure, proven paths over sudden risks." }
  },
  triangle_angle: {
    acute: { title: "Tight Acute Angle (< 60°)", meaning: "The geometric intersection forming the 'Money Triangle' is extremely tight. Mathematically, this signifies excellent wealth retention and a highly strategic approach to saving." },
    obtuse: { title: "Open Angle (> 80°)", meaning: "An open geometric intersection indicates that resources flow through your hands freely—money is seen as a tool for experience rather than hoarding." }
  }
};

export interface TimelineEntry {
  age: number;
  key: string;
  defaultText: string;
}


export interface PalmReading {
  hand: Hand;
  handShape: HandShape;
  career: { key: string } & LineVariant;
  growth: { key: string } & LineVariant;
  money: { key: string } & LineVariant;
  marriageSummary: { key: string } & LineVariant;
  heartLine: { key: string } & LineVariant;
  headLine: { key: string } & LineVariant;
  lifeLine: { key: string } & LineVariant;
  fateLine: { key: string } & LineVariant;
  sunLine: { key: string } & LineVariant;
  marriageLine: { key: string } & LineVariant;
  notableMount: { key: string } & MountInfo & { isProminent: boolean };
  allMounts: { [key: string]: { key: string } & MountInfo & { isProminent: boolean } };
  minorLines: {
    health: { key: string } & LineVariant;
    intuition: { key: string } & LineVariant;
    travel: { key: string } & LineVariant;
    girdle: { key: string } & LineVariant;
  };
  chirognomy: {
    fingerShape: { key: string } & LineVariant;
    thumb: { key: string } & LineVariant;
  };
  mysticMarks: ({ key: string } & LineVariant)[];
  specificPredictions: {
    marriage: { key: string } & LineVariant;
    children: { key: string } & LineVariant;
    house: { key: string } & LineVariant;
  };
  biometrics: {
    phi: { key: string; value: number } & LineVariant;
    digitRatio: { key: string; value: number } & LineVariant;
    thumbAngle: { key: string; value: number } & LineVariant;
    triangleAngle: { key: string; value: number } & LineVariant;
  };
  timeline: TimelineEntry[];
}

function hashSeed(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  }
  return h;
}

function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick(rand: () => number, bank: Record<string, LineVariant>): { key: string } & LineVariant {
  const keys = Object.keys(bank);
  const key = keys[Math.floor(rand() * keys.length)];
  return { key, ...bank[key] };
}

// --- Translation key helpers ------------------------------------------------
// Same pattern as kundliInterpretations.ts / aura.ts: keys into src/locales/*.json, with the
// English content above passed as `defaultValue` so the page always renders correctly even for
// a locale that hasn't translated a given key yet.

export const handShapeNameKey = (shape: HandShape) => `palmistry.handShape.${shape}.name`;
export const handShapeTraitsKey = (shape: HandShape) => `palmistry.handShape.${shape}.traits`;

const lineTitleKey = (line: string, key: string) => `palmistry.${line}.${key}.title`;
const lineMeaningKey = (line: string, key: string) => `palmistry.${line}.${key}.meaning`;

export const heartLineTitleKey = (key: string) => lineTitleKey("heartLine", key);
export const heartLineMeaningKey = (key: string) => lineMeaningKey("heartLine", key);
export const headLineTitleKey = (key: string) => lineTitleKey("headLine", key);
export const headLineMeaningKey = (key: string) => lineMeaningKey("headLine", key);
export const lifeLineTitleKey = (key: string) => lineTitleKey("lifeLine", key);
export const lifeLineMeaningKey = (key: string) => lineMeaningKey("lifeLine", key);
export const fateLineTitleKey = (key: string) => lineTitleKey("fateLine", key);
export const fateLineMeaningKey = (key: string) => lineMeaningKey("fateLine", key);
export const sunLineTitleKey = (key: string) => lineTitleKey("sunLine", key);
export const sunLineMeaningKey = (key: string) => lineMeaningKey("sunLine", key);
export const marriageLineTitleKey = (key: string) => lineTitleKey("marriageLine", key);
export const marriageLineMeaningKey = (key: string) => lineMeaningKey("marriageLine", key);

export const careerTitleKey = (key: string) => lineTitleKey("career", key);
export const careerMeaningKey = (key: string) => lineMeaningKey("career", key);
export const growthTitleKey = (key: string) => lineTitleKey("growth", key);
export const growthMeaningKey = (key: string) => lineMeaningKey("growth", key);
export const moneyTitleKey = (key: string) => lineTitleKey("money", key);
export const moneyMeaningKey = (key: string) => lineMeaningKey("money", key);
export const marriageSummaryTitleKey = (key: string) => lineTitleKey("marriageSummary", key);
export const marriageSummaryMeaningKey = (key: string) => lineMeaningKey("marriageSummary", key);

export const mountNameKey = (key: string) => `palmistry.mount.${key}.name`;
export const mountProminentKey = (key: string) => `palmistry.mount.${key}.prominent`;
export const mountFlatKey = (key: string) => `palmistry.mount.${key}.flat`;

export const timelineEventKey = (key: string) => `palmistry.timeline.${key}`;

export const specificTitleKey = (category: string, key: string) => `palmistry.specific.${category}.${key}.title`;
export const specificMeaningKey = (category: string, key: string) => `palmistry.specific.${category}.${key}.meaning`;

export const minorLineTitleKey = (category: string, key: string) => `palmistry.minorLine.${category}.${key}.title`;
export const minorLineMeaningKey = (category: string, key: string) => `palmistry.minorLine.${category}.${key}.meaning`;

export const chirognomyTitleKey = (category: string, key: string) => `palmistry.chirognomy.${category}.${key}.title`;
export const chirognomyMeaningKey = (category: string, key: string) => `palmistry.chirognomy.${category}.${key}.meaning`;

export const mysticMarkTitleKey = (key: string) => `palmistry.mysticMark.${key}.title`;
export const mysticMarkMeaningKey = (key: string) => `palmistry.mysticMark.${key}.meaning`;

export const biometricTitleKey = (category: string, key: string) => `palmistry.biometric.${category}.${key}.title`;
export const biometricMeaningKey = (category: string, key: string) => `palmistry.biometric.${category}.${key}.meaning`;


/** Deterministic, seedable palm reading so a reading can be encoded in a shareable URL and
 * reproduced exactly on revisit — the same pattern used for Tarot draws in this app. */
export function getPalmReading(seed: string, hand: Hand): PalmReading {
  const rand = mulberry32(hashSeed(`${seed}:${hand}`));
  const handShapeKeys = Object.keys(HAND_SHAPES) as HandShape[];
  const handShape = handShapeKeys[Math.floor(rand() * handShapeKeys.length)];

  const mountKeys = Object.keys(MOUNTS);
  const notableMountKey = mountKeys[Math.floor(rand() * mountKeys.length)];
  const notableMount = MOUNTS[notableMountKey];
  const isNotableProminent = rand() > 0.45;

  const allMounts: Record<string, { key: string } & MountInfo & { isProminent: boolean }> = {};
  for (const mKey of mountKeys) {
    allMounts[mKey] = {
      key: mKey,
      ...MOUNTS[mKey],
      isProminent: rand() > 0.5,
    };
  }
  // Ensure the notable mount matches
  allMounts[notableMountKey].isProminent = isNotableProminent;

  // Pick 1 to 2 mystic marks
  const mysticKeys = Object.keys(MYSTIC_MARKS_VARIANTS).sort(() => rand() - 0.5);
  const numMarks = rand() > 0.7 ? 2 : 1;
  const mysticMarks = mysticKeys.slice(0, numMarks).map(k => ({ key: k, ...MYSTIC_MARKS_VARIANTS[k] }));

  // Generate 4 to 5 timeline events at different ages
  const numEvents = Math.floor(rand() * 2) + 4; // 4 or 5
  const timeline: TimelineEntry[] = [];
  const eventKeys = Object.keys(TIMELINE_EVENTS);
  let currentAge = 20 + Math.floor(rand() * 5); // Start between 20 and 24

  // Shuffle event keys so we don't repeat easily
  const shuffledEventKeys = [...eventKeys].sort(() => rand() - 0.5);

  for (let i = 0; i < numEvents; i++) {
    const key = shuffledEventKeys[i % shuffledEventKeys.length];
    timeline.push({
      age: currentAge,
      key,
      defaultText: TIMELINE_EVENTS[key],
    });
    // Jump forward between 5 and 12 years for the next event
    currentAge += 5 + Math.floor(rand() * 8);
  }

  // --- Calculate Math/Biometrics ---
  // Phi (1.618)
  const phiValue = 88 + Math.floor(rand() * 10); // e.g. 88% to 98%
  const phiKey = phiValue > 93 ? "high" : "moderate";

  // Digit Ratio (2D:4D)
  const digitValue = 0.90 + (rand() * 0.15); // e.g. 0.90 to 1.05
  let digitKey = "equal";
  if (digitValue < 0.98) digitKey = "ring_longer";
  else if (digitValue > 1.02) digitKey = "index_longer";

  // Thumb Angle
  const thumbValue = 40 + Math.floor(rand() * 55); // e.g. 40 to 95 degrees
  const thumbKey = thumbValue > 70 ? "wide" : "narrow";

  // Triangle Angle
  const triValue = 45 + Math.floor(rand() * 45); // e.g. 45 to 90 degrees
  const triKey = triValue < 65 ? "acute" : "obtuse";

  return {
    hand,
    handShape,
    career: pick(rand, CAREER_SUMMARY_VARIANTS),
    growth: pick(rand, GROWTH_SUMMARY_VARIANTS),
    money: pick(rand, MONEY_SUMMARY_VARIANTS),
    marriageSummary: pick(rand, MARRIAGE_SUMMARY_VARIANTS),
    heartLine: pick(rand, HEART_LINE_VARIANTS),
    headLine: pick(rand, HEAD_LINE_VARIANTS),
    lifeLine: pick(rand, LIFE_LINE_VARIANTS),
    fateLine: pick(rand, FATE_LINE_VARIANTS),
    sunLine: pick(rand, SUN_LINE_VARIANTS),
    marriageLine: pick(rand, MARRIAGE_LINE_VARIANTS),
    notableMount: { key: notableMountKey, ...notableMount, isProminent: isNotableProminent },
    allMounts,
    minorLines: {
      health: pick(rand, MINOR_LINES_VARIANTS.health),
      intuition: pick(rand, MINOR_LINES_VARIANTS.intuition),
      travel: pick(rand, MINOR_LINES_VARIANTS.travel),
      girdle: pick(rand, MINOR_LINES_VARIANTS.girdle),
    },
    chirognomy: {
      fingerShape: pick(rand, FINGERS_VARIANTS.shape),
      thumb: pick(rand, FINGERS_VARIANTS.thumb),
    },
    mysticMarks,
    specificPredictions: {
      marriage: pick(rand, SPECIFIC_PREDICTIONS.marriage),
      children: pick(rand, SPECIFIC_PREDICTIONS.children),
      house: pick(rand, SPECIFIC_PREDICTIONS.house),
    },
    biometrics: {
      phi: { value: phiValue, key: phiKey, ...BIOMETRICS_VARIANTS.phi[phiKey] },
      digitRatio: { value: parseFloat(digitValue.toFixed(2)), key: digitKey, ...BIOMETRICS_VARIANTS.digit_ratio[digitKey] },
      thumbAngle: { value: thumbValue, key: thumbKey, ...BIOMETRICS_VARIANTS.thumb_angle[thumbKey] },
      triangleAngle: { value: triValue, key: triKey, ...BIOMETRICS_VARIANTS.triangle_angle[triKey] },
    },
    timeline,
  };
}
