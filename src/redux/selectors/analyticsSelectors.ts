import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../index';
const sel = (s: RootState) => s.analytics;
export const selectAnalyticsData   = createSelector(sel, (s) => s.data);
export const selectAnalyticsStatus = createSelector(sel, (s) => s.status);
export const selectAnalyticsError  = createSelector(sel, (s) => s.error);
export const selectAnalyticsAverages = createSelector(selectAnalyticsData, (data) => {
  if (!data || data.length === 0) return null;
  const avg = (k: 'healthy'|'warning'|'critical') => Math.round(data.reduce((s,d)=>s+d[k],0)/data.length);
  return { healthy: avg('healthy'), warning: avg('warning'), critical: avg('critical') };
});
