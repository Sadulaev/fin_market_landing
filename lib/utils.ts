import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function encryptNumber(num: number): string {
  const integer = Math.floor(num);
  const decimal = Math.round((num - integer) * 100);
  const base = ((integer + 1000) * 100 + decimal).toString(36);
  return `f${base}t`;
}

export function decryptNumber(encrypted: string): number {
  try {
    if (!encrypted.startsWith('f') || !encrypted.endsWith('t')) {
      return 5;
    }

    const middle = encrypted.slice(1, -1);
    const fullNum = parseInt(middle, 36) - 100000;
    const integer = Math.floor(fullNum / 100);
    const decimal = fullNum % 100;
    const num = integer + decimal / 100;

    return isNaN(num) ? 5 : num;
  } catch {
    return 5;
  }
}