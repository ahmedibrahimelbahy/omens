import { cn } from "@/lib/cn";

/**
 * Direction-aware arrow indicator.
 *
 * Renders a thin hairline with a small chevron tip. The whole SVG flips
 * horizontally inside an [dir="rtl"] context via the `.arrow-flip` utility,
 * so a single component reads correctly in both English and Arabic without
 * any locale checks at the call site.
 *
 * Two visual modes:
 *  - "line": hairline + tip, used inside CTAs alongside text — animates wider on hover
 *  - "chevron": just the tip, used in tight spaces like card actions
 */
type Props = {
  variant?: "line" | "chevron";
  className?: string;
  /** Tailwind text-* color class applied to currentColor. */
  tone?: string;
};

export function Arrow({ variant = "line", className, tone = "" }: Props) {
  if (variant === "chevron") {
    return (
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden
        className={cn("arrow-flip", tone, className)}
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

  // line variant — hairline + tip on a 36×8 viewBox; width animates with parent
  return (
    <span
      aria-hidden
      className={cn(
        "arrow-flip inline-flex h-2 w-7 items-center transition-all group-hover:w-11",
        tone,
        className,
      )}
    >
      <svg width="100%" height="8" viewBox="0 0 36 8" fill="none" preserveAspectRatio="none">
        {/* Hairline */}
        <line
          x1="0"
          y1="4"
          x2="32"
          y2="4"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        {/* Tip */}
        <path
          d="M30 1.5L35 4L30 6.5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </span>
  );
}
