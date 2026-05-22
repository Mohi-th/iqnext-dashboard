import { createSlice } from '@reduxjs/toolkit';
import type { SliceState, ProductUpdate } from '../../types';
import { fetchUpdates } from '../thunks/updatesThunk';
const initialState: SliceState<ProductUpdate[]> = { data:null, status:'idle', error:null };
const updatesSlice = createSlice({ name:'updates', initialState, reducers:{}, extraReducers:(b)=>{ b.addCase(fetchUpdates.pending,(s)=>{s.status='loading';s.error=null;}).addCase(fetchUpdates.fulfilled,(s,a)=>{s.status='succeeded';s.data=a.payload;}).addCase(fetchUpdates.rejected,(s,a)=>{s.status='failed';s.error=a.error.message??'Error';}); } });
export default updatesSlice.reducer;
