// src/routes/GuestRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface GuestRouteProps {
  children: React.ReactElement;
}

const GuestRoute: React.FC<GuestRouteProps> = ({ children }) => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/" replace />; // Or wherever you want to redirect after login
  }
  return children;
};

export default GuestRoute;
