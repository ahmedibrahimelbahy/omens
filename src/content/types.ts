/**
 * Long-form content schema. Page components import the typed bundle
 * per locale and render against it — no CMS, no markdown parsing.
 */

export type Pillar = {
  id: "payout" | "score" | "takaful";
  title: string;
  body: string;
};

export type HowItWorksStep = {
  index: number;
  title: string;
  body: string;
};

export type Testimonial = {
  quote: string;
  attribution: string;
  role: string;
  neighborhood: string;
};

export type FaridaVignettePanel = {
  caption: string;
  body: string;
};

export type SiteContent = {
  pillars: Pillar[];
  howItWorks: HowItWorksStep[];
  testimonials: Testimonial[];
  vignette: FaridaVignettePanel[];
};
