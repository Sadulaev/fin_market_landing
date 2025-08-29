import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function encryptNumber(num: number): string {
  const base = (num + 1000).toString(36);
  return `f${base}t`;
}

export function decryptNumber(encrypted: string): number {
  try {
    if (!encrypted.startsWith('f') || !encrypted.endsWith('t')) {
      return 5;
    }

    const middle = encrypted.slice(1, -1);
    const num = parseInt(middle, 36) - 1000;

    return isNaN(num) ? 5 : num;
  } catch {
    return 5;
  }
}