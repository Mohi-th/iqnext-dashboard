import { createAsyncThunk } from '@reduxjs/toolkit';
import { dashboardApi } from '../../api/dashboardApi';
import type { BuildingHealth } from '../../types';
export const fetchAssetHealth = createAsyncThunk<BuildingHealth[]>('assetHealth/fetchAssetHealth', async () => dashboardApi.fetchAssetHealth());
