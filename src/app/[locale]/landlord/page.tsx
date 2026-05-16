import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProductHeader } from "@/components/product-header";
import { ScorePip } from "@/components/score-pip";
import { formatNumerals } from "@/lib/numerals";
import type { Locale } from "@/i18n/routing";

type Status = "received" | "due" | "late" | "reminder";

type Apartment = {
  id: string;
  unit: string;
  neighborhood: string;
  tenant: { name: string; nameAr: string; initials: string };
  rent: number;
  score: number;
  status: Status;
  lateDays?: number;
};

const APARTMENTS: Apartment[] = [
  {
    id: "apt-12",
    unit: "Apt 12",
    neighborhood: "Heliopolis · Korba",
    tenant: { name: "Mostafa Abdelrahman", nameAr: "مصطفى عبدالرحمن", initials: "MA" },
    rent: 4200,
    score: 92,
    status: "received",
  },
  {
    id: "apt-5",
    unit: "Apt 5",
    neighborhood: "Heliopolis · Roxy",
    tenant: { name: "Nadia Hussein", nameAr: "نادية حسين", initials: "NH" },
    rent: 5800,
    score: 78,
    status: "reminder",
    lateDays: 2,
  },
  {
    id: "apt-7",
    unit: "Apt 7",
    neighborhood: "New Heliopolis",
    tenant: { name: "Karim & Layla Saad", nameAr: "كريم وليلى سعد", initials: "KS" },
    rent: 6100,
    score: 86,
    status: "received",
  },
  {
    id: "apt-3",
    unit: "Apt 3",
    neighborhood: "Heliopolis · Cleopatra",
    tenant: { name: "Hossam El-Sayed", nameAr: "حسام السيد", initials: "HS" },
    rent: 2300,
    score: 64,
    status: "due",
  },
];

export default async function LandlordPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const num = (n: number | string) => formatNumerals(n, locale);

  const totalGross = APARTMENTS.reduce((s, a) => s + a.rent, 0);
  const daysUntilPayout = 6;
  const payoutDate = locale === "ar" ? "١ مايو" : "May 1";

  return (
    <div className="grain relative min-h-screen bg-paper">
      <ProductHeader locale={locale} active="landlord" />

      <main className="mx-auto max-w-[1240px] px-6 pb-32 pt-12 sm:px-10 sm:pt-16">
        {/* Greeting */}
        <section className="fade-rise">
          <p className="text-eyebrow text-gold-deep">{t("landlord.payoutEyebrow")}</p>
          <h1 className="mt-4 text-h2 text-ink">{t("landlord.greeting")}</h1>
          <p className="text-lede mt-3 max-w-2xl">{t("landlord.subgreeting")}</p>
        </section>

        {/* Payout card — the hero moment of the screen */}
        <section className="fade-rise fade-rise-delay-1 mt-12">
          <div className="relative overflow-hidden rounded-2xl border border-line bg-surface-2 p-8 shadow-soft sm:p-12">
            {/* Soft gold wash on the diagonal */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(800px 300px at 100% 0%, rgba(201,169,97,0.12), transparent 60%)",
              }}
            />
            <div className="relative">
              <p className="text-eyebrow text-muted-fg">
                {t("landlord.ledgerWillBe")}
              </p>
              <div className="mt-4 flex items-baseline gap-4">
                <span className="font-display text-[clamp(3.5rem,2rem+5vw,6rem)] leading-none tracking-tight text-ink">
                  {num(totalGross.toLocaleString("en-US"))}
                </span>
                <span className="text-h4 font-medium text-ink-soft">
                  {t("common.currency")}
                </span>
              </div>
              <p className="mt-4 text-sm text-muted-fg">
                {t("landlord.payoutIn", { days: num(daysUntilPayout) })} ·{" "}
                {t("landlord.payoutOn", { date: payoutDate })}
              </p>
              {/* Progress arc — visually anchors the countdown */}
              <div className="mt-8 grid gap-2">
                <div className="h-1 w-full overflow-hidden rounded-full bg-line">
                  <div
                    className="h-full rounded-full bg-gold"
                    style={{ width: `${((30 - daysUntilPayout) / 30) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] uppercase tracking-wider text-muted-fg">
                  <span>{locale === "ar" ? "بداية الشهر" : "Start of cycle"}</span>
                  <span>{locale === "ar" ? "يوم الصرف" : "Payout day"}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio */}
        <section className="fade-rise fade-rise-delay-2 mt-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-eyebrow text-gold-deep">{t("landlord.portfolio")}</p>
              <h2 className="mt-3 text-h3 text-ink">
                {num(APARTMENTS.length)} ·{" "}
                <span className="text-ink/55">
                  {locale === "ar" ? "شقق نشطة" : "active apartments"}
                </span>
              </h2>
              <p className="text-lede mt-3 max-w-2xl">
                {t("landlord.portfolioSubtitle")}
              </p>
            </div>
            <button
              type="button"
              className="hidden shrink-0 rounded-full border border-line-strong bg-surface-2 px-5 py-2.5 text-sm font-medium text-ink shadow-soft hover:border-gold/60 hover:shadow-gold transition-all sm:inline-flex"
            >
              + {t("landlord.actionInvite")}
            </button>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {APARTMENTS.map((apt) => (
              <ApartmentCard
                key={apt.id}
                apt={apt}
                locale={locale}
                t={{
                  perMonth: t("landlord.perMonth"),
                  score: t("landlord.score"),
                  statusReceived: t("landlord.statusReceived"),
                  statusDue: t("landlord.statusDue"),
                  statusReminderSent: t("landlord.statusReminderSent"),
                  statusLate: (d: number) => t("landlord.statusLate", { days: num(d) }),
                  currency: t("common.currency"),
                }}
                num={num}
              />
            ))}
          </div>
        </section>

        {/* Activity */}
        <section className="fade-rise fade-rise-delay-3 mt-20">
          <div className="rule mb-8">
            <span className="dot" />
            <span className="text-eyebrow">{t("landlord.activity")}</span>
            <span className="dot" />
          </div>
          <ul className="grid divide-y divide-line">
            {ACTIVITY.map((entry, i) => (
              <li
                key={i}
                className="grid grid-cols-[auto_1fr_auto] items-center gap-4 py-5"
              >
                <StatusDot kind={entry.kind} />
                <div>
                  <p className="text-sm text-ink">
                    {locale === "ar" ? entry.ar : entry.en}
                  </p>
                  <p className="text-xs text-muted-fg">
                    {locale === "ar" ? entry.whenAr : entry.when}
                  </p>
                </div>
                {entry.amount && (
                  <span className="font-display text-h4 text-ink">
                    {num(entry.amount.toLocaleString("en-US"))}{" "}
                    <span className="text-xs font-sans font-medium text-muted-fg">
                      {t("common.currency")}
                    </span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}

function ApartmentCard({
  apt,
  locale,
  t,
  num,
}: {
  apt: Apartment;
  locale: Locale;
  t: {
    perMonth: string;
    score: string;
    statusReceived: string;
    statusDue: string;
    statusReminderSent: string;
    statusLate: (d: number) => string;
    currency: string;
  };
  num: (v: number | string) => string;
}) {
  const tenantName = locale === "ar" ? apt.tenant.nameAr : apt.tenant.name;
  const statusLabel =
    apt.status === "received"
      ? t.statusReceived
      : apt.status === "due"
        ? t.statusDue
        : apt.status === "reminder"
          ? t.statusReminderSent
          : t.statusLate(apt.lateDays ?? 0);

  return (
    <article className="group relative grid grid-cols-[1fr_auto] items-start gap-6 rounded-xl border border-line bg-surface-2 p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift">
      <div>
        <p className="text-eyebrow text-muted-fg">{apt.neighborhood}</p>
        <h3 className="mt-1.5 text-h4 text-ink">{apt.unit}</h3>
        <div className="mt-5 flex items-center gap-3">
          <span
            className="grid h-9 w-9 place-items-center rounded-full bg-ink/10 text-[11px] font-semibold uppercase tracking-wider text-ink"
            aria-hidden
          >
            {apt.tenant.initials}
          </span>
          <div>
            <p className="text-sm font-medium text-ink">{tenantName}</p>
            <p className="text-xs text-muted-fg">
              {num(apt.rent.toLocaleString("en-US"))} {t.currency} ·{" "}
              {t.perMonth}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <StatusChip status={apt.status} label={statusLabel} />
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <ScorePip score={apt.score} size="md" />
        <span className="text-[10px] uppercase tracking-wider text-muted-fg">
          {t.score}
        </span>
      </div>
    </article>
  );
}

function StatusChip({ status, label }: { status: Status; label: string }) {
  const map = {
    received: "bg-received-soft text-received",
    due: "bg-gold/15 text-gold-deep",
    late: "bg-ink/10 text-ink-soft",
    reminder: "bg-ink/8 text-ink-soft",
  } as const;
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${map[status]}`}
    >
      <span
        aria-hidden
        className="inline-block h-1.5 w-1.5 rounded-full bg-current opacity-80"
      />
      {label}
    </span>
  );
}

