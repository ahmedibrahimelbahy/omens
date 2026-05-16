"use client";

import { motion } from "framer-motion";
import { formatNumerals } from "@/lib/numerals";
import type { Locale } from "@/i18n/routing";

const RENT = 4200;

type Message = {
  /** Days until due (negative = past due). */
  daysOut: number;
  /** Discount rate this message earns if paid right after. */
  discountPct: number;
  /** Arabic body — the actual message Omens sends. */
  ar: string;
  /** English caption shown only on en-locale, beneath the Arabic. */
  en: string;
};

const MESSAGES: Message[] = [
  {
    daysOut: 10,
    discountPct: 5,
    ar: "أهلاً يا مصطفى 👋 إيجار شهر مايو ميعاده يوم ١. لو دفعت دلوقتي تاخد خصم ٥٪ — يعني توفر ٢١٠ ج.م.",
    en: "May rent is due on the 1st. Pay now and get 5% off — that's EGP 210 saved.",
  },
  {
    daysOut: 2,
    discountPct: 2,
    ar: "تذكير سريع: الإيجار بعد يومين. لسه ممكن تدفع دلوقتي وتاخد ٢٪ خصم — توفير ٨٤ ج.م.",
    en: "Quick reminder: rent's due in 2 days. Pay now and still get 2% off — EGP 84 saved.",
  },
  {
    daysOut: 0,
    discountPct: 1,
    ar: "النهاردة الميعاد. ادفع دلوقتي وخد ١٪ خصم قبل ما يفوت — توفير ٤٢ ج.م.",
    en: "Today's the day. Pay now and grab a 1% discount before it's gone — EGP 42 saved.",
  },
];

export function TenantChat({
  locale,
  onPay,
}: {
  locale: Locale;
  onPay?: () => void;
}) {
  const isAr = locale === "ar";
  const num = (n: number | string) => formatNumerals(n, locale);

  return (
    <section className="mt-10">
      {/* Header — looks like a WhatsApp chat with Omens */}
      <div className="flex items-center justify-between rounded-t-2xl border border-line border-b-0 bg-surface-2 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="relative grid h-10 w-10 place-items-center rounded-full bg-ink text-[11px] font-semibold text-cream shadow-soft">
            <svg viewBox="0 0 32 32" width="18" height="18" fill="none">
              <g stroke="var(--gold)" strokeLinecap="round" strokeLinejoin="round">
                <path d="M 16 4 L 16 14" strokeWidth={1.6} />
                <path d="M 16 18 L 16 28" strokeWidth={1.4} />
                <path d="M 4 16 L 28 16" strokeWidth={1.4} />
              </g>
              <circle cx="16" cy="16" r="1.6" fill="var(--gold)" />
            </svg>
            <span
              aria-hidden
              className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-surface-2 bg-received"
            />
          </span>
          <div>
            <p className="text-sm font-semibold text-ink">Omens</p>
            <p className="text-[11px] text-received">
              {isAr ? "متّصل" : "Online"}
            </p>
          </div>
        </div>
        <span className="rounded-full bg-cream-deep/60 px-3 py-1 text-[10px] uppercase tracking-wider text-muted-fg">
          {isAr ? "محادثة" : "Messages"}
        </span>
      </div>

      {/* Messages — WhatsApp-style stack on a cream-deep background */}
      <div
        className="rounded-b-2xl border border-line bg-cream-deep/40 px-4 py-6 shadow-soft sm:px-6 sm:py-8"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 24% 12%, rgba(13,34,64,0.05) 1px, transparent 1px), radial-gradient(1px 1px at 78% 56%, rgba(13,34,64,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      >
        <ul className="grid gap-4">
          {MESSAGES.map((msg, i) => (
            <MessageBubble
              key={i}
              msg={msg}
              index={i}
              isAr={isAr}
              num={num}
              rent={RENT}
              onPay={onPay}
            />
          ))}
        </ul>

        {/* Typing indicator suggesting more bot activity */}
        <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-surface-2 px-3 py-1.5 text-[10px] uppercase tracking-wider text-muted-fg shadow-soft">
          <span className="flex gap-1">
            <span className="h-1 w-1 animate-pulse rounded-full bg-gold" />
            <span className="h-1 w-1 animate-pulse rounded-full bg-gold [animation-delay:0.2s]" />
            <span className="h-1 w-1 animate-pulse rounded-full bg-gold [animation-delay:0.4s]" />
          </span>
          <span>{isAr ? "Omens بيكتب…" : "Omens is typing…"}</span>
        </div>
      </div>
    </section>
  );
}

function MessageBubble({
  msg,
  index,
  isAr,
  num,
  rent,
  onPay,
}: {
  msg: Message;
  index: number;
  isAr: boolean;
  num: (n: number | string) => string;
  rent: number;
  onPay?: () => void;
}) {
  const savings = Math.round((rent * msg.discountPct) / 100);
  const timeLabel = (() => {
    if (msg.daysOut === 0) return isAr ? "النهاردة" : "Today";
    if (msg.daysOut === 2) return isAr ? "من يومين" : "2 days ago";
    if (msg.daysOut === 10) return isAr ? "من ١٠ أيام" : "10 days ago";
    return isAr ? `من ${num(msg.daysOut)} يوم` : `${num(msg.daysOut)}d ago`;
  })();

  return (
    <motion.li
      initial={{ opacity: 0, y: 14, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.1 + index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="flex justify-start"
    >
      <div className="max-w-[88%] sm:max-w-[78%]">
        <div
          className="relative rounded-2xl rounded-ss-sm bg-surface-2 px-5 py-4 shadow-soft"
          style={{
            // subtle gold left edge to mark the brand voice
            borderInlineStart: "3px solid var(--gold)",
          }}
        >
          {/* Arabic body — always rendered */}
          <p
            lang="ar"
            dir="rtl"
            className="text-[15px] leading-[1.7] text-ink"
            style={{
              fontFamily: "var(--font-arabic), system-ui, sans-serif",
            }}
          >
            {msg.ar}
          </p>

          {/* English caption — only on en locale, subtle */}
          {!isAr && (
            <p className="mt-3 border-t border-line/70 pt-3 text-xs leading-relaxed text-muted-fg">
              {msg.en}
            </p>
          )}

          {/* Savings + CTA row */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-received-soft px-2.5 py-1 text-[11px] font-semibold text-received">
                {isAr
                  ? `وفّر ${num(savings)} ج.م`
                  : `Save EGP ${num(savings)}`}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-gold-deep">
                {isAr ? `خصم ${num(msg.discountPct)}٪` : `${num(msg.discountPct)}% off`}
              </span>
            </div>
            <button
              type="button"
              onClick={onPay}
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-4 py-1.5 text-[11px] font-medium text-cream transition-colors hover:bg-ink-soft"
            >
              <span>{isAr ? "ادفع دلوقتي" : "Pay now"}</span>
              <svg
                width="11"
                height="11"
                viewBox="0 0 14 14"
                fill="none"
                className="arrow-flip text-gold"
              >
                <path
                  d="M5 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <p className="mt-1.5 px-2 text-[10px] text-muted-fg">{timeLabel}</p>
      </div>
    </motion.li>
  );
}
