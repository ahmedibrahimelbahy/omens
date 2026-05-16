export type Testimonial = {
  id: string;
  role: "landlord" | "tenant";
  name: string;
  nameAr: string;
  initials: string;
  meta: string;
  metaAr: string;
  quoteEn: string;
  quoteAr: string;
  highlightEn?: string;
  highlightAr?: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "farida",
    role: "landlord",
    name: "Farida Mansour",
    nameAr: "فريدة منصور",
    initials: "FM",
    meta: "4 apartments · Heliopolis · since Jan 2026",
    metaAr: "٤ شقق · هليوبوليس · من يناير ٢٠٢٦",
    quoteEn:
      "Before Omens, the first of every month felt like a second job. Now it just… happens. Rent lands in my wallet on the 1st, and I haven't had to send a chasing message in five months.",
    quoteAr:
      "قبل Omens، يوم ١ في الشهر كان زي شغلانة تانية. دلوقتي بقى بيحصل لوحده. الإيجار بييجي محفظتي في الأول، ومن خمس شهور ما بعتش رسالة تذكير لحد.",
    highlightEn: "Five months · zero chasing messages",
    highlightAr: "٥ شهور · بدون أي رسالة تذكير",
  },
  {
    id: "mostafa",
    role: "tenant",
    name: "Mostafa Abdelrahman",
    nameAr: "مصطفى عبدالرحمن",
    initials: "MA",
    meta: "Tenant · Heliopolis · Omens Score 92",
    metaAr: "مستأجر · هليوبوليس · نقاط Omens ٩٢",
    quoteEn:
      "I pay my rent in one tap. I've saved EGP 840 this year just by paying early. And when I had to extend my lease, my Omens Score got me approved in 24 hours.",
    quoteAr:
      "بدفع إيجاري بضغطة. وفّرت ٨٤٠ ج.م السنة دي بس عشان بدفع بدري. ولما احتجت أمد العقد، نقاطي خلّتني أتوافق عليّ في ٢٤ ساعة.",
    highlightEn: "EGP 840 saved · approved in 24h",
    highlightAr: "وفّر ٨٤٠ ج.م · موافقة في ٢٤ ساعة",
  },
  {
    id: "karim",
    role: "landlord",
    name: "Karim Salem",
    nameAr: "كريم سالم",
    initials: "KS",
    meta: "Zamalek · since Feb 2026",
    metaAr: "الزمالك · من فبراير ٢٠٢٦",
    quoteEn:
      "I owned the same apartment for eight years and had two evictions and a court case. With Omens, the first payment landed before I'd even finished setting up the listing.",
    quoteAr:
      "ملكي للشقة بقاله ٨ سنين، طردت اتنين ودخلت قضية واحدة. مع Omens، أول دفعة وصلتني قبل ما أخلص رفع الإعلان أصلاً.",
  },
  {
    id: "nadia",
    role: "tenant",
    name: "Nadia Hussein",
    nameAr: "نادية حسين",
    initials: "NH",
    meta: "Tenant · Roxy · Omens Score 88",
    metaAr: "مستأجرة · روكسي · نقاط Omens ٨٨",
    quoteEn:
      "Last March I needed a payment plan. With my old landlord that conversation would've been miserable. With Omens it was three taps — Khalas grace, no awkwardness, no score hit.",
    quoteAr:
      "في مارس احتجت خطة دفع. مع المالك القديم بتاعي كان لازم يبقى موقف صعب. مع Omens كانت تلات ضغطات — خَلاص، بدون حرج، بدون تأثير على نقاطي.",
    highlightEn: "Khalas grace · no score hit",
    highlightAr: "خَلاص · بدون تأثير على النقاط",
  },
  {
    id: "hossam",
    role: "landlord",
    name: "Hossam El-Sayed",
    nameAr: "حسام السيد",
    initials: "HE",
    meta: "New Cairo · 3 villas · since Mar 2026",
    metaAr: "القاهرة الجديدة · ٣ فيلات · من مارس ٢٠٢٦",
    quoteEn:
      "The Omens Score is what closed it for me. I can see exactly who I'm renting to, and the bad ones don't even reach my inbox. That alone is worth the 7%.",
    quoteAr:
      "نقاط Omens هي اللي قنعتني. أعرف بالظبط بأجّر لمين، والوحشين أصلاً ما بيوصلوش لإيميلي. ده لوحده يساوي السبعة في المية.",
  },
  {
    id: "yara",
    role: "tenant",
    name: "Yara Fawzy",
    nameAr: "يارا فوزي",
    initials: "YF",
    meta: "Tenant · Downtown · Omens Score 81",
    metaAr: "مستأجرة · وسط البلد · نقاط Omens ٨١",
    quoteEn:
      "I used my Omens Score on a salary loan application last week. The bank officer actually said 'Oh, you're an Omens tenant?' That's the moment I realized this thing has weight.",
    quoteAr:
      "استخدمت نقاطي في طلب قرض شخصي الأسبوع اللي فات. موظف البنك قالي «أنت مستأجر Omens؟» اللحظة دي عرفت إن الموضوع ده بقى ليه ثقل.",
  },
];

export const STATS = {
  landlords: 47,
  tenants: 124,
  monthlyRent: 1_240_000,
  zerLateReceipts: 100,
};
