export type PropertyRating = {
  /** 0–5 with one decimal, e.g. 4.8 */
  score: number;
  /** Total reviews informing the score. */
  reviews: number;
};

export type Property = {
  id: string;
  unit: string;
  neighborhoodEn: string;
  neighborhoodAr: string;
  rent: number;
  beds: number;
  baths: number;
  sqm: number;
  /** Multiple deterministic seeds for the photo carousel. First seed is the cover. */
  imageSeeds: string[];
  landlord: {
    name: string;
    nameAr: string;
    trustScore: number;
    verified: boolean;
  };
  highlightsEn: string[];
  highlightsAr: string[];
  rating: PropertyRating;
  /** Optional accent label on the cover — "Newly listed", "Wasal favorite", etc. */
  accentEn?: string;
  accentAr?: string;
};

type Seed = Omit<Property, "imageSeeds"> & { coverSeeds: number };

const SEED: Seed[] = [
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
    highlightsEn: ["Renovated 2024", "5 min to Heliopolis metro", "Built-in kitchen"],
    highlightsAr: ["تجديد ٢٠٢٤", "٥ دقايق من مترو هليوبوليس", "مطبخ راكب"],
    rating: { score: 4.9, reviews: 28 },
    accentEn: "Omens favorite",
    accentAr: "اختيار Omens",
    coverSeeds: 5,
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
    highlightsEn: ["Furnished", "Balcony with garden view", "Pet-friendly"],
    highlightsAr: ["مفروشة", "بلكونة بإطلالة على الحديقة", "بتقبل حيوانات أليفة"],
    rating: { score: 4.7, reviews: 19 },
    coverSeeds: 5,
  },
  {
    id: "h-14-merryland",
    unit: "Apt 14",
    neighborhoodEn: "Heliopolis · Merryland",
    neighborhoodAr: "هليوبوليس · ميري لاند",
    rent: 12500,
    beds: 3,
    baths: 2,
    sqm: 155,
    landlord: { name: "Ashraf K.", nameAr: "أشرف ك.", trustScore: 92, verified: true },
    highlightsEn: ["Park-facing", "Private parking", "Lift + generator"],
    highlightsAr: ["إطلالة على الحديقة", "موقف خاص", "أسانسير + مولد"],
    rating: { score: 4.6, reviews: 14 },
    coverSeeds: 5,
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
    highlightsEn: ["Bright corner unit", "Near AUC bus stop", "Newly painted"],
    highlightsAr: ["شقة ركنية مضيئة", "قريب من موقف باص الجامعة", "دهان جديد"],
    rating: { score: 4.4, reviews: 9 },
    coverSeeds: 4,
  },

  // ─── Maadi ────────────────────────────────────────────────────────────────
  {
    id: "m-2-degla",
    unit: "Apt 2",
    neighborhoodEn: "Maadi · Degla",
    neighborhoodAr: "المعادي · دجلة",
    rent: 9800,
    beds: 2,
    baths: 2,
    sqm: 105,
    landlord: { name: "Nadia H.", nameAr: "نادية ح.", trustScore: 91, verified: true },
    highlightsEn: ["Quiet street", "Walk to Road 9", "Fully furnished"],
    highlightsAr: ["شارع هادي", "مشي لشارع ٩", "مفروشة بالكامل"],
    rating: { score: 4.8, reviews: 23 },
    accentEn: "Newly listed",
    accentAr: "جديد",
    coverSeeds: 5,
  },
  {
    id: "m-7-zahraa",
    unit: "Apt 7",
    neighborhoodEn: "Maadi · Zahraa",
    neighborhoodAr: "المعادي · زهراء",
    rent: 13500,
    beds: 3,
    baths: 2,
    sqm: 165,
    landlord: { name: "Sara M.", nameAr: "سارة م.", trustScore: 94, verified: true },
    highlightsEn: ["Family compound", "Pool access", "AC in every room"],
    highlightsAr: ["كمبوند عائلي", "حمام سباحة", "تكييف في كل غرفة"],
    rating: { score: 4.9, reviews: 31 },
    coverSeeds: 6,
  },
  {
    id: "m-3-cornish",
    unit: "Studio 3",
    neighborhoodEn: "Maadi · Corniche",
    neighborhoodAr: "المعادي · الكورنيش",
    rent: 7800,
    beds: 1,
    baths: 1,
    sqm: 55,
    landlord: { name: "Yousef R.", nameAr: "يوسف ر.", trustScore: 78, verified: true },
    highlightsEn: ["Nile views", "Top floor", "Smart locks"],
    highlightsAr: ["إطلالة على النيل", "آخر دور", "أقفال ذكية"],
    rating: { score: 4.5, reviews: 11 },
    coverSeeds: 4,
  },

  // ─── Zamalek ──────────────────────────────────────────────────────────────
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
    highlightsEn: ["Nile-side building", "Doorman 24/7", "Marble bathrooms"],
    highlightsAr: ["مبنى على النيل", "بواب على مدار الساعة", "حمامات رخام"],
    rating: { score: 4.8, reviews: 41 },
    accentEn: "Most viewed",
    accentAr: "الأكثر مشاهدة",
    coverSeeds: 6,
  },
  {
    id: "z-12-aboufeda",
    unit: "Apt 12",
    neighborhoodEn: "Zamalek · Abou El Feda",
    neighborhoodAr: "الزمالك · أبو الفدا",
    rent: 14500,
    beds: 1,
    baths: 1,
    sqm: 80,
    landlord: { name: "Layla I.", nameAr: "ليلى إ.", trustScore: 90, verified: true },
    highlightsEn: ["Designer interior", "Soundproof windows", "Concierge"],
    highlightsAr: ["تصميم داخلي راقي", "نوافذ عازلة للصوت", "كونسيرج"],
    rating: { score: 4.9, reviews: 17 },
    coverSeeds: 5,
  },

  // ─── New Cairo ────────────────────────────────────────────────────────────
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
    highlightsEn: ["Private garden", "Compound with pool", "Maid's room"],
    highlightsAr: ["حديقة خاصة", "كمبوند فيه حمام سباحة", "غرفة خادمة"],
    rating: { score: 4.6, reviews: 12 },
    coverSeeds: 6,
  },
  {
    id: "nc-7-katameya",
    unit: "Villa 7",
    neighborhoodEn: "New Cairo · Katameya Heights",
    neighborhoodAr: "القاهرة الجديدة · قطامية هايتس",
    rent: 32000,
    beds: 5,
    baths: 4,
    sqm: 380,
    landlord: { name: "Omar A.", nameAr: "عمر أ.", trustScore: 86, verified: true },
    highlightsEn: ["Golf course view", "Two-car garage", "Modern build 2023"],
    highlightsAr: ["إطلالة على ملعب الجولف", "جراج لسيارتين", "بناء حديث ٢٠٢٣"],
    rating: { score: 4.8, reviews: 8 },
    coverSeeds: 6,
  },
  {
    id: "nc-12-rehab",
    unit: "Apt 12",
    neighborhoodEn: "New Cairo · El Rehab",
    neighborhoodAr: "القاهرة الجديدة · الرحاب",
    rent: 11500,
    beds: 3,
    baths: 2,
    sqm: 145,
    landlord: { name: "Dina S.", nameAr: "دينا س.", trustScore: 87, verified: true },
    highlightsEn: ["Compound security", "Walk to El Rehab Mall", "Family-friendly"],
    highlightsAr: ["أمن كمبوند", "مشي لمول الرحاب", "مناسبة للعائلات"],
    rating: { score: 4.7, reviews: 22 },
    coverSeeds: 5,
  },

  // ─── Mohandeseen / Dokki / Downtown ──────────────────────────────────────
  {
    id: "g-1-mohandessin",
    unit: "Apt 1",
    neighborhoodEn: "Mohandeseen",
    neighborhoodAr: "المهندسين",
    rent: 13500,
    beds: 3,
    baths: 2,
    sqm: 130,
    landlord: { name: "Tarek B.", nameAr: "طارق ب.", trustScore: 85, verified: true },
    highlightsEn: ["High floor · 9th", "Two balconies", "Near Sphinx Sq"],
    highlightsAr: ["دور عالي · التاسع", "بلكونتين", "قريب من ميدان سفنكس"],
    rating: { score: 4.6, reviews: 18 },
    coverSeeds: 5,
  },
  {
    id: "g-5-mossadak",
    unit: "Apt 5",
    neighborhoodEn: "Mohandeseen · Mossadak",
    neighborhoodAr: "المهندسين · المسدق",
    rent: 10800,
    beds: 2,
    baths: 2,
    sqm: 115,
    landlord: { name: "Heba F.", nameAr: "هبة ف.", trustScore: 89, verified: true },
    highlightsEn: ["Open-plan living", "Walk to Shooting Club", "Sunlit"],
    highlightsAr: ["تصميم مفتوح", "مشي لنادي الصيد", "إضاءة طبيعية"],
    rating: { score: 4.5, reviews: 13 },
    coverSeeds: 4,
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
    highlightsEn: ["Historic building", "Walk to Tahrir", "High ceilings"],
    highlightsAr: ["مبنى تاريخي", "مشي للتحرير", "أسقف عالية"],
    rating: { score: 4.4, reviews: 16 },
    coverSeeds: 5,
  },
  {
    id: "do-9-gardencity",
    unit: "Studio 9",
    neighborhoodEn: "Downtown · Garden City",
    neighborhoodAr: "وسط البلد · جاردن سيتي",
    rent: 8200,
    beds: 1,
    baths: 1,
    sqm: 65,
    landlord: { name: "Marwan O.", nameAr: "مروان ع.", trustScore: 81, verified: true },
    highlightsEn: ["Tree-lined street", "British-era building", "Renovated kitchen"],
    highlightsAr: ["شارع مظلل بالأشجار", "مبنى من العصر البريطاني", "مطبخ مجدد"],
    rating: { score: 4.6, reviews: 7 },
    coverSeeds: 4,
  },

  // ─── 6 October / Sheikh Zayed ─────────────────────────────────────────────
  {
    id: "oct-2-sodic",
    unit: "Apt 2",
    neighborhoodEn: "6 October · SODIC West",
    neighborhoodAr: "٦ أكتوبر · سوديك ويست",
    rent: 16800,
    beds: 3,
    baths: 2,
    sqm: 175,
    landlord: { name: "Reem N.", nameAr: "ريم ن.", trustScore: 93, verified: true },
    highlightsEn: ["Compound · pools & gym", "Underground parking", "Smart home ready"],
    highlightsAr: ["كمبوند · حمامات سباحة وجيم", "موقف تحت الأرض", "نظام بيت ذكي"],
    rating: { score: 4.8, reviews: 19 },
    coverSeeds: 6,
  },
  {
    id: "shz-3-allegria",
    unit: "Villa 3",
    neighborhoodEn: "Sheikh Zayed · Allegria",
    neighborhoodAr: "الشيخ زايد · أليجريا",
    rent: 28500,
    beds: 4,
    baths: 4,
    sqm: 320,
    landlord: { name: "Khaled M.", nameAr: "خالد م.", trustScore: 84, verified: true },
    highlightsEn: ["Golf course views", "Private garden", "Driver's quarters"],
    highlightsAr: ["إطلالة على ملعب الجولف", "حديقة خاصة", "غرفة سواق"],
    rating: { score: 4.7, reviews: 11 },
    coverSeeds: 6,
  },
];

export const PROPERTIES: Property[] = SEED.map((p) => {
  const { coverSeeds, ...rest } = p;
  return {
    ...rest,
    // Deterministic per-photo seeds — picsum returns a consistent image per seed.
    imageSeeds: Array.from({ length: coverSeeds }, (_, i) => `${p.id}-${i + 1}`),
  };
});

export const NEIGHBORHOODS_EN = Array.from(
  new Set(PROPERTIES.map((p) => p.neighborhoodEn.split(" · ")[0])),
);

export const NEIGHBORHOODS_AR = Array.from(
  new Set(PROPERTIES.map((p) => p.neighborhoodAr.split(" · ")[0])),
);
