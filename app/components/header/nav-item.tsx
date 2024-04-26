import Link from "next/link";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import { Button } from "../ui/button";
import { LucideIcon } from "lucide-react";

export type NavItemType = {
  title: string;
  Icon: LucideIcon;
  href: string;
};
export default function NavItem({ title, Icon, href }: NavItemType) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {href && (
          <Link href={href}>
            <Button variant={"ghost"} className="w-16 h-16 opacity-60 hover:opacity-100" size={"icon"}>
              <Icon size={32} strokeWidth={2} />
            </Button>
          </Link>
        )}
      </TooltipTrigger>
      <TooltipContent>{title}</TooltipContent>
    </Tooltip>
  );
}
