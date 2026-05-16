import { cn } from "@/lib/cn";

type Props = {
  score: number;
  size?: "sm" | "md" | "lg";
  className?: string;
};

/**
 * Visual representation of the Omens Score (0–100).
 * Quietly editorial — a thin gold ring with the score numeral set
 * in Fraunces. No big "credit-score-style" gauges.
 */
export function ScorePip({ score, size = "sm", className }: Props) {
  const dim =
    size === "lg" ? 132 : size === "md" ? 84 : 48;
  const stroke = size === "lg" ? 3 : size === "md" ? 2.5 : 2;
  const r = (dim - stroke) / 2;
  const c = 2 * Math.PI * r;
  const filled = c * Math.min(Math.max(score, 0), 100) / 100;
  const fontSize =
    size === "lg" ? 36 : size === "md" ? 24 : 14;

  return (
    <div
      className={cn("relative inline-grid place-items-center", className)}
      style={{ width: dim, height: dim }}
      aria-label={`Omens Score ${score} of 100`}
    >
      <svg width={dim} height={dim} className="-rotate-90">
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={r}
          stroke="var(--line-strong)"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={r}
          stroke="var(--gold)"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={`${filled} ${c}`}
          strokeLinecap="round"
        />
      </svg>
      <span
        className="absolute font-display text-ink"
        style={{ fontSize, lineHeight: 1, letterSpacing: "-0.02em" }}
      >
        {score}
      </span>
    </div>
  );
}
