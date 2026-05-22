
export function formatDate(ms: number): string {
  return new Date(ms).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}
export function formatNumber(value: number): string { return value.toLocaleString('en-IN'); }
export function formatPercent(value: number): string { return `${value.toFixed(1)}%`; }
export function formatSqFt(value: number): string { return `${(value / 1000).toFixed(0)}k sqft`; }
export function timeAgo(ms: number): string {
  const d = Math.floor((Date.now() - ms) / 1000);
  if (d < 60) return 'just now';
  if (d < 3600) return `${Math.floor(d / 60)}m ago`;
  if (d < 86400) return `${Math.floor(d / 3600)}h ago`;
  return `${Math.floor(d / 86400)}d ago`;
}
