import { cn } from "@/lib/cn";

export type StatusKind = "paid" | "pending" | "late" | "disputed" | "reminder";

type Props = {
  status: StatusKind;
  label: string;
  /** Solid = strong assertion (e.g., on dashboard tiles). Soft = inline chip. */
  variant?: "soft" | "solid";
  /** Render a tiny pip on the leading edge — usually leave off; the pattern is the signal. */
  dot?: boolean;
  className?: string;
};

const classFor: Record<StatusKind, { solid: string; soft: string }> = {
  paid: { solid: "status-paid", soft: "status-paid-soft" },
  pending: { solid: "status-pending", soft: "status-pending-soft" },
  late: { solid: "status-late", soft: "status-late-soft" },
  disputed: { solid: "status-disputed", soft: "status-disputed-soft" },
  reminder: { solid: "status-reminder", soft: "status-reminder-soft" },
};

/**
 * Status chip — uses pattern fills (diagonal stripes for indeterminate
 * states, solid for terminal ones) so the visual encoding does the work
 * before the label is read. Borrowed pattern from Dentamap's appointment
 * grid; here applied to payment/unit lifecycle states.
 */
export function StatusChip({
  status,
  label,
  variant = "soft",
  dot = false,
  className,
}: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em]",
        classFor[status][variant],
        className,
      )}
    >
      {dot && (
        <span
          aria-hidden
          className="inline-block h-1.5 w-1.5 rounded-full bg-current opacity-70"
        />
      )}
      <span className="leading-none">{label}</span>
    </span>
  );
}
