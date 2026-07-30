"use client";

import {
  neighborhoods,
  neighborhoodLabel,
  phaseLabels,
  type Neighborhood,
  type PilotPhase,
} from "@/lib/neighborhoods";
import { cn } from "@/lib/cn";
import type { Locale } from "@/i18n/routing";

type Props = {
  locale: Locale;
  selected: string[];
  onChange: (selected: string[]) => void;
  /** Render the upcoming phases dimmed (default) or hide them entirely. */
  upcoming?: "show-dimmed" | "hide";
  className?: string;
};

/**
 * Multi-select neighborhood chip grid.
 * Groups by pilot phase so users immediately see which neighborhoods are
 * live vs. upcoming. Upcoming ones are tappable but visually dimmed —
 * we still collect the data so we know where demand lives.
 */
export function NeighborhoodChips({
  locale,
  selected,
  onChange,
  upcoming = "show-dimmed",
  className,
}: Props) {
  const labels = phaseLabels[locale];

  const toggle = (id: string) => {
    onChange(
      selected.includes(id)
        ? selected.filter((s) => s !== id)
        : [...selected, id],
    );
  };

  const phases: PilotPhase[] = upcoming === "hide" ? [1] : [1, 2, 3];

  return (
    <div className={cn("space-y-6", className)}>
      {phases.map((phase) => {
        const group = neighborhoods.filter((n) => n.pilotPhase === phase);
        return (
          <div key={phase}>
            <div className="mb-3 flex items-center gap-2">
              <span
                aria-hidden
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  phase === 1
                    ? "bg-received"
                    : phase === 2
                      ? "bg-gold"
                      : "bg-muted",
                )}
              />
              <p className="text-eyebrow text-muted-fg">{labels[phase]}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.map((n) => (
                <Chip
                  key={n.id}
                  neighborhood={n}
                  locale={locale}
                  active={selected.includes(n.id)}
                  dimmed={phase > 1}
                  onClick={() => toggle(n.id)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Chip({
  neighborhood: n,
  locale,
  active,
  dimmed,
  onClick,
}: {
  neighborhood: Neighborhood;
  locale: Locale;
  active: boolean;
  dimmed: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
        active
          ? "bg-ink text-cream shadow-soft scale-100"
          : "border border-line-strong bg-surface-2 text-ink hover:border-gold/60 hover:-translate-y-px",
        dimmed && !active && "opacity-55 hover:opacity-100",
      )}
    >
      {neighborhoodLabel(n, locale)}
    </button>
  );
}
