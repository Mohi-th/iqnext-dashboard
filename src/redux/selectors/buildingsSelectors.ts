import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../index';
const sel = (s: RootState) => s.buildings;
export const selectBuildingsData   = createSelector(sel, (s) => s.data);
export const selectBuildingsStatus = createSelector(sel, (s) => s.status);
export const selectBuildingsError  = createSelector(sel, (s) => s.error);
