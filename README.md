# Omens

Rent guaranteed. Trust earned.

A bilingual (English / Arabic) marketing site and interactive product demo for
**Omens**, a rent-guarantee service for small landlords in Cairo. We pay
landlords on the first of every month — even if their tenant hasn't paid us
yet. Every payment becomes a portable signal of trust.

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) · React 19 · TypeScript |
| Styles | Tailwind v4 (CSS-first tokens in `globals.css`) |
| i18n | `next-intl` 4 — locales `en` + `ar`, full RTL flip |
| Type | Fraunces (display, en) · Inter (body, en) · IBM Plex Sans Arabic (ar) |
| Storage | SQLite via `better-sqlite3` (waitlist — milestone 4) |
| Motion | CSS keyframes for foundation work · `framer-motion` reserved for the demo |
| Deploy | Vercel |

---

## Local development

```bash
npm install
npm run dev           # http://localhost:3000  → redirects to /en
```

Open `http://localhost:3000/en` or `http://localhost:3000/ar` to inspect each
locale. The Arabic page mirrors entirely; `dir="rtl"` is set on `<html>` so
all logical Tailwind classes flip naturally.

Production build:

```bash
npm run build
npm run start
```

Lint:

```bash
npm run lint
```

---

## Project layout

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx        ← fonts, html dir, NextIntlClientProvider
│   │   └── page.tsx          ← foundation page (hero + design system showcase)
│   ├── globals.css           ← design tokens · type scale · motion
│   └── layout.tsx
├── components/
│   ├── logo.tsx              ← Omens — compass-star mark + Fraunces wordmark
│   ├── locale-switch.tsx     ← EN ⇄ AR toggle
│   └── ui/
│       ├── button.tsx
│       └── container.tsx
├── content/
│   ├── types.ts              ← typed content contracts (SiteContent)
│   ├── en/index.ts           ← English pillars · vignette · testimonials
│   ├── ar/index.ts           ← Arabic mirror (native, not auto-translated)
│   └── index.ts              ← getContent(locale)
├── i18n/
│   ├── routing.ts            ← locales · localeMeta · dir
│   ├── navigation.ts         ← Link · usePathname · useRouter
│   └── request.ts            ← server-side message loader
├── lib/
│   ├── cn.ts                 ← clsx + tailwind-merge
│   └── numerals.ts           ← Arabic-Indic digits · EGP currency formatter
└── proxy.ts                  ← next-intl locale routing (Next 16 proxy convention)
messages/
├── en.json                   ← short UI strings (nav, hero, system, footer, …)
└── ar.json
```

### How to add or edit content

Two surfaces, depending on length:

- **Short UI strings** (nav, buttons, eyebrow labels) live in
  `messages/{en,ar}.json`. Reference them in components via
  `useTranslations("namespace")` (client) or `getTranslations("namespace")`
  (server). Both files must stay in lockstep — a key in `en.json` without a
  counterpart in `ar.json` will throw at request time.
- **Long-form content** (pillars, testimonials, the Farida vignette) lives in
  `src/content/{en,ar}/index.ts`. Both bundles must satisfy the
  `SiteContent` type in `src/content/types.ts` — TypeScript will refuse the
  build if a field is missing.

To pull the right bundle in a server component:

```ts
import { getLocale } from "next-intl/server";
import { getContent } from "@/content";
import type { Locale } from "@/i18n/routing";

const locale = (await getLocale()) as Locale;
const { pillars, vignette } = getContent(locale);
```

Arabic copy is hand-written in Egyptian-leaning standard Arabic — please
do not run it through a translator when editing. The brand voice is calm and
dignified; favor a confident sentence over a clever one. The brand name
**Omens** stays in Latin script inside Arabic copy, the way Egyptian brands
like Halan, Khazna, or MNT-Halan handle their wordmarks.

---

## Numerals

When `locale === "ar"`, integers should render in Arabic-Indic numerals
(`٠١٢٣٤٥٦٧٨٩`). Use the helper:

```ts
import { formatNumerals, formatCurrency } from "@/lib/numerals";

