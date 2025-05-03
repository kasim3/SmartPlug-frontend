// AuthRoute.jsx
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // If not logged in, redirect to login
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthRoute;
