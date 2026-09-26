import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from '@/lib/I18nContext';
import { speechStore } from '@/lib/speechStore';

const LANG_MAP: Record<string, string> = {
  en: 'en-US',
  hi: 'hi-IN',
  gu: 'gu-IN',
  de: 'de-DE',
  zh: 'zh-CN',
};

// Split text into chunks to bypass Chrome's TTS length limits
function chunkText(text: string, maxLength: number = 150): string[] {
  const sentences = text.match(/[^.!?।\n]+[.!?।\n]*/g) || [text];
  const chunks: string[] = [];
  let currentChunk = '';

  for (const sentence of sentences) {
    if (sentence.length > maxLength) {
      if (currentChunk.trim()) chunks.push(currentChunk.trim());
      currentChunk = '';
      const words = sentence.split(/\s+/);
      let subChunk = '';
      for (const word of words) {
        if ((subChunk + word).length > maxLength && subChunk.length > 0) {
          chunks.push(subChunk.trim());
          subChunk = word + ' ';
        } else {
          subChunk += word + ' ';
        }
      }
      currentChunk = subChunk;
    } else if ((currentChunk + sentence).length > maxLength && currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
      currentChunk = sentence;
    } else {
      currentChunk += sentence;
    }
  }
  if (currentChunk.trim()) chunks.push(currentChunk.trim());
  return chunks;
}

export function useTTS() {
  const { language } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const chunkQueue = useRef<{ text: string; offset: number }[]>([]);
  const isCancelledRef = useRef(false);

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      isCancelledRef.current = true;
      chunkQueue.current = [];
      window.speechSynthesis.cancel();
      if (timerRef.current) clearInterval(timerRef.current);
      setIsPlaying(false);
      speechStore.setState({ isPlaying: false, activeWordIndex: -1 });
    }
  }, []);

  const playChunk = useCallback(() => {
    if (isCancelledRef.current || chunkQueue.current.length === 0) {
      if (!isCancelledRef.current) {
        setIsPlaying(false);
        speechStore.setState({ isPlaying: false, activeWordIndex: -1 });
      }
      return;
    }

    const { text, offset } = chunkQueue.current[0];
    const utterance = new SpeechSynthesisUtterance(text);
    const targetLang = LANG_MAP[language] || 'en-US';
    utterance.lang = targetLang;

    const voices = window.speechSynthesis.getVoices();
    let selectedVoice = voices.find(v => v.lang === targetLang && v.localService);
    if (!selectedVoice) selectedVoice = voices.find(v => v.lang === targetLang);
    if (!selectedVoice) {
      const baseLang = targetLang.split('-')[0];
      selectedVoice = voices.find(v => v.lang.startsWith(baseLang));
    }
    if (!selectedVoice && language === 'gu') {
      selectedVoice = voices.find(v => v.lang.startsWith('hi'));
    }
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    const words = speechStore.words;
    let hasBoundaryFired = false;

    utterance.onboundary = (event) => {
      if (isCancelledRef.current) return;
      if (event.name === "word") {
        hasBoundaryFired = true;
        const globalCharIndex = offset + event.charIndex;
        let charCount = 0;
        for (let i = 0; i < words.length; i++) {
          if (globalCharIndex >= charCount && globalCharIndex < charCount + words[i].length + 1) {
            speechStore.setState({ activeWordIndex: i });
            break;
          }
          charCount += words[i].length + 1;
        }
      }
    };

    utterance.onstart = () => {
      if (isCancelledRef.current) return;
      setTimeout(() => {
        if (!hasBoundaryFired && !isCancelledRef.current) {
          timerRef.current = setInterval(() => {
            const currentIdx = speechStore.activeWordIndex;
            if (currentIdx >= words.length - 1) {
              if (timerRef.current) clearInterval(timerRef.current);
            } else {
              speechStore.setState({ activeWordIndex: currentIdx + 1 });
            }
          }, 330);
        }
      }, 500);
    };

    utterance.onend = () => {
      if (isCancelledRef.current) return;
      if (timerRef.current) clearInterval(timerRef.current);
      chunkQueue.current.shift();
      setTimeout(() => playChunk(), 100);
    };

    utterance.onerror = (e) => {
      if (isCancelledRef.current) return;
      if (timerRef.current) clearInterval(timerRef.current);
      chunkQueue.current.shift();
      setTimeout(() => playChunk(), 100);
    };

    window.speechSynthesis.speak(utterance);
  }, [language]);

  const play = useCallback((fullText: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      console.warn("Text-to-speech is not supported on this browser.");
      return;
    }
    
    stop();
    isCancelledRef.current = false;
    
    const words = fullText.split(/\s+/).filter(w => w.length > 0);
    speechStore.setState({ isPlaying: true, text: fullText, words, activeWordIndex: 0 });
    setIsPlaying(true);

    const chunks = chunkText(fullText, 200);
    let currentOffset = 0;
    
    chunkQueue.current = chunks.map(chunk => {
      const offset = fullText.indexOf(chunk, currentOffset);
      currentOffset = offset + chunk.length;
      return { text: chunk, offset };
    });

    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = () => {
        if (!isCancelledRef.current && chunkQueue.current.length > 0) {
           playChunk();
        }
      };
    } else {
      playChunk();
    }
  }, [stop, playChunk]);

  useEffect(() => {
    return () => stop();
  }, [stop]);

  return { play, stop, isPlaying };
}
