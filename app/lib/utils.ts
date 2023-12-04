import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateForShow = (input: string | number, hourMunite = false) => {
  return new Date(input).toLocaleDateString("en-UK", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: hourMunite ? "numeric" : undefined,
    minute: hourMunite ? "numeric" : undefined,
    // timeZone: 'UTC',
  });
};
