"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LocaleSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("system");
  const next = locale === "en" ? "ar" : "en";

  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: next })}
      className="group inline-flex items-center gap-2 text-eyebrow text-ink-soft hover:text-ink transition-colors"
      aria-label={`Switch language to ${next === "ar" ? "Arabic" : "English"}`}
    >
      <span className="inline-block h-px w-6 bg-current transition-all group-hover:w-10" />
      <span>{t("switchTo")}</span>
    </button>
  );
}
