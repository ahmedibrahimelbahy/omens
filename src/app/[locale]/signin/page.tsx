import { setRequestLocale } from "next-intl/server";
import { ProductHeader } from "@/components/product-header";
import { SiteFooter } from "@/components/site-footer";
import { SignInChooser } from "@/components/sign-in-chooser";
import type { Locale } from "@/i18n/routing";

export default async function SignInPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="grain relative min-h-screen bg-paper">
      <ProductHeader locale={locale} />
      <main className="mx-auto max-w-[920px] px-6 pb-24 pt-12 sm:px-10 sm:pt-20">
        <SignInChooser locale={locale} />
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
