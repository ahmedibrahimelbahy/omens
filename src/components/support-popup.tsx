"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";

const WHATSAPP_NUMBER = "201000000000";
const EMAIL = "hello@omens.eg";
const PHONE_TEL = "+201000000000";

const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}`;
const EMAIL_HREF = `mailto:${EMAIL}`;
const PHONE_HREF = `tel:${PHONE_TEL}`;

/**
 * Floating support popup — appears bottom-end on every viewport.
 * Mobile-first: 56px tap target, panel takes near full width on small screens,
 * caps at 360px on tablet and up. Esc closes; tap outside closes.
 * Reduced-motion respected via framer-motion (transform/opacity only).
 */
export function SupportPopup() {
  const t = useTranslations("support");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex justify-end sm:inset-x-auto sm:end-6 sm:bottom-6"
    >
      <div className="pointer-events-auto relative flex w-full max-w-[360px] flex-col items-end gap-3 sm:w-auto">
        <AnimatePresence>
          {open && (
            <motion.div
              key="panel"
              id="support-panel"
              role="dialog"
              aria-modal="false"
              aria-labelledby="support-title"
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="w-full origin-bottom rounded-2xl border border-line-strong bg-surface-2 p-5 shadow-lift sm:w-[360px] sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span aria-hidden className="relative inline-flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-received opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-received" />
                    </span>
                    <span className="text-eyebrow text-received">
                      {t("status")}
                    </span>
                  </div>
                  <h2
                    id="support-title"
                    className="font-display text-h4 mt-2 text-ink"
                  >
                    {t("title")}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={t("close")}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-ink-soft transition-colors hover:bg-cream-deep/60 hover:text-ink focus-visible:bg-cream-deep/60"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path
                      d="M3 3l8 8M11 3l-8 8"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {t("lede")}
              </p>

              <div className="mt-5 grid gap-2.5">
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl bg-ink px-4 py-3.5 text-cream shadow-lift transition-all hover:bg-ink-soft hover:shadow-gold"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold/20 text-gold">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.04 0C5.49 0 .2 5.29.2 11.84a11.8 11.8 0 0 0 1.59 5.94L0 24l6.36-1.66a11.83 11.83 0 0 0 5.68 1.45h.01c6.55 0 11.84-5.29 11.84-11.84 0-3.17-1.23-6.14-3.37-8.47Zm-8.48 18.21h-.01a9.86 9.86 0 0 1-5.03-1.38l-.36-.21-3.77.99 1.01-3.68-.23-.38a9.81 9.81 0 0 1-1.5-5.2c0-5.43 4.42-9.85 9.86-9.85 2.63 0 5.1 1.03 6.96 2.89a9.78 9.78 0 0 1 2.88 6.97c0 5.44-4.42 9.85-9.85 9.85Zm5.41-7.37c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.34.22-.64.07a8.1 8.1 0 0 1-2.4-1.48 8.93 8.93 0 0 1-1.66-2.07c-.17-.3-.02-.46.13-.61.14-.14.3-.37.45-.55.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.03 1.01-1.03 2.47 0 1.45 1.06 2.86 1.21 3.06.15.2 2.09 3.2 5.07 4.49.71.31 1.26.49 1.69.62.71.23 1.35.2 1.86.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
                    </svg>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium">
                      {t("whatsapp")}
                    </span>
                    <span className="block text-xs text-cream/70 mt-0.5">
                      {t("whatsappHint")}
                    </span>
                  </span>
                  <ArrowEnd />
                </a>

                <a
                  href={EMAIL_HREF}
                  className="group flex items-center gap-3 rounded-xl border border-line bg-surface-1 px-4 py-3.5 text-ink shadow-soft transition-all hover:border-gold/60 hover:shadow-gold"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-cream-deep/60 text-ink-soft">
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
                      <path
                        d="M3 5h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
                        stroke="currentColor"
                        strokeWidth="1.4"
                      />
                      <path
                        d="m3 6 7 5 7-5"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium">
                      {t("email")}
                    </span>
                    <span className="block text-xs text-muted-fg mt-0.5">
                      {t("emailHint")}
                    </span>
                  </span>
                  <ArrowEnd />
                </a>
              </div>

              <a
                href={PHONE_HREF}
                className="mt-4 block text-center text-xs text-muted-fg hover:text-ink-soft transition-colors"
              >
                {t("phone")}
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="support-panel"
          aria-label={t("aria")}
          className={cn(
            "pointer-events-auto group inline-flex h-14 min-w-14 items-center justify-center gap-2.5 rounded-full bg-ink text-cream shadow-lift transition-all hover:bg-ink-soft hover:shadow-gold focus-visible:shadow-gold",
            "px-5",
          )}
        >
          {open ? (
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path
                d="M3 3l8 8M11 3l-8 8"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <>
              <span aria-hidden className="relative inline-flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-gold opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
              </span>
              <span className="text-sm font-medium tracking-wide">
                {t("trigger")}
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function ArrowEnd() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      className="arrow-flip shrink-0 opacity-60 transition-transform group-hover:translate-x-0.5"
    >
      <path
        d="M5 3l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
