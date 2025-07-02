"use client";

import ThemeProvider from "@/providers/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { useAuthCheck } from "@/hooks/useAuthCheck";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  useAuthCheck();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Toaster />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
