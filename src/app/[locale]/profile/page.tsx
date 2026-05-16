import { setRequestLocale } from "next-intl/server";
import { ProductHeader } from "@/components/product-header";
import { SiteFooter } from "@/components/site-footer";
import { ProfileClient } from "@/components/profile-client";
import type { Locale } from "@/i18n/routing";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="grain relative min-h-screen bg-paper">
      <ProductHeader locale={locale} />
      <main className="mx-auto max-w-[1000px] px-6 pb-24 pt-12 sm:px-10 sm:pt-16">
        <ProfileClient locale={locale} />
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
