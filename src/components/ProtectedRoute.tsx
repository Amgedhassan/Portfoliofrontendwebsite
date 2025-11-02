import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { authStorage } from '../utils/dashboardApi';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  if (!authStorage.isAuthenticated()) {
    return <Navigate to="/dashboard/login" replace />;
  }

  return <>{children}</>;
}
