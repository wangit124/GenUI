import { StepType } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type StepsStoreType = {
  currentStep: StepType;
  setCurrentStep: (step: StepType) => void;
  completedSteps: Array<StepType> | null;
  addCompletedStep: (step: StepType) => void;
  resetStore: () => void;
};

export const useStepsStore = create<StepsStoreType>()(
  persist(
    (set) => ({
      currentStep: StepType.UPLOAD,
      setCurrentStep: (step) => set(() => ({ currentStep: step })),
      completedSteps: null,
      addCompletedStep: (step) =>
        set((state) => ({
          completedSteps: Array.from(
            new Set([...(state.completedSteps || []), step]),
          ),
        })),
      resetStore: () =>
        set({ currentStep: StepType.UPLOAD, completedSteps: null }),
    }),
    { name: "steps-store" },
  ),
);
