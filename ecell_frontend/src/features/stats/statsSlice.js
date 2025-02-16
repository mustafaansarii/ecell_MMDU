import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../config';

const API_URL = `${config.Backend_Api}/api/ecell/stats/`;

export const fetchStats = createAsyncThunk(
  'stats/fetchStats',
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

const statsSlice = createSlice({
  name: 'stats',
  initialState: {
    stats: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stats = action.payload;
      })
      .addCase(fetchStats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default statsSlice.reducer; 