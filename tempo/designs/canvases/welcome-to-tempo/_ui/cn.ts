import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Tailwind-aware className merge (clsx + tailwind-merge), as the DS uses. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
