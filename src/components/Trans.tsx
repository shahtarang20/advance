"use client";

import { useTranslation } from "@/lib/I18nContext";

export function Trans({ tKey, replacements, className, as: Component = "span" }: { tKey: string, replacements?: Record<string, string> & { defaultValue?: string }, className?: string, as?: any }) {
  const { t } = useTranslation();
  return <Component className={className}>{t(tKey, replacements)}</Component>;
}
