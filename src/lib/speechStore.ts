import { useState, useEffect } from 'react';

export interface SpeechStoreState {
  listeners: Set<() => void>;
  isPlaying: boolean;
  words: string[];
  activeWordIndex: number;
  text: string;
  subscribe: (listener: () => void) => () => void;
  emit: () => void;
  setState: (state: Partial<SpeechStoreState>) => void;
}

export const speechStore: SpeechStoreState = {
  listeners: new Set<() => void>(),
  isPlaying: false,
  words: [],
  activeWordIndex: -1,
  text: "",
  
  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  },
  
  emit() {
    this.listeners.forEach(l => l());
  },
  
  setState(state: Partial<SpeechStoreState>) {
    Object.assign(this, state);
    this.emit();
  }
};

export function useSpeechStore() {
  const [state, setState] = useState({
    isPlaying: speechStore.isPlaying,
    words: speechStore.words,
    activeWordIndex: speechStore.activeWordIndex,
    text: speechStore.text,
  });

  useEffect(() => {
    const listener = () => {
      setState({
        isPlaying: speechStore.isPlaying,
        words: speechStore.words,
        activeWordIndex: speechStore.activeWordIndex,
        text: speechStore.text,
      });
    };
    return speechStore.subscribe(listener);
  }, []);

  return state;
}
