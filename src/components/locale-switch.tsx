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
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden
        className="transition-transform group-hover:rotate-[12deg]"
      >
        <circle
          cx="7"
          cy="7"
          r="5.5"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <ellipse
          cx="7"
          cy="7"
          rx="2.5"
          ry="5.5"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <line
          x1="1.5"
          y1="7"
          x2="12.5"
          y2="7"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>
      <span>{t("switchTo")}</span>
    </button>
  );
}
