"use client";
import React from "react";
import { useAuthStore } from "@/app/stores/authStore";
import { useRouter } from "next/navigation";
import NavItem from "./nav-item";
import { Building, LogOut, User } from "lucide-react";
import PostDialog from "./post-share-dialog";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logout = useAuthStore((state) => state.logout);
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <>
      {isLoggedIn ? (
        <>
          <PostDialog />
          <NavItem title={t("links.profile")} Icon={User} href={`/profile/${user.id}`} />
          <NavItem title={t("links.companies")} Icon={Building} href={`/company/owner/${user.id}`} />
          <Button
            onClick={() => logout()}
            variant={"ghost"}
            className="w-16 h-16 opacity-60 hover:opacity-100"
            size={"icon"}
          >
            <LogOut size={32} />
          </Button>
        </>
      ) : (
        <>
          <NavItem title={t("login/register")} href="/register" Icon={User} />
        </>
      )}
    </>
  );
}
