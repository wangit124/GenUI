"use client";

import StepNavigation from "@/components/steps/step-navigation";
import Header from "@/components/header/header";
import StepWrapper from "@/components/steps/step-wrapper";

export default function Root() {
  return (
    <div className="pb-6">
      <Header />
      <div className="flex flex-col md:flex-row">
        <StepNavigation />
        <StepWrapper />
      </div>
    </div>
  );
}
