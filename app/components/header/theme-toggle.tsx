"use client";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { MoonStar, Sun } from "lucide-react";

const DarkModeToggle = ({ theme }: { theme: string }) => {
  const [_theme, setTheme] = useState(theme);

  const toogleTheme = () => {
    const root = document.getElementsByTagName("html")[0];
    root.classList.toggle("dark");
    if (root.classList.contains("dark")) {
      setTheme("dark");
      document.cookie = `theme=dark;`;
    } else {
      setTheme("light");
      document.cookie = `theme=ligth;`;
    }
  };

  return (
    <Button
      size={"icon"}
      variant={"outline"}
      onClick={() => toogleTheme()}
      key={_theme == "dark" ? "dark-icon" : "light-icon"}
    >
      {_theme == "dark" ? <MoonStar /> : <Sun />}
    </Button>
  );
};

export default DarkModeToggle;
