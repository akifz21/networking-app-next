import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/app/lib/utils";
import Navbar from "./components/navbar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = cookies().get("theme")?.value || "";
  return (
    <html lang="en" className={theme}>
      <body className={cn("min-h-screen bg-background  antialiased", inter.className)}>
        <Navbar theme={theme} />
        <Toaster />
        {children}
      </body>
    </html>
  );
}
