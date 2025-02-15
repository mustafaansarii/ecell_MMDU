import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../auth/authSlice';

// Load initial state from localStorage
const preloadedState = {
  auth: {
    user: localStorage.getItem('access_token') ? { token: localStorage.getItem('access_token') } : null,
    loading: false,
    error: null,
    isVerified: false,
  }
};

export default configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState
});
