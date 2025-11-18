"use client";
import React, { useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const TanstackProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Critical for immediate UI updates
            staleTime: 0,
            gcTime: 1000 * 60 * 1, // 5 minutes cache
            refetchOnWindowFocus: true,
            //  Optimize network behavior
            retry: 3,
            retryDelay: 1000,
            networkMode: "always", // Bypass browser cache
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default TanstackProvider;
