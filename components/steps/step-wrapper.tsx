"use client";

import { useMemo, useCallback } from "react";
import JSZip from "jszip";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Download, RotateCw } from "lucide-react";
import UploadSection from "@/components/steps/upload-section";
import ConfigSection from "@/components/steps/config-section";
import GenerateSection from "@/components/steps/generate-section";
import ExportSection from "@/components/steps/export-section";
import { StepType } from "@/lib/types";
import { steps } from "@/lib/constants";
import { useStepsStore } from "@/hooks/useStepsStore";
import { cn } from "@/lib/utils";
import { useGlobalFormStore } from "@/hooks/useGlobalFormStore";
import { useToast } from "@/hooks/useToast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function StepWrapper() {
  const { toast: showToast } = useToast();

  const {
    currentStep,
    setCurrentStep,
    completedSteps,
    addCompletedStep,
    resetStore: resetStepsStore,
  } = useStepsStore();

  const currentStepIndex = useMemo(
    () => steps.findIndex((s) => s.id === currentStep),
    [currentStep]
  );

  const { configuration, resetStore, figmaImages, generatedResponse } =
    useGlobalFormStore();

  const clearAll = () => {
    resetStore();
    resetStepsStore();
  };

  const handleStepComplete = useCallback(
    (step: StepType) => {
      if (!completedSteps?.includes(step)) {
        addCompletedStep(step);
      }
    },
    [addCompletedStep, completedSteps]
  );

  const exportFiles = async () => {
    const files = generatedResponse?.files;

    if (!files || files.length === 0) {
      alert("No files to export. Please generate your application first.");
      return;
    }

    try {
      // Create new JSZip instance
      const zip = new JSZip();

      // Add each file to the zip with proper directory structure
      files.forEach((file) => {
        // JSZip automatically creates directories when using paths like "src/components/Button.tsx"
        zip.file(file.fileName, file.code);
      });

      // Generate the zip file
      const zipBlob = await zip.generateAsync({ type: "blob" });

      // Create download link for the zip file
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "new-project.zip";

      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast({
        title: "Success",
        description: "Successfully exported files.",
      });
    } catch (error) {
      console.error("Error creating zip file:", error);
      showToast({
        title: "Error",
        description: "Error creating zip file. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex === steps.length - 1) {
      exportFiles();
      handleStepComplete(currentStep);
      return;
    }
    if (currentStepIndex < steps.length - 1) {
      handleStepComplete(currentStep);
      setCurrentStep(steps[currentStepIndex + 1].id);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1].id);
    }
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case StepType.UPLOAD:
        return Boolean(figmaImages.length > 0);
      case StepType.CONFIG:
        return Boolean(
          configuration?.baseFramework &&
            configuration?.libraries?.ui &&
            configuration?.styling?.componentSplitting
        );
      case StepType.GENERATE:
        return Boolean(generatedResponse?.files?.length);
      default:
        return true;
    }
  };

  const stepContent = useMemo(() => {
    switch (currentStep) {
      case StepType.UPLOAD:
        return <UploadSection />;
      case StepType.CONFIG:
        return <ConfigSection />;
      case StepType.GENERATE:
        return <GenerateSection />;
      case StepType.EXPORT:
        return <ExportSection />;
      default:
        return null;
    }
  }, [currentStep]);

  return (
    <div className="md:container px-6 md:pl-0 md:pr-6 md:py-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <CardTitle className="flex items-center gap-2">
                {steps[currentStepIndex].title}
                <Badge variant="outline">
                  Step {currentStepIndex + 1} of {steps.length}
                </Badge>
              </CardTitle>
              <CardDescription>
                {steps[currentStepIndex].description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {stepContent}
          <div className="flex flex-col items-center justify-between pt-6 border-t">
            <div className="flex items-center justify-between gap-2">
              <div className="text-sm font-medium shrink-0">
                Step {currentStepIndex + 1} of {steps.length}
              </div>
              <div className="flex items-center gap-1">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={cn(
                      "h-2 w-8 rounded-full transition-colors",
                      index <= currentStepIndex
                        ? "bg-primary"
                        : "bg-muted dark:bg-muted/50"
                    )}
                  />
                ))}
              </div>
            </div>
            <div className="flex w-full justify-between items-center mt-4">
              <Button
                variant="outline"
                onClick={handlePrevStep}
                disabled={currentStepIndex === 0}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              <div className="flex items-center gap-2">
                <Button onClick={handleNextStep} disabled={!canProceedToNext()}>
                  {currentStepIndex === steps.length - 1 ? "Export" : "Next"}
                  {currentStepIndex === steps.length - 1 ? (
                    <Download className="h-4 w-4 ml-2" />
                  ) : (
                    <ArrowRight className="h-4 w-4 ml-2" />
                  )}
                </Button>
                {currentStepIndex === steps.length - 1 && (
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button
                          onClick={clearAll}
                          disabled={!completedSteps?.includes(StepType.EXPORT)}
                        >
                          <RotateCw className="h-4 w-4 mr-2" />
                          Restart
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        align="center"
                        title="To limit llm costs, you may only generate once"
                        className="text-center"
                      >
                        To limit LLM costs, you <br /> may only generate once
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
