import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { ProductHeader } from "@/components/product-header";
import { SiteFooter } from "@/components/site-footer";
import { Arrow } from "@/components/arrow";
import { TESTIMONIALS, STATS } from "@/lib/testimonials";
import { formatNumerals } from "@/lib/numerals";
import type { Locale } from "@/i18n/routing";

export default async function TestimonialsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isAr = locale === "ar";
  const num = (n: number | string) => formatNumerals(n, locale);

  const t = isAr
    ? {
        eyebrow: "آراء حقيقية",
        title: "ناس بيوفّروا في الإيجار، وناس بياخدوه في الأول.",
        subtitle:
          "اقرأ من ملاك ومستأجرين بيشتغلوا فعلاً مع Omens في القاهرة دلوقتي. كل اقتباس من تجربة حقيقية في التجربة الأولى.",
        statsTitle: "الأرقام لحد دلوقتي",
        statLandlords: "مالك في الشبكة",
        statTenants: "مستأجر فعّال",
        statRent: "إيجار اتصرف هذا الشهر",
        statOnTime: "صرف في موعده ١٠٠٪",
        landlordLabel: "مالك",
        tenantLabel: "مستأجر",
        ctaTitle: "جاهز تنضم؟",
        ctaSubtitle: "بابين. بابك بعد دقيقة.",
        ctaLandlord: "أنا مالك",
        ctaTenant: "أنا مستأجر",
      }
    : {
        eyebrow: "Real stories",
        title: "People who pay early. People who get paid first.",
        subtitle:
          "Read from landlords and tenants who run their rental life through Omens in Cairo right now. Every quote is from a real participant in our current pilot.",
        statsTitle: "The numbers so far",
        statLandlords: "Landlords on the network",
        statTenants: "Active tenants",
        statRent: "Rent paid out this month",
        statOnTime: "Paid on the 1st, every month",
        landlordLabel: "Landlord",
        tenantLabel: "Tenant",
        ctaTitle: "Ready to join?",
        ctaSubtitle: "Two doors. Yours is a minute away.",
        ctaLandlord: "I'm a landlord",
        ctaTenant: "I'm a tenant",
      };

  return (
    <div className="grain relative min-h-screen bg-paper">
      <ProductHeader locale={locale} />

      <main className="mx-auto max-w-[1240px] px-6 pb-32 pt-12 sm:px-10 sm:pt-16">
        {/* Hero */}
        <section className="max-w-3xl">
          <p className="text-eyebrow text-gold-deep fade-rise">{t.eyebrow}</p>
          <h1 className="text-h1 fade-rise fade-rise-delay-1 mt-6 text-ink">
            {t.title}
          </h1>
          <p className="text-lede fade-rise fade-rise-delay-2 mt-8">
            {t.subtitle}
          </p>
        </section>

        {/* Stats banner */}
        <section className="mt-16 grid gap-4 rounded-2xl border border-line bg-surface-2 p-6 shadow-soft sm:grid-cols-4 sm:gap-0 sm:p-0">
          <Stat
            value={num(STATS.landlords)}
            label={t.statLandlords}
            tone="ink"
          />
          <Stat
            value={num(STATS.tenants)}
            label={t.statTenants}
            tone="gold"
          />
          <Stat
            value={`${num((STATS.monthlyRent / 1000).toFixed(0))}K`}
            suffix={isAr ? "ج.م" : "EGP"}
            label={t.statRent}
            tone="received"
          />
          <Stat
            value={`${num(STATS.zerLateReceipts)}%`}
            label={t.statOnTime}
            tone="ink"
          />
        </section>

        {/* Quotes grid — masonry-ish via column-count */}
        <section className="mt-20 grid gap-5 sm:grid-cols-2 sm:gap-6">
          {TESTIMONIALS.map((quote, i) => {
            const name = isAr ? quote.nameAr : quote.name;
            const meta = isAr ? quote.metaAr : quote.meta;
            const body = isAr ? quote.quoteAr : quote.quoteEn;
            const highlight = isAr ? quote.highlightAr : quote.highlightEn;
            const isLandlord = quote.role === "landlord";

            return (
              <article
                key={quote.id}
                className="relative grid grid-rows-[auto_1fr_auto] overflow-hidden rounded-2xl border border-line bg-surface-2 p-7 shadow-soft sm:p-8"
                style={{
                  animationDelay: `${0.08 + i * 0.06}s`,
                }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-50"
                  style={{
                    background: isLandlord
                      ? "radial-gradient(500px 240px at 100% 0%, rgba(13,34,64,0.06), transparent 65%)"
                      : "radial-gradient(500px 240px at 0% 100%, rgba(16,185,129,0.12), transparent 65%)",
                  }}
                />

                <div className="relative flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className={`grid h-11 w-11 place-items-center rounded-full text-[11px] font-semibold shadow-soft ${
                        isLandlord
                          ? "bg-ink text-cream"
                          : "bg-cream text-ink border border-line-strong"
                      }`}
                    >
                      {quote.initials}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ink">{name}</p>
                      <p className="text-[11px] uppercase tracking-wider text-gold-deep">
                        {isLandlord ? t.landlordLabel : t.tenantLabel}
                      </p>
                    </div>
                  </div>
                  {/* Decorative open-quote */}
                  <span
                    aria-hidden
                    className="font-display text-ink/15 leading-none"
                    style={{ fontSize: 56, fontStyle: "italic" }}
                  >
                    &ldquo;
                  </span>
                </div>

                <p
                  className="relative mt-6 text-base leading-[1.7] text-ink"
                  style={{
                    fontFamily: isAr
                      ? "var(--font-arabic), system-ui"
                      : "var(--font-display), Georgia, serif",
                    fontStyle: isAr ? "normal" : "italic",
                    fontWeight: isAr ? 500 : 400,
                  }}
                >
                  {body}
                </p>

                <div className="relative mt-6 border-t border-line pt-4">
                  <p className="text-xs text-muted-fg">{meta}</p>
                  {highlight && (
                    <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-gold/12 px-3 py-1 text-[11px] font-medium text-gold-deep">
                      <span
                        aria-hidden
                        className="h-1.5 w-1.5 rounded-full bg-gold"
                      />
                      {highlight}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </section>

        {/* CTA */}
        <section className="mt-24 rounded-2xl border border-line bg-surface-1 p-10 text-center shadow-soft sm:p-14">
          <p className="text-eyebrow text-gold-deep">{t.ctaTitle}</p>
          <h2 className="text-h2 mt-4 text-ink">{t.ctaSubtitle}</h2>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/${locale}/signup/landlord`}
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-cream shadow-lift transition-all hover:bg-ink-soft hover:shadow-gold"
            >
              <span className="text-sm font-medium tracking-wide">
                {t.ctaLandlord}
              </span>
              <Arrow tone="text-gold" />
            </Link>
            <Link
              href={`/${locale}/signup/tenant`}
              className="group inline-flex items-center gap-3 rounded-full border border-line-strong bg-surface-2 px-7 py-4 text-ink shadow-soft transition-all hover:border-gold/60 hover:shadow-gold"
            >
              <span className="text-sm font-medium tracking-wide">
                {t.ctaTenant}
              </span>
              <Arrow tone="text-gold" />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter locale={locale} />
    </div>
  );
}

function Stat({
  value,
  label,
  suffix,
  tone,
}: {
  value: string;
  label: string;
  suffix?: string;
  tone: "ink" | "gold" | "received";
}) {
  const tint =
    tone === "gold"
      ? "rgba(201,169,97,0.10)"
      : tone === "received"
        ? "rgba(16,185,129,0.10)"
        : "rgba(13,34,64,0.05)";

  return (
    <div
      className="relative overflow-hidden p-7 first:sm:rounded-s-2xl last:sm:rounded-e-2xl sm:border-e sm:border-line sm:last:border-e-0"
      style={{
        background: `radial-gradient(400px 200px at 50% 0%, ${tint}, transparent 70%)`,
      }}
    >
      <p className="flex items-baseline gap-1.5">
        <span className="font-display text-h2 leading-none tracking-tight text-ink">
          {value}
        </span>
        {suffix && (
          <span className="text-sm font-medium text-ink-soft">{suffix}</span>
        )}
      </p>
      <p className="mt-2 text-[11px] uppercase tracking-wider text-muted-fg">
        {label}
      </p>
    </div>
  );
}
