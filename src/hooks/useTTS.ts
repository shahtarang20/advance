import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from '@/lib/I18nContext';

const LANG_MAP: Record<string, string> = {
  en: 'en-US',
  hi: 'hi-IN',
  gu: 'gu-IN',
  de: 'de-DE',
  zh: 'zh-CN',
};

export function useTTS() {
  const { language } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  }, []);

  const play = useCallback((text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      console.warn("Text-to-speech is not supported on this browser.");
      return;
    }
    
    // Stop any currently playing audio
    stop();
    
    // Create new utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Map our app's language to the standard BCP 47 language code for TTS
    const targetLang = LANG_MAP[language] || 'en-US';
    utterance.lang = targetLang;
    
    // Try to find the best native voice for this language
    const voices = window.speechSynthesis.getVoices();
    let selectedVoice = voices.find(v => v.lang === targetLang && v.localService);
    
    // Fallback 1: Any voice matching the exact locale (e.g. gu-IN)
    if (!selectedVoice) {
      selectedVoice = voices.find(v => v.lang === targetLang);
    }
    
    // Fallback 2: Any voice matching the base language code (e.g. gu)
    if (!selectedVoice) {
      const baseLang = targetLang.split('-')[0];
      selectedVoice = voices.find(v => v.lang.startsWith(baseLang));
    }
    
    // Specific Fallback for Gujarati if missing: use Hindi voice as a last resort
    // because Hindi TTS reading Gujarati script often sounds much better than English TTS reading Gujarati script
    if (!selectedVoice && language === 'gu') {
      selectedVoice = voices.find(v => v.lang.startsWith('hi'));
    }
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    // Event listeners to update state
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = (e) => {
      console.error("Speech synthesis error", e);
      setIsPlaying(false);
    };
    
    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  }, [language, stop]);

  // Cleanup on unmount
  useEffect(() => {
    return () => stop();
  }, [stop]);

  return { play, stop, isPlaying };
}
