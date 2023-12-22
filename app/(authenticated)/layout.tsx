"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "../stores/authStore";
import { useEffect } from "react";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const router = useRouter();
  useEffect(() => {
    if (isLoggedIn === false) {
      router.push("/login");
    }
  }, [isLoggedIn]);
  return <div className="flex justify-center w-full">{children}</div>;
}
