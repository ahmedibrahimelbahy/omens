const ARABIC_INDIC = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"] as const;

/**
 * Convert digits in a value to Arabic-Indic numerals when locale is "ar".
 * Non-digit characters (commas, currency, slashes) pass through untouched.
 */
export function formatNumerals(value: number | string, locale: string): string {
  const str = typeof value === "number" ? String(value) : value;
  if (locale !== "ar") return str;
  return str.replace(/\d/g, (d) => ARABIC_INDIC[Number(d)]);
}

export function formatCurrency(
  amount: number,
  locale: string,
  currency: "EGP" | "USD" = "EGP",
): string {
  const formatted = new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(amount);
  return locale === "ar"
    ? `${formatted} ج.م`
    : `${currency === "EGP" ? "EGP " : "$"}${formatted}`;
}
