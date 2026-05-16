import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProductHeader } from "@/components/product-header";
import { SiteFooter } from "@/components/site-footer";
import { SignupForm } from "@/components/signup-form";
import type { Locale } from "@/i18n/routing";

export default async function SignupTenantPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("signup.tenant");

  return (
    <div className="grain relative min-h-screen bg-paper">
      <ProductHeader locale={locale} />

      <main className="mx-auto max-w-[1000px] px-6 pb-24 pt-12 sm:px-10 sm:pt-16">
        <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:gap-20">
          <section>
            <p className="text-eyebrow text-gold-deep">{t("eyebrow")}</p>
            <h1 className="text-h1 mt-5 text-ink">{t("title")}</h1>
            <p className="text-lede mt-6 max-w-md">{t("lede")}</p>

            <div className="mt-10 grid gap-3 rounded-2xl border border-line bg-surface-1 p-5">
              <Reassurance text={locale === "ar" ? "وفّر ٥٪ كل ما تدفع بدري" : "Save 5% every time you pay early"} />
              <Reassurance text={locale === "ar" ? "ابني نقاطك من ورقة بيضا" : "Build your Omens Score from scratch"} />
              <Reassurance text={locale === "ar" ? "شقق موثّقة بس" : "Verified apartments only"} />
            </div>
          </section>

          <section>
            <SignupForm role="tenant" locale={locale} />
          </section>
        </div>
      </main>

      <SiteFooter locale={locale} />
    </div>
  );
}

function Reassurance({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-received text-cream"
        aria-hidden
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
      <span className="text-sm text-ink-soft">{text}</span>
    </div>
  );
}
