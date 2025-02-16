import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../auth/authSlice';
import socialMediaReducer from '../features/socialMedia/socialMediaSlice';
import initiativesReducer from '../features/initiatives/initiativesSlice';
import galleryReducer from '../features/gallery/gallerySlice';
import collaboratorsReducer from '../features/collaborators/collaboratorsSlice';
import eventsReducer from '../features/events/eventsSlice';

// Load initial state from localStorage
const preloadedState = {
  auth: {
    user: localStorage.getItem('access_token') ? { token: localStorage.getItem('access_token') } : null,
    loading: false,
    error: null,
    isVerified: false,
  },
  socialMedia: {
    socialLinks: [],
    status: 'idle',
    error: null
  },
  initiatives: {
    initiatives: [],
    status: 'idle',
    error: null
  },
  gallery: {
    galleryItems: [],
    status: 'idle',
    error: null
  },
  collaborators: {
    collaborators: [],
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
    socialMedia: socialMediaReducer,
    initiatives: initiativesReducer,
    gallery: galleryReducer,
    collaborators: collaboratorsReducer,
    events: eventsReducer
  },
  preloadedState
});
