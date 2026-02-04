import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { DataContext } from "../context/DataContext";

export function RequireAuth({ children }) {
  const { loading, isAuthenticated } = useContext(DataContext);
  const location = useLocation();

  if (loading) return null; // or a spinner component

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}

export function RequireRole({ allowed = [], children }) {
  const { loading, role } = useContext(DataContext);

  if (loading) return null;

  // allowed should be lowercase strings like ['owner'] or ['user']
  if (!role) return <Navigate to="/login" replace />;

  return allowed.includes(String(role).toLowerCase()) ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
}

export default null;
