"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/lib/I18nContext";

export function DbNakshatraTrans({ 
  nakshatra_id, 
  fallback, 
  className = "" 
}: { 
  nakshatra_id: string; 
  fallback: string; 
  className?: string; 
}) {
  const { language } = useTranslation();
  const [text, setText] = useState<string | null>(null);
  
  useEffect(() => {
    fetch(`/api/nakshatra?lang=${language}&nakshatra_id=${nakshatra_id}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) setText(data[0].desc);
      })
      .catch(console.error);
  }, [nakshatra_id, language]);

  return <span className={className}>{text || fallback}</span>;
}
