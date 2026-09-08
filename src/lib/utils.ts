import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import QRCode from 'qrcode';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatWeight(val: number, unit: string = 'kg'): string {
  if (isNaN(val)) return `0 ${unit}`;
  // For small divisions like 0.0001, display sufficient decimal precision
  const abs = Math.abs(val);
  let decimals = 3;
  if (abs < 0.001 && abs > 0) decimals = 5;
  else if (abs < 0.01 && abs > 0) decimals = 4;
  else if (abs >= 100) decimals = 2;

  return `${val.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  })} ${unit}`;
}

export function formatError(val: number, decimals: number = 3): string {
  if (isNaN(val)) return '0.000';
  const prefix = val > 0 ? '+' : '';
  return `${prefix}${val.toFixed(decimals)}`;
}

export async function generateQrDataUrl(text: string): Promise<string> {
  try {
    return await QRCode.toDataURL(text, {
      width: 180,
      margin: 1,
      color: {
        dark: '#0f172a', // slate-900
        light: '#ffffff',
      },
      errorCorrectionLevel: 'M',
    });
  } catch (err) {
    console.error('QR Code generation failed', err);
    return '';
  }
}
