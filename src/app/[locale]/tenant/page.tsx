import { setRequestLocale } from "next-intl/server";
import { ProductHeader } from "@/components/product-header";
import { TenantClient } from "@/components/tenant-client";
import type { Locale } from "@/i18n/routing";

export default async function TenantPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="grain relative min-h-screen bg-paper">
      <ProductHeader locale={locale} active="tenant" />
      <TenantClient locale={locale} />
    </div>
  );
}
