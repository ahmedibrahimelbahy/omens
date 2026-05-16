import { getTranslations } from "next-intl/server";
import { formatNumerals } from "@/lib/numerals";
import type { Locale } from "@/i18n/routing";
import Link from "next/link";

export async function SiteFooter({ locale }: { locale: Locale }) {
  const t = await getTranslations();
  const num = (n: number | string) => formatNumerals(n, locale);
  return (
    <footer className="relative z-10 border-t border-line/60 bg-surface-1">
      <div className="mx-auto max-w-[1240px] px-6 py-16 sm:px-10 sm:py-20">
        <div className="grid gap-10 sm:grid-cols-[1.4fr_1fr] sm:gap-16">
          <div>
            <p className="font-display text-h2 leading-[1.05] tracking-tight text-ink">
              <span className="italic">Omens.</span>{" "}
              <span className="text-ink/55">{t("footer.tagline")}</span>
            </p>
            <p className="text-eyebrow mt-6 text-gold-deep">
              {t("footer.trustWord")}
            </p>
          </div>

          <nav className="grid gap-3 text-sm sm:grid-cols-2">
            <Link
              href={`/${locale}/landlord`}
              className="text-ink hover:text-ink-soft"
            >
              {t("footer.links.landlord")}
            </Link>
            <Link
              href={`/${locale}/tenant`}
              className="text-ink hover:text-ink-soft"
            >
              {t("footer.links.tenant")}
            </Link>
            <Link
              href={`/${locale}/properties`}
              className="text-ink hover:text-ink-soft"
            >
              {t("footer.links.properties")}
            </Link>
            <a
              href={`mailto:${t("footer.contact")}`}
              className="text-ink hover:text-ink-soft"
            >
              {t("footer.contact")}
            </a>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-8 text-xs text-muted-fg sm:flex-row sm:items-center sm:justify-between">
          <p>© {num(2026)} Omens · Cairo, Egypt</p>
          <p>Built with care · Pilot launching Summer {num(2026)}</p>
        </div>
      </div>
    </footer>
  );
}
