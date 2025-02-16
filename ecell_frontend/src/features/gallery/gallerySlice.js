import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../config';

export const fetchGallery = createAsyncThunk(
  'gallery/fetchGallery',
  async () => {
    const response = await axios.get(`${config.Backend_Api}/api/ecell/gallery/`);
    return response.data;
  }
);

const gallerySlice = createSlice({
  name: 'gallery',
  initialState: {
    galleryItems: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGallery.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGallery.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.galleryItems = action.payload;
      })
      .addCase(fetchGallery.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default gallerySlice.reducer;