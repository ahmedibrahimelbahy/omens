export type Property = {
  id: string;
  unit: string;
  neighborhoodEn: string;
  neighborhoodAr: string;
  rent: number;
  beds: number;
  baths: number;
  sqm: number;
  imageSeed: string;
  landlord: { name: string; nameAr: string; trustScore: number; verified: boolean };
  highlightsEn: string[];
  highlightsAr: string[];
};

const SEED: Omit<Property, "imageSeed">[] = [
  {
    id: "h-12-korba",
    unit: "Apt 12",
    neighborhoodEn: "Heliopolis · Korba",
    neighborhoodAr: "هليوبوليس · كوربا",
    rent: 8500,
    beds: 2,
    baths: 1,
    sqm: 95,
    landlord: { name: "Farida M.", nameAr: "فريدة م.", trustScore: 96, verified: true },
    highlightsEn: ["Renovated 2024", "5 min to Heliopolis metro"],
    highlightsAr: ["تجديد ٢٠٢٤", "٥ دقايق من مترو هليوبوليس"],
  },
  {
    id: "h-5-roxy",
    unit: "Apt 5",
    neighborhoodEn: "Heliopolis · Roxy",
    neighborhoodAr: "هليوبوليس · روكسي",
    rent: 11200,
    beds: 3,
    baths: 2,
    sqm: 140,
    landlord: { name: "Farida M.", nameAr: "فريدة م.", trustScore: 96, verified: true },
    highlightsEn: ["Furnished", "Balcony with garden view"],
    highlightsAr: ["مفروشة", "بلكونة بإطلالة على الحديقة"],
  },
  {
    id: "z-8-zamalek",
    unit: "Apt 8",
    neighborhoodEn: "Zamalek",
    neighborhoodAr: "الزمالك",
    rent: 18000,
    beds: 2,
    baths: 2,
    sqm: 110,
    landlord: { name: "Karim S.", nameAr: "كريم س.", trustScore: 88, verified: true },
    highlightsEn: ["Nile-side building", "Doorman 24/7"],
    highlightsAr: ["مبنى على النيل", "بواب على مدار الساعة"],
  },
  {
    id: "nc-3-tagamoa",
    unit: "Villa 3",
    neighborhoodEn: "New Cairo · 5th Settlement",
    neighborhoodAr: "القاهرة الجديدة · التجمع الخامس",
    rent: 22500,
    beds: 4,
    baths: 3,
    sqm: 220,
    landlord: { name: "Hossam E.", nameAr: "حسام ا.", trustScore: 79, verified: true },
    highlightsEn: ["Private garden", "Compound with pool"],
    highlightsAr: ["حديقة خاصة", "كمبوند فيه حمام سباحة"],
  },
  {
    id: "m-2-maadi",
    unit: "Apt 2",
    neighborhoodEn: "Maadi · Degla",
    neighborhoodAr: "المعادي · دجلة",
    rent: 9800,
    beds: 2,
    baths: 2,
    sqm: 105,
    landlord: { name: "Nadia H.", nameAr: "نادية ح.", trustScore: 91, verified: true },
    highlightsEn: ["Quiet street", "Walk to Road 9"],
    highlightsAr: ["شارع هادي", "مشي لشارع ٩"],
  },
  {
    id: "h-7-newh",
    unit: "Apt 7",
    neighborhoodEn: "New Heliopolis",
    neighborhoodAr: "هليوبوليس الجديدة",
    rent: 7200,
    beds: 2,
    baths: 1,
    sqm: 85,
    landlord: { name: "Mona A.", nameAr: "منى ع.", trustScore: 82, verified: true },
    highlightsEn: ["Bright corner unit", "Near AUC bus stop"],
    highlightsAr: ["شقة ركنية مضيئة", "قريب من موقف باص الجامعة الأمريكية"],
  },
  {
    id: "g-1-mohandessin",
    unit: "Apt 1",
    neighborhoodEn: "Mohandessin",
    neighborhoodAr: "المهندسين",
    rent: 13500,
    beds: 3,
    baths: 2,
    sqm: 130,
    landlord: { name: "Tarek B.", nameAr: "طارق ب.", trustScore: 85, verified: true },
    highlightsEn: ["High floor · 9th", "Two balconies"],
    highlightsAr: ["دور عالي · التاسع", "بلكونتين"],
  },
  {
    id: "do-4-downtown",
    unit: "Apt 4",
    neighborhoodEn: "Downtown · Talaat Harb",
    neighborhoodAr: "وسط البلد · طلعت حرب",
    rent: 6500,
    beds: 1,
    baths: 1,
    sqm: 70,
    landlord: { name: "Yara F.", nameAr: "يارا ف.", trustScore: 74, verified: true },
    highlightsEn: ["Historic building", "Walk to Tahrir"],
    highlightsAr: ["مبنى تاريخي", "مشي للتحرير"],
  },
];

export const PROPERTIES: Property[] = SEED.map((p) => ({
  ...p,
  // Deterministic Unsplash-style placeholder via picsum seeded by id
  imageSeed: p.id,
}));

export const NEIGHBORHOODS_EN = Array.from(
  new Set(PROPERTIES.map((p) => p.neighborhoodEn.split(" · ")[0])),
);

export const NEIGHBORHOODS_AR = Array.from(
  new Set(PROPERTIES.map((p) => p.neighborhoodAr.split(" · ")[0])),
);
