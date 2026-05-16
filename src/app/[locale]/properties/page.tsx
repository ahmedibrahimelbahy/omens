import { setRequestLocale } from "next-intl/server";
import { ProductHeader } from "@/components/product-header";
import { SiteFooter } from "@/components/site-footer";
import { PropertiesClient } from "@/components/properties-client";
import { PROPERTIES, NEIGHBORHOODS_EN, NEIGHBORHOODS_AR } from "@/lib/properties";
import type { Locale } from "@/i18n/routing";

export default async function PropertiesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="grain relative min-h-screen bg-paper">
      <ProductHeader locale={locale} active="marketing" />
      <PropertiesClient
        locale={locale}
        properties={PROPERTIES}
        neighborhoods={locale === "ar" ? NEIGHBORHOODS_AR : NEIGHBORHOODS_EN}
      />
      <SiteFooter locale={locale} />
    </div>
  );
}
