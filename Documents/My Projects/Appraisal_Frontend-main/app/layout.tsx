import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";

//import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

import TanstackProvider from "@/lib/TanstackProvider/TanstackProvider";
import RoleGuard from "@/components/auth/RoleGuard";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "FRIS-HR",
  description: "FRIS HR PORTAL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MantineProvider>
          <TanstackProvider> {children}</TanstackProvider>
        </MantineProvider>
        <Toaster />
      </body>
    </html>
  );
}
