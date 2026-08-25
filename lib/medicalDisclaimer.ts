const HEALTH_TOPIC_KEYWORDS = [
  "健康",
  "カロリー",
  "糖質",
  "塩分",
  "脂質",
  "ダイエット",
  "妊娠",
  "妊婦",
  "授乳",
  "栄養",
  "医療",
  "持病",
  "アレルギー",
  "血糖",
  "血圧",
  "コレステロール",
];

export function shouldShowMedicalDisclaimer(...texts: string[]): boolean {
  const combined = texts.join(" ");
  return HEALTH_TOPIC_KEYWORDS.some((keyword) => combined.includes(keyword));
}
