"use client";
import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { Briefcase, FileSearch, Home, Loader2, LucideIcon, Search, User, Waypoints, icons } from "lucide-react";
import { Button } from "../ui/button";
import { TooltipProvider } from "../ui/tooltip";
import DarkModeToggle from "./theme-toggle";
import NavItem, { NavItemType } from "./nav-item";

import { useAuthStore } from "@/app/stores/authStore";
const Profile = dynamic(() => import("./profile"), {
  ssr: false,
  loading: () => <Loader2 strokeWidth={3} className="animate-spin" />,
});

type Props = {
  theme: string;
};

export default function Navbar({ theme }: Props) {
  const links = useMemo<NavItemType[]>(() => {
    return [
      {
        Icon: Home,
        title: "Home",
        href: "/",
      },
      {
        Icon: Briefcase,
        title: "Jobs",
        href: "/jobs",
      },
      {
        Icon: Search,
        title: "Job Recommendations",
        href: "/jobs/recommendations",
      },
    ];
  }, []);

  return (
    <TooltipProvider delayDuration={0}>
      <header
        className="flex flex-row fixed bg-background z-50 shadow-lg top-0 w-full
     h-20 items-center justify-around gap-2 px-20"
      >
        <Button variant={"ghost"} size={"icon"}>
          <Waypoints size={32} strokeWidth={2} absoluteStrokeWidth />
        </Button>
        <div className="flex flex-row items-center justify-center gap-2">
          {links.map((link, i) => (
            <NavItem key={i} Icon={link.Icon} href={link.href} title={link.title} />
          ))}
          <Profile />
        </div>
        <DarkModeToggle theme={theme} />
      </header>
    </TooltipProvider>
  );
}
