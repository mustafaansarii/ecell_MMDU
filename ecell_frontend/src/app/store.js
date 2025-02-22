import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../auth/authSlice';
import galleryReducer from '../features/gallery/gallerySlice';
import eventsReducer from '../features/events/eventsSlice';

// Load initial state from localStorage
const preloadedState = {
  auth: {
    user: localStorage.getItem('access_token') ? { token: localStorage.getItem('access_token') } : null,
    loading: false,
    error: null,
    isVerified: false,
  },
  gallery: {
    galleryItems: [],
    status: 'idle',
    error: null
  },
  events: {
    events: [],
    status: 'idle',
    error: null
  }
};

export default configureStore({
  reducer: {
    auth: authReducer,
    gallery: galleryReducer,
    events: eventsReducer
  },
  preloadedState
});
