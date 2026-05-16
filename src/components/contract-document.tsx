import type { Locale } from "@/i18n/routing";

export function ContractDocument({ locale }: { locale: Locale }) {
  const isAr = locale === "ar";
  return (
    <section className="rounded-2xl border border-dashed border-line-strong bg-surface-1 px-8 py-16 text-center">
      <p className="text-eyebrow text-gold-deep">
        {isAr ? "قريباً" : "Coming soon"}
      </p>
      <h1 className="text-h2 mt-5 font-display text-ink">
        {isAr ? "العقد الرقمي" : "The digital contract"}
      </h1>
      <p className="text-lede mt-5 mx-auto max-w-md">
        {isAr
          ? "هنا هتلاقي عقد إيجارك — تعرضه وتمضي عليه بـ OTP."
          : "Your bilingual lease — reviewed and signed via OTP."}
      </p>
    </section>
  );
}
