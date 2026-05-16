"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { formatNumerals } from "@/lib/numerals";
import { CONTRACT } from "@/lib/contract-data";
import type { Locale } from "@/i18n/routing";

export function ContractDocument({ locale }: { locale: Locale }) {
  const isAr = locale === "ar";
  const num = (n: number | string) => formatNumerals(n, locale);
  const [copied, setCopied] = useState(false);

  const C = CONTRACT;
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(isAr ? "ar-EG" : "en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  const formatDateTime = (iso: string) =>
    new Date(iso).toLocaleString(isAr ? "ar-EG" : "en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const copyId = async () => {
    try {
      await navigator.clipboard.writeText(C.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const t = isAr ? AR : EN;

  return (
    <article>
      {/* Status banner */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-surface-2 px-5 py-4 shadow-soft sm:px-7 sm:py-5"
      >
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-received text-cream">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8.2L6.2 11.4L13 5"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div>
            <p className="text-eyebrow text-received">{t.signed}</p>
            <p className="text-sm text-ink">
              {t.signedOn} {formatDateTime(C.signedAt)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={copyId}
            className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-paper px-3 py-1.5 text-xs font-medium text-ink hover:border-gold/60 transition-colors"
          >
            <span className="text-[10px] uppercase tracking-wider text-muted-fg">
              {t.id}
            </span>
            <span className="font-mono">{C.id}</span>
            {copied ? (
              <span className="text-[10px] text-received">{t.copied}</span>
            ) : (
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <rect x="3" y="3" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1" />
                <rect x="1.5" y="1.5" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1" />
              </svg>
            )}
          </button>
          <button
            type="button"
            onClick={() => typeof window !== "undefined" && window.print()}
            className="hidden items-center gap-2 rounded-full bg-ink px-4 py-1.5 text-xs font-medium text-cream hover:bg-ink-soft transition-colors sm:inline-flex"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 2.5h6v3H3z M3 9.5h6v-3H3z M3 6h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            {t.print}
          </button>
        </div>
      </motion.div>

      {/* Document */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="relative mt-6 overflow-hidden rounded-2xl border border-line bg-surface-2 shadow-lift"
      >
        <div
          aria-hidden
          className="h-1 w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, var(--gold) 50%, transparent 100%)",
          }}
        />

        <div className="px-6 py-10 sm:px-14 sm:py-16">
          <header className="text-center">
            <p className="text-eyebrow text-gold-deep">{t.documentLabel}</p>
            <h1 className="mt-5 font-display text-h1 leading-[1.05] text-ink">
              {t.docTitle}
            </h1>
            <p className="mt-4 text-sm text-muted-fg">{t.docSubtitle}</p>
          </header>

          <Divider />

          <Section numberEn="01" title={t.partiesTitle}>
            <PartyRow
              role={t.landlord}
              name={isAr ? C.parties.landlord.nameAr : C.parties.landlord.name}
              detail={C.parties.landlord.nationalIdMasked}
              detailLabel={t.nationalId}
            />
            <PartyRow
              role={t.tenant}
              name={isAr ? C.parties.tenant.nameAr : C.parties.tenant.name}
              detail={C.parties.tenant.nationalIdMasked}
              detailLabel={t.nationalId}
            />
            <PartyRow
              role={t.guarantor}
              name={isAr ? C.parties.guarantor.nameAr : C.parties.guarantor.name}
              detail={C.parties.guarantor.registration}
              detailLabel={t.registration}
            />
          </Section>

          <Section numberEn="02" title={t.propertyTitle}>
            <DefinitionList>
              <DefRow label={t.unit} value={isAr ? C.property.unitAr : C.property.unitEn} />
              <DefRow label={t.address} value={isAr ? C.property.buildingAr : C.property.buildingEn} />
              <DefRow label={t.neighborhood} value={isAr ? C.property.neighborhoodAr : C.property.neighborhoodEn} />
              <DefRow
                label={t.area}
                value={`${num(C.property.sqm)} ${isAr ? "م²" : "sqm"} · ${num(C.property.beds)} ${isAr ? "غرف" : "beds"} · ${num(C.property.baths)} ${isAr ? "حمام" : "bath"}`}
              />
            </DefinitionList>
          </Section>

          <Section numberEn="03" title={t.termTitle}>
            <p className="text-sm leading-relaxed text-ink">
              {t.termBodyA(formatDate(C.termStart), formatDate(C.termEnd))}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              {t.termBodyB(num(C.terms.noticeMonths))}
            </p>
          </Section>

          <Section numberEn="04" title={t.rentTitle}>
            <div className="rounded-xl border border-line bg-paper p-5 sm:p-6">
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-eyebrow text-muted-fg">{t.monthlyRent}</p>
                <p>
                  <span className="font-display text-h2 leading-none text-ink">
                    {num(C.terms.monthlyRent.toLocaleString("en-US"))}
                  </span>{" "}
                  <span className="text-sm font-medium text-ink-soft">
                    {isAr ? "ج.م" : "EGP"}
                  </span>
                </p>
              </div>
              <p className="mt-4 text-sm text-ink-soft">
                {t.rentBody(num(C.terms.dueDay))}
              </p>
              <p className="mt-3 text-xs text-muted-fg">
                {t.rentMethods}: {isAr ? C.terms.paymentMethodsAr : C.terms.paymentMethods}
              </p>
            </div>

            <div className="mt-5 rounded-xl border border-line bg-paper p-5 sm:p-6">
              <p className="text-eyebrow text-muted-fg">{t.depositLabel}</p>
              <p className="mt-3 text-sm text-ink">
                {t.depositBody(num(C.terms.deposit.toLocaleString("en-US")))}
              </p>
            </div>
          </Section>

          <Section numberEn="05" title={t.discountTitle}>
            <p className="text-sm leading-relaxed text-ink-soft">{t.discountIntro}</p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-3 sm:gap-3">
              {C.terms.discounts.map((d) => (
                <li
                  key={d.pct}
                  className="rounded-xl border border-line bg-paper p-4 text-center"
                >
                  <p className="font-display text-h3 leading-none text-ink">
                    {num(d.pct)}%
                  </p>
                  <p className="mt-2 text-[11px] uppercase tracking-wider text-gold-deep">
                    {d.daysEarly === 0
                      ? t.discountSameDay
                      : t.discountDaysEarly(num(d.daysEarly))}
                  </p>
                  <p className="mt-1 text-xs text-muted-fg">
                    {isAr ? "وفّر" : "Save"}{" "}
                    {num(Math.round((C.terms.monthlyRent * d.pct) / 100))}{" "}
                    {isAr ? "ج.م" : "EGP"}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs leading-relaxed text-muted-fg">
              {t.discountFooter}
            </p>
          </Section>

          <Section numberEn="06" title={t.lateTitle}>
            <p className="text-sm leading-relaxed text-ink">{t.lateIntro}</p>
            <ol className="mt-5 grid gap-3 ms-5 list-decimal text-sm leading-relaxed text-ink-soft marker:text-gold-deep">
              <li>{t.lateStep1}</li>
              <li>{t.lateStep2}</li>
              <li>{t.lateStep3}</li>
              <li>{t.lateStep4}</li>
            </ol>
          </Section>

          <Section numberEn="07" title={t.ramadanTitle}>
            <p className="text-sm leading-relaxed text-ink-soft">{t.ramadanBody}</p>
          </Section>

          <Section numberEn="08" title={t.maintenanceTitle}>
            <p className="text-sm leading-relaxed text-ink-soft">{t.maintenanceBody}</p>
          </Section>

          <Section numberEn="09" title={t.transferTitle}>
            <p className="text-sm leading-relaxed text-ink-soft">{t.transferBody}</p>
          </Section>

          <Section numberEn="10" title={t.disputeTitle}>
            <p className="text-sm leading-relaxed text-ink-soft">{t.disputeBody}</p>
          </Section>

          <Section numberEn="11" title={t.lawTitle}>
            <p className="text-sm leading-relaxed text-ink-soft">{t.lawBody}</p>
          </Section>

          <Divider />

          {/* Signatures */}
          <section className="mt-2">
            <p className="text-center text-eyebrow text-gold-deep">
              {t.signaturesTitle}
            </p>
            <p className="mt-3 text-center text-sm text-muted-fg">
              {t.signaturesIntro}
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              <SignatureCard
                role={t.landlord}
                name={isAr ? C.parties.landlord.nameAr : C.parties.landlord.name}
                otp={C.parties.landlord.otp}
                when={formatDateTime(C.parties.landlord.signedAt)}
                isAr={isAr}
                num={num}
                otpLabel={t.otpLabel}
                signedAtLabel={t.signedOn}
              />
              <SignatureCard
                role={t.tenant}
                name={isAr ? C.parties.tenant.nameAr : C.parties.tenant.name}
                otp={C.parties.tenant.otp}
                when={formatDateTime(C.parties.tenant.signedAt)}
                isAr={isAr}
                num={num}
                otpLabel={t.otpLabel}
                signedAtLabel={t.signedOn}
              />
            </div>

            <p className="mt-10 text-center text-[11px] leading-relaxed text-muted-fg">
              {t.legalFooter}
            </p>
          </section>
        </div>

        <div
          aria-hidden
          className="h-1 w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, var(--gold) 50%, transparent 100%)",
          }}
        />
      </motion.div>

      <p className="mt-6 text-center text-xs text-muted-fg">{t.helpFooter}</p>
    </article>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */

function Divider() {
  return (
    <div className="my-10 flex items-center gap-3" aria-hidden>
      <span className="h-px flex-1 bg-line" />
      <span className="h-1 w-1 rounded-full bg-gold" />
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}

function Section({
  numberEn,
  title,
  children,
}: {
  numberEn: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12 grid gap-6 sm:grid-cols-[80px_1fr] sm:gap-8">
      <div>
        <p
          className="font-display italic text-h3 leading-none text-ink/30"
          style={{ fontStyle: "italic" }}
        >
          {numberEn}
        </p>
      </div>
      <div>
        <h2 className="font-display text-h4 text-ink">{title}</h2>
        <div className="mt-4">{children}</div>
      </div>
    </section>
  );
}

function PartyRow({
  role,
  name,
  detail,
  detailLabel,
}: {
  role: string;
  name: string;
  detail: string;
  detailLabel: string;
}) {
  return (
    <div className="grid gap-1 border-b border-line py-4 last:border-b-0 sm:grid-cols-[120px_1fr_auto] sm:items-baseline sm:gap-6">
      <p className="text-eyebrow text-muted-fg">{role}</p>
      <p className="text-sm font-medium text-ink">{name}</p>
      <p className="text-xs text-muted-fg">
        <span className="me-2 text-[10px] uppercase tracking-wider">
          {detailLabel}
        </span>
        <span className="font-mono">{detail}</span>
      </p>
    </div>
  );
}

function DefinitionList({ children }: { children: React.ReactNode }) {
  return <dl className="grid divide-y divide-line">{children}</dl>;
}

function DefRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 py-4 first:pt-0 sm:grid-cols-[120px_1fr] sm:gap-6">
      <dt className="text-eyebrow text-muted-fg">{label}</dt>
      <dd className="text-sm text-ink">{value}</dd>
    </div>
  );
}

function SignatureCard({
  role,
  name,
  otp,
  when,
  isAr,
  num,
  otpLabel,
  signedAtLabel,
}: {
  role: string;
  name: string;
  otp: string;
  when: string;
  isAr: boolean;
  num: (n: number | string) => string;
  otpLabel: string;
  signedAtLabel: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-paper p-6 shadow-soft">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(400px 200px at 0% 0%, rgba(201,169,97,0.10), transparent 65%)",
        }}
      />
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-eyebrow text-gold-deep">{role}</p>
            <p
              className="mt-2 font-display text-h4 leading-tight text-ink"
              style={{ fontStyle: isAr ? "normal" : "italic" }}
            >
              {name}
            </p>
          </div>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-received text-cream">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3 7.2L5.5 9.8L11 4.2"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-4">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-fg">
              {otpLabel}
            </p>
            <p className="mt-1.5 font-mono text-sm font-semibold text-ink">
              {num(otp)}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-fg">
              {signedAtLabel}
            </p>
            <p className="mt-1.5 text-xs text-ink">{when}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Bilingual content — kept inline because the legal text needs precision    */
/* ─────────────────────────────────────────────────────────────────────────── */

const EN = {
  documentLabel: "Digital Lease Contract",
  docTitle: "Lease Agreement",
  docSubtitle:
    "A bilingual lease guaranteed and mediated by Omens. Binding under Egyptian civil law.",
  signed: "Signed by both parties",
  signedOn: "Signed on",
  id: "Contract ID",
  copied: "Copied",
  print: "Print",
  partiesTitle: "Parties",
  landlord: "Landlord",
  tenant: "Tenant",
  guarantor: "Guarantor",
  nationalId: "National ID",
  registration: "Registration",
  propertyTitle: "Property",
  unit: "Unit",
  address: "Address",
  neighborhood: "Neighborhood",
  area: "Area & rooms",
  termTitle: "Term",
  termBodyA: (start: string, end: string) =>
    `This lease begins on ${start} and ends on ${end}, for a fixed term of twelve (12) consecutive months. It auto-renews month-to-month thereafter unless either party provides written notice.`,
  termBodyB: (months: string) =>
    `Either party may terminate by providing ${months} months written notice. Notice is delivered through the Omens platform and timestamped automatically.`,
  rentTitle: "Rent & deposit",
  monthlyRent: "Monthly rent",
  rentBody: (day: string) =>
    `Rent is due on the ${day}st of every calendar month. Tenant pays Omens; Omens pays the Landlord on the same day, guaranteed, even if the Tenant has not yet remitted.`,
  rentMethods: "Accepted methods",
  depositLabel: "Security deposit",
  depositBody: (amount: string) =>
    `A refundable security deposit of EGP ${amount} (one month) is held by Omens on the Landlord's behalf. Returned within 14 days of move-out, less documented damages beyond ordinary wear.`,
  discountTitle: "Pay-early discount",
  discountIntro:
    "Tenants who pay before the due date receive an automatic discount on that month's rent. Discounts are funded by Omens, not deducted from the Landlord's payout.",
  discountDaysEarly: (days: string) => `${days}+ days early`,
  discountSameDay: "Same day",
  discountFooter:
    "The discount is applied automatically at payment time. The Landlord always receives the agreed monthly rent in full.",
  lateTitle: "Late payment process",
  lateIntro:
    "If a payment is missed, Omens absorbs the timing risk. The Landlord still receives rent on the 1st. The Tenant proceeds through a graduated process:",
  lateStep1:
    "Day of: free 2-day Khalas grace can be claimed once per month; no score impact, no fee.",
  lateStep2:
    "Day 1–3 late: −3 to −5 Omens Score; a human (not bot) reaches out via WhatsApp to understand.",
  lateStep3:
    "Day 4–14: −10 Omens Score; a two-installment payment plan over 14 days becomes available, with a 1% surcharge absorbed by the Tenant.",
  lateStep4:
    "Day 15+: the matter moves to a three-person majlis under Section 10. The Tenant's account moves to Watchlist across the Omens network.",
  ramadanTitle: "Ramadan flexibility",
  ramadanBody:
    "Once per calendar year, during the month of Ramadan, the Tenant may invoke a one-month payment plan with no score impact and no fee. The Landlord still receives rent on the 1st as guaranteed.",
  maintenanceTitle: "Maintenance",
  maintenanceBody:
    "The Landlord is responsible for structural repairs, major appliances, and plumbing. The Tenant is responsible for routine cleaning, utility bills, and damages caused by negligence. Requests are filed through Omens and timestamped; both parties receive every update.",
  transferTitle: "Sale or transfer",
  transferBody:
    "If the Landlord sells the property during the term, this lease transfers automatically to the new owner under the same terms. The Tenant retains full rights to the remaining term. Omens facilitates the transfer at no additional cost to either party.",
  disputeTitle: "Dispute resolution — Majlis",
  disputeBody:
    "Any dispute that cannot be resolved between the parties is referred to a three-person majlis: one member appointed by Omens, one community elder, and one member chosen by the Tenant. The majlis convenes within 14 days. Its decision is final and binding within the Omens platform.",
  lawTitle: "Governing law",
  lawBody:
    "This agreement is governed by the civil law of the Arab Republic of Egypt. Any matter not resolved through the majlis may be referred to the competent court in Cairo. Both Arabic and English versions are equally authoritative; in case of conflict, the Arabic version prevails.",
  signaturesTitle: "Signatures",
  signaturesIntro:
    "Both parties signed with one-time-password verification on WhatsApp-registered numbers. The OTP record below is part of the legal evidence.",
  otpLabel: "OTP",
  legalFooter:
    "This contract is registered in the Omens audit log. A tamper-evident hash is stored alongside the signed timestamps. Either party can request a notarized copy for an additional EGP 150.",
  helpFooter:
    "Questions about this contract? Reply to hello@omens.eg or message us on WhatsApp.",
};

const AR = {
  documentLabel: "عقد إيجار رقمي",
  docTitle: "اتفاقية إيجار",
  docSubtitle:
    "عقد إيجار ثنائي اللغة، تضمنه وتدير وساطته Omens. مُلزم بموجب القانون المدني المصري.",
  signed: "موقّع من الطرفين",
  signedOn: "تاريخ التوقيع",
  id: "رقم العقد",
  copied: "اتنسخ",
  print: "طباعة",
  partiesTitle: "الأطراف",
  landlord: "المالك",
  tenant: "المستأجر",
  guarantor: "الضامن",
  nationalId: "الرقم القومي",
  registration: "السجل التجاري",
  propertyTitle: "العقار",
  unit: "الوحدة",
  address: "العنوان",
  neighborhood: "الحي",
  area: "المساحة والغرف",
  termTitle: "المدة",
  termBodyA: (start: string, end: string) =>
    `يبدأ هذا العقد في ${start} وينتهي في ${end}، لمدة محددة قدرها اثنا عشر (١٢) شهراً متتالياً. يُجدَّد بعدها تلقائياً شهراً بشهر ما لم يُخطر أحد الطرفين الآخر كتابياً.`,
  termBodyB: (months: string) =>
    `يحق لأي طرف إنهاء العقد بإخطار كتابي مسبق مدته ${months} شهور. يُوجَّه الإخطار عبر منصة Omens ويُسجَّل تلقائياً بالتاريخ والساعة.`,
  rentTitle: "الإيجار والتأمين",
  monthlyRent: "الإيجار الشهري",
  rentBody: (day: string) =>
    `يُستحق الإيجار في اليوم ${day} من كل شهر ميلادي. يدفع المستأجر إلى Omens، وOmens تدفع للمالك في نفس اليوم بضمان كامل حتى لو لم يُحوِّل المستأجر بعد.`,
  rentMethods: "وسائل الدفع المقبولة",
  depositLabel: "تأمين العقد",
  depositBody: (amount: string) =>
    `يُحتفظ بتأمين قابل للرد قدره ${amount} ج.م (شهر واحد) لدى Omens بالنيابة عن المالك. يُرَد خلال ١٤ يوماً من تسليم العقار، بعد خصم أي أضرار موثّقة تتجاوز التآكل الطبيعي.`,
  discountTitle: "خصم الدفع المبكر",
  discountIntro:
    "المستأجر اللي بيدفع قبل ميعاد الاستحقاق بياخد خصم تلقائي على إيجار الشهر. الخصم بتموّله Omens، ومش بيُخصم من صرفية المالك.",
  discountDaysEarly: (days: string) => `${days}+ أيام بدري`,
  discountSameDay: "في نفس اليوم",
  discountFooter:
    "الخصم بيتطبّق تلقائياً وقت الدفع. المالك بياخد كل الإيجار المتفق عليه كاملاً.",
  lateTitle: "التأخر عن الدفع",
  lateIntro:
    "لو فات الميعاد، Omens بتتحمّل خطر التأخير. المالك بياخد إيجاره في الأول من الشهر. والمستأجر بيدخل في مراحل تصاعدية:",
  lateStep1:
    "يوم الاستحقاق: يحق للمستأجر تفعيل «خَلاص» — مهلة يومين بدون رسوم ولا تأثير على النقاط، مرة واحدة في الشهر.",
  lateStep2:
    "من يوم إلى ٣ أيام تأخير: خصم ٣ إلى ٥ نقاط Omens، ويتواصل ممثل بشري (مش بوت) عبر واتساب للسؤال.",
  lateStep3:
    "من ٤ إلى ١٤ يوم: خصم ١٠ نقاط، وتُتاح خطة تقسيط على دفعتين خلال ١٤ يوماً برسوم ١٪ يتحمّلها المستأجر.",
  lateStep4:
    "من ١٥ يوم فأكثر: تُحال القضية إلى مجلس ثلاثي بموجب البند رقم ١٠. ويُنقل حساب المستأجر إلى قائمة المراقبة في شبكة Omens.",
  ramadanTitle: "مرونة رمضان",
  ramadanBody:
    "مرة واحدة في السنة الميلادية، خلال شهر رمضان، يحق للمستأجر تفعيل خطة دفع لشهر بدون أي تأثير على النقاط أو رسوم. والمالك بياخد إيجاره في الأول بضمان كامل.",
  maintenanceTitle: "الصيانة",
  maintenanceBody:
    "المالك مسئول عن الإصلاحات الإنشائية والأجهزة الرئيسية والسباكة. المستأجر مسئول عن النظافة الدورية والمرافق وأي أضرار ناتجة عن الإهمال. تُسجَّل الطلبات عبر Omens، ويُخطر الطرفين بكل تحديث.",
  transferTitle: "البيع أو نقل الملكية",
  transferBody:
    "لو باع المالك العقار خلال المدة، يُنقل العقد تلقائياً إلى المالك الجديد بنفس الشروط. وللمستأجر الحق الكامل في باقي المدة. Omens بتسهّل النقل بدون أي تكلفة إضافية على أي طرف.",
  disputeTitle: "حل النزاعات — مجلس",
  disputeBody:
    "أي خلاف ما يقدرش الطرفين يحلوه بينهم بيُحال إلى مجلس ثلاثي: عضو من Omens، عضو من وجهاء الحي، وعضو يختاره المستأجر. ينعقد المجلس خلال ١٤ يوماً، وقراره نهائي وملزم داخل منصة Omens.",
  lawTitle: "القانون الحاكم",
  lawBody:
    "تخضع هذه الاتفاقية للقانون المدني لجمهورية مصر العربية. وأي مسألة لم يحسمها المجلس تُحال إلى المحكمة المختصة في القاهرة. النسختان العربية والإنجليزية متساويتان في الحجية، وفي حال الاختلاف تسود النسخة العربية.",
  signaturesTitle: "التوقيعات",
  signaturesIntro:
    "وقّع الطرفين بكلمة مرور لمرة واحدة (OTP) على أرقام واتساب مسجّلة. سجل OTP الموضّح أسفل جزء من الإثبات القانوني.",
  otpLabel: "OTP",
  legalFooter:
    "هذا العقد مسجّل في سجل تدقيق Omens. تُحفظ بصمة تشفيرية مضادة للعبث مع التواريخ. يحق لأي طرف طلب نسخة موثّقة مقابل ١٥٠ ج.م إضافية.",
  helpFooter:
    "أي استفسار على العقد ده؟ راسلنا على hello@omens.eg أو على واتساب.",
};
