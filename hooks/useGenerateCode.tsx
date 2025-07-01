import { Configuration } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";

export type UseGenerateCodeMutationInput = {
  uploadedFilesBase64: string[];
  figmaImages: string[];
  configuration: Configuration;
};

export const useGenerateCode = () => {
  return useMutation({
    mutationKey: ["generate-code"],
    mutationFn: async (payload: UseGenerateCodeMutationInput) => {
      const response = await fetch("/api/generate/code", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      return response.json();
    },
  });
};
