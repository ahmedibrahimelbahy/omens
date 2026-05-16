"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { NeighborhoodChips } from "./neighborhood-chips";
import { OmensScore } from "./omens-score";
import { StatusChip } from "./status-chip";
import { cn } from "@/lib/cn";
import type { Locale } from "@/i18n/routing";

type Role = "landlord" | "tenant";

type FieldKind = "text" | "email" | "tel" | "number" | "neighborhood-chips";

type StepConfig = {
  name: string;
  labelKey: string;
  hintKey?: string;
  placeholderKey?: string;
  placeholderLiteral?: string;
  kind: FieldKind;
  required?: boolean;
  prefix?: string;
};

const landlordSteps: StepConfig[] = [
  {
    name: "name",
    labelKey: "nameLabel",
    placeholderKey: "namePlaceholder",
    kind: "text",
    required: true,
  },
  {
    name: "whatsapp",
    labelKey: "whatsappLabel",
    hintKey: "whatsappHint",
    placeholderLiteral: "10 1234 5678",
    kind: "tel",
    required: true,
    prefix: "+20",
  },
  {
    name: "email",
    labelKey: "emailLabel",
    placeholderKey: "emailPlaceholder",
    kind: "email",
    required: true,
  },
  {
    name: "neighborhoods",
    labelKey: "neighborhoodLabel",
    hintKey: "neighborhoodChipsHint",
    kind: "neighborhood-chips",
    required: true,
  },
  {
    name: "units",
    labelKey: "unitsLabel",
    hintKey: "unitsHint",
    placeholderLiteral: "4",
    kind: "number",
    required: true,
  },
];

const tenantSteps: StepConfig[] = [
  {
    name: "name",
    labelKey: "nameLabel",
    placeholderKey: "namePlaceholder",
    kind: "text",
    required: true,
  },
  {
    name: "whatsapp",
    labelKey: "whatsappLabel",
    hintKey: "whatsappHint",
    placeholderLiteral: "10 1234 5678",
    kind: "tel",
    required: true,
    prefix: "+20",
  },
  {
    name: "email",
    labelKey: "emailLabel",
    placeholderKey: "emailPlaceholder",
    kind: "email",
    required: true,
  },
  {
    name: "occupation",
    labelKey: "occupationLabel",
    hintKey: "occupationHint",
    placeholderKey: "occupationPlaceholder",
    kind: "text",
  },
  {
    name: "budget",
    labelKey: "budgetLabel",
    hintKey: "budgetHint",
    placeholderKey: "budgetPlaceholder",
    kind: "text",
  },
];

