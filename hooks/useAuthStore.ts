import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useStepsStore } from "./useStepsStore";
import { useGlobalFormStore } from "./useGlobalFormStore";

export type AuthData = {
  userId: string;
  accessToken: string;
  expireDate: Date;
};

type AuthStoreType = {
  authData?: AuthData;
  setAuthData: (_authData: AuthData | undefined) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStoreType>()(
  persist(
    (set) => ({
      authData: undefined,
      setAuthData: (authData) => set({ authData }),
      logout: () => {
        useStepsStore.getState().resetStore();
        useGlobalFormStore.getState().resetStore();
        set({ authData: undefined });
      },
    }),
    { name: "auth-store" }
  )
);
