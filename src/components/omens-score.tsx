"use client";

import { useTranslations } from "next-intl";
import { ScorePip } from "./score-pip";
import { cn } from "@/lib/cn";
import { formatNumerals } from "@/lib/numerals";
import type { Locale } from "@/i18n/routing";

type Props = {
  /** The 0–100 score. Ignored if dataPoints < NEW_THRESHOLD. */
  score: number;
  /** How many payments the score is computed from. Drives cold-start treatment. */
  dataPoints: number;
  locale: Locale;
  size?: "sm" | "md" | "lg";
  layout?: "row" | "stacked";
  /** When true, render only the pip (no surrounding card). */
  bare?: boolean;
  className?: string;
};

const NEW_THRESHOLD = 3;
const BUILDING_THRESHOLD = 12;

/**
 * The Omens Score, surfaced honestly.
 *
 * Borrowed straight from Dentamap's Bayesian rating cold-start: a brand-new
 * tenant with 0 payments doesn't get 0/100 (algorithmic libel) and doesn't
 * get 73/100 (fiction). They get "New to Omens" — a dashed-ring placeholder
 * that says "this slot is reserved for your record, not yet earned."
 *
 *   dataPoints < 3   → "New to Omens" (no number; dashed ring)
 *   3 ≤ dp < 12      → score visible + "Building" confidence chip + (n / 12)
 *   dp ≥ 12          → full confidence; just the score + tier label
 */
export function OmensScore({
  score,
  dataPoints,
  locale,
  size = "md",
  layout = "row",
  bare = false,
  className,
}: Props) {
  const t = useTranslations("tenant");
  const num = (n: number | string) => formatNumerals(n, locale);

  const isNew = dataPoints < NEW_THRESHOLD;
  const isBuilding = !isNew && dataPoints < BUILDING_THRESHOLD;

  const tierLabel = isNew
    ? t("scoreLabelNew")
    : score >= 90
      ? t("scoreLabelExcellent")
      : score >= 75
        ? t("scoreLabelGood")
        : t("scoreLabelFair");

  const pip = isNew ? <NewPip size={size} /> : <ScorePip score={score} size={size} />;

  const body = isNew ? (
    <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
      {t("scoreBodyNew")}
    </p>
  ) : isBuilding ? (
    <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
      <span className="font-medium text-gold-deep">{t("scoreBuilding")}</span>
      <span className="text-muted-fg"> · {num(dataPoints)}/{num(BUILDING_THRESHOLD)} </span>
      <span>{t("scoreBody")}</span>
    </p>
  ) : (
    <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
      {t("scoreBody")}
    </p>
  );

  const content = (
    <div
      className={cn(
        "flex",
        layout === "row" ? "items-center gap-6" : "flex-col items-start gap-5",
      )}
    >
      <div className="shrink-0">{pip}</div>
      <div className="min-w-0">
        <p className="text-eyebrow text-gold-deep">{t("scoreEyebrow")}</p>
        <p className="mt-2 font-display text-h4 text-ink">{tierLabel}</p>
        {body}
      </div>
    </div>
  );

  if (bare) return <div className={className}>{content}</div>;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-line bg-surface-2 p-6 shadow-soft sm:p-8",
        className,
      )}
    >
      {isNew && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(420px 240px at 0% 0%, rgba(201,169,97,0.10), transparent 65%)",
          }}
        />
      )}
      <div className="relative">{content}</div>
    </div>
  );
}

function NewPip({ size }: { size: "sm" | "md" | "lg" }) {
  const dim = size === "lg" ? 132 : size === "md" ? 84 : 48;
  const stroke = size === "lg" ? 2 : size === "md" ? 1.5 : 1.25;
  const r = (dim - stroke) / 2;
  const dotSize = size === "lg" ? 6 : size === "md" ? 4 : 3;

  return (
    <div
      className="relative inline-grid place-items-center"
      style={{ width: dim, height: dim }}
      aria-label="New to Omens — no score yet"
      role="img"
    >
      <svg width={dim} height={dim} className="-rotate-90">
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={r}
          stroke="var(--gold)"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray="3 6"
          opacity={0.6}
        />
      </svg>
      <span
        className="absolute rounded-full bg-gold opacity-85"
        style={{ width: dotSize, height: dotSize }}
        aria-hidden
      />
    </div>
  );
}
