// src/store/authStore.ts
import { atom } from 'jotai';
import { AuthState, User } from '../types/auth';

export const tokenAtom = atom<string | null>(null);
export const userAtom = atom<User | null>(null);
export const isAuthenticatedAtom = atom<boolean>(false);

export const authAtom = atom(
  (get): AuthState => ({
    token: get(tokenAtom),
    user: get(userAtom),
    isAuthenticated: get(isAuthenticatedAtom),
  }),
  (_, set, update: Partial<AuthState> | { token: null; user: null }): void => {
    if (
      'token' in update &&
      'user' in update &&
      update.token &&
      update.user
    ) {
      set(tokenAtom, update.token);
      set(userAtom, update.user);
      set(isAuthenticatedAtom, true);
    } else {
      set(tokenAtom, null);
      set(userAtom, null);
      set(isAuthenticatedAtom, false);
    }
  },
);