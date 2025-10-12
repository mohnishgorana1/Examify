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


// Helper function to format time in seconds to "H hr M min S sec"
export const formatTimeTaken = (timeInSeconds: number): string => {
  if (timeInSeconds < 0) return "N/A";

  const totalSeconds = Math.floor(timeInSeconds);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  let parts = [];
  if (hours > 0) {
    parts.push(`${hours} hr`);
  }
  if (minutes > 0) {
    parts.push(`${minutes} min`);
  }
  if (seconds > 0 || parts.length === 0) {
    // Always show seconds if nothing else, or if there are seconds to show
    parts.push(`${seconds} sec`);
  }

  // Handle case where time is 0 seconds
  if (totalSeconds === 0) {
    return "0 sec";
  }

  return parts.join(" ");
};
