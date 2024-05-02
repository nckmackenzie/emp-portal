import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const titleCase = (str: string) => {
  return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
};
