"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Play,
  RefreshCw,
  CheckCircle,
  Code2,
  Upload,
  Copy,
  Check,
} from "lucide-react";
import { useGlobalFormStore } from "@/hooks/useGlobalFormStore";
import Image from "next/image";
import { useGenerateCode } from "@/hooks/useGenerateCode";
import { useToast } from "@/hooks/useToast";
import { mockGeneratedCodeResponse } from "@/lib/constants";

export default function GenerateSection() {
  const { toast: showToast } = useToast();
  const {
    configuration,
    figmaImages,
    generatedResponse,
    setGeneratedResponse,
    setTokensUsed,
    tokensUsed,
  } = useGlobalFormStore();

  const { mutateAsync: generateCode, isPending: isGenerating } =
    useGenerateCode();

  const [copiedIds, setCopiedIds] = useState<Set<string>>(new Set());

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIds((prev) => new Set(prev).add(id));
      setTimeout(() => {
        setCopiedIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const generateFullApp = async () => {
    try {
      const response = await generateCode({
        configuration,
        figmaImages,
      });
      setGeneratedResponse({
        files: response?.files || mockGeneratedCodeResponse,
      });
      setTokensUsed(response?.tokensUsed || 0);
      showToast({
        title: "Success",
        description: "Your app was successfully generated. Try it out now!",
      });
    } catch (error) {
      console.error(error);
      showToast({
        title: "Error",
        description:
          "Failed to generate code, please try again. Perhaps tokens ran out.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Uploaded Files
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              {figmaImages.map((image, index) => (
                <Card key={index}>
                  <CardContent className="flex justify-between p-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={image}
                        alt={image}
                        width={0}
                        height={0}
                        style={{ width: 150, height: "auto" }}
                      />
                      <p className="text-sm font-medium">{image}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="h-5 w-5" />
            {!!generatedResponse?.files?.length
              ? "Generation Complete"
              : "Ready to Generate"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!!generatedResponse?.files?.length && (
            <div className="space-y-4">
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Code generation completed successfully!{" "}
                  {generatedResponse?.files?.length || 0} files generated.
                  Tokens used: {tokensUsed}
                </AlertDescription>
              </Alert>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                {generatedResponse?.files?.map((component) => (
                  <Card
                    key={component.id}
                    className="group hover:shadow-md transition-shadow"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">
                          {component.fileName}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="relative">
                        <Button
                          size="sm"
                          className="absolute top-2 right-2 z-10"
                          onClick={() =>
                            copyToClipboard(component.code, component.id)
                          }
                        >
                          {copiedIds.has(component.id) ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                        <pre className="bg-muted rounded-md p-4 text-sm overflow-auto h-[300px]">
                          <code className="language-typescript">
                            {component.code}
                          </code>
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
          {!generatedResponse?.files?.length && (
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">
                  {!generatedResponse?.files?.length
                    ? "Ready to Generate"
                    : "Regenerate"}
                </p>
                <p className="text-sm text-muted-foreground">
                  This will create a complete application with your components
                </p>
              </div>
              <Button
                onClick={generateFullApp}
                loading={isGenerating}
                disabled={isGenerating}
                size="lg"
              >
                {!generatedResponse?.files?.length ? (
                  <Play className="h-4 w-4 mr-2" />
                ) : (
                  <RefreshCw className="h-4 w-4 mr-2" />
                )}
                {isGenerating
                  ? "This may take some time..."
                  : !generatedResponse?.files?.length
                    ? "Generate App"
                    : "Regenerate"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
