"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";

type Item = {
  href: string;
  label: string;
  active?: boolean;
};

type Props = {
  items: Item[];
  ariaOpen: string;
  ariaClose: string;
};

/**
 * Mobile hamburger menu — visible only below `md`. The desktop <nav> in
 * ProductHeader sits next to this and uses `hidden md:flex`, so the two never
 * collide. Panel drops below the header bar, full width on mobile.
 */
export function MobileNav({ items, ariaOpen, ariaClose }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? ariaClose : ariaOpen}
        className="grid h-11 w-11 place-items-center rounded-full text-ink-soft transition-colors hover:bg-cream-deep/60 hover:text-ink focus-visible:bg-cream-deep/60"
      >
        <span className="relative block h-3 w-5">
          <span
            aria-hidden
            className={cn(
              "absolute inset-x-0 top-0 h-px bg-current transition-transform duration-200",
              open && "top-1/2 -translate-y-1/2 rotate-45",
            )}
          />
          <span
            aria-hidden
            className={cn(
              "absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-current transition-opacity duration-200",
              open && "opacity-0",
            )}
          />
          <span
            aria-hidden
            className={cn(
              "absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-200",
              open && "bottom-1/2 translate-y-1/2 -rotate-45",
            )}
          />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            id="mobile-nav-panel"
            role="menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 top-[68px] z-40 overflow-hidden rounded-2xl border border-line-strong bg-surface-2 shadow-lift sm:inset-x-auto sm:end-10 sm:w-72"
          >
            <ul className="divide-y divide-line">
              {items.map((it) => (
                <li key={it.href}>
                  <Link
                    href={it.href}
                    onClick={() => setOpen(false)}
                    role="menuitem"
                    className={cn(
                      "flex min-h-14 items-center justify-between gap-4 px-5 text-base transition-colors",
                      it.active
                        ? "text-ink font-medium"
                        : "text-ink-soft hover:text-ink hover:bg-cream-deep/40",
                    )}
                  >
                    <span>{it.label}</span>
                    {it.active && (
                      <span
                        aria-hidden
                        className="h-1.5 w-1.5 rounded-full bg-gold"
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
