"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { formatNumerals } from "@/lib/numerals";
import type { Locale } from "@/i18n/routing";

const RENT = 4200;
const BASE_SCORE = 92;
/** 5% off rent if paid 5+ days before due date. Stacks with score boost. */
const EARLY_DISCOUNT_RATE = 0.05;
const EARLY_DISCOUNT_DAYS = 5;

type Strings = {
  greeting: string;
  subgreeting: string;
  dueEyebrow: string;
  dueDateRaw: string;
  payNow: string;
  payMethods: string;
  currency: string;
  scoreEyebrow: string;
  scoreLabelExcellent: string;
  scoreBody: string;
  history: string;
  threadIntro: string;
  ramadanNote: string;
  trustWord: string;
  trustTagline: string;
};

export function TenantClient({ locale }: { locale: Locale }) {
  const tT = useTranslations("tenant");
  const tC = useTranslations("common");

  const strings = {
    greeting: tT("greeting"),
    subgreeting: tT("subgreeting"),
    dueEyebrow: tT("dueEyebrow"),
    dueDateRaw: tT("dueDate", { date: locale === "ar" ? "١ مايو" : "May 1" }),
    payNow: tT("payNow"),
    payMethods: tT("payMethods"),
    currency: tC("currency"),
    scoreEyebrow: tT("scoreEyebrow"),
    scoreLabelExcellent: tT("scoreLabelExcellent"),
    scoreBody: tT("scoreBody"),
    history: tT("history"),
    threadIntro: tT("threadIntro"),
    ramadanNote: tT("ramadanNote"),
    trustWord: tT("trustWord"),
    trustTagline: tT("trustTagline"),
  };

  const [state, setState] = useState<"due" | "paid" | "khalas">("due");
  const [showMethods, setShowMethods] = useState(false);

  const num = (n: number | string) => formatNumerals(n, locale);
  const isAr = locale === "ar";

  const score = state === "paid" ? BASE_SCORE + 4 : BASE_SCORE;
  const discount = Math.round(RENT * EARLY_DISCOUNT_RATE);
  const discountedRent = RENT - discount;

  const HISTORY = useMemo(
    () => [
      {
        month: isAr ? "أبريل ٢٠٢٦" : "April 2026",
        date: isAr ? "١ أبريل" : "Apr 1",
        amount: RENT,
        kind: "on-time" as const,
        delta: +2,
      },
      {
        month: isAr ? "مارس ٢٠٢٦" : "March 2026",
        date: isAr ? "٢٧ فبراير" : "Feb 27",
        amount: RENT,
        kind: "early" as const,
        delta: +4,
      },
      {
        month: isAr ? "فبراير ٢٠٢٦" : "February 2026",
        date: isAr ? "١ فبراير" : "Feb 1",
        amount: RENT,
        kind: "on-time" as const,
        delta: +2,
      },
      {
        month: isAr ? "يناير ٢٠٢٦" : "January 2026",
        date: isAr ? "٣ يناير" : "Jan 3",
        amount: RENT,
        kind: "late" as const,
        delta: -3,
      },
    ],
    [isAr],
  );

  return (
    <main className="mx-auto max-w-[1100px] px-5 pb-32 pt-12 sm:px-10 sm:pt-16">
      {/* Greeting */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-eyebrow text-gold-deep">{strings.dueEyebrow}</p>
        <h1 className="mt-3 text-h2 text-ink">{strings.greeting}</h1>
        <p className="text-lede mt-2 max-w-xl">{strings.subgreeting}</p>
      </motion.section>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-8">
        {/* ─── Rent due card (Apple Wallet pass aesthetic) ─── */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        >
          <DueCard
            state={state}
            isAr={isAr}
            num={num}
            strings={strings}
            discount={discount}
            discountedRent={discountedRent}
            onPay={() => {
              setShowMethods(false);
              setState("paid");
            }}
            onKhalas={() => setState("khalas")}
            showMethods={showMethods}
            onToggleMethods={() => setShowMethods((s) => !s)}
          />

          {/* Pay-early incentive sub-card (Apple Card rewards style) */}
          <AnimatePresence>
            {state === "due" && (
              <motion.div
                key="incentive"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5 }}
                className="mt-3"
              >
                <IncentiveCard
                  isAr={isAr}
                  num={num}
                  discount={discount}
                  currency={strings.currency}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Ramadan flex hint */}
          <div className="mt-6 rounded-2xl border border-line bg-surface-1/60 px-5 py-4">
            <p className="text-xs leading-relaxed text-muted-fg">
              <span className="text-eyebrow me-2 text-gold-deep">
                {isAr ? "رمضان" : "Ramadan"}
              </span>
              {strings.ramadanNote}
            </p>
          </div>
        </motion.section>

        {/* ─── Right column: Score + streak ─── */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-6"
        >
          <ScoreCard
            score={score}
            scoreBody={strings.scoreBody}
            scoreEyebrow={strings.scoreEyebrow}
            scoreLabel={strings.scoreLabelExcellent}
            isAr={isAr}
            num={num}
            state={state}
          />
          <StreakCard isAr={isAr} num={num} state={state} />
        </motion.section>
      </div>

      {/* ─── Payment history (Apple Card transactions) ─── */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="mt-16"
      >
        <div className="rule mb-8">
          <span className="dot" />
          <span className="text-eyebrow">{strings.history}</span>
          <span className="dot" />
        </div>
        <ul className="grid divide-y divide-line rounded-2xl border border-line bg-surface-2 shadow-soft">
          {/* If they paid this month, prepend the success row */}
          <AnimatePresence>
            {state === "paid" && (
              <motion.li
                key="just-paid"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.45 }}
                className="overflow-hidden"
              >
                <HistoryRow
                  month={isAr ? "مايو ٢٠٢٦" : "May 2026"}
                  date={isAr ? "النهاردة" : "Today"}
                  amount={discountedRent}
                  currency={strings.currency}
                  kind="just-paid"
                  delta={+4}
                  isAr={isAr}
                  num={num}
                />
              </motion.li>
            )}
          </AnimatePresence>
          {HISTORY.map((h, i) => (
            <li key={i}>
              <HistoryRow
                month={h.month}
                date={h.date}
                amount={h.amount}
                currency={strings.currency}
                kind={h.kind}
                delta={h.delta}
                isAr={isAr}
                num={num}
              />
            </li>
          ))}
        </ul>
      </motion.section>

      {/* Footer reassurance */}
      <section className="mt-16 flex flex-col gap-1 border-t border-line/60 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-baseline gap-3">
          <span className="text-eyebrow text-gold-deep">{strings.trustWord}</span>
          <span className="text-sm text-muted-fg">{strings.trustTagline}</span>
        </div>
        <p className="text-xs text-muted-fg">{strings.threadIntro}</p>
      </section>
    </main>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Due card — Apple Wallet pass aesthetic
   ───────────────────────────────────────────────────────────────────────────── */

function DueCard({
  state,
  isAr,
  num,
  strings,
  discount,
  discountedRent,
  onPay,
  onKhalas,
  showMethods,
  onToggleMethods,
}: {
  state: "due" | "paid" | "khalas";
  isAr: boolean;
  num: (n: number | string) => string;
  strings: Strings;
  discount: number;
  discountedRent: number;
  onPay: () => void;
  onKhalas: () => void;
  showMethods: boolean;
  onToggleMethods: () => void;
}) {
  const paid = state === "paid";

  return (
    <div
      className="relative overflow-hidden rounded-[28px] p-7 sm:p-9"
      style={{
        background:
          "linear-gradient(155deg, #0d2240 0%, #1a3358 55%, #233f6c 100%)",
        boxShadow:
          "0 24px 48px -16px rgba(13,34,64,0.35), 0 1px 0 rgba(255,255,255,0.06) inset",
      }}
    >
      {/* Gold edge whisper, top-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(201,169,97,0.35), transparent 70%)",
        }}
      />
      {/* Subtle hairline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-7 top-[58%] h-px"
        style={{ background: "rgba(253,248,243,0.08)" }}
      />

      <div className="relative">
        <div className="flex items-baseline justify-between">
          <p
            className="text-eyebrow"
            style={{ color: "rgba(253,248,243,0.65)" }}
          >
            {strings.dueEyebrow}
          </p>
          <p
            className="text-eyebrow"
            style={{ color: "rgba(201,169,97,0.9)" }}
          >
            {strings.dueDateRaw}
          </p>
        </div>

        <div className="mt-6 flex items-baseline gap-3">
          <span
            className="font-display leading-none tracking-tight text-cream"
            style={{ fontSize: "clamp(3.75rem,2rem+6vw,6.25rem)" }}
          >
            {num(RENT.toLocaleString("en-US"))}
          </span>
          <span
            className="text-h4 font-medium"
            style={{ color: "rgba(253,248,243,0.75)" }}
          >
            {strings.currency}
          </span>
        </div>

        <p className="mt-2 text-sm" style={{ color: "rgba(253,248,243,0.55)" }}>
          {isAr
            ? "شقة ١٢ · هليوبوليس · مع فريدة م."
            : "Apt 12 · Heliopolis · with Farida M."}
        </p>

        {/* Score-impact preview row */}
        <ScoreImpactPreview isAr={isAr} num={num} state={state} />

        {/* Primary action */}
        <div className="mt-7">
          <AnimatePresence mode="wait" initial={false}>
            {paid ? (
              <motion.div
                key="paid"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-between gap-4 rounded-full bg-received px-6 py-4 text-cream shadow-lift"
              >
                <span className="inline-flex items-center gap-3">
                  <CheckCircle />
                  <span className="text-sm font-medium">
                    {isAr
                      ? `بشارة وصلت · وفّرت ${num(discount.toLocaleString("en-US"))} ${strings.currency}`
                      : `Omen received · ${num(discount.toLocaleString("en-US"))} ${strings.currency} saved`}
                  </span>
                </span>
              </motion.div>
            ) : state === "khalas" ? (
              <motion.div
                key="khalas"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between gap-4 rounded-full border border-cream/20 bg-cream/5 px-6 py-4 text-cream"
              >
                <span className="text-sm">
                  {isAr
                    ? "خَلاص — معاك يومين زيادة بدون أي خصم من نقاطك."
                    : "Khalas — 2-day grace granted. No score impact."}
                </span>
                <button
                  type="button"
                  onClick={onPay}
                  className="text-sm font-medium text-gold hover:underline"
                >
                  {strings.payNow}
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="pay"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="grid gap-3"
              >
                <button
                  type="button"
                  onClick={onPay}
                  className="group flex w-full items-center justify-between gap-3 rounded-full bg-cream px-6 py-4 text-ink shadow-lift hover:bg-white transition-colors"
                  aria-label={strings.payNow}
                >
                  <span className="inline-flex items-center gap-3">
                    <Bolt />
                    <span className="text-base font-semibold tracking-tight">
                      {strings.payNow}
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-2 text-xs text-muted-fg">
                    <span className="line-through opacity-50">
                      {num(RENT.toLocaleString("en-US"))}
                    </span>
                    <span className="font-semibold text-ink">
                      {num(discountedRent.toLocaleString("en-US"))} {strings.currency}
                    </span>
                    <Chevron />
                  </span>
                </button>
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-1">
                  <button
                    type="button"
                    onClick={onToggleMethods}
                    className="text-[11px] uppercase tracking-wider text-cream/60 hover:text-cream"
                  >
                    {strings.payMethods}
                  </button>
                  <button
                    type="button"
                    onClick={onKhalas}
                    className="text-[11px] uppercase tracking-wider text-cream/60 hover:text-gold"
                  >
                    {isAr ? "محتاج خَلاص يومين" : "Need 2 days · Khalas"}
                  </button>
                </div>
                <AnimatePresence>
                  {showMethods && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-3 gap-2 pt-1">
                        <MethodChip label="InstaPay" />
                        <MethodChip label="Vodafone Cash" />
                        <MethodChip label="Fawry" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ScoreImpactPreview({
  isAr,
  num,
  state,
}: {
  isAr: boolean;
  num: (n: number | string) => string;
  state: "due" | "paid" | "khalas";
}) {
  return (
    <div
      className="mt-7 flex items-center justify-between gap-3 rounded-2xl border border-cream/10 px-4 py-3"
      style={{ background: "rgba(253,248,243,0.04)" }}
    >
      <div className="flex flex-col gap-0.5">
        <span
          className="text-[10px] uppercase tracking-widest"
          style={{ color: "rgba(253,248,243,0.55)" }}
        >
          {isAr ? "تأثير على نقاطك" : "Score impact"}
        </span>
        <span className="text-sm text-cream">
          {state === "paid"
            ? isAr
              ? "نقاطك طلعت من ٩٢ لـ ٩٦"
              : `Lifted from ${num(92)} to ${num(96)}`
            : isAr
              ? "ادفع دلوقتي · +٤ نقاط · ٩٢ → ٩٦"
              : `Pay now · +4 · ${num(92)} → ${num(96)}`}
        </span>
      </div>
      <div className="inline-flex items-center gap-2">
        <Pip filled />
        <Pip filled />
        <Pip filled={state === "paid"} />
        <Pip filled={state === "paid"} />
      </div>
    </div>
  );
}

function IncentiveCard({
  isAr,
  num,
  discount,
  currency,
}: {
  isAr: boolean;
  num: (n: number | string) => string;
  discount: number;
  currency: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-surface-2 p-5 shadow-soft sm:p-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(500px 200px at 0% 0%, rgba(201,169,97,0.14), transparent 65%)",
        }}
      />
      <div className="relative flex items-center justify-between gap-5">
        <div className="min-w-0">
          <p className="text-eyebrow text-gold-deep">
            {isAr ? "ادفع بدري · وفّر أكثر" : "Pay early · save 5%"}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink">
            {isAr
              ? `ادفع قبل ميعاد الاستحقاق بـ ${num(EARLY_DISCOUNT_DAYS)} أيام أو أكثر وخصم ٥٪ على إيجار الشهر، فوراً.`
              : `Pay ${num(EARLY_DISCOUNT_DAYS)}+ days before the due date and 5% comes off this month's rent — instantly.`}
          </p>
        </div>
        <div className="shrink-0 text-right rtl:text-left">
          <p className="font-display text-h2 leading-none tracking-tight text-ink">
            −{num(discount.toLocaleString("en-US"))}
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-fg">
            {currency}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Score card — Apple Card vibe, big ring + numeral
   ───────────────────────────────────────────────────────────────────────────── */

function ScoreCard({
  score,
  scoreEyebrow,
  scoreLabel,
  scoreBody,
  isAr,
  num,
  state,
}: {
  score: number;
  scoreEyebrow: string;
  scoreLabel: string;
  scoreBody: string;
  isAr: boolean;
  num: (n: number | string) => string;
  state: "due" | "paid" | "khalas";
}) {
  const dim = 156;
  const stroke = 8;
  const r = (dim - stroke) / 2;
  const c = 2 * Math.PI * r;
  const filled = (c * score) / 100;
  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-surface-2 p-6 shadow-soft sm:p-7">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(500px 240px at 100% 0%, rgba(201,169,97,0.10), transparent 65%)",
        }}
      />
      <div className="relative flex items-center gap-6">
        <div
          className="relative grid place-items-center"
          style={{ width: dim, height: dim }}
        >
          <svg width={dim} height={dim} className="-rotate-90">
            <circle
              cx={dim / 2}
              cy={dim / 2}
              r={r}
              stroke="var(--line-strong)"
              strokeWidth={stroke}
              fill="none"
            />
            <motion.circle
              cx={dim / 2}
              cy={dim / 2}
              r={r}
              stroke="var(--gold)"
              strokeWidth={stroke}
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDasharray: `0 ${c}` }}
              animate={{ strokeDasharray: `${filled} ${c}` }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>
          <div className="absolute text-center">
            <p
              className="font-display text-ink"
              style={{ fontSize: 56, lineHeight: 1, letterSpacing: "-0.03em" }}
            >
              {num(score)}
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-fg">
              {isAr ? "من ١٠٠" : `of ${num(100)}`}
            </p>
          </div>
        </div>
        <div className="flex-1">
          <p className="text-eyebrow text-gold-deep">{scoreEyebrow}</p>
          <p className="mt-1.5 font-display text-h3 text-ink">{scoreLabel}</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            {scoreBody}
          </p>
          {state === "paid" && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-received-soft px-3 py-1 text-xs font-medium text-received"
            >
              +{num(4)} {isAr ? "نقاط" : "points"}
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Buraq streak — Apple Activity Rings closed-ring metaphor
   ───────────────────────────────────────────────────────────────────────────── */

function StreakCard({
  isAr,
  num,
  state,
}: {
  isAr: boolean;
  num: (n: number | string) => string;
  state: "due" | "paid" | "khalas";
}) {
  const monthsClosed = state === "paid" ? 4 : 3;
  const total = 6;
  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-surface-2 p-6 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-eyebrow text-gold-deep">
            {isAr ? "سلسلة البُراق" : "Buraq streak"}
          </p>
          <p className="mt-1.5 font-display text-h3 text-ink">
            {num(monthsClosed)}{" "}
            <span className="text-ink/55 text-lg font-sans">
              {isAr ? `من ${num(total)}` : `of ${num(total)} months`}
            </span>
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            {isAr
              ? "كمّل ٦ شهور دفع في الميعاد وتستحق وسام «بُراق» — كل المُلّاك بيشوفوه."
              : `Close ${num(6)} consecutive months and you unlock the Buraq badge, visible to every landlord in the network.`}
          </p>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-6 gap-2">
        {Array.from({ length: total }).map((_, i) => {
          const closed = i < monthsClosed;
          return (
            <div
              key={i}
              className="aspect-square overflow-hidden rounded-full border border-line"
              style={{
                background: closed ? "var(--gold)" : "transparent",
                opacity: closed ? 1 : 0.35,
              }}
            >
              {closed && (
                <div
                  className="h-full w-full"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgba(255,255,255,0.35), transparent 70%)",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   History rows
   ───────────────────────────────────────────────────────────────────────────── */

function HistoryRow({
  month,
  date,
  amount,
  currency,
  kind,
  delta,
  isAr,
  num,
}: {
  month: string;
  date: string;
  amount: number;
  currency: string;
  kind: "on-time" | "early" | "late" | "just-paid";
  delta: number;
  isAr: boolean;
  num: (n: number | string) => string;
}) {
  const tag = (() => {
    if (kind === "just-paid")
      return { label: isAr ? "بشارة وصلت" : "An omen received", color: "received" };
    if (kind === "early")
      return { label: isAr ? "بدري" : "Early", color: "gold" };
    if (kind === "late")
      return { label: isAr ? "متأخر" : "Late", color: "ink-soft" };
    return { label: isAr ? "في الميعاد" : "On time", color: "ink-soft" };
  })();

  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-4 px-5 py-4 sm:px-6">
      <div className="min-w-0">
        <p className="text-sm font-medium text-ink">{month}</p>
        <p className="text-xs text-muted-fg">{date}</p>
      </div>
      <div className="text-right rtl:text-left">
        <p className="font-display text-h4 leading-none text-ink">
          {num(amount.toLocaleString("en-US"))}{" "}
          <span className="text-xs font-sans font-medium text-muted-fg">
            {currency}
          </span>
        </p>
        <p className="mt-1 inline-flex items-center gap-2 text-[11px]">
          <span
            className={
              tag.color === "received"
                ? "rounded-full bg-received-soft px-2 py-0.5 font-medium text-received"
                : tag.color === "gold"
                  ? "rounded-full bg-gold/15 px-2 py-0.5 font-medium text-gold-deep"
                  : "rounded-full bg-ink/8 px-2 py-0.5 font-medium text-ink-soft"
            }
          >
            {tag.label}
          </span>
          <span
            className={
              delta >= 0 ? "text-received font-medium" : "text-ink-soft"
            }
          >
            {delta >= 0 ? "+" : ""}
            {num(delta)}
          </span>
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Atoms
   ───────────────────────────────────────────────────────────────────────────── */

function MethodChip({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="rounded-full border border-cream/15 bg-cream/5 px-3 py-2 text-xs font-medium text-cream/85 hover:bg-cream/10 hover:border-cream/30 transition-colors"
    >
      {label}
    </button>
  );
}

function Pip({ filled }: { filled?: boolean }) {
  return (
    <span
      aria-hidden
      className="block h-1.5 w-1.5 rounded-full"
      style={{
        background: filled ? "var(--gold)" : "rgba(253,248,243,0.18)",
      }}
    />
  );
}

function Chevron() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="arrow-flip">
      <path
        d="M5 3l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Bolt() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M9 1L3 9h4l-1 6 6-8H8l1-6z"
        fill="currentColor"
        opacity="0.9"
      />
    </svg>
  );
}

function CheckCircle() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M6 10.3L9 13l5-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
