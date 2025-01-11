import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import FileSaver from 'file-saver';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function downloadImage(id: string, url: string) {
  FileSaver.saveAs(url, `download-${id}.jpg`);
}

export function generateImageId(prompt: string) {
  const sanitizedPrompt = prompt.replace(/\s+/g, '_');
  return `${sanitizedPrompt}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 11)}`;
}
