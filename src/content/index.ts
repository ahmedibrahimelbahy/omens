import type { Locale } from "@/i18n/routing";
import type { SiteContent } from "./types";
import { en } from "./en";
import { ar } from "./ar";

const bundles: Record<Locale, SiteContent> = { en, ar };

export function getContent(locale: Locale): SiteContent {
  return bundles[locale];
}

export type { SiteContent } from "./types";
