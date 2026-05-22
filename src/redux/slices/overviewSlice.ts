import { createSlice } from '@reduxjs/toolkit';
import type { SliceState, OverviewData } from '../../types';
import { fetchOverview } from '../thunks/overviewThunk';
const initialState: SliceState<OverviewData> = { data:null, status:'idle', error:null };
const overviewSlice = createSlice({ name:'overview', initialState, reducers:{}, extraReducers:(b)=>{ b.addCase(fetchOverview.pending,(s)=>{s.status='loading';s.error=null;}).addCase(fetchOverview.fulfilled,(s,a)=>{s.status='succeeded';s.data=a.payload;}).addCase(fetchOverview.rejected,(s,a)=>{s.status='failed';s.error=a.error.message??'Error';}); } });
export default overviewSlice.reducer;
