import Link from "next/link";
import { Logo } from "@/components/logo";
import { LocaleSwitch } from "@/components/locale-switch";
import { HeaderAuth } from "@/components/header-auth";
import { MobileNav } from "@/components/mobile-nav";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

type Active = "landlord" | "tenant" | "marketing" | "properties";

type Props = {
  locale: Locale;
  active?: Active;
};

export async function ProductHeader({ locale, active }: Props) {
  const t = await getTranslations();
  const isAr = locale === "ar";
  const signInLabel = isAr ? "تسجيل دخول" : "Sign in";
  const ctaLabel = isAr ? "ابدأ دلوقتي" : "Get started";

  const navItems = [
    {
      href: `/${locale}`,
      label: t("nav.marketing"),
      active: active === "marketing",
    },
    {
      href: `/${locale}/properties`,
      label: t("nav.properties"),
      active: active === "properties",
    },
    {
      href: `/${locale}/invoices`,
      label: isAr ? "الفواتير" : "Invoices",
      active: false,
    },
    {
      href: `/${locale}/testimonials`,
      label: isAr ? "آراء" : "Stories",
      active: false,
    },
    {
      href: `/${locale}/landlord`,
      label: t("nav.landlord"),
      active: active === "landlord",
    },
    {
      href: `/${locale}/tenant`,
      label: t("nav.tenant"),
      active: active === "tenant",
    },
  ];

  return (
    <header className="relative z-30 border-b border-line/60 bg-paper/80 backdrop-blur">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-5 py-4 sm:px-10 sm:py-6">
        <Link href={`/${locale}`} className="block shrink-0" aria-label="Omens">
          <Logo size={120} variant="ink" lang={locale} />
        </Link>
        <div className="flex items-center gap-2 sm:gap-7">
          <nav className="hidden items-center gap-6 text-sm md:flex">
            {navItems.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                className={
                  it.active
                    ? "text-ink"
                    : "text-ink-soft hover:text-ink transition-colors"
                }
              >
                {it.label}
              </Link>
            ))}
          </nav>
          <LocaleSwitch />
          <HeaderAuth locale={locale} signInLabel={signInLabel} ctaLabel={ctaLabel} />
          <MobileNav
            items={navItems}
            ariaOpen={isAr ? "افتح القائمة" : "Open menu"}
            ariaClose={isAr ? "إغلاق القائمة" : "Close menu"}
          />
        </div>
      </div>
    </header>
  );
}
