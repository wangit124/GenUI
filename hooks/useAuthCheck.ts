import { useEffect } from "react";
import { useAuthStore } from "./useAuthStore";

export const useAuthCheck = () => {
  const { authData, setAuthData } = useAuthStore();
  useEffect(() => {
    if (
      authData &&
      (!authData?.expireDate || authData.expireDate >= new Date())
    ) {
      setAuthData(undefined);
    }
  }, [authData]);
};
