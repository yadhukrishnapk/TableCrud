// src/hooks/useAuth.ts
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAtom } from 'jotai';
import { authAtom, isAuthenticatedAtom } from '../store/authStore';
import { AuthState, User } from '../types/auth';

export const useAuth = () => {
  const [auth, setAuth] = useAtom(authAtom);
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');

    if (token && user) {
      const parsedUser: User = JSON.parse(user);
      setAuth({ token, user: parsedUser });
      if (location.pathname === '/login') {
        navigate('/', { replace: true });
      }
    } else if (!token && location.pathname !== '/login') {
      setAuth({ token: null, user: null });
      navigate('/login', { replace: true });
    }
  }, [setAuth, navigate, location.pathname]);

  return { isAuthenticated };
};