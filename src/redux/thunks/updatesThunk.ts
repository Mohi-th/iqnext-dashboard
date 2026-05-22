import { createAsyncThunk } from '@reduxjs/toolkit';
import { dashboardApi } from '../../api/dashboardApi';
import type { ProductUpdate } from '../../types';
export const fetchUpdates = createAsyncThunk<ProductUpdate[]>('updates/fetchUpdates', async () => dashboardApi.fetchUpdates());
