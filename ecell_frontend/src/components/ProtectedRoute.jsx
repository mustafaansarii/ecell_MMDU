import { useLocation, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const accessToken = localStorage.getItem('access_token');

  // List of protected routes
  const protectedRoutes = ['/eventregister', '/joinecell'];

  // If trying to access protected route without token
  if (protectedRoutes.includes(location.pathname) && !accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute; 