import json
import os

TAROT_TRANS = {
  "en": {
    "nav.tarot": "Tarot",
    "tarot.title": "Daily Tarot Reading",
    "tarot.desc": "Draw your daily Tarot cards. Get a free 1-card daily pull or a 3-card Past, Present, Future reading.",
    "tarot.btn.daily": "Daily Draw (1 Card)",
    "tarot.btn.three_card": "Past, Present, Future (3 Cards)",
    "tarot.btn.draw_again": "Draw Again",
    "tarot.label.card_of_day": "Card of the Day",
    "tarot.label.past": "Past",
    "tarot.label.present": "Present",
    "tarot.label.future": "Future",
    "tarot.card.tap_reveal": "Tap to Reveal",
    "tarot.card.reversed": "Reversed"
  },
  "hi": {
    "nav.tarot": "टैरो",
    "tarot.title": "दैनिक टैरो रीडिंग",
    "tarot.desc": "अपना दैनिक टैरो कार्ड निकालें। मुफ्त 1-कार्ड दैनिक पुल या 3-कार्ड अतीत, वर्तमान, भविष्य रीडिंग प्राप्त करें।",
    "tarot.btn.daily": "दैनिक ड्रा (1 कार्ड)",
    "tarot.btn.three_card": "अतीत, वर्तमान, भविष्य (3 कार्ड)",
    "tarot.btn.draw_again": "फिर से निकालें",
    "tarot.label.card_of_day": "आज का कार्ड",
    "tarot.label.past": "अतीत",
    "tarot.label.present": "वर्तमान",
    "tarot.label.future": "भविष्य",
    "tarot.card.tap_reveal": "देखने के लिए टैप करें",
    "tarot.card.reversed": "उलटा"
  },
  "de": {
    "nav.tarot": "Tarot",
    "tarot.title": "Tägliches Tarot-Lesen",
    "tarot.desc": "Ziehen Sie Ihre täglichen Tarotkarten. Holen Sie sich eine kostenlose 1-Karten-Tagesziehung oder eine 3-Karten-Vergangenheit-Gegenwart-Zukunft-Lesung.",
    "tarot.btn.daily": "Tagesziehung (1 Karte)",
    "tarot.btn.three_card": "Vergangenheit, Gegenwart, Zukunft (3 Karten)",
    "tarot.btn.draw_again": "Erneut ziehen",
    "tarot.label.card_of_day": "Karte des Tages",
    "tarot.label.past": "Vergangenheit",
    "tarot.label.present": "Gegenwart",
    "tarot.label.future": "Zukunft",
    "tarot.card.tap_reveal": "Tippen zum Aufdecken",
    "tarot.card.reversed": "Umgekehrt"
  },
  "zh": {
    "nav.tarot": "塔罗牌",
    "tarot.title": "每日塔罗牌占卜",
    "tarot.desc": "抽取你的每日塔罗牌。获得免费的单张每日抽牌或3张过去、现在、未来占卜。",
    "tarot.btn.daily": "每日抽牌 (1张)",
    "tarot.btn.three_card": "过去、现在、未来 (3张)",
    "tarot.btn.draw_again": "再次抽取",
    "tarot.label.card_of_day": "今日牌",
    "tarot.label.past": "过去",
    "tarot.label.present": "现在",
    "tarot.label.future": "未来",
    "tarot.card.tap_reveal": "点击揭晓",
    "tarot.card.reversed": "逆位"
  }
}

for lang, trans in TAROT_TRANS.items():
    filepath = f"src/locales/{lang}.json"
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
        data.update(trans)
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

print("Tarot translations injected!")
