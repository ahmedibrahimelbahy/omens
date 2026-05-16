import { getTranslations, setRequestLocale } from "next-intl/server";
import { Logo } from "@/components/logo";
import { LocaleSwitch } from "@/components/locale-switch";
import { formatNumerals } from "@/lib/numerals";
import type { Locale } from "@/i18n/routing";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const num = (n: number | string) => formatNumerals(n, locale);

  return (
    <div className="grain relative min-h-screen bg-paper">
      {/* Top bar — a single hairline + nav */}
      <header className="relative z-10 border-b border-line/60">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-5 sm:px-10 sm:py-6">
          <Logo size={132} variant="ink" lang={locale} />
          <div className="flex items-center gap-6 sm:gap-10">
            <nav className="hidden items-center gap-6 text-sm text-ink-soft sm:flex">
              <a href={`/${locale}/landlord`} className="hover:text-ink transition-colors">
                {t("nav.landlord")}
              </a>
              <a href={`/${locale}/tenant`} className="hover:text-ink transition-colors">
                {t("nav.tenant")}
              </a>
            </nav>
            <LocaleSwitch />
          </div>
        </div>
      </header>

      {/* Hero — the editorial moment */}
      <section className="relative z-10 mx-auto max-w-[1240px] px-6 pt-20 pb-24 sm:px-10 sm:pt-28 sm:pb-32">
        <p className="text-eyebrow text-gold-deep fade-rise">
          {t("hero.eyebrow")}
        </p>

        <h1 className="text-h1 mt-6 max-w-5xl text-ink fade-rise fade-rise-delay-1">
          {t("hero.headlineA")}
          <br />
          <span className="text-ink/55">{t("hero.headlineB")}</span>
          <br />
          <span className="font-display italic">{t("hero.headlineC")}</span>
        </h1>

        <p className="text-lede mt-10 max-w-2xl fade-rise fade-rise-delay-2">
          {t("hero.lede")}
        </p>

        <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 fade-rise fade-rise-delay-3">
          <button
            type="button"
            className="group relative inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-cream shadow-lift transition-all hover:bg-ink-soft hover:shadow-gold focus-visible:outline-gold"
          >
            <span className="text-sm font-medium tracking-wide">
              {t("hero.cta")}
            </span>
            <span
              aria-hidden
              className="inline-block h-px w-6 bg-gold transition-all group-hover:w-10"
            />
          </button>
          <span className="text-sm text-muted-fg">{t("hero.ctaHint")}</span>
        </div>
      </section>

      {/* Design-system showcase — proof the foundation is sound */}
      <section className="relative z-10 border-t border-line/60 bg-surface-1">
        <div className="mx-auto max-w-[1240px] px-6 py-20 sm:px-10 sm:py-24">
          <div className="rule mb-10">
            <span className="dot" />
            <span className="text-eyebrow">{t("system.subtitle")}</span>
            <span className="dot" />
          </div>

          <h2 className="text-h2 max-w-3xl text-ink">{t("system.title")}</h2>
          <p className="text-lede mt-8 max-w-2xl">{t("system.paragraph")}</p>

          {/* Swatches */}
          <div className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Swatch
              hex="#C9A961"
              label={t("system.swatchGold")}
              token="--gold"
              dark
            />
            <Swatch
              hex="#0D2240"
              label={t("system.swatchInk")}
              token="--ink"
              dark
            />
            <Swatch hex="#FDF8F3" label={t("system.swatchCream")} token="--cream" />
            <Swatch
              hex="#10B981"
              label={t("system.swatchReceived")}
              token="--received"
              dark
            />
          </div>

          {/* Type scale */}
          <div className="mt-20 grid gap-10 sm:gap-12">
            <TypeRow label="Display" sizeNote={num(112)}>
              <span className="text-display italic text-ink">Omens</span>
            </TypeRow>
            <TypeRow label="H1" sizeNote={num(88)}>
              <span className="text-h1 text-ink">
                {locale === "ar"
                  ? "إيجار مضمون."
                  : "Rent on the first."}
              </span>
            </TypeRow>
            <TypeRow label="H2" sizeNote={num(60)}>
              <span className="text-h2 text-ink">
                {locale === "ar"
                  ? "ثقة محفوظة."
                  : "Trust restored."}
              </span>
            </TypeRow>
            <TypeRow label="H3" sizeNote={num(40)}>
              <span className="text-h3 text-ink">
                {locale === "ar"
                  ? "بنوفّيها أول كل شهر"
                  : "A promise kept on the first"}
              </span>
            </TypeRow>
            <TypeRow label="Lede" sizeNote={num(19)}>
              <span className="text-lede max-w-2xl block">
                {t("system.paragraph")}
              </span>
            </TypeRow>
            <TypeRow label="Body" sizeNote={num(17)}>
              <p className="max-w-2xl text-ink-soft">{t("hero.lede")}</p>
            </TypeRow>
            <TypeRow label="Eyebrow" sizeNote={num(11)}>
              <span className="text-eyebrow text-gold-deep">
                {t("hero.eyebrow")}
              </span>
            </TypeRow>
          </div>

          {/* The "received" moment — only a teaser; product pages bring it to life */}
          <div className="mt-20">
            <div className="rule mb-6">
              <span className="dot" />
              <span className="text-eyebrow">{t("moment.label")}</span>
            </div>
            <div className="inline-flex items-center gap-3 rounded-full bg-received-soft px-5 py-3">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-received text-cream">
                <CheckIcon />
              </span>
              <span className="text-sm font-medium text-ink">
                {locale === "ar"
                  ? `استلمت إيجار شقة هليوبوليس · ${num("18,400")} ج.م`
                  : `Heliopolis · EGP ${num("18,400")} received`}
              </span>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
              <a
                href={`/${locale}/landlord`}
                className="group inline-flex items-center gap-3 text-sm font-medium text-ink hover:text-ink-soft"
              >
                <span>{t("common.viewLandlord")}</span>
                <span aria-hidden className="inline-block h-px w-6 bg-gold transition-all group-hover:w-10" />
              </a>
              <a
                href={`/${locale}/tenant`}
                className="group inline-flex items-center gap-3 text-sm font-medium text-ink hover:text-ink-soft"
              >
                <span>{t("common.viewTenant")}</span>
                <span aria-hidden className="inline-block h-px w-6 bg-gold transition-all group-hover:w-10" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-line/60">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-2 px-6 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <div className="flex items-baseline gap-3">
            <span className="text-eyebrow text-gold-deep">
              {t("footer.trustWord")}
            </span>
            <span className="text-sm text-muted-fg">{t("footer.tagline")}</span>
          </div>
          <p className="text-sm text-muted-fg">© {num(2026)} Omens</p>
        </div>
      </footer>
    </div>
  );
}

