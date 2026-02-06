import React ,{useContext} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useData } from './DataContext'; // Adjust path as needed

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, role, loading } = useData();

  if (loading) return <div>Loading...</div>; // Prevent redirect while checking session

  // If not logged in, send them to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If role is required but doesn't match, send to home or unauthorized page
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  // If everything is fine, render the child component (Outlet)
  return <Outlet />;
};

export default ProtectedRoute;