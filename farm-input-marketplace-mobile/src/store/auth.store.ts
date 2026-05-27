import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';

import { setAuthToken } from '@/api/client';
import type { AuthUser } from '@/types/auth';

const TOKEN_KEY = 'farm_input_marketplace_access_token';

type AuthState = {
  token?: string;
  user?: AuthUser;
  setSession: (token: string, user: AuthUser) => Promise<void>;
  clearSession: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: undefined,
  user: undefined,
  setSession: async (token, user) => {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    setAuthToken(token);
    set({ token, user });
  },
  clearSession: async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    setAuthToken(undefined);
    set({ token: undefined, user: undefined });
  },
}));
