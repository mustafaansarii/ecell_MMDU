import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../config';

export const fetchCollaborators = createAsyncThunk(
  'collaborators/fetchCollaborators',
  async () => {
    const response = await axios.get(`${config.Backend_Api}/api/ecell/collaborators/`);
    return response.data;
  }
);

const collaboratorsSlice = createSlice({
  name: 'collaborators',
  initialState: {
    collaborators: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollaborators.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCollaborators.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.collaborators = action.payload;
      })
      .addCase(fetchCollaborators.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default collaboratorsSlice.reducer; 