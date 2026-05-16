/**
 * Demo contract — Farida (landlord) ↔ Mostafa (tenant), Apt 12 Heliopolis Korba.
 * Bilingual content for the sample lease shown at /contract.
 */

export const CONTRACT = {
  id: "OM-2026-04-A12",
  signedAt: "2026-04-15T14:32:00+02:00",
  termStart: "2026-05-01",
  termEnd: "2027-04-30",
  parties: {
    landlord: {
      name: "Farida Mansour",
      nameAr: "فريدة منصور",
      otp: "8194",
      signedAt: "2026-04-15T14:08:12+02:00",
      nationalIdMasked: "•••• •••• •••• 3429",
    },
    tenant: {
      name: "Mostafa Abdelrahman",
      nameAr: "مصطفى عبدالرحمن",
      otp: "5712",
      signedAt: "2026-04-15T14:32:00+02:00",
      nationalIdMasked: "•••• •••• •••• 7184",
    },
    guarantor: {
      name: "Omens Trust Holdings — Cairo",
      nameAr: "Omens للأمانة — القاهرة",
      registration: "CRD-2026-001823",
    },
  },
  property: {
    unitEn: "Apartment 12",
    unitAr: "شقة ١٢",
    buildingEn: "9 Ismail Mohamed St., Korba",
    buildingAr: "٩ شارع إسماعيل محمد، كوربا",
    neighborhoodEn: "Heliopolis, Cairo",
    neighborhoodAr: "هليوبوليس، القاهرة",
    sqm: 95,
    beds: 2,
    baths: 1,
  },
  terms: {
    monthlyRent: 4200,
    deposit: 4200,
    dueDay: 1,
    paymentMethods: "InstaPay · Vodafone Cash · Fawry · Bank transfer",
    paymentMethodsAr: "إنستا باي · فودافون كاش · فوري · تحويل بنكي",
    discounts: [
      { daysEarly: 5, pct: 5 },
      { daysEarly: 2, pct: 2 },
      { daysEarly: 0, pct: 1 },
    ],
    noticeMonths: 2,
    omensFeePct: 7,
  },
} as const;

export type Contract = typeof CONTRACT;
