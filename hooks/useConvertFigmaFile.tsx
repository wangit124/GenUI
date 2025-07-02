import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "./useAuthStore";

export const useConvertFigmaFile = () => {
  return useMutation({
    mutationKey: ["figma-file-to-image"],
    mutationFn: async ({ figmaUrl }: { figmaUrl: string }) => {
      const headerData = useAuthStore.getState().authData;
      const response = await fetch("/api/figma/image", {
        method: "POST",
        headers: headerData
          ? {
              "x-user-id": headerData.userId,
              "x-figma-access-token": headerData.accessToken,
            }
          : undefined,
        body: JSON.stringify({ figmaUrl }),
      });
      return response.json();
    },
  });
};
