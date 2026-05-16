import Link from "next/link";
import { Logo } from "@/components/logo";
import { LocaleSwitch } from "@/components/locale-switch";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

type Props = {
  locale: Locale;
  active?: "landlord" | "tenant" | "marketing";
};

export async function ProductHeader({ locale, active }: Props) {
  const t = await getTranslations();
  return (
    <header className="relative z-10 border-b border-line/60 bg-paper/80 backdrop-blur">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-5 sm:px-10 sm:py-6">
        <Link href={`/${locale}`} className="block" aria-label="Omens">
          <Logo size={132} variant="ink" lang={locale} />
        </Link>
        <div className="flex items-center gap-6 sm:gap-10">
          <nav className="hidden items-center gap-6 text-sm text-ink-soft sm:flex">
            <Link
              href={`/${locale}/landlord`}
              className={active === "landlord" ? "text-ink" : "hover:text-ink transition-colors"}
            >
              {t("nav.landlord")}
            </Link>
            <Link
              href={`/${locale}/tenant`}
              className={active === "tenant" ? "text-ink" : "hover:text-ink transition-colors"}
            >
              {t("nav.tenant")}
            </Link>
            <Link
              href={`/${locale}`}
              className={active === "marketing" ? "text-ink" : "hover:text-ink transition-colors"}
            >
              {t("nav.marketing")}
            </Link>
          </nav>
          <LocaleSwitch />
        </div>
      </div>
    </header>
  );
}
