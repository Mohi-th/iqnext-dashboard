import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../index';
const sel = (s: RootState) => s.overview;
export const selectOverviewData   = createSelector(sel, (s) => s.data);
export const selectOverviewStatus = createSelector(sel, (s) => s.status);
export const selectOverviewError  = createSelector(sel, (s) => s.error);
