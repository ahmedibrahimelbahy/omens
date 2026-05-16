"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { formatNumerals } from "@/lib/numerals";
import { PropertyPhotoCarousel } from "./property-photo-carousel";
import type { Property } from "@/lib/properties";
import type { Locale } from "@/i18n/routing";

type Props = {
  locale: Locale;
  properties: Property[];
  neighborhoods: string[];
};

type Beds = "any" | "1" | "2" | "3" | "4+";

const PRICE_MIN = 5000;
const PRICE_MAX = 25000;

export function PropertiesClient({ locale, properties, neighborhoods }: Props) {
  const t = useTranslations("properties");
  const num = (n: number | string) => formatNumerals(n, locale);
  const isAr = locale === "ar";

  const [neighborhood, setNeighborhood] = useState<string>("any");
  const [beds, setBeds] = useState<Beds>("any");
  const [maxPrice, setMaxPrice] = useState<number>(PRICE_MAX);

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      const hood = (isAr ? p.neighborhoodAr : p.neighborhoodEn).split(" · ")[0];
      if (neighborhood !== "any" && hood !== neighborhood) return false;
      if (beds === "1" && p.beds !== 1) return false;
      if (beds === "2" && p.beds !== 2) return false;
      if (beds === "3" && p.beds !== 3) return false;
      if (beds === "4+" && p.beds < 4) return false;
      if (p.rent > maxPrice) return false;
      return true;
    });
  }, [properties, neighborhood, beds, maxPrice, isAr]);

  const clearFilters = () => {
    setNeighborhood("any");
    setBeds("any");
    setMaxPrice(PRICE_MAX);
  };

  const filtersActive =
    neighborhood !== "any" || beds !== "any" || maxPrice !== PRICE_MAX;

  return (
    <main className="mx-auto max-w-[1240px] px-6 pb-32 pt-12 sm:px-10 sm:pt-16">
      {/* Header */}
      <section>
        <p className="text-eyebrow text-gold-deep">{t("eyebrow")}</p>
        <h1 className="text-h1 mt-5 max-w-3xl text-ink">{t("title")}</h1>
        <p className="text-lede mt-6 max-w-2xl">{t("subtitle")}</p>
      </section>

      <div className="mt-12 grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-12">
        {/* ─── Filter sidebar ─── */}
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-2xl border border-line bg-surface-2 p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <p className="text-eyebrow text-ink">{t("filterTitle")}</p>
              {filtersActive && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-[11px] uppercase tracking-wider text-gold-deep hover:underline"
                >
                  {t("clearFilters")}
                </button>
              )}
            </div>

            {/* Neighborhood */}
            <div className="mt-6">
              <label className="text-[11px] uppercase tracking-wider text-muted-fg">
                {t("neighborhood")}
              </label>
              <select
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className="mt-2 block w-full rounded-lg border border-line-strong bg-paper px-3 py-2.5 text-sm text-ink focus:border-gold focus:outline-none"
              >
                <option value="any">{t("anyNeighborhood")}</option>
                {neighborhoods.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            {/* Beds */}
            <div className="mt-6">
              <label className="text-[11px] uppercase tracking-wider text-muted-fg">
                {t("bedrooms")}
              </label>
              <div className="mt-2 grid grid-cols-5 gap-1.5">
                {(["any", "1", "2", "3", "4+"] as Beds[]).map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBeds(b)}
                    className={`rounded-md border px-2 py-1.5 text-xs font-medium transition-colors ${
                      beds === b
                        ? "border-ink bg-ink text-cream"
                        : "border-line-strong bg-paper text-ink hover:border-gold/50"
                    }`}
                  >
                    {b === "any" ? (isAr ? "أي" : "Any") : num(b)}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mt-6">
              <div className="flex items-baseline justify-between">
                <label className="text-[11px] uppercase tracking-wider text-muted-fg">
                  {t("priceRange")}
                </label>
                <span className="text-xs font-medium text-ink">
                  ≤ {num(maxPrice.toLocaleString("en-US"))}{" "}
                  <span className="text-muted-fg">
                    {isAr ? "ج.م" : "EGP"}
                  </span>
                </span>
              </div>
              <input
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={500}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="mt-3 w-full accent-[var(--gold)]"
              />
              <div className="mt-1.5 flex justify-between text-[10px] uppercase tracking-wider text-muted-fg">
                <span>{num(PRICE_MIN.toLocaleString("en-US"))}</span>
                <span>{num(PRICE_MAX.toLocaleString("en-US"))}</span>
              </div>
            </div>

            <div className="mt-7 flex items-center gap-2 rounded-lg bg-received-soft/50 px-3 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-received" aria-hidden />
              <span className="text-[11px] font-medium text-received">
                {t("trustOnly")}
              </span>
            </div>
          </div>
        </aside>

        {/* ─── Results ─── */}
        <section>
          <div className="flex items-baseline justify-between">
            <p className="text-sm font-medium text-ink">
              {filtered.length === 1
                ? t("resultsOne")
                : t("results", { count: num(filtered.length) })}
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-line bg-surface-2 p-12 text-center shadow-soft">
              <p className="text-lede max-w-md mx-auto">{t("noResults")}</p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-cream"
              >
                {t("clearFilters")}
              </button>
            </div>
          ) : (
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 sm:gap-6">
              {filtered.map((p, i) => (
                <PropertyCard
                  key={p.id}
                  property={p}
                  locale={locale}
                  num={num}
                  delay={i * 0.04}
                />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

function PropertyCard({
  property: p,
  locale,
  num,
  delay,
}: {
  property: Property;
  locale: Locale;
  num: (n: number | string) => string;
  delay: number;
}) {
  const t = useTranslations("properties");
  const isAr = locale === "ar";
  const neighborhood = isAr ? p.neighborhoodAr : p.neighborhoodEn;
  const landlordName = isAr ? p.landlord.nameAr : p.landlord.name;
  const highlights = isAr ? p.highlightsAr : p.highlightsEn;

  const accent = isAr ? p.accentAr : p.accentEn;

  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <article className="group overflow-hidden rounded-2xl border border-line bg-surface-2 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift">
        <PropertyPhotoCarousel
          seeds={p.imageSeeds}
          unitName={p.unit}
          isAr={isAr}
          accent={accent}
          verified={p.landlord.verified}
          verifiedLabel={t("verifiedBadge")}
        />

        <div className="p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-eyebrow text-gold-deep truncate">
                {neighborhood}
              </p>
              <h3 className="text-h4 mt-2 truncate text-ink">{p.unit}</h3>
            </div>
            <Rating
              score={p.rating.score}
              reviews={p.rating.reviews}
              num={num}
              isAr={isAr}
            />
          </div>

          <p className="mt-2 text-xs text-muted-fg">
            {p.beds === 1 ? t("bedsOne") : t("beds", { n: num(p.beds) })}
            <span aria-hidden className="mx-1.5">·</span>
            {p.baths === 1 ? t("bathsOne") : t("baths", { n: num(p.baths) })}
            <span aria-hidden className="mx-1.5">·</span>
            {num(p.sqm)} {isAr ? "م²" : "sqm"}
          </p>

          <ul className="mt-4 grid gap-1.5">
            {highlights.slice(0, 3).map((h, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-xs text-ink-soft"
              >
                <span
                  aria-hidden
                  className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold"
                />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-end justify-between gap-4 border-t border-line pt-5">
            <div>
              <p className="font-display text-h3 leading-none text-ink">
                {num(p.rent.toLocaleString("en-US"))}
              </p>
              <p className="mt-1 text-xs text-muted-fg">
                {isAr ? "ج.م" : "EGP"} {t("perMonth")}
              </p>
            </div>
            <div className="text-right rtl:text-left">
              <p className="text-[10px] uppercase tracking-wider text-muted-fg">
                {isAr ? "المالك" : "Landlord"}
              </p>
              <p className="text-sm font-medium text-ink">{landlordName}</p>
              <p className="mt-0.5 text-[10px] text-gold-deep">
                {isAr ? "نقاط Omens" : "Omens"} · {num(p.landlord.trustScore)}
              </p>
            </div>
          </div>

          <Link
            href={`/${locale}/signup/tenant?property=${p.id}`}
            className="group/btn mt-5 flex w-full items-center justify-between gap-3 rounded-full bg-ink px-5 py-3 text-cream transition-colors hover:bg-ink-soft"
          >
            <span className="text-sm font-medium">{t("applyToRent")}</span>
            <span aria-hidden className="text-gold">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="arrow-flip"
              >
                <path
                  d="M5 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
        </div>
      </article>
    </motion.li>
  );
}

function Rating({
  score,
  reviews,
  num,
  isAr,
}: {
  score: number;
  reviews: number;
  num: (n: number | string) => string;
  isAr: boolean;
}) {
  return (
    <div className="flex shrink-0 items-center gap-1 text-xs font-medium text-ink">
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="currentColor"
        className="text-gold-deep"
        aria-hidden
      >
        <path d="M6 1l1.6 3.4L11 5l-2.6 2.4L9 11 6 9.2 3 11l.6-3.6L1 5l3.4-.6z" />
      </svg>
      <span>{num(score.toFixed(1))}</span>
      <span className="text-muted-fg">
        ({num(reviews)}
        {isAr ? "" : ""})
      </span>
    </div>
  );
}
