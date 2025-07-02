"use client";

import { useEffect } from "react";
import { useFigmaAuth } from "@/hooks/useFigmaAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/hooks/useAuthStore";
import { useToast } from "@/hooks/useToast";

export default function FigmaOauthCallback() {
  const { toast: showToast } = useToast();
  const { mutate: figmaAuth } = useFigmaAuth();
  const { setAuthData } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    if (code && state) {
      figmaAuth(
        { code, state },
        {
          onSuccess: (data) => {
            if (data?.userId && data?.accessToken && data?.expireDate) {
              setAuthData(data);
              showToast({
                title: "Success",
                description: "Figma account linked successfully.",
              });
            } else {
              showToast({
                title: "Error",
                description: "Token expired.",
                variant: "destructive",
              });
            }
            router.push("/");
          },
          onError: (err) => {
            console.error(err);
            showToast({
              title: "Error",
              description: "Failed to link Figma account.",
              variant: "destructive",
            });
            router.push("/");
          },
        }
      );
    }
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <p>Redirecting...</p>
    </div>
  );
}
