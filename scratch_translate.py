import json
import os
import re
try:
    from deep_translator import GoogleTranslator
except ImportError:
    import os
    os.system('pip install deep-translator')
    from deep_translator import GoogleTranslator

# Extracted from src/lib/kundliInterpretations.ts
MOON = {
  "mesha": "Your mind moves fast! You feel things deeply and want to act on your emotions right away. This gives you amazing courage, but you might need to practice a little patience.",
  "vrishabha": "You crave comfort and stability above all else. A cozy home and familiar routines keep you emotionally grounded, and you're the calm presence everyone else leans on.",
  "mithuna": "You process your feelings by talking them out! You need mental stimulation and a variety of friends to feel emotionally fulfilled.",
  "karka": "You feel things on a very deep level and have a strong protective instinct for your loved ones. Family and home are your absolute emotional center.",
  "simha": "You have a big, warm heart and love expressing your feelings! You need to feel seen and appreciated by the people you love to be truly happy.",
  "kanya": "You show you care by doing practical things for others. You process your emotions by organizing and fixing things, though try not to worry too much!",
  "tula": "Peace and harmony are your emotional lifelines. You hate conflict and will go out of your way to keep the peace and make everyone happy.",
  "vrishchika": "Your feelings are intense and incredibly deep. You might keep your emotions private, but once you trust someone, you are fiercely loyal.",
  "dhanu": "You are naturally optimistic and process your feelings by looking at the big picture! Freedom and a good laugh are what keep you emotionally balanced.",
  "makara": "You manage your feelings through discipline and taking responsibility. You have incredible emotional maturity, but don't forget to let your guard down sometimes!",
  "kumbha": "You relate to your feelings a bit like an observer. You are very open-minded and humanitarian, caring deeply about your community.",
  "meena": "You are incredibly empathetic and easily absorb the feelings of everyone around you. You have a beautiful, creative, and gentle emotional nature."
}

LAGNA = {
  "mesha": "You give off a bold and energetic vibe! People see you as confident, fast-moving, and always ready to take action.",
  "vrishabha": "People see you as a calm, steady rock. You have a relaxed, grounded presence and appreciate the beautiful things in life.",
  "mithuna": "You come across as curious, chatty, and quick-witted! You're always ready to strike up a fun conversation.",
  "karka": "You have a gentle, protective aura. You might seem a little shy at first, but people quickly sense how caring you really are.",
  "simha": "You walk into a room and people notice! You have a natural warmth, confidence, and a subtle dramatic flair.",
  "kanya": "You come across as modest, capable, and very observant. People trust you because you always notice the little details.",
  "tula": "You have a charming, diplomatic presence! You come across as extremely polite, fair, and easy to get along with.",
  "vrishchika": "You give off an intense and magnetic vibe. People sense you have incredible depth and strength hidden just beneath the surface.",
  "dhanu": "You come across as fun, frank, and adventurous! You have an open, optimistic vibe that draws people in.",
  "makara": "You look serious, ambitious, and responsible. People immediately see you as someone they can rely on to get things done.",
  "kumbha": "You have an unconventional and highly independent vibe! People see you as a unique thinker who doesn't follow the crowd.",
  "meena": "You have a soft, dreamy, and gentle presence. People instantly sense your empathy and kind heart."
}

SUN = {
  "mesha": "At your core, you are a pioneer! Your sense of purpose shines brightest when you're taking the lead and facing a new challenge.",
  "vrishabha": "Your core identity is built on stability and patience. You thrive when you're building something lasting and enjoying the simple pleasures of life.",
  "mithuna": "You are a learner at heart! Your purpose is found in exploring new ideas, communicating, and staying curious about everything.",
  "karka": "Your core purpose is nurturing. You shine brightest when you're caring for your community and building a deep sense of belonging.",
  "simha": "You were born to shine! Your true purpose comes alive when you are leading, creating, and generously sharing your light with others.",
  "kanya": "Your core identity is about service and improvement. You thrive when you're using your amazing skills to genuinely help others.",
  "tula": "Your purpose revolves around partnership and balance! You shine brightest when creating harmony and fairness in your relationships.",
  "vrishchika": "Your core self is about deep transformation. You find purpose in diving into meaningful, intense experiences rather than just staying on the surface.",
  "dhanu": "You are an explorer at heart! Your purpose is found in traveling, learning, and discovering the bigger meaning of life.",
  "makara": "Your core identity is driven by ambition and structure. You thrive when you are working steadily toward a major long-term goal.",
  "kumbha": "Your purpose is innovation! You shine brightest when you're bringing your unique, original ideas to help the collective good.",
  "meena": "Your core self is incredibly compassionate. You find your true purpose when creating art or helping others with your deep spiritual sensitivity."
}

translator = GoogleTranslator(source='en', target='hi')

with open("src/locales/hi.json", "r", encoding="utf-8") as f:
    hi = json.load(f)

def add_translations(category, data_dict):
    for k, v in data_dict.items():
        key = f"kundli.{category}.{k}"
        if key not in hi:
            hi[key] = translator.translate(v)
            print(f"Translated {key}")

add_translations("moonMeaning", MOON)
add_translations("lagnaMeaning", LAGNA)
add_translations("sunMeaning", SUN)

with open("src/locales/hi.json", "w", encoding="utf-8") as f:
    json.dump(hi, f, ensure_ascii=False, indent=2)

print("Done")
