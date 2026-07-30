"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCurrentUser, signOut } from "@/lib/auth-mock";
import type { Locale } from "@/i18n/routing";

export function HeaderAuth({
  locale,
  signInLabel,
  ctaLabel,
}: {
  locale: Locale;
  signInLabel: string;
  ctaLabel: string;
}) {
  const { user, hydrated } = useCurrentUser();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isAr = locale === "ar";

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Pre-hydration: render a neutral placeholder to avoid flash
  if (!hydrated) {
    return <span className="h-9 w-9 rounded-full bg-line/40" aria-hidden />;
  }

  // Logged out — secondary "Sign in" + primary "Get started" CTA.
  // Sign in is for returning users; Get started is for the 90% of
  // visitors who don't have an account yet.
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href={`/${locale}/signin`}
          className="hidden rounded-full border border-line-strong bg-surface-2 px-4 py-2 text-xs font-medium text-ink hover:border-gold/60 hover:shadow-soft transition-all sm:inline-flex"
        >
          {signInLabel}
        </Link>
        <Link
          href={`/${locale}/signup/landlord`}
          className="group inline-flex items-center gap-1.5 rounded-full bg-gold px-4 py-2 text-xs font-medium text-ink shadow-soft transition-all hover:bg-gold-deep hover:text-cream hover:shadow-gold"
        >
          <span>{ctaLabel}</span>
          <svg
            width="11"
            height="11"
            viewBox="0 0 12 12"
            fill="none"
            className="arrow-flip transition-transform group-hover:translate-x-0.5"
            aria-hidden
          >
            <path
              d="M3 6h6m0 0L6 3m3 3L6 9"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    );
  }

  // Logged in — show avatar + first name + dropdown
  const displayName = (isAr ? user.nameAr : user.name).split(" ")[0];
  const dashboard =
    user.role === "landlord" ? `/${locale}/landlord` : `/${locale}/tenant`;
  const roleLabel = isAr
    ? user.role === "landlord"
      ? "مالك"
      : "مستأجر"
    : user.role === "landlord"
      ? "Landlord"
      : "Tenant";

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="group inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-surface-2 py-1.5 ps-1.5 pe-3 hover:border-gold/60 transition-all"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-[10px] font-semibold text-cream">
          {user.initials}
        </span>
        <span className="hidden text-xs font-medium text-ink sm:inline">
          {displayName}
        </span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          className="text-muted-fg transition-transform"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <path
            d="M2 4l3 3 3-3"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            role="menu"
            className="absolute end-0 top-[calc(100%+0.5rem)] z-50 w-64 overflow-hidden rounded-2xl border border-line bg-surface-2 shadow-lift"
          >
            {/* Identity block */}
            <div className="flex items-center gap-3 border-b border-line p-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-xs font-semibold text-cream">
                {user.initials}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-ink">
                  {isAr ? user.nameAr : user.name}
                </p>
                <p className="text-[11px] uppercase tracking-wider text-gold-deep">
                  {roleLabel}
                </p>
              </div>
            </div>

            {/* Links */}
            <nav className="grid p-2">
              <MenuLink
                href={`/${locale}/profile`}
                label={isAr ? "الملف الشخصي" : "Profile"}
                onClick={() => setOpen(false)}
              />
              <MenuLink
                href={dashboard}
                label={
                  user.role === "landlord"
                    ? isAr
                      ? "لوحة التحكم"
                      : "Dashboard"
                    : isAr
                      ? "إيجاراتي"
                      : "My rentals"
                }
                onClick={() => setOpen(false)}
              />
              {user.role === "tenant" && (
                <MenuLink
                  href={`/${locale}/properties`}
                  label={isAr ? "ابحث عن شقة" : "Find a home"}
                  onClick={() => setOpen(false)}
                />
              )}
            </nav>

            <div className="border-t border-line p-2">
              <button
                type="button"
                onClick={() => {
                  signOut();
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm text-ink-soft hover:bg-cream-deep/40 hover:text-ink transition-colors"
                role="menuitem"
              >
                <span>{isAr ? "تسجيل الخروج" : "Sign out"}</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="arrow-flip text-muted-fg"
                >
                  <path
                    d="M9 3v-1H2v10h7v-1M6 7h7m0 0L10 4m3 3l-3 3"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MenuLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      role="menuitem"
      className="rounded-lg px-3 py-2.5 text-sm text-ink hover:bg-cream-deep/40 transition-colors"
    >
      {label}
    </Link>
  );
}
