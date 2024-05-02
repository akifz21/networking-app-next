"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Globe, Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function LangChange() {
  const { i18n } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-12 h-12 opacity-60 hover:opacity-100" variant={"ghost"} size={"icon"}>
          <Languages size={32} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Languages</DropdownMenuLabel>
        <DropdownMenuItem>
          <Button onClick={() => i18n.changeLanguage("tr")} className="w-full" variant={"ghost"}>
            Turkish
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button onClick={() => i18n.changeLanguage("en")} className="w-full" variant={"ghost"}>
            English
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
