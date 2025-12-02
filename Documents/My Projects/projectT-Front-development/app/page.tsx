"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

const MicrosoftLogo = () => (
  <span className="grid grid-cols-2 grid-rows-2 gap-[2px] h-5 w-5">
    <span className="bg-[#F25022]" />
    <span className="bg-[#7FBA00]" />
    <span className="bg-[#00A4EF]" />
    <span className="bg-[#FFB900]" />
  </span>
);

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const microsoftSignInUrl = "/api/auth/microsoft";

  const handleMicrosoftSignIn = () => {
    setIsLoading(true);
    try {
      // Hard redirect to avoid client routing issues.
      window.location.assign(microsoftSignInUrl);
    } catch (error) {
      console.error("Microsoft sign-in failed to start:", error);
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#f5f7fb] via-white to-[#eef2ff] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/login.png')",
      }}
    >
      <div className="min-h-screen flex bg-white/60 backdrop-blur-sm">
        {/* Left side - Login Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-10">
          <div className="w-full max-w-[620px] bg-white shadow-2xl border border-gray-100 rounded-3xl py-12 px-10 space-y-8">
            <div className="space-y-3 text-center">
              <h1 className="text-[32px] leading-tight font-ubuntu font-semibold text-[#0f172a] text-balance">
                Welcome to E-Stock
              </h1>
              <p className="text-[17px] text-gray-700 font-poppins">
                Sign in with your official Microsoft account
              </p>
            </div>

            <div className="space-y-6">
              <Button
                type="button"
                onClick={handleMicrosoftSignIn}
                className="w-full h-12 bg-[#1A225D] hover:bg-[#111844] text-white rounded-full text-sm font-semibold flex items-center justify-center gap-2"
                disabled={isLoading}
                asChild
              >
                <a href={microsoftSignInUrl}>
                  <span className="flex items-center gap-2">
                    <MicrosoftLogo />
                    {isLoading ? "Signing in..." : "Sign in with Microsoft"}
                  </span>
                </a>
              </Button>
              <p className="text-center text-sm text-gray-700 font-poppins">
                You'll be redirected to Microsoft to continue signing in.
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Marketing Content */}
        <div className="hidden lg:flex flex-1 items-center justify-start px-8 xl:px-16">
          <div className="max-w-md space-y-8">
            <div className="space-y-6">
              <h2 className="text-[40px] font-ubuntu font-[500] text-primaryDarkText leading-tight text-balance mb-11">
                Solution For The
                <br />
                Registrars Industry
              </h2>
              <p className="font-ubuntu text-primaryDarkText font-[500] text-nowrap text-xl sm:text-2xl lg:text-xl xl:text-2xl">
                {"Manage clients' shareholder data and many more"}
              </p>
            </div>

            <div className="space-y-3 flex flex-col gap-4">
              {[
                "Seamless Setup & Control",
                "Efficient Processes",
                "Powerful Enquiries",
                "Insightful Reporting",
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-2 h-2 text-white stroke-[3]" />
                  </div>
                  <span className="text-textBlack font-poppins font-[400] text-[18px]">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
