import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function b64url(bytes: Uint8Array) {
  const b64 = btoa(String.fromCharCode(...bytes));
  return b64.replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
}

export function b64urlDecode(str: string) {
  const pad = str + '==='.slice((str.length + 3) % 4);
  const b64 = pad.replace(/-/g,'+').replace(/_/g,'/');
  const bin = atob(b64);
  return new Uint8Array([...bin].map(c => c.charCodeAt(0)));
}

function cheapHash(str: string) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = ((h << 5) + h) ^ str.charCodeAt(i);
  return (h >>> 0).toString(16);
}

export function encodeValue(v: number) {
  const payload = JSON.stringify({ v });
  const bytes = new TextEncoder().encode(payload);
  const data = b64url(bytes);
  const sig  = cheapHash(payload);
  return `${data}.${sig}`;
}

export function decodeValue(token: string): number | null {
  const [data, sig] = token.split('.');
  if (!data || !sig) return null;
  try {
    const payload = new TextDecoder().decode(b64urlDecode(data));
    if (cheapHash(payload) !== sig) return null;
    const obj = JSON.parse(payload);
    return typeof obj.v === 'number' ? obj.v : null;
  } catch {
    return null;
  }
}