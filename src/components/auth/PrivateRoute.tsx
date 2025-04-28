// src/components/auth/PrivateRoute.tsx
import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAtom } from 'jotai';
import { isAuthenticatedAtom } from '../../store/authStore';

interface PrivateRouteProps {
    element: ReactElement;
}

const PrivateRoute = ({ element }: PrivateRouteProps) => {
  const location = useLocation();
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return element;
};

export default PrivateRoute;