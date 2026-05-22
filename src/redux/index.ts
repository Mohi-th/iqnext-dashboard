import { configureStore } from '@reduxjs/toolkit';
import overviewReducer from './slices/overviewSlice';
import updatesReducer from './slices/updatesSlice';
import assetHealthReducer from './slices/assetHealthSlice';
import buildingsReducer from './slices/buildingsSlice';
import analyticsReducer from './slices/analyticsSlice';

export const store = configureStore({
  reducer: { overview: overviewReducer, updates: updatesReducer, assetHealth: assetHealthReducer, buildings: buildingsReducer, analytics: analyticsReducer },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
