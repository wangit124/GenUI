"use client";

import StepNavigation from "@/components/steps/step-navigation";
import Header from "@/components/header/header";
import StepWrapper from "@/components/steps/step-wrapper";
import { Toaster } from "@/components/ui/toaster";

export default function Root() {
  return (
    <div>
      <Header />
      <div className="flex">
        <StepNavigation />
        <StepWrapper />
      </div>
      <Toaster />
    </div>
  );
}
