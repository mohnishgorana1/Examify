import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateToLongString(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatDateTimeLocal(dateString: string) {
  const date = new Date(dateString);
  const localDate = date.toLocaleDateString();
  const localTime = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return { localDate, localTime };
}

