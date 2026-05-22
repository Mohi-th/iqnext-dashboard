import { createAsyncThunk } from '@reduxjs/toolkit';
import { dashboardApi } from '../../api/dashboardApi';
import type { DeviceHealthRecord } from '../../types';
export const fetchAnalytics = createAsyncThunk<DeviceHealthRecord[], boolean | undefined>('analytics/fetchAnalytics', async (simulateError = false) => dashboardApi.fetchAnalytics(simulateError));
