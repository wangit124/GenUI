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
};

export const useGlobalFormStore = create<GlobalFormStoreType>()(
  persist(
    (set) => ({
      uploadedFiles: [],
      setUploadedFiles: (files) => set({ uploadedFiles: files }),
      figmaImages: [],
      setFigmaImages: (images) =>
        set({ figmaImages: Array.from(new Set(images)) }),
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
      setConfiguration: (configuration) => set({ configuration }),
      generatedResponse: null,
      setGeneratedResponse: (response) => set({ generatedResponse: response }),
    }),
    { name: "global-form-store" }
  )
);