export function SignupForm({
  role,
  locale,
}: {
  role: Role;
  locale: Locale;
}) {
  const t = useTranslations(`signup.${role}`);
  const tCommon = useTranslations("signup");
  const isAr = locale === "ar";

  const steps = role === "landlord" ? landlordSteps : tenantSteps;
  const total = steps.length;

  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Record<string, string | string[]>>({});
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const cur = steps[step];
  const value = values[cur.name];

  const validate = (): boolean => {
    if (!cur.required) return true;

    if (cur.kind === "neighborhood-chips") {
      if (!Array.isArray(value) || value.length === 0) {
        setError(isAr ? "اختر حي واحد على الأقل." : "Pick at least one neighborhood.");
        return false;
      }
      return true;
    }

    const v = typeof value === "string" ? value.trim() : "";
    if (v.length === 0) {
      setError(isAr ? "حقل مطلوب." : "Required.");
      return false;
    }
    if (cur.kind === "email" && !/^\S+@\S+\.\S+$/.test(v)) {
      setError(isAr ? "إيميل غير صالح." : "Doesn't look like a valid email.");
      return false;
    }
    if (cur.kind === "tel" && v.replace(/\D/g, "").length < 8) {
      setError(isAr ? "رقم واتساب غير مكتمل." : "That number looks too short.");
      return false;
    }
    if (cur.kind === "number" && (isNaN(Number(v)) || Number(v) < 1)) {
      setError(isAr ? "لازم يكون ١ أو أكتر." : "Must be 1 or more.");
      return false;
    }
    return true;
  };

  const advance = async (e?: FormEvent) => {
    e?.preventDefault();
    if (submitting) return;
    if (!validate()) return;
    setError(null);
    if (step < total - 1) {
      setStep(step + 1);
    } else {
      setSubmitting(true);
      await new Promise((r) => setTimeout(r, 800));
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  const back = () => {
    if (step > 0) {
      setError(null);
      setStep(step - 1);
    }
  };

  const setStringValue = (v: string) => {
    setValues({ ...values, [cur.name]: v });
    if (error) setError(null);
  };

  const setArrayValue = (v: string[]) => {
    setValues({ ...values, [cur.name]: v });
    if (error) setError(null);
  };

  const reset = () => {
    setStep(0);
    setValues({});
    setSubmitted(false);
    setError(null);
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {role === "tenant" ? (
              <TenantSuccess locale={locale} onReset={reset} />
            ) : (
              <LandlordSuccess locale={locale} onReset={reset} />
            )}
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Progress header */}
            <div className="flex items-center justify-between">
              <p className="text-eyebrow text-muted-fg">
                {tCommon("stepOf", { n: step + 1, total })}
              </p>
              <div className="flex items-center gap-1.5" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={total}>
                {Array.from({ length: total }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => i < step && setStep(i)}
                    disabled={i > step}
                    aria-label={`${tCommon("stepOf", { n: i + 1, total })}`}
                    aria-current={i === step ? "step" : undefined}
                    className={cn(
                      "h-1.5 rounded-full transition-all",
                      i === step
                        ? "w-8 bg-gold"
                        : i < step
                          ? "w-5 bg-ink/35 hover:bg-ink/60 cursor-pointer"
                          : "w-5 bg-line-strong",
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Step body */}
            <form onSubmit={advance} className="mt-10" noValidate>
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: isAr ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isAr ? 20 : -20 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                >
                  <label
                    htmlFor={cur.name}
                    className="block font-display text-h3 leading-tight text-ink"
                  >
                    {t(cur.labelKey)}
                  </label>

                  {cur.kind === "neighborhood-chips" ? (
                    <div className="mt-7">
                      <NeighborhoodChips
                        locale={locale}
                        selected={(value as string[]) ?? []}
                        onChange={setArrayValue}
                      />
                    </div>
                  ) : (
                    <div
                      className={cn(
                        "mt-7 flex items-center overflow-hidden rounded-xl border bg-surface-2 transition-colors",
                        error
                          ? "border-[#be123c]"
                          : "border-line-strong focus-within:border-gold",
                      )}
                    >
                      {cur.prefix && (
                        <span className="border-e border-line-strong bg-cream-deep/40 px-4 py-3.5 text-sm font-medium text-ink-soft rtl:border-e-0 rtl:border-s">
                          {cur.prefix}
                        </span>
                      )}
                      <input
                        id={cur.name}
                        name={cur.name}
                        type={cur.kind === "number" ? "number" : cur.kind}
                        inputMode={
                          cur.kind === "tel"
                            ? "tel"
                            : cur.kind === "email"
                              ? "email"
                              : cur.kind === "number"
                                ? "numeric"
                                : undefined
                        }
                        placeholder={
                          cur.placeholderLiteral ??
                          (cur.placeholderKey ? t(cur.placeholderKey) : undefined)
                        }
                        value={(value as string) ?? ""}
                        onChange={(e) => setStringValue(e.target.value)}
                        autoFocus
                        autoComplete={
                          cur.name === "email"
                            ? "email"
                            : cur.name === "name"
                              ? "name"
                              : cur.name === "whatsapp"
                                ? "tel-national"
                                : "off"
                        }
                        dir={cur.kind === "tel" || cur.kind === "email" ? "ltr" : undefined}
                        className="block w-full bg-transparent px-4 py-4 text-base text-ink placeholder:text-muted-fg/70 focus:outline-none"
                      />
                    </div>
                  )}

                  {error ? (
                    <p className="mt-3 text-xs font-medium" style={{ color: "#be123c" }}>
                      {error}
                    </p>
                  ) : cur.hintKey ? (
                    <p className="mt-3 text-xs text-muted-fg">{t(cur.hintKey)}</p>
                  ) : null}
                </motion.div>
              </AnimatePresence>

              {/* Nav */}
              <div className="mt-12 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={back}
                  disabled={step === 0}
                  className="group inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink disabled:cursor-default disabled:opacity-25 disabled:hover:text-ink-soft"
                >
                  <span
                    aria-hidden
                    className="inline-block h-px w-5 bg-current transition-all group-hover:w-7"
                  />
                  {tCommon("back")}
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="group flex items-center justify-center gap-3 rounded-full bg-ink px-7 py-4 text-cream shadow-lift transition-all hover:bg-ink-soft hover:shadow-gold disabled:opacity-50"
                >
                  <span className="text-sm font-medium tracking-wide">
                    {submitting
                      ? t("submitting")
                      : step === total - 1
                        ? t("submit")
                        : tCommon("next")}
                  </span>
                  {!submitting && (
                    <span
                      aria-hidden
                      className="inline-block h-px w-6 bg-gold transition-all group-hover:w-10"
                    />
                  )}
                  {submitting && (
                    <span
                      aria-hidden
                      className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-gold border-t-transparent"
                    />
                  )}
                </button>
              </div>
            </form>

            <p className="mt-12 text-center text-xs text-muted-fg">
              {isAr
                ? "بنحترم خصوصيتك. تفاصيلك ما بتُشارك مع حد."
                : "We respect your privacy. Your details are never shared."}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LandlordSuccess({
  locale,
  onReset,
}: {
  locale: Locale;
  onReset: () => void;
}) {
  const t = useTranslations("signup.landlord");
  const tCommon = useTranslations("signup");
  const isAr = locale === "ar";

  return (
    <div className="rounded-2xl border border-line bg-surface-2 px-8 py-14 text-center shadow-soft sm:px-12">
      <span className="inline-grid h-16 w-16 place-items-center rounded-full bg-received text-cream shadow-gold">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path
            d="M7 14l5 5L21 9"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <h2 className="mt-8 font-display text-h2 text-ink">{t("success")}</h2>
      <p className="text-lede mt-4 mx-auto max-w-md">{t("successBody")}</p>

      <div className="mt-8 flex justify-center">
        <StatusChip
          status="reminder"
          label={isAr ? "طلبك اتسجل" : "Application received"}
          variant="soft"
          dot
        />
      </div>

      <button
        type="button"
        onClick={onReset}
        className="mt-10 text-xs uppercase tracking-wider text-gold-deep hover:underline"
      >
        {tCommon("back")}
      </button>
    </div>
  );
}

function TenantSuccess({
  locale,
  onReset,
}: {
  locale: Locale;
  onReset: () => void;
}) {
  const t = useTranslations("signup.tenant");
  const tCommon = useTranslations("signup");
  const isAr = locale === "ar";

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-line bg-surface-2 px-8 py-12 text-center shadow-soft sm:px-12">
        <span className="inline-grid h-16 w-16 place-items-center rounded-full bg-received text-cream shadow-gold">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path
              d="M7 14l5 5L21 9"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h2 className="mt-8 font-display text-h2 text-ink">{t("success")}</h2>
        <p className="text-lede mt-4 mx-auto max-w-md">{t("successBody")}</p>
      </div>

      {/* Brand payoff: a real preview of their freshly-created profile */}
      <div>
        <p className="text-eyebrow text-gold-deep mb-3 text-center">
          {isAr ? "ملفك الجديد" : "Your fresh profile"}
        </p>
        <OmensScore
          score={0}
          dataPoints={0}
          locale={locale}
          size="md"
          layout="row"
        />
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={onReset}
          className="text-xs uppercase tracking-wider text-gold-deep hover:underline"
        >
          {tCommon("back")}
        </button>
      </div>
    </div>
  );
}
