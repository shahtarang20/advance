import { useState, useEffect } from 'react';

export const speechStore = {
  listeners: new Set<() => void>(),
  isPlaying: false,
  words: [] as string[],
  activeWordIndex: -1,
  text: "",
  
  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  },
  
  emit() {
    this.listeners.forEach(l => l());
  },
  
  setState(state: Partial<typeof speechStore>) {
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
