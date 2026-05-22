import { createSlice } from '@reduxjs/toolkit';
import type { SliceState, MapBuilding } from '../../types';
import { fetchBuildings } from '../thunks/buildingsThunk';
const initialState: SliceState<MapBuilding[]> = { data:null, status:'idle', error:null };
const buildingsSlice = createSlice({ name:'buildings', initialState, reducers:{}, extraReducers:(b)=>{ b.addCase(fetchBuildings.pending,(s)=>{s.status='loading';s.error=null;}).addCase(fetchBuildings.fulfilled,(s,a)=>{s.status='succeeded';s.data=a.payload;}).addCase(fetchBuildings.rejected,(s,a)=>{s.status='failed';s.error=a.error.message??'Error';}); } });
export default buildingsSlice.reducer;
