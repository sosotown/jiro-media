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

/**
 * 記事タイトル・本文に健康関連の話題が含まれるかを簡易判定する。
 * 該当する場合、記事フッターに医療的助言でない旨の注記を表示する。
 */
export function shouldShowMedicalDisclaimer(...texts: string[]): boolean {
  const combined = texts.join(" ");
  return HEALTH_TOPIC_KEYWORDS.some((keyword) => combined.includes(keyword));
}
