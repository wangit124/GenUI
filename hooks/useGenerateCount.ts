import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "./useAuthStore";

export const useGenerateCount = () => {
  return useQuery({
    queryKey: ["generate-count"],
    queryFn: async (): Promise<{ count: number }> => {
      const headerData = useAuthStore.getState().authData;
      const response = await fetch("/api/generate/count", {
        method: "GET",
        headers: headerData
          ? { "x-figma-user-id": headerData.userId }
          : undefined,
      });
      return response.json();
    },
  });
};
