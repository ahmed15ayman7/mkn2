export function formatHeroStartPrice(
  value: number | null,
  locale: string,
): string | null {
  if (value === null) return null;
  const amount = new Intl.NumberFormat(locale === "ar" ? "ar-SA" : "en-US", {
    maximumFractionDigits: 0,
  }).format(value);
  return locale === "ar" ? `${amount} ر.س` : `${amount} SAR`;
}

export function formatHeroStartSpace(
  areaSqm: number | null,
  locale: string,
): string | null {
  if (areaSqm === null) return null;
  const amount = new Intl.NumberFormat(locale === "ar" ? "ar-SA" : "en-US", {
    maximumFractionDigits: 0,
  }).format(areaSqm);
  return locale === "ar" ? `${amount} م²` : `${amount} m²`;
}

export function formatHeroDelivery(
  completionDate: Date | null,
  completionLabel: string | null,
  locale: string,
): string | null {
  if (!completionDate) {
    return locale === "ar" ? "تسليم فوري" : "Immediate delivery";
  }
  const now = new Date();
  if (completionDate.getTime() <= now.getTime()) {
    return locale === "ar" ? "تسليم فوري" : "Immediate delivery";
  }
  return completionLabel;
}

export function heroStatLabels(locale: string) {
  if (locale === "ar") {
    return {
      startPrice: "سعر البداية",
      startSpace: "المساحة",
      delivery: "التسليم",
      location: "الموقع",
    };
  }
  return {
    startPrice: "START PRICE",
    startSpace: "START SPACE",
    delivery: "DELIVERY",
    location: "LOCATION",
  };
}
