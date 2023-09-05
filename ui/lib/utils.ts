import { type ClassValue, clsx } from "clsx";
import { MutableRefObject, Ref } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
