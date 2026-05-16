import Link from "next/link";
import { Logo } from "@/components/logo";
import { LocaleSwitch } from "@/components/locale-switch";
import { HeaderAuth } from "@/components/header-auth";
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

  const item = (href: string, label: string, key: Active) => (
    <Link
      href={href}
      className={
        active === key
          ? "text-ink"
          : "text-ink-soft hover:text-ink transition-colors"
      }
    >
      {label}
    </Link>
  );

  return (
    <header className="relative z-30 border-b border-line/60 bg-paper/80 backdrop-blur">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-5 py-4 sm:px-10 sm:py-6">
        <Link href={`/${locale}`} className="block shrink-0" aria-label="Omens">
          <Logo size={120} variant="ink" lang={locale} />
        </Link>
        <div className="flex items-center gap-4 sm:gap-7">
          <nav className="hidden items-center gap-6 text-sm md:flex">
            {item(`/${locale}`, t("nav.marketing"), "marketing")}
            {item(`/${locale}/properties`, t("nav.properties"), "properties")}
            <Link
              href={`/${locale}/testimonials`}
              className="text-ink-soft hover:text-ink transition-colors"
            >
              {isAr ? "آراء" : "Stories"}
            </Link>
            <Link
              href={`/${locale}/contract`}
              className="text-ink-soft hover:text-ink transition-colors"
            >
              {isAr ? "العقد" : "Contract"}
            </Link>
          </nav>
          <LocaleSwitch />
          <HeaderAuth locale={locale} signInLabel={signInLabel} />
        </div>
      </div>
    </header>
  );
}
