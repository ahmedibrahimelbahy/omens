"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";

type Role = "landlord" | "tenant";

type Field = {
  name: string;
  label: string;
  hint?: string;
  placeholder?: string;
  type?: "text" | "email" | "tel" | "number";
  required?: boolean;
  prefix?: string;
};

export function SignupForm({
  role,
  locale,
}: {
  role: Role;
  locale: Locale;
}) {
  const t = useTranslations(`signup.${role}`);
  const tCommon = useTranslations("signup");

  const fields: Field[] = role === "landlord"
    ? [
        {
          name: "name",
          label: t("nameLabel"),
          placeholder: t("namePlaceholder"),
          type: "text",
          required: true,
        },
        {
          name: "whatsapp",
          label: t("whatsappLabel"),
          hint: t("whatsappHint"),
          placeholder: "10 1234 5678",
          type: "tel",
          required: true,
          prefix: "+20",
        },
        {
          name: "email",
          label: t("emailLabel"),
          placeholder: t("emailPlaceholder"),
          type: "email",
          required: true,
        },
        {
          name: "neighborhoods",
          label: t("neighborhoodLabel"),
          hint: t("neighborhoodHint"),
          placeholder: t("neighborhoodPlaceholder"),
          type: "text",
          required: true,
        },
        {
          name: "units",
          label: t("unitsLabel"),
          hint: t("unitsHint"),
          placeholder: "4",
          type: "number",
          required: true,
        },
      ]
    : [
        {
          name: "name",
          label: t("nameLabel"),
          placeholder: t("namePlaceholder"),
          type: "text",
          required: true,
        },
        {
          name: "whatsapp",
          label: t("whatsappLabel"),
          hint: t("whatsappHint"),
          placeholder: "10 1234 5678",
          type: "tel",
          required: true,
          prefix: "+20",
        },
        {
          name: "email",
          label: t("emailLabel"),
          placeholder: t("emailPlaceholder"),
          type: "email",
          required: true,
        },
        {
          name: "occupation",
          label: t("occupationLabel"),
          hint: t("occupationHint"),
          placeholder: t("occupationPlaceholder"),
          type: "text",
        },
        {
          name: "budget",
          label: t("budgetLabel"),
          hint: t("budgetHint"),
          placeholder: t("budgetPlaceholder"),
          type: "text",
        },
      ];

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            onSubmit={async (e) => {
              e.preventDefault();
              setSubmitting(true);
              // Placeholder: in production this would POST to /api/signup
              await new Promise((r) => setTimeout(r, 800));
              setSubmitting(false);
              setSubmitted(true);
            }}
            className="grid gap-6"
          >
            {fields.map((f) => (
              <div key={f.name} className="grid gap-2">
                <label
                  htmlFor={f.name}
                  className="text-eyebrow text-ink"
                >
                  {f.label}
                </label>
                <div
                  className={`flex items-center overflow-hidden rounded-xl border border-line-strong bg-surface-2 transition-colors focus-within:border-gold ${
                    f.prefix ? "" : ""
                  }`}
                >
                  {f.prefix && (
                    <span className="border-e border-line-strong bg-cream-deep/40 px-4 py-3.5 text-sm font-medium text-ink-soft rtl:border-e-0 rtl:border-s">
                      {f.prefix}
                    </span>
                  )}
                  <input
                    id={f.name}
                    name={f.name}
                    type={f.type ?? "text"}
                    placeholder={f.placeholder}
                    required={f.required}
                    className="block w-full bg-transparent px-4 py-3.5 text-sm text-ink placeholder:text-muted-fg/70 focus:outline-none"
                  />
                </div>
                {f.hint && (
                  <p className="text-xs text-muted-fg">{f.hint}</p>
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={submitting}
              className="group mt-4 flex items-center justify-center gap-3 rounded-full bg-ink px-7 py-4 text-cream shadow-lift transition-all hover:bg-ink-soft hover:shadow-gold disabled:opacity-50"
            >
              <span className="text-sm font-medium tracking-wide">
                {submitting ? t("submitting") : t("submit")}
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

            <p className="mt-2 text-center text-xs text-muted-fg">
              {locale === "ar"
                ? "بنحترم خصوصيتك. تفاصيلك ما بتُشارك مع حد."
                : "We respect your privacy. Your details are never shared."}
            </p>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="grid place-items-center rounded-2xl border border-line bg-surface-2 px-8 py-16 text-center shadow-soft"
          >
            <span className="grid h-16 w-16 place-items-center rounded-full bg-received text-cream shadow-gold">
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
            <h2 className="mt-8 font-display text-h2 text-ink">
              {t("success")}
            </h2>
            <p className="text-lede mt-4 max-w-md">{t("successBody")}</p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-10 text-xs uppercase tracking-wider text-gold-deep hover:underline"
            >
              {tCommon("back")}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
