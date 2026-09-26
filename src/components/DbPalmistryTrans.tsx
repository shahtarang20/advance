"use client";

import { useTranslation } from "@/lib/I18nContext";
import palmistryDb from "@/locales/palmistry_db.json";

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

  // Safely index into the static JSON database
  const langData = (palmistryDb as Record<string, any>)[language];
  const catData = langData?.[category];
  const data = catData?.[subCategory];

  if (isTitle) {
    return <>{data?.title || fallbackTitle}</>;
  }

  return <>{data?.meaning || fallbackMeaning}</>;
}
