// app/auth-callback/page.tsx
"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    // Reserved for future Firebase-based post-auth routing if needed
  }, []);

  return (
    <div className="grid h-screen place-items-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Setting up your session</h1>
        <p className="mt-2 text-gray-500">
          Redirecting you to the correct dashboard...
        </p>
      </div>
    </div>
  );
}
