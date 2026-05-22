import { createSlice } from '@reduxjs/toolkit';
import type { SliceState, DeviceHealthRecord } from '../../types';
import { fetchAnalytics } from '../thunks/analyticsThunk';
const initialState: SliceState<DeviceHealthRecord[]> = { data:null, status:'idle', error:null };
const analyticsSlice = createSlice({ name:'analytics', initialState, reducers:{}, extraReducers:(b)=>{ b.addCase(fetchAnalytics.pending,(s)=>{s.status='loading';s.error=null;}).addCase(fetchAnalytics.fulfilled,(s,a)=>{s.status='succeeded';s.data=a.payload;}).addCase(fetchAnalytics.rejected,(s,a)=>{s.status='failed';s.error=a.error.message??'Error';}); } });
export default analyticsSlice.reducer;
