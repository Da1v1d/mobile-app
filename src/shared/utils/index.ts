import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const wait = (ms: number) => new Promise(res => setTimeout(res, ms));

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs)).trim();
};
