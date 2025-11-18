"use client";

import React, { useState } from "react";
// import { Button } from "@/components/ui/button";

interface BlurContainerProps {
  children: React.ReactNode;
}

export function BlurContainer({ children }: BlurContainerProps) {
  const [isBlurred, setIsBlurred] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex justify-end p-4">
        {/* <Button onClick={() => setIsBlurred(!isBlurred)}>
          {isBlurred ? "Unblur" : "Blur"} Page
        </Button> */}
      </div>
      <div
        className={`flex-grow ${
          isBlurred ? "blur-sm" : ""
        } transition-all duration-300`}
      >
        {children}
      </div>
    </div>
  );
}
