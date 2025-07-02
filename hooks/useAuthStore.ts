import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AuthData = {
  userId: string;
  accessToken: string;
  expireDate: Date;
};

type AuthStoreType = {
  authData?: AuthData;
  setAuthData: (_authData: AuthData) => void;
};

export const useAuthStore = create<AuthStoreType>()(
  persist(
    (set) => ({
      authData: undefined,
      setAuthData: (authData) => set({ authData }),
    }),
    { name: "auth-store" }
  )
);
