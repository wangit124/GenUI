import { useMutation } from "@tanstack/react-query";
import { AuthData } from "./useAuthStore";

export type UseFigmaLoginMutationInput = {
  code: string;
  state: string;
};

export const useFigmaAuth = () => {
  return useMutation({
    mutationKey: ["figma-auth"],
    mutationFn: async ({
      code,
      state,
    }: UseFigmaLoginMutationInput): Promise<AuthData> => {
      const response = await fetch("/api/figma/auth", {
        method: "POST",
        body: JSON.stringify({ code, state }),
      });
      return response.json();
    },
  });
};
