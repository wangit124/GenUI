import { Configuration } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "./useAuthStore";

export type UseGenerateCodeMutationInput = {
  uploadedFilesBase64: string[];
  figmaImages: string[];
  configuration: Configuration;
};

export const useGenerateCode = () => {
  return useMutation({
    mutationKey: ["generate-code"],
    mutationFn: async (payload: UseGenerateCodeMutationInput) => {
      const headerData = useAuthStore.getState().authData;
      const response = await fetch("/api/generate/code", {
        method: "POST",
        headers: headerData
          ? {
              "x-user-id": headerData.userId,
              "x-figma-access-token": headerData.accessToken,
            }
          : undefined,
        body: JSON.stringify(payload),
      });
      return response.json();
    },
  });
};
