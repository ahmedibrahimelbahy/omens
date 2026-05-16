import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { ProductHeader } from "@/components/product-header";
import { SiteFooter } from "@/components/site-footer";
import { FaqAccordion } from "@/components/faq-accordion";
import { formatNumerals } from "@/lib/numerals";
import type { Locale } from "@/i18n/routing";

type Step = { number: string; title: string; body: string };
type Pillar = { title: string; lede: string; body: string };
type FaqItem = { q: string; a: string };

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const num = (n: number | string) => formatNumerals(n, locale);
  const isAr = locale === "ar";

  const steps = t.raw("howItWorks.steps") as Step[];
  const pillars = t.raw("pillars.items") as Pillar[];
  const vignetteParagraphs = t.raw("vignette.paragraphs") as string[];
  const pricingBullets = t.raw("pricing.bullets") as string[];
  const faqItems = t.raw("faq.items") as FaqItem[];

  return (
    <div className="grain relative min-h-screen bg-paper">
      <ProductHeader locale={locale} active="marketing" />

      {/* ─── Hero ─── */}
      <section className="relative z-10 mx-auto max-w-[1240px] px-6 pt-20 pb-28 sm:px-10 sm:pt-28 sm:pb-36">
        <p className="text-eyebrow fade-rise text-gold-deep">
          {t("hero.eyebrow")}
        </p>

        <h1 className="text-h1 fade-rise fade-rise-delay-1 mt-6 max-w-5xl text-ink">
          {t("hero.headlineA")}
          <br />
          <span className="text-ink/55">{t("hero.headlineB")}</span>
          <br />
          <span className="font-display italic">{t("hero.headlineC")}</span>
        </h1>

        <p className="text-lede fade-rise fade-rise-delay-2 mt-10 max-w-2xl">
          {t("hero.lede")}
        </p>

        <div className="fade-rise fade-rise-delay-3 mt-14 flex flex-wrap items-center gap-4 sm:gap-5">
          <Link
            href={`/${locale}/signup/landlord`}
            className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-cream shadow-lift transition-all hover:bg-ink-soft hover:shadow-gold"
          >
            <span className="text-sm font-medium tracking-wide">
              {t("hero.ctaLandlord")}
            </span>
            <span
              aria-hidden
              className="inline-block h-px w-6 bg-gold transition-all group-hover:w-10"
            />
          </Link>
          <Link
            href={`/${locale}/signup/tenant`}
            className="group inline-flex items-center gap-3 rounded-full border border-line-strong bg-surface-2 px-7 py-4 text-ink shadow-soft transition-all hover:border-gold/60 hover:shadow-gold"
          >
            <span className="text-sm font-medium tracking-wide">
              {t("hero.ctaTenant")}
            </span>
            <span
              aria-hidden
              className="inline-block h-px w-6 bg-gold transition-all group-hover:w-10"
            />
          </Link>
          <span className="ms-2 text-sm text-muted-fg">{t("hero.ctaHint")}</span>
        </div>
      </section>

      {/* ─── Farida vignette ─── */}
      <section className="relative z-10 border-t border-line/60 bg-surface-1">
        <div className="mx-auto max-w-[1240px] px-6 py-24 sm:px-10 sm:py-32">
          <div className="grid gap-12 sm:grid-cols-[1fr_1.4fr] sm:gap-20">
            <div>
              <p className="text-eyebrow text-gold-deep">{t("vignette.eyebrow")}</p>
              <h2 className="text-h2 mt-5 text-ink">{t("vignette.title")}</h2>
            </div>
            <div className="space-y-6">
              {vignetteParagraphs.map((p, i) => (
                <p key={i} className="text-lede text-ink-soft">
                  {p}
                </p>
              ))}
              <div className="mt-10 border-s-2 border-gold ps-6 py-2">
                <p className="font-display text-h3 leading-tight text-ink">
                  &ldquo;{t("vignette.pullquote")}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── How it works ─── */}
      <section className="relative z-10 mx-auto max-w-[1240px] px-6 py-24 sm:px-10 sm:py-32">
        <div className="max-w-3xl">
          <p className="text-eyebrow text-gold-deep">{t("howItWorks.eyebrow")}</p>
          <h2 className="text-h2 mt-5 text-ink">{t("howItWorks.title")}</h2>
        </div>

        <ol className="mt-16 grid gap-5 sm:grid-cols-3 sm:gap-6">
          {steps.map((s, i) => (
            <li
              key={i}
              className="relative grid grid-rows-[auto_1fr] gap-6 rounded-2xl border border-line bg-surface-2 p-7 shadow-soft sm:p-8"
            >
              <div className="flex items-start justify-between">
                <span
                  className="font-display italic text-ink/30"
                  style={{ fontSize: 56, lineHeight: 1 }}
                >
                  {isAr ? s.number : `0${i + 1}`.slice(-2)}
                </span>
                <span
                  aria-hidden
                  className="h-2 w-2 rounded-full bg-gold opacity-70"
                />
              </div>
              <div>
                <h3 className="font-display text-h4 text-ink">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ─── Three pillars ─── */}
      <section className="relative z-10 border-t border-line/60 bg-surface-1">
        <div className="mx-auto max-w-[1240px] px-6 py-24 sm:px-10 sm:py-32">
          <div className="max-w-3xl">
            <p className="text-eyebrow text-gold-deep">{t("pillars.eyebrow")}</p>
            <h2 className="text-h2 mt-5 text-ink">{t("pillars.title")}</h2>
          </div>

          <div className="mt-16 grid gap-5 lg:grid-cols-3 lg:gap-6">
            {pillars.map((p, i) => (
              <article
                key={i}
                className="relative overflow-hidden rounded-2xl border border-line bg-surface-2 p-8 shadow-soft sm:p-9"
              >
                {/* Distinct color identity per pillar — Apple Wallet style */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-60"
                  style={{
                    background:
                      i === 0
                        ? "radial-gradient(600px 280px at 0% 0%, rgba(16,185,129,0.10), transparent 65%)"
                        : i === 1
                          ? "radial-gradient(600px 280px at 100% 0%, rgba(201,169,97,0.15), transparent 65%)"
                          : "radial-gradient(600px 280px at 0% 100%, rgba(13,34,64,0.10), transparent 65%)",
                  }}
                />
                <div className="relative">
                  <p className="text-eyebrow text-gold-deep">{`0${i + 1}`}</p>
                  <h3 className="text-h3 mt-4 text-ink">{p.title}</h3>
                  <p className="mt-3 font-display text-h5 text-ink/70 italic">
                    {p.lede}
                  </p>
                  <p className="mt-6 text-sm leading-relaxed text-ink-soft">
                    {p.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── For tenants ─── */}
      <section className="relative z-10 mx-auto max-w-[1240px] px-6 py-24 sm:px-10 sm:py-32">
        <div className="grid gap-12 sm:grid-cols-[1fr_auto] sm:items-end sm:gap-16">
          <div className="max-w-2xl">
            <p className="text-eyebrow text-gold-deep">
              {t("forTenants.eyebrow")}
            </p>
            <h2 className="text-h2 mt-5 text-ink">{t("forTenants.title")}</h2>
            <p className="text-lede mt-6">{t("forTenants.body")}</p>
          </div>
          <Link
            href={`/${locale}/properties`}
            className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-cream shadow-lift transition-all hover:bg-ink-soft hover:shadow-gold"
          >
            <span className="text-sm font-medium">{t("forTenants.cta")}</span>
            <span
              aria-hidden
              className="inline-block h-px w-6 bg-gold transition-all group-hover:w-10"
            />
          </Link>
        </div>
      </section>

      {/* ─── Pricing ─── */}
      <section className="relative z-10 border-t border-line/60 bg-surface-1">
        <div className="mx-auto max-w-[1240px] px-6 py-24 sm:px-10 sm:py-32">
          <div className="grid gap-12 sm:grid-cols-[1fr_1.2fr] sm:gap-20">
            <div>
              <p className="text-eyebrow text-gold-deep">
                {t("pricing.eyebrow")}
              </p>
              <h2 className="text-h2 mt-5 text-ink">{t("pricing.title")}</h2>

              <div className="mt-10 flex items-baseline gap-3">
                <span
                  className="font-display text-ink"
                  style={{
                    fontSize: "clamp(5rem, 4rem + 4vw, 7rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {t("pricing.rate")}
                </span>
                <span className="text-h4 font-medium text-ink-soft">
                  {t("pricing.rateLabel")}
                </span>
              </div>
              <p className="mt-6 text-sm leading-relaxed text-muted-fg max-w-md">
                {t("pricing.comparedTo")}
              </p>
            </div>

            <ul className="grid content-center gap-4">
              {pricingBullets.map((bullet, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 rounded-xl border border-line bg-surface-2 px-5 py-4 shadow-soft"
                >
                  <span
                    aria-hidden
                    className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-received text-cream"
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2 5.2L4.2 7.4L8 3"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-sm text-ink">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="relative z-10 mx-auto max-w-[1240px] px-6 py-24 sm:px-10 sm:py-32">
        <div className="max-w-3xl">
          <p className="text-eyebrow text-gold-deep">{t("faq.eyebrow")}</p>
          <h2 className="text-h2 mt-5 text-ink">{t("faq.title")}</h2>
        </div>
        <div className="mt-12">
          <FaqAccordion items={faqItems} />
        </div>
      </section>

      {/* ─── Final CTA (two doors) ─── */}
      <section className="relative z-10 border-t border-line/60 bg-surface-1">
        <div className="mx-auto max-w-[1240px] px-6 py-24 sm:px-10 sm:py-32">
          <div className="max-w-3xl">
            <p className="text-eyebrow text-gold-deep">
              {t("finalCta.eyebrow")}
            </p>
            <h2 className="text-h2 mt-5 text-ink">{t("finalCta.title")}</h2>
            <p className="text-lede mt-6 max-w-2xl">{t("finalCta.subtitle")}</p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 sm:gap-6">
            <Link
              href={`/${locale}/signup/landlord`}
              className="group relative overflow-hidden rounded-2xl bg-ink p-8 text-cream shadow-lift transition-all hover:-translate-y-0.5 hover:shadow-gold sm:p-10"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(201,169,97,0.35), transparent 70%)",
                }}
              />
              <div className="relative">
                <p className="text-eyebrow text-gold">
                  {t("finalCta.landlordCard.title")}
                </p>
                <p className="text-h3 mt-5 font-display text-cream">
                  {t("finalCta.landlordCard.body")}
                </p>
                <div className="mt-10 inline-flex items-center gap-3 text-sm font-medium">
                  <span>{t("finalCta.landlordCard.cta")}</span>
                  <span
                    aria-hidden
                    className="inline-block h-px w-6 bg-gold transition-all group-hover:w-12"
                  />
                </div>
              </div>
            </Link>

            <Link
              href={`/${locale}/signup/tenant`}
              className="group relative overflow-hidden rounded-2xl border border-line bg-surface-2 p-8 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift sm:p-10"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -left-16 -bottom-16 h-56 w-56 rounded-full"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(16,185,129,0.18), transparent 70%)",
                }}
              />
              <div className="relative">
                <p className="text-eyebrow text-gold-deep">
                  {t("finalCta.tenantCard.title")}
                </p>
                <p className="text-h3 mt-5 font-display text-ink">
                  {t("finalCta.tenantCard.body")}
                </p>
                <div className="mt-10 inline-flex items-center gap-3 text-sm font-medium text-ink">
                  <span>{t("finalCta.tenantCard.cta")}</span>
                  <span
                    aria-hidden
                    className="inline-block h-px w-6 bg-gold transition-all group-hover:w-12"
                  />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter locale={locale} />
    </div>
  );
}
