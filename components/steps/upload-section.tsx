"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { X, Link, Figma } from "lucide-react";
import { useGlobalFormStore } from "@/hooks/useGlobalFormStore";
import { useConvertFigmaFile } from "@/hooks/useConvertFigmaFile";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/hooks/useAuthStore";
import { MAX_FILE_COUNT } from "@/lib/constants";

export default function UploadSection() {
  const { authData, logout } = useAuthStore();
  const { figmaImages, setFigmaImages } = useGlobalFormStore();
  const [figmaUrl, setFigmaUrl] = useState("");
  const { mutate: convertFigmaFile, isPending } = useConvertFigmaFile();
  const { toast: showToast } = useToast();
  const router = useRouter();

  const addFile = () => {
    if (figmaImages.length >= MAX_FILE_COUNT) {
      showToast({
        title: "Max file limit reached",
        description: `You can upload a maximum of ${MAX_FILE_COUNT} figma files.`,
        variant: "destructive",
      });
      return;
    }
    convertFigmaFile(
      { figmaUrl },
      {
        onSuccess: (data) => {
          setFigmaImages([...figmaImages, ...(data?.images || [])]);
          setFigmaUrl("");
          showToast({
            title: "Success",
            description: "Figma file converted to image.",
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
      }
    );
  };

  const removeFigmaImage = (image: string) => {
    setFigmaImages(figmaImages.filter((img) => img !== image));
  };

  const linkFigmaAccount = () => {
    router.push("/api/figma/auth");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-base font-medium">Figma Links</Label>
          <p className="text-sm text-muted-foreground">
            Add Figma node URLs to extract components
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-2">
          <Input
            placeholder="Ex: https://www.figma.com/design/{file_id}/{file_name}?node-id={node-ids}"
            value={figmaUrl}
            onChange={(e) => setFigmaUrl(e.target.value)}
            disabled={isPending || !authData}
            className="flex-1"
          />
          {!authData ? (
            <Button onClick={linkFigmaAccount}>
              <Figma className="h-4 w-4 mr-2" />
              Link Figma Account
            </Button>
          ) : (
            <>
              <Button
                onClick={addFile}
                disabled={!figmaUrl || isPending}
                loading={isPending}
              >
                <Link className="h-4 w-4 mr-2" />
                Add Design
              </Button>
              <Button onClick={logout}>
                <X className="h-4 w-4 mr-2" />
                Unlink Figma
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label className="text-base font-medium">
          Uploaded Files ({figmaImages.length})
        </Label>
        <p className="text-sm text-muted-foreground">
          Maximum {MAX_FILE_COUNT} files
        </p>
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
