import { Configuration, GeneratedResponse, StepType } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type GlobalFormStoreType = {
  uploadedFiles: File[];
  setUploadedFiles: (files: File[]) => void;
  figmaImages: string[];
  setFigmaImages: (images: string[]) => void;
  configuration: Configuration;
  setConfiguration: (configuration: Configuration) => void;
  generatedResponse: GeneratedResponse | null;
  setGeneratedResponse: (response: GeneratedResponse) => void;
  tokensUsed: number;
  setTokensUsed: (tokens: number) => void;
  resetStore: () => void;
};

const initialState: Pick<
  GlobalFormStoreType,
  | "uploadedFiles"
  | "figmaImages"
  | "configuration"
  | "generatedResponse"
  | "tokensUsed"
> = {
  uploadedFiles: [],
  figmaImages: [],
  configuration: {
    baseFramework: "nextjs",
    enableTailwind: true,
    libraries: {
      ui: "shadcn",
      state: ["zustand"],
      forms: ["react-hook-form"],
    },
    styling: {
      componentSplitting: "moderate",
    },
  },
  generatedResponse: null,
  tokensUsed: 0,
};

export const useGlobalFormStore = create<GlobalFormStoreType>()(
  persist(
    (set) => ({
      ...initialState,
      setUploadedFiles: (files) => set({ uploadedFiles: files }),
      setFigmaImages: (images) =>
        set({ figmaImages: Array.from(new Set(images)) }),
      setConfiguration: (configuration) => set({ configuration }),
      setGeneratedResponse: (response) => set({ generatedResponse: response }),
      setTokensUsed: (tokens) => set({ tokensUsed: tokens }),
      resetStore: () => set({ ...initialState }),
    }),
    { name: "global-form-store" },
  ),
);
