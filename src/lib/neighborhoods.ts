import type { Locale } from "@/i18n/routing";

export type PilotPhase = 1 | 2 | 3;

export type Neighborhood = {
  id: string;
  en: string;
  ar: string;
  /**
   * Pilot rollout phase.
   *   1 — live now (summer 2026)
   *   2 — adding late 2026 / early 2027
   *   3 — 2027+
   */
  pilotPhase: PilotPhase;
};

/**
 * Cairo neighborhoods Omens covers, in rollout order.
 * Phase 1 mirrors the Farida vignette and testimonial set
 * (Heliopolis · Maadi · Dokki). Keep this list short enough
 * that "phase 1 only" feels intentional, not under-prepared.
 */
export const neighborhoods: Neighborhood[] = [
  { id: "heliopolis", en: "Heliopolis", ar: "مصر الجديدة", pilotPhase: 1 },
  { id: "maadi", en: "Maadi", ar: "المعادي", pilotPhase: 1 },
  { id: "dokki", en: "Dokki", ar: "الدقي", pilotPhase: 1 },

  { id: "zamalek", en: "Zamalek", ar: "الزمالك", pilotPhase: 2 },
  { id: "new-cairo", en: "New Cairo", ar: "القاهرة الجديدة", pilotPhase: 2 },
  { id: "5th-settlement", en: "5th Settlement", ar: "التجمع الخامس", pilotPhase: 2 },
  { id: "mohandeseen", en: "Mohandeseen", ar: "المهندسين", pilotPhase: 2 },

  { id: "nasr-city", en: "Nasr City", ar: "مدينة نصر", pilotPhase: 3 },
  { id: "6-october", en: "6 October", ar: "٦ أكتوبر", pilotPhase: 3 },
  { id: "sheikh-zayed", en: "Sheikh Zayed", ar: "الشيخ زايد", pilotPhase: 3 },
];

export function neighborhoodLabel(n: Neighborhood, locale: Locale): string {
  return locale === "ar" ? n.ar : n.en;
}

export function neighborhoodsByPhase(phase: PilotPhase): Neighborhood[] {
  return neighborhoods.filter((n) => n.pilotPhase === phase);
}

export function neighborhoodById(id: string): Neighborhood | undefined {
  return neighborhoods.find((n) => n.id === id);
}

export const phaseLabels = {
  en: {
    1: "Live now",
    2: "Coming late 2026",
    3: "Coming 2027",
  },
  ar: {
    1: "متاحة الآن",
    2: "قريباً ٢٠٢٦",
    3: "قريباً ٢٠٢٧",
  },
} as const;
