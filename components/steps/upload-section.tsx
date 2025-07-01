"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { X, Link } from "lucide-react";
import { useGlobalFormStore } from "@/hooks/useGlobalFormStore";
import { useConvertFigmaFile } from "@/hooks/useConvertFigmaFile";
import { useToast } from "@/hooks/useToast";

export default function UploadSection() {
  const { uploadedFiles, setUploadedFiles, figmaImages, setFigmaImages } =
    useGlobalFormStore();
  const [figmaUrl, setFigmaUrl] = useState("");
  const { mutate: convertFigmaFile, isPending } = useConvertFigmaFile();
  const { toast: showToast } = useToast();

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
  };

  const addFigmaImage = () => {
    convertFigmaFile(
      { figmaUrl },
      {
        onSuccess: (data) => {
          setFigmaImages([...figmaImages, ...(data?.images || [])]);
          setFigmaUrl("");
          showToast({
            title: "Success",
            description: "Figma file converted to image",
            variant: "default",
          });
        },
        onError: () => {
          showToast({
            title: "Error",
            description: "Failed to convert figma image, please try again.",
            variant: "destructive",
          });
        },
      },
    );
  };

  const removeFigmaImage = (image: string) => {
    setFigmaImages(figmaImages.filter((img) => img !== image));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label className="text-base font-medium">Figma Links</Label>
          <p className="text-sm text-muted-foreground">
            Add Figma node urls to extract components
          </p>
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="https://www.figma.com/file/..."
            value={figmaUrl}
            onChange={(e) => setFigmaUrl(e.target.value)}
            disabled={isPending}
            className="flex-1"
          />
          <Button
            onClick={addFigmaImage}
            disabled={!figmaUrl || isPending}
            loading={isPending}
          >
            <Link className="h-4 w-4 mr-2" />
            Add Link
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">
          Uploaded Files ({uploadedFiles.length + figmaImages.length})
        </Label>
        <div className="grid gap-2">
          {uploadedFiles.map((file, index) => (
            <Card key={index}>
              <CardContent className="flex justify-between p-3">
                <div className="flex items-center gap-3">
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    width={0}
                    height={0}
                    style={{ width: 150, height: "auto" }}
                  />
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
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
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFigmaImage(image)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
