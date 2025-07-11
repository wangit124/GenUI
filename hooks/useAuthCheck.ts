import { useEffect } from "react";
import { useAuthStore } from "./useAuthStore";

export const useAuthCheck = () => {
  const { authData, logout } = useAuthStore();

  useEffect(() => {
    if (
      authData &&
      (!authData?.expireDate || new Date(authData.expireDate) <= new Date())
    ) {
      logout();
    }
  }, [authData]);
};
