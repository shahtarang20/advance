"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/lib/I18nContext";

export function DbPalmistryTrans({
  category,
  subCategory,
  fallbackTitle,
  fallbackMeaning,
  isTitle = false,
}: {
  category: string;
  subCategory: string;
  fallbackTitle: string;
  fallbackMeaning: string;
  isTitle?: boolean;
}) {
  const { language } = useTranslation();
  const [data, setData] = useState<{ title: string; meaning: string } | null>(null);

  useEffect(() => {
    let ignore = false;
    fetch(`/api/palmistry?lang=${language}&category=${category}&subCategory=${subCategory}`)
      .then((res) => res.json())
      .then((json) => {
        if (!ignore && json.title && json.meaning) {
          setData(json);
        }
      })
      .catch((err) => {
        if (!ignore) console.error("Failed to fetch palmistry data:", err);
      });
    return () => { ignore = true; };
  }, [language, category, subCategory]);

  if (isTitle) {
    return <>{data ? data.title : fallbackTitle}</>;
  }

  return <>{data ? data.meaning : fallbackMeaning}</>;
}
