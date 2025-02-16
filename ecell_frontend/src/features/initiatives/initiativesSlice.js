import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../config';

export const fetchInitiatives = createAsyncThunk(
  'initiatives/fetchInitiatives',
  async () => {
    const response = await axios.get(`${config.Backend_Api}/api/ecell/initiatives/`);
    return response.data;
  }
);

const initiativesSlice = createSlice({
  name: 'initiatives',
  initialState: {
    initiatives: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitiatives.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInitiatives.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.initiatives = action.payload;
      })
      .addCase(fetchInitiatives.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default initiativesSlice.reducer;