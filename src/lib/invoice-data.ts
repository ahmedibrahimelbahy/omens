export type InvoiceStatus = "paid" | "scheduled" | "overdue";

export type Invoice = {
  id: string;
  period: { monthEn: string; monthAr: string; year: number };
  issuedAt: string;
  paidAt: string | null;
  dueAt: string;
  status: InvoiceStatus;
  /** Rent in EGP before discount. */
  rent: number;
  /** Discount in EGP (early-pay). */
  discount: number;
  discountPct: number;
  /** Final amount the tenant paid. */
  total: number;
  /** Payment method used (paid invoices). */
  method: string | null;
  /** External reference returned by the payment rail. */
  reference: string | null;
};

export const INVOICES: Invoice[] = [
  {
    id: "OM-INV-2026-05-12-A12",
    period: { monthEn: "May", monthAr: "مايو", year: 2026 },
    issuedAt: "2026-04-21T08:00:00+02:00",
    paidAt: "2026-04-26T11:42:00+02:00",
    dueAt: "2026-05-01T00:00:00+02:00",
    status: "paid",
    rent: 4200,
    discount: 210,
    discountPct: 5,
    total: 3990,
    method: "InstaPay",
    reference: "IPN-7843-9201-EG",
  },
  {
    id: "OM-INV-2026-04-12-A12",
    period: { monthEn: "April", monthAr: "أبريل", year: 2026 },
    issuedAt: "2026-03-22T08:00:00+02:00",
    paidAt: "2026-04-01T09:08:00+02:00",
    dueAt: "2026-04-01T00:00:00+02:00",
    status: "paid",
    rent: 4200,
    discount: 0,
    discountPct: 0,
    total: 4200,
    method: "Vodafone Cash",
    reference: "VFC-2294-1832",
  },
  {
    id: "OM-INV-2026-03-12-A12",
    period: { monthEn: "March", monthAr: "مارس", year: 2026 },
    issuedAt: "2026-02-22T08:00:00+02:00",
    paidAt: "2026-02-27T16:14:00+02:00",
    dueAt: "2026-03-01T00:00:00+02:00",
    status: "paid",
    rent: 4200,
    discount: 84,
    discountPct: 2,
    total: 4116,
    method: "InstaPay",
    reference: "IPN-5510-7732-EG",
  },
  {
    id: "OM-INV-2026-02-12-A12",
    period: { monthEn: "February", monthAr: "فبراير", year: 2026 },
    issuedAt: "2026-01-22T08:00:00+02:00",
    paidAt: "2026-02-01T10:21:00+02:00",
    dueAt: "2026-02-01T00:00:00+02:00",
    status: "paid",
    rent: 4200,
    discount: 0,
    discountPct: 0,
    total: 4200,
    method: "InstaPay",
    reference: "IPN-3187-4422-EG",
  },
  {
    id: "OM-INV-2026-01-12-A12",
    period: { monthEn: "January", monthAr: "يناير", year: 2026 },
    issuedAt: "2025-12-22T08:00:00+02:00",
    paidAt: "2026-01-03T14:55:00+02:00",
    dueAt: "2026-01-01T00:00:00+02:00",
    status: "paid",
    rent: 4200,
    discount: 0,
    discountPct: 0,
    total: 4200,
    method: "Fawry",
    reference: "FWY-9981-2245",
  },
];

export const PROPERTY_FOR_INVOICES = {
  unitEn: "Apartment 12",
  unitAr: "شقة ١٢",
  addressEn: "9 Ismail Mohamed St., Korba, Heliopolis",
  addressAr: "٩ شارع إسماعيل محمد، كوربا، هليوبوليس",
} as const;

export const PARTIES = {
  landlord: {
    name: "Farida Mansour",
    nameAr: "فريدة منصور",
    initials: "FM",
    iban: "EG•• •••• •••• •••• 3429",
  },
  tenant: {
    name: "Mostafa Abdelrahman",
    nameAr: "مصطفى عبدالرحمن",
    initials: "MA",
    whatsapp: "+20 10 9876 5432",
  },
} as const;
