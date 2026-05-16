import { cn } from "@/lib/cn";

type LogoProps = {
  variant?: "ink" | "cream";
  /** Width in px. Height scales. */
  size?: number;
  className?: string;
  /** Reading direction context. Wordmark stays Latin in both. */
  lang?: "en" | "ar";
  /** Render mark only, no wordmark. */
  markOnly?: boolean;
};

/**
 * Omens — wordmark + compass-star mark.
 *
 * The mark is a slender four-point star with one elongated point (north),
 * suggesting guidance and foresight. "Omens" remains the wordmark in both
 * English and Arabic contexts — a brand name like Fawry or Halan, not
 * something to translate. In Arabic layouts the mark moves to the right so
 * the lockup reads correctly in RTL flow.
 *
 * Latin wordmark uses Fraunces italic for editorial weight. Loaded via
 * next/font in [locale]/layout.
 */
export function Logo({
  variant = "ink",
  size = 200,
  className,
  lang = "en",
  markOnly = false,
}: LogoProps) {
  const ink = variant === "ink" ? "var(--ink)" : "var(--cream)";
  const gold = "var(--gold)";

  if (markOnly) {
    return (
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        role="img"
        aria-label="Omens"
        className={cn("select-none", className)}
      >
        <title>Omens</title>
        <g transform="translate(16, 16)">
          <CompassStar gold={gold} />
        </g>
      </svg>
    );
  }

  // In Arabic context the mark goes on the right and the word reads from
  // there leftward — keeps RTL flow honest even though the word is Latin.
  const markX = lang === "ar" ? 232 : 16;
  const wordX = lang === "ar" ? 218 : 76;
  const wordAnchor = lang === "ar" ? "end" : "start";

  return (
    <svg
      viewBox="0 0 280 80"
      width={size}
      height={(size * 80) / 280}
      role="img"
      aria-label="Omens"
      className={cn("select-none", className)}
    >
      <title>Omens</title>

      <g transform={`translate(${markX}, 16)`}>
        <CompassStar gold={gold} scale={0.7} />
      </g>

      <text
        x={wordX}
        y="55"
        textAnchor={wordAnchor}
        fill={ink}
        style={{
          fontFamily: "var(--font-display), Georgia, serif",
          fontStyle: "italic",
          fontWeight: 500,
          fontSize: 44,
          letterSpacing: "-0.02em",
        }}
      >
        Omens
      </text>
    </svg>
  );
}

/**
 * The compass-star mark. Drawn in a 32x32 unit box, scaled by `scale`.
 * One point (top) is longer — the "north" — suggesting guidance.
 */
function CompassStar({ gold, scale = 1 }: { gold: string; scale?: number }) {
  return (
    <g
      transform={`scale(${scale})`}
      stroke={gold}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      {/* Long north stroke */}
      <path d="M 16 1 L 16 18" strokeWidth={1.4} />
      {/* Short south stroke */}
      <path d="M 16 21 L 16 31" strokeWidth={1.2} />
      {/* East/West cross arms */}
      <path d="M 4 19 L 28 19" strokeWidth={1.2} />
      {/* Diagonal hairlines — the subtle compass rose */}
      <path d="M 7 11 L 25 27" strokeWidth={0.6} opacity={0.55} />
      <path d="M 25 11 L 7 27" strokeWidth={0.6} opacity={0.55} />
      {/* Center pip — a small filled diamond */}
      <path
        d="M 16 16.5 L 17.5 19 L 16 21.5 L 14.5 19 Z"
        fill={gold}
        stroke="none"
      />
    </g>
  );
}
