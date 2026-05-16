"use client";

import { cn } from "@/lib/cn";
import type { ComponentProps } from "react";

type IconProps = ComponentProps<"svg">;

const InstaPayIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
    {/* Lightning bolt — InstaPay signals instant */}
    <path
      d="M14 2 L5.5 13 L11 13 L10 22 L18.5 11 L13 11 Z"
      fill="currentColor"
    />
  </svg>
);

const VodafoneCashIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
    {/* Speech-bubble silhouette + cash dot — abstracted */}
    <path
      d="M4 11.5a8 8 0 1 1 13.4 5.9l1 4.1-5-2A8 8 0 0 1 4 11.5z"
      fill="currentColor"
    />
    <circle cx="11.7" cy="11.5" r="2.4" fill="#fff" />
  </svg>
);

const FawryIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
    {/* Yellow disc + blue F monogram — Fawry's signature pair */}
    <circle cx="12" cy="12" r="10" fill="currentColor" />
    <path
      d="M8.8 6.5h7M8.8 6.5v11M8.8 12h5.4"
      stroke="#0E2A47"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MeezaIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
    {/* Two interlinked rhombi — Egyptian Meeza scheme */}
    <path
      d="M4 12l5-5 5 5-5 5z M10 12l5-5 5 5-5 5z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

type Gateway = {
  id: "instapay" | "vodafone-cash" | "fawry" | "meeza";
  name: string;
  nameAr: string;
  href: string;
  brand: string;
  Icon: typeof InstaPayIcon;
};

const GATEWAYS: Gateway[] = [
  {
    id: "instapay",
    name: "InstaPay",
    nameAr: "إنستا باي",
    href: "https://instapay.eg/",
    brand: "#5A2D82",
    Icon: InstaPayIcon,
  },
  {
    id: "vodafone-cash",
    name: "Vodafone Cash",
    nameAr: "فودافون كاش",
    href: "https://web.vfcash.eg/",
    brand: "#E60000",
    Icon: VodafoneCashIcon,
  },
  {
    id: "fawry",
    name: "Fawry",
    nameAr: "فوري",
    href: "https://www.fawry.com/",
    brand: "#F5C518",
    Icon: FawryIcon,
  },
  {
    id: "meeza",
    name: "Meeza",
    nameAr: "ميزة",
    href: "https://www.meezadigital.com/",
    brand: "#0E2A47",
    Icon: MeezaIcon,
  },
];

type Variant = "trust-strip" | "actions";

type Props = {
  variant: Variant;
  locale: "en" | "ar";
  className?: string;
  label?: string;
  /** Limit which gateways to show. Defaults to the first 3 (Meeza is opt-in). */
  include?: Gateway["id"][];
};

/**
 * Payment gateways — the canonical Egyptian list.
 * - "trust-strip" = small inline badges, no actions. Used on pricing/marketing as a trust signal.
 * - "actions"     = full-width clickable buttons that deep-link out to each provider.
 * Brand marks are simplified geometric stand-ins — accurate enough to be recognizable,
 * not exact trademarks (avoids logo-licensing issues for a demo build).
 */
export function PaymentGateways({
  variant,
  locale,
  className,
  label,
  include,
}: Props) {
  const list = include
    ? GATEWAYS.filter((g) => include.includes(g.id))
    : GATEWAYS.slice(0, 3);
  const isAr = locale === "ar";

  if (variant === "trust-strip") {
    return (
      <div className={cn("flex flex-wrap items-center gap-2.5", className)}>
        {label && (
          <span className="text-[11px] uppercase tracking-wider text-muted-fg">
            {label}
          </span>
        )}
        {list.map((g) => (
          <span
            key={g.id}
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-2 px-2.5 py-1"
            title={isAr ? g.nameAr : g.name}
          >
            <g.Icon
              className="h-3.5 w-3.5"
              style={{ color: g.brand }}
            />
            <span className="text-[11px] font-medium text-ink">
              {isAr ? g.nameAr : g.name}
            </span>
          </span>
        ))}
      </div>
    );
  }

  // "actions" variant
  return (
    <div className={cn("space-y-3", className)}>
      {label && (
        <p className="text-[11px] uppercase tracking-wider text-muted-fg">
          {label}
        </p>
      )}
      <div className="grid gap-2 sm:grid-cols-3">
        {list.map((g) => (
          <a
            key={g.id}
            href={g.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-xl border border-line-strong bg-surface-2 px-3.5 py-3 transition-all hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-soft"
          >
            <span
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg"
              style={{
                color: g.brand,
                backgroundColor: `${g.brand}14`,
              }}
            >
              <g.Icon className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink">
                {isAr ? g.nameAr : g.name}
              </p>
              <p className="truncate text-[10px] text-muted-fg">
                {isAr ? "ادفع عن طريق" : "Pay via"}
              </p>
            </span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className="text-muted-fg transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
              style={{ transform: isAr ? "scaleX(-1)" : "none" }}
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
          </a>
        ))}
      </div>
    </div>
  );
}
