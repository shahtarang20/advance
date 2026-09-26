"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/lib/I18nContext";

export function DbKundliTrans({ 
  category, 
  rashi_id, 
  fallback, 
  className = "" 
}: { 
  category: string; 
  rashi_id: string; 
  fallback: string; 
  className?: string; 
}) {
  const { language, t } = useTranslation();
  const [text, setText] = useState<string | null>(null);
  
  useEffect(() => {
    fetch(`/api/kundli?lang=${language}&category=${category}&rashi_id=${rashi_id.toLowerCase()}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) setText(data[0].meaning);
      })
      .catch(console.error);
  }, [category, rashi_id, language]);

  const tKey = `kundli.${category}.${rashi_id.toLowerCase()}`;
  const staticText = t(tKey, { defaultValue: fallback });

  return <span className={className}>{text || (staticText !== tKey ? staticText : fallback)}</span>;
}
