"use client";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { MoonStar, Sun } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useTranslation } from "react-i18next";

const DarkModeToggle = ({ theme }: { theme: string }) => {
  const [_theme, setTheme] = useState(theme);
  const { t } = useTranslation();

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
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => toogleTheme()}
          className="w-12 h-12 opacity-60 hover:opacity-100"
          key={_theme == "dark" ? "dark-icon" : "light-icon"}
        >
          {_theme == "dark" ? <MoonStar size={32} /> : <Sun size={32} />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{t("links.toggleTheme")}</TooltipContent>
    </Tooltip>
  );
};

export default DarkModeToggle;
