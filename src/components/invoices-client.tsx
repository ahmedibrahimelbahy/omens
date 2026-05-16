"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatNumerals } from "@/lib/numerals";
import {
  INVOICES,
  PARTIES,
  PROPERTY_FOR_INVOICES,
  type Invoice,
} from "@/lib/invoice-data";
import type { Locale } from "@/i18n/routing";

export function InvoicesClient({ locale }: { locale: Locale }) {
  const isAr = locale === "ar";
  const num = (n: number | string) => formatNumerals(n, locale);
  const [selectedId, setSelectedId] = useState(INVOICES[0].id);

  const selected = useMemo(
    () => INVOICES.find((i) => i.id === selectedId) ?? INVOICES[0],
    [selectedId],
  );

  const totals = useMemo(
    () => ({
      paid: INVOICES.filter((i) => i.status === "paid").length,
      saved: INVOICES.reduce((s, i) => s + i.discount, 0),
      year: INVOICES.reduce((s, i) => s + i.total, 0),
    }),
    [],
  );

  const t = isAr ? AR : EN;

  return (
    <div>
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-eyebrow text-gold-deep">{t.eyebrow}</p>
        <h1 className="text-h1 mt-5 text-ink">{t.title}</h1>
        <p className="text-lede mt-5 max-w-2xl">{t.subtitle}</p>
      </motion.section>

      {/* Stats strip */}
      <section className="mt-10 grid gap-3 sm:grid-cols-3 sm:gap-4">
        <Stat
          label={t.statPaid}
          value={num(totals.paid)}
          suffix={t.statPaidSuffix}
          tone="ink"
        />
        <Stat
          label={t.statSaved}
          value={num(totals.saved.toLocaleString("en-US"))}
          suffix={isAr ? "ج.م" : "EGP"}
          tone="gold"
        />
        <Stat
          label={t.statYear}
          value={num(totals.year.toLocaleString("en-US"))}
          suffix={isAr ? "ج.م" : "EGP"}
          tone="received"
        />
      </section>

      {/* Split: list + selected invoice document */}
      <div className="mt-10 grid gap-6 lg:grid-cols-[340px_1fr] lg:gap-8">
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-2xl border border-line bg-surface-2 shadow-soft">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <p className="text-eyebrow text-ink">{t.allInvoices}</p>
              <span className="text-[10px] uppercase tracking-wider text-muted-fg">
                {num(INVOICES.length)} · {t.allLabel}
              </span>
            </div>
            <ul className="grid divide-y divide-line">
              {INVOICES.map((inv) => {
                const isSelected = inv.id === selectedId;
                return (
                  <li key={inv.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(inv.id)}
                      aria-current={isSelected ? "true" : undefined}
                      className={`group flex w-full items-center justify-between gap-3 px-5 py-3.5 text-start transition-colors ${
                        isSelected ? "bg-gold/8" : "hover:bg-cream-deep/40"
                      }`}
                    >
                      <span>
                        <span className="block text-sm font-medium text-ink">
                          {isAr ? inv.period.monthAr : inv.period.monthEn}{" "}
                          {num(inv.period.year)}
                        </span>
                        <span className="block text-[11px] text-muted-fg">
                          {inv.method ?? (isAr ? "لم يُدفع" : "Unpaid")}
                        </span>
                      </span>
                      <span className="text-end">
                        <span className="block font-display text-h5 leading-none text-ink">
                          {num(inv.total.toLocaleString("en-US"))}
                        </span>
                        <span className="mt-1 inline-block text-[10px] uppercase tracking-wider text-received">
                          {t.statusPaid}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <p className="mt-3 px-1 text-[11px] text-muted-fg">{t.allHint}</p>
        </aside>

        <section>
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <InvoiceDocument
                invoice={selected}
                isAr={isAr}
                num={num}
                t={t}
              />
            </motion.div>
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */

function InvoiceDocument({
  invoice,
  isAr,
  num,
  t,
}: {
  invoice: Invoice;
  isAr: boolean;
  num: (n: number | string) => string;
  t: typeof EN;
}) {
  const paidDate = invoice.paidAt
    ? new Date(invoice.paidAt).toLocaleString(isAr ? "ar-EG" : "en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;
  const dueDate = new Date(invoice.dueAt).toLocaleDateString(
    isAr ? "ar-EG" : "en-US",
    { day: "numeric", month: "long", year: "numeric" },
  );

  return (
    <article className="relative overflow-hidden rounded-2xl border border-line bg-surface-2 shadow-lift">
      <div
        aria-hidden
        className="h-1 w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--gold) 50%, transparent 100%)",
        }}
      />

      <div className="px-6 py-9 sm:px-12 sm:py-12">
        <header className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="text-eyebrow text-gold-deep">{t.invoice}</p>
            <h2 className="mt-3 font-display text-h2 leading-tight text-ink">
              {isAr ? invoice.period.monthAr : invoice.period.monthEn}{" "}
              <span className="text-ink/45">{num(invoice.period.year)}</span>
            </h2>
            <p className="mt-1 text-sm text-muted-fg">
              {isAr ? PROPERTY_FOR_INVOICES.unitAr : PROPERTY_FOR_INVOICES.unitEn}{" "}
              ·{" "}
              {isAr
                ? PROPERTY_FOR_INVOICES.addressAr
                : PROPERTY_FOR_INVOICES.addressEn}
            </p>
          </div>
          <div className="grid gap-2 text-end">
            <span className="inline-flex items-center gap-2 self-end rounded-full bg-received-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-received">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                  d="M2 5.2L4.2 7.4L8 3"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {t.statusPaid}
            </span>
            <p className="text-[11px] text-muted-fg">
              <span className="me-1.5 uppercase tracking-wider">{t.invoiceId}</span>
              <span className="font-mono text-ink">{invoice.id}</span>
            </p>
          </div>
        </header>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <PartyBlock
            role={t.from}
            initials={PARTIES.landlord.initials}
            name={isAr ? PARTIES.landlord.nameAr : PARTIES.landlord.name}
            detail={PARTIES.landlord.iban}
            detailLabel={t.iban}
            tone="ink"
          />
          <PartyBlock
            role={t.to}
            initials={PARTIES.tenant.initials}
            name={isAr ? PARTIES.tenant.nameAr : PARTIES.tenant.name}
            detail={PARTIES.tenant.whatsapp}
            detailLabel={t.whatsapp}
            tone="cream"
          />
        </div>

        <Divider />

        <section>
          <p className="text-eyebrow text-muted-fg">{t.lineItems}</p>

          <div className="mt-5 grid divide-y divide-line">
            <LineRow
              label={t.lineMonthlyRent}
              sublabel={t.lineMonthlyRentSub(dueDate)}
              value={num(invoice.rent.toLocaleString("en-US"))}
              suffix={isAr ? "ج.م" : "EGP"}
            />
            {invoice.discount > 0 && (
              <LineRow
                label={t.lineDiscount(num(invoice.discountPct))}
                sublabel={t.lineDiscountSub}
                value={`−${num(invoice.discount.toLocaleString("en-US"))}`}
                suffix={isAr ? "ج.م" : "EGP"}
                tone="received"
              />
            )}
          </div>

          <div className="mt-6 flex items-baseline justify-between gap-4 rounded-2xl border border-gold/30 bg-gold/8 px-5 py-5 sm:px-7 sm:py-6">
            <p>
              <span className="text-eyebrow text-gold-deep">{t.totalPaid}</span>
              {paidDate && (
                <span className="mt-1 block text-[11px] text-muted-fg">
                  {paidDate} · {invoice.method}
                </span>
              )}
            </p>
            <p className="text-end">
              <span className="font-display text-h1 leading-none tracking-tight text-ink">
                {num(invoice.total.toLocaleString("en-US"))}
              </span>{" "}
              <span className="text-sm font-medium text-ink-soft">
                {isAr ? "ج.م" : "EGP"}
              </span>
            </p>
          </div>
        </section>

        <Divider />

        <section className="grid gap-5 sm:grid-cols-3">
          <Meta label={t.metaMethod} value={invoice.method ?? "—"} />
          <Meta
            label={t.metaReference}
            value={invoice.reference ?? "—"}
            mono
          />
          <Meta
            label={t.metaIssued}
            value={new Date(invoice.issuedAt).toLocaleDateString(
              isAr ? "ar-EG" : "en-US",
              { day: "numeric", month: "short", year: "numeric" },
            )}
          />
        </section>

        <p className="mt-12 text-center text-[11px] leading-relaxed text-muted-fg">
          {t.legalFooter}
        </p>
      </div>

      <div
        aria-hidden
        className="h-1 w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--gold) 50%, transparent 100%)",
        }}
      />
    </article>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */

function Stat({
  label,
  value,
  suffix,
  tone,
}: {
  label: string;
  value: string;
  suffix?: string;
  tone: "ink" | "gold" | "received";
}) {
  const tint =
    tone === "gold"
      ? "rgba(201,169,97,0.12)"
      : tone === "received"
        ? "rgba(16,185,129,0.10)"
        : "rgba(13,34,64,0.06)";
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-line bg-surface-2 p-5 shadow-soft"
      style={{
        background: `radial-gradient(400px 200px at 100% 0%, ${tint}, transparent 60%), var(--surface-2)`,
      }}
    >
      <p className="text-eyebrow text-muted-fg">{label}</p>
      <p className="mt-3 flex items-baseline gap-1.5">
        <span className="font-display text-h3 leading-none tracking-tight text-ink">
          {value}
        </span>
        {suffix && (
          <span className="text-xs font-medium text-ink-soft">{suffix}</span>
        )}
      </p>
    </div>
  );
}

function PartyBlock({
  role,
  initials,
  name,
  detail,
  detailLabel,
  tone,
}: {
  role: string;
  initials: string;
  name: string;
  detail: string;
  detailLabel: string;
  tone: "ink" | "cream";
}) {
  return (
    <div className="rounded-xl border border-line bg-paper p-4">
      <p className="text-eyebrow text-muted-fg">{role}</p>
      <div className="mt-3 flex items-center gap-3">
        <span
          className={`grid h-10 w-10 place-items-center rounded-full text-[11px] font-semibold ${
            tone === "ink"
              ? "bg-ink text-cream"
              : "bg-cream-deep text-ink border border-line-strong"
          }`}
        >
          {initials}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink">{name}</p>
          <p className="text-[11px] text-muted-fg">
            <span className="me-1.5 uppercase tracking-wider">{detailLabel}</span>
            <span className="font-mono">{detail}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function LineRow({
  label,
  sublabel,
  value,
  suffix,
  tone,
}: {
  label: string;
  sublabel?: string;
  value: string;
  suffix?: string;
  tone?: "received";
}) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-start gap-3 py-4 first:pt-0">
      <div>
        <p className="text-sm text-ink">{label}</p>
        {sublabel && (
          <p className="mt-1 text-xs text-muted-fg">{sublabel}</p>
        )}
      </div>
      <p
        className={`font-display text-h4 leading-none ${tone === "received" ? "text-received" : "text-ink"}`}
      >
        {value}
        {suffix && (
          <span className="ms-1 text-xs font-sans font-medium text-muted-fg">
            {suffix}
          </span>
        )}
      </p>
    </div>
  );
}

function Meta({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <p className="text-eyebrow text-muted-fg">{label}</p>
      <p className={`mt-2 text-sm text-ink ${mono ? "font-mono" : ""}`}>
        {value}
      </p>
    </div>
  );
}

function Divider() {
  return (
    <div className="my-8 flex items-center gap-3" aria-hidden>
      <span className="h-px flex-1 bg-line" />
      <span className="h-1 w-1 rounded-full bg-gold" />
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */

const EN = {
  eyebrow: "Invoices",
  title: "Every payment, on the record.",
  subtitle:
    "A digital invoice is issued the moment your rent is paid. Tap any month to see the full receipt — useful for visa applications, salary loans, and your own peace of mind.",
  statPaid: "Paid invoices",
  statPaidSuffix: "this year",
  statSaved: "Saved on early payments",
  statYear: "Total paid in 2026",
  allInvoices: "All invoices",
  allLabel: "Sorted by date",
  allHint: "Tap any invoice on the left to view its details on the right.",
  invoice: "Invoice",
  invoiceId: "Invoice ID",
  statusPaid: "Paid",
  from: "From — Landlord",
  to: "To — Tenant",
  iban: "IBAN",
  whatsapp: "WhatsApp",
  lineItems: "Line items",
  lineMonthlyRent: "Monthly rent",
  lineMonthlyRentSub: (dueDate: string) =>
    `Period due on ${dueDate}. One month, paid in advance.`,
  lineDiscount: (pct: string) => `Pay-early discount · ${pct}% off`,
  lineDiscountSub: "Funded by Omens. Landlord still receives the full amount.",
  totalPaid: "Total paid",
  metaMethod: "Payment method",
  metaReference: "Transaction reference",
  metaIssued: "Issued",
  legalFooter:
    "This invoice is registered in the Omens audit log and admissible as proof of payment. To request a stamped PDF, message hello@omens.eg.",
};

const AR = {
  eyebrow: "الفواتير",
  title: "كل دفعة، موثّقة.",
  subtitle:
    "بنصدر فاتورة رقمية في نفس لحظة الدفع. اضغط على أي شهر تشوف الفاتورة الكاملة — مفيدة لطلبات التأشيرات، السلف، وراحة بالك.",
  statPaid: "فواتير مدفوعة",
  statPaidSuffix: "هذا العام",
  statSaved: "وفّرت من الدفع المبكر",
  statYear: "إجمالي ٢٠٢٦",
  allInvoices: "كل الفواتير",
  allLabel: "بالتاريخ",
  allHint: "اضغط أي فاتورة على اليسار تشوف التفاصيل على اليمين.",
  invoice: "فاتورة",
  invoiceId: "رقم الفاتورة",
  statusPaid: "مدفوعة",
  from: "من — المالك",
  to: "إلى — المستأجر",
  iban: "IBAN",
  whatsapp: "واتساب",
  lineItems: "البنود",
  lineMonthlyRent: "إيجار شهري",
  lineMonthlyRentSub: (dueDate: string) =>
    `الفترة المستحقة في ${dueDate}. شهر واحد، مدفوع مقدماً.`,
  lineDiscount: (pct: string) => `خصم الدفع المبكر · ${pct}٪`,
  lineDiscountSub:
    "Omens بتموّل الخصم. المالك بياخد المبلغ كاملاً مهما يحصل.",
  totalPaid: "إجمالي مدفوع",
  metaMethod: "وسيلة الدفع",
  metaReference: "رقم العملية",
  metaIssued: "تاريخ الإصدار",
  legalFooter:
    "الفاتورة دي مسجّلة في سجل تدقيق Omens، ومقبولة كإثبات دفع. لو محتاج نسخة PDF مختومة، راسلنا على hello@omens.eg.",
};
