"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useCurrentUser, signOut } from "@/lib/auth-mock";
import { formatNumerals } from "@/lib/numerals";
import type { Locale } from "@/i18n/routing";
import { useRouter } from "@/i18n/navigation";

export function ProfileClient({ locale }: { locale: Locale }) {
  const { user, hydrated } = useCurrentUser();
  const router = useRouter();
  const isAr = locale === "ar";
  const num = (n: number | string) => formatNumerals(n, locale);

  if (!hydrated) {
    return (
      <div className="mt-12 grid h-64 place-items-center">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mt-12 rounded-2xl border border-line bg-surface-2 p-12 text-center shadow-soft">
        <h1 className="text-h2 text-ink">
          {isAr ? "ادخل عشان تشوف ملفك" : "Sign in to view your profile"}
        </h1>
        <p className="text-lede mt-4 max-w-md mx-auto">
          {isAr
            ? "اختار حساب تجريبي عشان تشوف التجربة كاملة."
            : "Pick a demo account to walk through the full experience."}
        </p>
        <Link
          href={`/${locale}/signin`}
          className="mt-8 inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3 text-cream"
        >
          <span className="text-sm font-medium">
            {isAr ? "تسجيل دخول" : "Sign in"}
          </span>
        </Link>
      </div>
    );
  }

  const name = isAr ? user.nameAr : user.name;
  const joined = new Date(user.joinedAt);
  const joinedDisplay = joined.toLocaleDateString(
    isAr ? "ar-EG" : "en-US",
    { month: "long", year: "numeric" },
  );

  return (
    <div>
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-eyebrow text-gold-deep">
          {isAr ? "الملف الشخصي" : "Profile"}
        </p>

        <div className="mt-6 flex items-start gap-6">
          <span className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-ink text-h4 font-semibold text-cream shadow-lift sm:h-24 sm:w-24">
            {user.initials}
          </span>
          <div className="min-w-0">
            <h1 className="text-h2 text-ink">{name}</h1>
            <p className="mt-2 text-sm text-muted-fg">
              {isAr
                ? user.role === "landlord"
                  ? "مالك"
                  : "مستأجر"
                : user.role === "landlord"
                  ? "Landlord"
                  : "Tenant"}{" "}
              · {isAr ? "انضم في" : "Joined"} {joinedDisplay}
            </p>
          </div>
        </div>
      </motion.section>

      {/* Stats grid */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="mt-12 grid gap-5 sm:grid-cols-3"
      >
        {user.role === "landlord" ? (
          <>
            <StatCard
              eyebrow={isAr ? "وحدات نشطة" : "Active units"}
              value={num(user.units ?? 0)}
              tone="ink"
            />
            <StatCard
              eyebrow={isAr ? "دخل شهري" : "Monthly revenue"}
              value={num((user.monthlyRevenue ?? 0).toLocaleString("en-US"))}
              suffix={isAr ? "ج.م" : "EGP"}
              tone="gold"
            />
            <StatCard
              eyebrow={isAr ? "نقاط الثقة" : "Trust score"}
              value={num(user.trustScore ?? 0)}
              suffix={isAr ? "/١٠٠" : `/${num(100)}`}
              tone="received"
            />
          </>
        ) : (
          <>
            <StatCard
              eyebrow={isAr ? "نقاط Omens" : "Omens Score"}
              value={num(user.omensScore ?? 0)}
              suffix={isAr ? "/١٠٠" : `/${num(100)}`}
              tone="gold"
            />
            <StatCard
              eyebrow={isAr ? "شهور متتالية" : "Streak"}
              value={num(user.streakMonths ?? 0)}
              suffix={isAr ? "شهور" : "months"}
              tone="ink"
            />
            <StatCard
              eyebrow={isAr ? "وفّرت السنة دي" : "Saved this year"}
              value={num((user.savedThisYear ?? 0).toLocaleString("en-US"))}
              suffix={isAr ? "ج.م" : "EGP"}
              tone="received"
            />
          </>
        )}
      </motion.section>

      {/* Details + actions */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
        className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]"
      >
        <div className="rounded-2xl border border-line bg-surface-2 p-7 shadow-soft sm:p-8">
          <p className="text-eyebrow text-ink">
            {isAr ? "بيانات الحساب" : "Account details"}
          </p>
          <dl className="mt-6 grid divide-y divide-line">
            <Row
              label={isAr ? "الاسم الكامل" : "Full name"}
              value={name}
            />
            <Row
              label={isAr ? "البريد الإلكتروني" : "Email"}
              value={user.email}
            />
            <Row
              label={isAr ? "واتساب" : "WhatsApp"}
              value={user.whatsapp}
            />
            {user.role === "tenant" && user.currentUnit && (
              <Row
                label={isAr ? "البيت الحالي" : "Current home"}
                value={isAr ? user.currentUnitAr! : user.currentUnit}
              />
            )}
            <Row
              label={isAr ? "تاريخ الانضمام" : "Joined Omens"}
              value={joinedDisplay}
            />
          </dl>
        </div>

        <div className="grid content-start gap-5">
          <Link
            href={
              user.role === "landlord"
                ? `/${locale}/landlord`
                : `/${locale}/tenant`
            }
            className="group flex items-center justify-between rounded-2xl border border-line bg-surface-2 p-6 shadow-soft hover:-translate-y-0.5 hover:shadow-lift transition-all"
          >
            <div>
              <p className="text-eyebrow text-gold-deep">
                {user.role === "landlord"
                  ? isAr
                    ? "لوحة التحكم"
                    : "Dashboard"
                  : isAr
                    ? "إيجاراتي"
                    : "My rentals"}
              </p>
              <p className="mt-2 text-sm text-ink-soft">
                {user.role === "landlord"
                  ? isAr
                    ? "شوف صرفك القادم ومحفظتك."
                    : "Your next payout, your portfolio."
                  : isAr
                    ? "إيجار الشهر، نقاطك، وسجلك."
                    : "This month's rent, your score, your history."}
              </p>
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="arrow-flip text-gold transition-transform group-hover:translate-x-0.5"
            >
              <path
                d="M5 3l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          <button
            type="button"
            onClick={() => {
              signOut();
              router.push("/");
            }}
            className="group flex items-center justify-between rounded-2xl border border-line bg-surface-2 p-6 text-start shadow-soft hover:border-gold/40 transition-colors"
          >
            <div>
              <p className="text-eyebrow text-muted-fg">
                {isAr ? "تسجيل خروج" : "Sign out"}
              </p>
              <p className="mt-2 text-sm text-ink-soft">
                {isAr
                  ? "هترجع لصفحة Omens الرئيسية."
                  : "You'll go back to the home page."}
              </p>
            </div>
            <span className="text-muted-fg group-hover:text-ink transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="arrow-flip">
                <path
                  d="M10 3v-1H3v12h7v-1M7 8h8m0 0L12 5m3 3l-3 3"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>
      </motion.section>

      {/* Mock-auth note */}
      <p className="mt-10 text-center text-xs text-muted-fg">
        {isAr
          ? "ملحوظة: ده حساب تجريبي. لما نوصّل Supabase، الحسابات هتبقى حقيقية."
          : "Note: this is a demo account. Once we wire Supabase, these become real."}
      </p>
    </div>
  );
}

function StatCard({
  eyebrow,
  value,
  suffix,
  tone,
}: {
  eyebrow: string;
  value: string;
  suffix?: string;
  tone: "ink" | "gold" | "received";
}) {
  const gradient =
    tone === "gold"
      ? "radial-gradient(500px 220px at 100% 0%, rgba(201,169,97,0.16), transparent 65%)"
      : tone === "received"
        ? "radial-gradient(500px 220px at 100% 0%, rgba(16,185,129,0.12), transparent 65%)"
        : "radial-gradient(500px 220px at 100% 0%, rgba(13,34,64,0.08), transparent 65%)";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-surface-2 p-6 shadow-soft sm:p-7">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{ background: gradient }}
      />
      <div className="relative">
        <p className="text-eyebrow text-muted-fg">{eyebrow}</p>
        <p className="mt-3 flex items-baseline gap-2">
          <span className="font-display text-h2 leading-none tracking-tight text-ink">
            {value}
          </span>
          {suffix && (
            <span className="text-sm font-medium text-ink-soft">{suffix}</span>
          )}
        </p>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[140px_1fr] items-baseline gap-4 py-4 first:pt-0 last:pb-0">
      <dt className="text-eyebrow text-muted-fg">{label}</dt>
      <dd className="text-sm text-ink break-all">{value}</dd>
    </div>
  );
}