function StatusDot({ kind }: { kind: "received" | "reminder" | "joined" }) {
  const color =
    kind === "received"
      ? "var(--received)"
      : kind === "reminder"
        ? "var(--gold)"
        : "var(--ink-soft)";
  return (
    <span
      aria-hidden
      className="block h-2.5 w-2.5 rounded-full"
      style={{ background: color }}
    />
  );
}

const ACTIVITY: {
  en: string;
  ar: string;
  when: string;
  whenAr: string;
  amount?: number;
  kind: "received" | "reminder" | "joined";
}[] = [
  {
    en: "An omen received from Apt 12 — Mostafa A.",
    ar: "بشارة وصلت من شقة ١٢ — مصطفى ع.",
    when: "Today · 9:42",
    whenAr: "النهاردة · ٩:٤٢",
    amount: 4200,
    kind: "received",
  },
  {
    en: "Reminder sent to Apt 5 — Nadia H.",
    ar: "تم إرسال تذكير لشقة ٥ — نادية ح.",
    when: "Yesterday · 18:10",
    whenAr: "إمبارح · ١٨:١٠",
    kind: "reminder",
  },
  {
    en: "An omen received from Apt 7 — Karim & Layla S.",
    ar: "بشارة وصلت من شقة ٧ — كريم وليلى س.",
    when: "Apr 30 · 11:18",
    whenAr: "٣٠ أبريل · ١١:١٨",
    amount: 6100,
    kind: "received",
  },
  {
    en: "Apt 3 joined Omens — Hossam E.",
    ar: "شقة ٣ انضمت لـ Omens — حسام ا.",
    when: "Apr 22",
    whenAr: "٢٢ أبريل",
    kind: "joined",
  },
];

function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="relative z-10 border-t border-line/60">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-2 px-6 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <div className="flex items-baseline gap-3">
          <span className="text-eyebrow text-gold-deep">
            {locale === "ar" ? "أمانة" : "Amana"}
          </span>
          <span className="text-sm text-muted-fg">
            {locale === "ar"
              ? "أمانة بنوفّيها أول كل شهر."
              : "A trust kept on the first of every month."}
          </span>
        </div>
        <p className="text-sm text-muted-fg">
          © {locale === "ar" ? "٢٠٢٦" : "2026"} Omens
        </p>
      </div>
    </footer>
  );
}
