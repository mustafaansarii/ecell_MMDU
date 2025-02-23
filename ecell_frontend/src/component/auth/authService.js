import axios from 'axios';
import config from  "../../config"

const API_URL = config.Backend_Api + '/api/auth';

// Send OTP
const sendOTP = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/send-otp/`, { email });
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        throw { status: 400, message: error.response.data.error };
      }
      throw new Error(error.response.data.error || 'Failed to send OTP');
    }
    throw new Error('Error sending OTP');
  }
};

// Signup with OTP
const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup/`, userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        throw { status: 400, message: error.response.data.error };
      }
      throw new Error(error.response.data.error || 'Signup failed');
    }
    throw new Error('Error during signup');
  }
};

// Login
const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login/`, credentials);
    if (response.data) {
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
    }
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 410) {
        throw { status: 410, message: 'Invalid credentials' };
      }
      throw new Error(error.response.data.error || 'Login failed');
    }
    throw new Error('Login failed. Please try again');
  }
};

// Send OTP for forgot password
const sendOTPForgetPass = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/send-otp-forgetpass/`, { email });
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        throw { status: 401, message: error.response.data.error };
      }
      throw new Error(error.response.data.error || 'Failed to send OTP');
    }
    throw new Error('Error sending OTP');
  }
};

// Reset password
const resetPassword = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/forget-password/`, data);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        throw { status: 401, message: error.response.data.error };
      }
      throw new Error(error.response.data.error || 'Password reset failed');
    }
    throw new Error('Error resetting password');
  }
};

// Google OAuth Login
const googleLogin = async (code) => {
  try {
    const response = await axios.post(`${API_URL}/google/login/`, { code });
    if (response.data) {
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
    }
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || 'Google login failed');
    }
    throw new Error('Error during Google login');
  }
};

// Google OAuth Signup
const googleSignup = async (code) => {
  try {
    const response = await axios.post(`${API_URL}/google/signup/`, { code });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || 'Google signup failed');
    }
    throw new Error('Error during Google signup');
  }
};

export { sendOTP, signup, login, sendOTPForgetPass, resetPassword, googleLogin, googleSignup };
