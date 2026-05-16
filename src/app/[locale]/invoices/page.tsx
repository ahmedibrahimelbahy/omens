import { setRequestLocale } from "next-intl/server";
import { ProductHeader } from "@/components/product-header";
import { SiteFooter } from "@/components/site-footer";
import { InvoicesClient } from "@/components/invoices-client";
import type { Locale } from "@/i18n/routing";

export default async function InvoicesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="grain relative min-h-screen bg-paper">
      <ProductHeader locale={locale} />
      <main className="mx-auto max-w-[1100px] px-5 pb-32 pt-10 sm:px-10 sm:pt-14">
        <InvoicesClient locale={locale} />
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
