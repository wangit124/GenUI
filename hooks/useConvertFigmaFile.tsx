import { useMutation } from "@tanstack/react-query";

export const useConvertFigmaFile = () => {
  return useMutation({
    mutationKey: ["convert-figma-file-to-image"],
    mutationFn: async ({ figmaUrl }: { figmaUrl: string }) => {
      const response = await fetch("/api/figma/image", {
        method: "POST",
        body: JSON.stringify({ figmaUrl }),
      });
      return response.json();
    },
  });
};
