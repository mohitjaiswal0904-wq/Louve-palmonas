export function formatRelativeTime(date: Date, now = new Date()): string {
  const sec = Math.round((now.getTime() - date.getTime()) / 1000);
  if (sec < 60) return "just now";
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h}h ago`;
  return date.toLocaleDateString();
}
