const formatter = new Intl.DateTimeFormat("ja-JP", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function formatDateJa(iso: string): string {
  return formatter.format(new Date(iso));
}
