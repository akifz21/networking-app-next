"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useAuthStore } from "@/app/stores/authStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Profile() {
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();
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
          <Button
            variant={"outline"}
            onClick={() => {
              logout();
              router.push("/");
              toast.success("Logged out. ");
            }}
          >
            Logout
          </Button>
        </>
      )}
    </>
  );
}
