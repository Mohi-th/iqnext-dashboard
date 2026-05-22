import { createAsyncThunk } from '@reduxjs/toolkit';
import { dashboardApi } from '../../api/dashboardApi';
import type { MapBuilding } from '../../types';
export const fetchBuildings = createAsyncThunk<MapBuilding[]>('buildings/fetchBuildings', async () => dashboardApi.fetchBuildings());
