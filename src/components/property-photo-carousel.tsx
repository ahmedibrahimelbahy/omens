"use client";

import { useState, type MouseEvent } from "react";
import { cn } from "@/lib/cn";

type Props = {
  seeds: string[];
  /** Used in the alt attribute and as a stable id. */
  unitName: string;
  isAr: boolean;
  /** Optional ribbon shown on the cover image (e.g. "Newly listed"). */
  accent?: string;
  /** Optional verified badge at the bottom of the cover. */
  verified?: boolean;
  verifiedLabel?: string;
  /** Optional left/right offset for the arrows on RTL flow. */
  className?: string;
};

/**
 * Airbnb-style photo carousel for property cards.
 * Crossfade between images, arrows appear on hover, dot indicators below.
 * Click handlers stop propagation so the surrounding <Link> isn't activated.
 */
export function PropertyPhotoCarousel({
  seeds,
  unitName,
  isAr,
  accent,
  verified,
  verifiedLabel,
  className,
}: Props) {
  const [index, setIndex] = useState(0);
  const last = seeds.length - 1;

  const stop = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const prev = (e: MouseEvent) => {
    stop(e);
    setIndex((i) => (i === 0 ? last : i - 1));
  };

  const next = (e: MouseEvent) => {
    stop(e);
    setIndex((i) => (i === last ? 0 : i + 1));
  };

  return (
    <div
      className={cn(
        "group/photo relative aspect-[5/4] overflow-hidden bg-cream-deep",
        className,
      )}
    >
      {/* Image stack — crossfade between active and inactive */}
      {seeds.map((seed, i) => (
        <img
          key={seed}
          src={`https://picsum.photos/seed/${seed}/800/640`}
          alt={i === 0 ? `${unitName} — photo ${i + 1}` : ""}
          loading={i === 0 ? "eager" : "lazy"}
          aria-hidden={i !== index}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out",
            i === index ? "opacity-100" : "opacity-0",
          )}
        />
      ))}

      {/* Gradient overlay — keeps badges readable */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink/40 via-ink/0 to-transparent"
      />

      {/* Accent ribbon — top-leading corner */}
      {accent && (
        <div className="absolute start-3 top-3 z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cream/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink shadow-soft">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-gold"
            />
            {accent}
          </span>
        </div>
      )}

      {/* Verified badge — bottom-trailing corner */}
      {verified && verifiedLabel && (
        <div className="absolute bottom-3 end-3 z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-received/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-cream shadow-soft">
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
              <path
                d="M1.5 4.5L3.5 6.5L7.5 2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {verifiedLabel}
          </span>
        </div>
      )}

      {/* Arrows — only render if >1 image, only visible on hover/focus */}
      {seeds.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous photo"
            className="absolute start-3 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-cream/95 text-ink opacity-0 shadow-soft transition-opacity duration-200 hover:bg-cream group-hover/photo:opacity-100 focus-visible:opacity-100"
          >
            <Chevron direction="prev" isAr={isAr} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next photo"
            className="absolute end-3 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-cream/95 text-ink opacity-0 shadow-soft transition-opacity duration-200 hover:bg-cream group-hover/photo:opacity-100 focus-visible:opacity-100"
          >
            <Chevron direction="next" isAr={isAr} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5">
            {seeds.map((s, i) => (
              <span
                key={s}
                aria-hidden
                className={cn(
                  "rounded-full transition-all duration-300",
                  i === index
                    ? "h-1.5 w-4 bg-cream"
                    : "h-1.5 w-1.5 bg-cream/60",
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function Chevron({
  direction,
  isAr,
}: {
  direction: "prev" | "next";
  isAr: boolean;
}) {
  // In LTR: prev = points left, next = points right.
  // In RTL: prev = points right, next = points left. (Visual reading order flips.)
  const pointsLeft =
    (direction === "prev" && !isAr) || (direction === "next" && isAr);
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      style={{ transform: pointsLeft ? "scaleX(-1)" : "none" }}
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
