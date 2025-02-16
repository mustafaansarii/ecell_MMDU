import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../config';

export const fetchSocialMedia = createAsyncThunk(
  'socialMedia/fetchSocialMedia',
  async () => {
    const response = await axios.get(`${config.Backend_Api}/api/ecell/social-media/`);
    return response.data;
  }
);

const socialMediaSlice = createSlice({
  name: 'socialMedia',
  initialState: {
    socialLinks: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSocialMedia.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSocialMedia.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.socialLinks = action.payload;
      })
      .addCase(fetchSocialMedia.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default socialMediaSlice.reducer; 