function Swatch({
  hex,
  label,
  token,
  dark,
}: {
  hex: string;
  label: string;
  token: string;
  dark?: boolean;
}) {
  return (
    <div className="group">
      <div
        className="aspect-[5/4] rounded-md shadow-soft transition-transform group-hover:-translate-y-0.5"
        style={{ background: hex }}
      />
      <div className="mt-3 flex items-baseline justify-between gap-2">
        <span className="text-sm font-medium text-ink">{label}</span>
        <code className="text-[10px] uppercase tracking-wider text-muted-fg">
          {hex.toLowerCase()}
        </code>
      </div>
      <code className="mt-1 block text-[10px] text-muted-fg">{token}</code>
      {/* dark prop intentionally unused at the visual level — kept for future variants */}
      <span className="hidden" aria-hidden>
        {dark ? "" : ""}
      </span>
    </div>
  );
}

function TypeRow({
  label,
  sizeNote,
  children,
}: {
  label: string;
  sizeNote?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[auto_1fr] items-end gap-x-8 gap-y-2 border-b border-line/60 pb-8 sm:grid-cols-[140px_1fr]">
      <div className="flex flex-col gap-1">
        <span className="text-eyebrow text-muted-fg">{label}</span>
        {sizeNote && (
          <span className="text-[10px] text-muted-fg">{sizeNote}px</span>
        )}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M2.5 6.2L5 8.6L9.5 3.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
