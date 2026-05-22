import { createAsyncThunk } from '@reduxjs/toolkit';
import { dashboardApi } from '../../api/dashboardApi';
import type { OverviewData } from '../../types';
export const fetchOverview = createAsyncThunk<OverviewData>('overview/fetchOverview', async () => dashboardApi.fetchOverview());
