import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../index';
const sel = (s: RootState) => s.assetHealth;
export const selectAssetHealthData   = createSelector(sel, (s) => s.data);
export const selectAssetHealthStatus = createSelector(sel, (s) => s.status);
export const selectAssetHealthError  = createSelector(sel, (s) => s.error);
