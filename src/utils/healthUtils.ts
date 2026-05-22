
import { HEALTH_THRESHOLDS } from '../constants/ui';
export type HealthLevel = 'good' | 'moderate' | 'critical';
export function getHealthLevel(score: number): HealthLevel {
  if (score >= HEALTH_THRESHOLDS.good) return 'good';
  if (score >= HEALTH_THRESHOLDS.moderate) return 'moderate';
  return 'critical';
}
export function getHealthColor(score: number): string {
  const l = getHealthLevel(score);
  return l === 'good' ? '#16a34a' : l === 'moderate' ? '#d97706' : '#dc2626';
}
export function getHealthTailwindText(score: number): string {
  const l = getHealthLevel(score);
  return l === 'good' ? 'text-green-400' : l === 'moderate' ? 'text-amber-400' : 'text-red-400';
}
export function getHealthTailwindBg(score: number): string {
  const l = getHealthLevel(score);
  return l === 'good' ? 'bg-green-900/30 border-green-700' : l === 'moderate' ? 'bg-amber-900/30 border-amber-700' : 'bg-red-900/30 border-red-700';
}
export function calcAssetTotals(floors: { assets: { healthy: number; warning: number; critical: number } }[]) {
  return floors.reduce((acc, f) => ({ healthy: acc.healthy + f.assets.healthy, warning: acc.warning + f.assets.warning, critical: acc.critical + f.assets.critical }), { healthy: 0, warning: 0, critical: 0 });
}
