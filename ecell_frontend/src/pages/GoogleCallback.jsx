import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../auth/authSlice';
import toast from 'react-hot-toast';

const GoogleCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const accessToken = queryParams.get('access');
    const refreshToken = queryParams.get('refresh');
    const userData = {
      id: queryParams.get('user_id'),
      email: queryParams.get('email'),
      full_name: queryParams.get('full_name'),
      is_active: queryParams.get('is_active') === 'true',
      is_verified: queryParams.get('is_verified') === 'true'
    };

    if (accessToken && refreshToken && userData.id) {
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);

      dispatch(setUser(userData));

      toast.success('Login successful!');

      navigate('/');
    } else {
      toast.error('Google login failed');
      navigate('/login');
    }
  }, [location, navigate, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Logging in with Google...</p>
      </div>
    </div>
  );
};

export default GoogleCallback; 