"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useAuthStore } from "@/app/stores/authStore";

export default function Profile() {
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  return (
    <>
      {!isLoggedIn ? (
        <>
          <Link href={"/login"}>
            <Button>Login</Button>
          </Link>
          <Link href={"/register"}>
            <Button variant={"outline"}>Register</Button>
          </Link>
        </>
      ) : (
        <>
          <p>{user.fullName}</p>
        </>
      )}
    </>
  );
}
