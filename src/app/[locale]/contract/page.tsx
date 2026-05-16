import { setRequestLocale } from "next-intl/server";
import { ProductHeader } from "@/components/product-header";
import { SiteFooter } from "@/components/site-footer";
import { ContractDocument } from "@/components/contract-document";
import type { Locale } from "@/i18n/routing";

export default async function ContractPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="grain relative min-h-screen bg-paper">
      <ProductHeader locale={locale} />
      <main className="mx-auto max-w-[920px] px-5 pb-32 pt-10 sm:px-10 sm:pt-14">
        <ContractDocument locale={locale} />
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
