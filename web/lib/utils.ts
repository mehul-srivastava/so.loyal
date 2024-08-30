import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatInput(input: string) {
  return input
    .replace(/[^a-zA-Z0-9]/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$|(?<=^-|(?<=-)$)/g, "");
}
