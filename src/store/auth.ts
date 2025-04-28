// src/store/auth.ts
import { atom, selector } from 'recoil';
import { AuthState, User } from '../types/auth';

export const authState = atom<AuthState>({
  key: 'authState',
  default: {
    token: localStorage.getItem('authToken') || null,
    user: JSON.parse(localStorage.getItem('user') || 'null') as User | null,
    isAuthenticated: Boolean(localStorage.getItem('authToken')),
  },
});

export const isAuthenticatedSelector = selector<boolean>({
  key: 'isAuthenticatedSelector',
  get: ({ get }) => get(authState).isAuthenticated,
});