formatNumerals("18,400", "ar");     // "١٨,٤٠٠"
formatCurrency(18_400, "ar");       // "18,400 ج.م"
formatCurrency(18_400, "en");       // "EGP 18,400"
```

---

## Design system

Tokens are declared once in `src/app/globals.css` as CSS custom properties
and exposed to Tailwind through the `@theme inline` block, so the same
palette is available as utilities (`bg-ink`, `text-gold-deep`) and as
variables (`var(--ink)`).

| Token | Value | Use |
| --- | --- | --- |
| `--gold` | `#C9A961` | Primary accent — use sparingly |
| `--ink` | `#0D2240` | Body & headlines |
| `--cream` | `#FDF8F3` | Base paper surface |
| `--received` | `#10B981` | Only for the "omen received" moment |
| `--muted` | `#8A8378` | Quiet metadata, captions |

Editorial type scale: `text-display`, `text-h1` → `text-h4`, `text-lede`,
`text-eyebrow`. The display faces (Fraunces italic for Latin, Plex Arabic
for Arabic) swap automatically based on `html[lang]`.

Motion is intentional and quiet: `fade-rise` for page-load staggers, only
`transform` and `opacity` animations, spring-style easing
(`cubic-bezier(0.16, 1, 0.3, 1)`).

The **Omens mark** is a slender compass-star with one elongated north
point — guidance, foresight, the signal you read before acting. It sits to
the right of the wordmark in Arabic layouts so the lockup reads correctly
in RTL flow.

---

## Deploying to Vercel

1. Push to GitHub.
2. `vercel` → link the repo.
3. Set environment variables (see below) in the Vercel project settings.
4. Subsequent pushes to `main` auto-deploy; preview URLs land on every PR.

The SQLite file used by the waitlist (milestone 4) is **ephemeral on Vercel** —
every redeploy resets it. We mirror every signup to a webhook so nothing is
lost; see the env vars below.

---

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `WAITLIST_WEBHOOK_URL` | Recommended (prod) | Every waitlist signup is POSTed here as JSON in addition to the SQLite write, so signups survive Vercel redeploys. Use a Zapier / Make / n8n catch hook. |
| `ADMIN_PASSWORD` | Required for `/admin/waitlist` | Single-password gate on the admin view that lists current signups. Set to a long random string in production. |

Copy `.env.example` (when added in milestone 4) to `.env.local` for local
development. Do **not** commit `.env.local`.

---

## Viewing the waitlist *(coming in milestone 4)*

`/admin/waitlist` — protected by `ADMIN_PASSWORD`. Lists signups in a table
with name, WhatsApp number, neighborhood, and unit count. Export-to-CSV
button included. Until that ships, signups can be inspected by querying
the local `omens.db` file directly.

---

## Roadmap

1. **Milestone 1 — Foundation** *(current)* — scaffold, design system, i18n
   plumbing, locale-aware home preview.
2. **Milestone 2 — Landing page** — full hero, Farida vignette, how-it-works,
   three-pillars section, pricing, waitlist form, footer. English first, then
   Arabic mirror.
3. **Milestone 3 — Demo** — landlord dashboard, tenant WhatsApp thread,
   Omens Score profile. All client-side state.
4. **Milestone 4 — Story + waitlist backend** — `/story`, SQLite persistence,
   webhook mirror, `/admin/waitlist` admin view.
5. **Milestone 5 — Polish** — animation refinement, micro-copy, accessibility,
   Lighthouse mobile ≥ 90 across all four categories.

---

## Brand notes

- **Voice:** calm, confident, dignified. Closer to a trusted neighborhood
  institution than a fintech startup. Avoid "disruptive," "AI-powered,"
  "revolutionary."
- **The word *amana*** (أمانة — trust as sacred duty) is used **once**, in the
  footer, never as a marketing slogan.
- **The omen received moment** — green (`--received`) is reserved for the
  single visual beat when a landlord sees their rent has arrived. Don't
  dilute it by using it elsewhere.
- **Numerals on `ar`:** always Arabic-Indic. Currency: `ج.م` on `ar`, `EGP`
  on `en`. Phone numbers stick to Latin digits even on `ar` (universal
  convention).
- **Collection agents** are described warmly — never "debt collectors."
- Dispute resolution is handled by a three-person *majlis*, framed as a
  cultural feature, not a customer-support pipeline.
