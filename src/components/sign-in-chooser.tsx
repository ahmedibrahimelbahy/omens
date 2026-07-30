"use client";

import { useRouter } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { signIn, DEMO_USERS } from "@/lib/auth-mock";
import type { Locale } from "@/i18n/routing";

export function SignInChooser({ locale }: { locale: Locale }) {
  const router = useRouter();
  const isAr = locale === "ar";

  const handleSignIn = (id: keyof typeof DEMO_USERS) => {
    signIn(id);
    const user = DEMO_USERS[id];
    router.push(user.role === "landlord" ? "/landlord" : "/tenant");
  };

  return (
    <div>
      <section className="text-center">
        <p className="text-eyebrow text-gold-deep">
          {isAr ? "تسجيل الدخول" : "Sign in"}
        </p>
        <h1 className="text-h1 mt-5 text-ink">
          {isAr ? "ادخل كـ…" : "Sign in as…"}
        </h1>
        <p className="text-lede mt-5 mx-auto max-w-xl">
          {isAr
            ? "بنشتغل لسه بدون قاعدة بيانات حقيقية. اختار حساب تجريبي عشان تشوف التجربة كاملة."
            : "We're still front-end-only — pick a demo account to walk through the full experience."}
        </p>
      </section>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 sm:gap-6">
        <motion.button
          type="button"
          onClick={() => handleSignIn("farida")}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -2 }}
          className="group relative overflow-hidden rounded-2xl bg-ink p-8 text-cream shadow-lift transition-shadow hover:shadow-gold sm:p-10 text-start"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(201,169,97,0.35), transparent 70%)",
            }}
          />
          <div className="relative">
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-cream text-sm font-semibold text-ink">
                FM
              </span>
              <div>
                <p className="text-eyebrow text-gold">
                  {isAr ? "مالك" : "Landlord"}
                </p>
                <p className="mt-1 text-h4 font-display text-cream">
                  {isAr ? "فريدة منصور" : "Farida Mansour"}
                </p>
              </div>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-cream/70">
              {isAr
                ? "٤ شقق في هليوبوليس. الإيجار بييجي أول الشهر، بدون مطاردة."
                : "4 apartments in Heliopolis. Rent on the 1st, no chasing required."}
            </p>
            <div className="mt-8 inline-flex items-center gap-3 text-sm font-medium text-gold">
              <span>{isAr ? "ادخل كـ فريدة" : "Continue as Farida"}</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="arrow-flip"
              >
                <path
                  d="M5 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </motion.button>

        <motion.button
          type="button"
          onClick={() => handleSignIn("mostafa")}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -2 }}
          className="group relative overflow-hidden rounded-2xl border border-line bg-surface-2 p-8 shadow-soft transition-shadow hover:shadow-lift sm:p-10 text-start"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -left-16 -bottom-16 h-56 w-56 rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(16,185,129,0.18), transparent 70%)",
            }}
          />
          <div className="relative">
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-ink text-sm font-semibold text-cream">
                MA
              </span>
              <div>
                <p className="text-eyebrow text-gold-deep">
                  {isAr ? "مستأجر" : "Tenant"}
                </p>
                <p className="mt-1 text-h4 font-display text-ink">
                  {isAr ? "مصطفى عبدالرحمن" : "Mostafa Abdelrahman"}
                </p>
              </div>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-ink-soft">
              {isAr
                ? "ساكن في كوربا. نقاط Omens ٩٢. وفّر ٨٤٠ ج.م السنة دي بالدفع المبكر."
                : "Lives in Korba. Omens Score 92. Saved EGP 840 this year by paying early."}
            </p>
            <div className="mt-8 inline-flex items-center gap-3 text-sm font-medium text-ink">
              <span>{isAr ? "ادخل كـ مصطفى" : "Continue as Mostafa"}</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="arrow-flip text-gold"
              >
                <path
                  d="M5 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </motion.button>
      </div>

      <p className="mt-12 text-center text-xs text-muted-fg">
        {isAr
          ? "لسه ما عندكش حساب؟ "
          : "Don't have an account yet? "}
        <a
          href={`/${locale}/signup/landlord`}
          className="text-gold-deep hover:underline"
        >
          {isAr ? "سجّل كمالك" : "Sign up as landlord"}
        </a>
        {" · "}
        <a
          href={`/${locale}/signup/tenant`}
          className="text-gold-deep hover:underline"
        >
          {isAr ? "سجّل كمستأجر" : "Sign up as tenant"}
        </a>
      </p>
    </div>
  );
}
