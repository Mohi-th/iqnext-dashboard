import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../index';
const sel = (s: RootState) => s.updates;
export const selectUpdatesData   = createSelector(sel, (s) => s.data);
export const selectUpdatesStatus = createSelector(sel, (s) => s.status);
export const selectUpdatesError  = createSelector(sel, (s) => s.error);
