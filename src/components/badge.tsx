import { cn } from "@/lib/cn";

type Variant = "announce" | "mini" | "corner";
type Tone = "gold" | "ink" | "received" | "cream";

const toneClass: Record<Tone, string> = {
  gold: "border-gold/30 bg-gold/10 text-gold-deep",
  ink: "border-line-strong bg-surface-2 text-ink-soft",
  received: "border-received/30 bg-received/10 text-received",
  cream: "border-cream-deep/60 bg-cream-deep/60 text-ink-soft",
};

/**
 * Editorial badge — three flavors.
 *
 * - `announce`: hero-grade pill with a live, pulsing dot. Use once per page.
 * - `mini`: small inline chip for trust strips or facts under CTAs.
 * - `corner`: absolutely positioned on a card corner; auto-flips end side in RTL.
 */
export function Badge({
  variant = "mini",
  tone = "gold",
  pulse = false,
  className,
  children,
}: {
  variant?: Variant;
  tone?: Tone;
  pulse?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const base = "inline-flex items-center gap-2 rounded-full border";
  const padding =
    variant === "announce" ? "px-3.5 py-1.5" : "px-2.5 py-1";

  return (
    <span
      className={cn(
        base,
        padding,
        toneClass[tone],
        "text-eyebrow leading-none",
        variant === "announce" && "shadow-soft",
        variant === "corner" && "absolute end-4 top-4 z-10 shadow-soft",
        className,
      )}
    >
      {pulse && (
        <span aria-hidden className="relative inline-flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-current opacity-60 motion-safe:animate-ping" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
        </span>
      )}
      <span>{children}</span>
    </span>
  );
}
