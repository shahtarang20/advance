"use client";

import React, { useState, useEffect } from "react";

export function TypewriterText({ 
  text, 
  animate = false, 
  speed = 30,
  onTypingComplete,
  onTick
}: { 
  text: string;
  animate?: boolean;
  speed?: number;
  onTypingComplete?: () => void;
  onTick?: () => void;
}) {
  const [displayedText, setDisplayedText] = useState(animate ? "" : text);
  const onTypingCompleteRef = React.useRef(onTypingComplete);
  const onTickRef = React.useRef(onTick);

  useEffect(() => {
    onTypingCompleteRef.current = onTypingComplete;
    onTickRef.current = onTick;
  }, [onTypingComplete, onTick]);

  useEffect(() => {
    if (!animate) {
      setDisplayedText(text);
      return;
    }

    let i = 0;
    setDisplayedText("");
    
    const intervalId = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (onTickRef.current && i % 5 === 0) onTickRef.current();
      if (i >= text.length) {
        clearInterval(intervalId);
        if (onTypingCompleteRef.current) onTypingCompleteRef.current();
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, animate, speed]);

  return <span>{displayedText}</span>;
}
