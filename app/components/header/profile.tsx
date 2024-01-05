"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useAuthStore } from "@/app/stores/authStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

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
          <Link href={"/jobs"}>
            <Button variant={"ghost"}>Explore Jobs</Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger>{user.fullName}</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem className="cursor-pointer">
                <Link href={`/profile/${user.id}`}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={`/company/owner/${user.id}`}>My Companies</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant={"outline"}
            onClick={() => {
              logout();
              router.push("/login");
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
