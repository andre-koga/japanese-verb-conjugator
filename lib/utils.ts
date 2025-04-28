import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { JLPTLevel } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const JLPTColor = (level: JLPTLevel) => {
  if (level === "N5") return "!bg-n5";
  if (level === "N4") return "!bg-n4";
  if (level === "N3") return "!bg-n3";
  if (level === "N2") return "!bg-n2";
  if (level === "N1") return "!bg-n1";
};