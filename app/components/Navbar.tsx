import React from "react";
import { Button } from "./ui/button";
import { MoonStar } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";
import Link from "next/link";

type Props = {
  theme: string;
};

export default function Navbar({ theme }: Props) {
  return (
    <header className="flex flex-row fixed bg-background z-50 d   shadow-lg top-0 w-full h-20 items-center justify-between px-20">
      <div>LOGO</div>
      <div className="flex flex-row gap-4 items-center">
        <Link href={"/login"}>
          <Button>Login</Button>
        </Link>
        <Link href={"/register"}>
          <Button variant={"outline"}>Register</Button>
        </Link>
        <span>
          <DarkModeToggle theme={theme} />
        </span>
      </div>
    </header>
  );
}
