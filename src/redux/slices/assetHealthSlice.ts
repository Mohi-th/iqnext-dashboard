import { createSlice } from '@reduxjs/toolkit';
import type { SliceState, BuildingHealth } from '../../types';
import { fetchAssetHealth } from '../thunks/assetHealthThunk';
const initialState: SliceState<BuildingHealth[]> = { data:null, status:'idle', error:null };
const assetHealthSlice = createSlice({ name:'assetHealth', initialState, reducers:{}, extraReducers:(b)=>{ b.addCase(fetchAssetHealth.pending,(s)=>{s.status='loading';s.error=null;}).addCase(fetchAssetHealth.fulfilled,(s,a)=>{s.status='succeeded';s.data=a.payload;}).addCase(fetchAssetHealth.rejected,(s,a)=>{s.status='failed';s.error=a.error.message??'Error';}); } });
export default assetHealthSlice.reducer;
