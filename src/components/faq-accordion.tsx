"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Item = { q: string; a: string };

export function FaqAccordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="grid divide-y divide-line rounded-2xl border border-line bg-surface-2 shadow-soft">
      {items.map((item, i) => {
        const expanded = open === i;
        return (
          <li key={i}>
            <button
              type="button"
              onClick={() => setOpen(expanded ? null : i)}
              aria-expanded={expanded}
              className="group flex w-full items-start gap-6 px-6 py-5 text-start sm:px-8 sm:py-6"
            >
              <span
                aria-hidden
                className="mt-1.5 inline-block h-3 w-3 shrink-0 rounded-full border border-gold transition-all"
                style={{
                  background: expanded ? "var(--gold)" : "transparent",
                }}
              />
              <span className="flex-1 font-display text-h4 text-ink">
                {item.q}
              </span>
              <span
                aria-hidden
                className="mt-2 text-ink-soft transition-transform"
                style={{
                  transform: expanded ? "rotate(45deg)" : "rotate(0deg)",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 2v12M2 8h12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-7 sm:px-8 sm:pb-8 ms-9 text-lede max-w-3xl">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
