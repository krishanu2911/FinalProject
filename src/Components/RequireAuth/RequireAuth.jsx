import React from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "Context";

const RequireAuth = ({children}) => {
  const location = useLocation();
  return  localStorage.getItem("supabase.auth.token") ? (
    children
  ) : (
    <Navigate state={{ from: location }} to="/login" replace />
  );
}

export { RequireAuth };