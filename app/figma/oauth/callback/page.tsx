"use client";

import { useEffect } from "react";
import { useFigmaAuth } from "@/hooks/useFigmaAuth";
import { useSearchParams } from "next/navigation";

export default function FigmaOauthCallback() {
  const { mutate: figmaAuth } = useFigmaAuth();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    if (code && state) {
      console.log({ code, state });
      figmaAuth(
        { code, state },
        {
          onSuccess: (data) => {
            console.log({ data });
          },
        }
      );
    }
  }, []);

  return <div>logging in...</div>;
}
