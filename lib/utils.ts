import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import bcrypt from 'bcryptjs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${day} ${months[monthIndex]} ${year}`;
}

export function formatDateToInputDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}

type UserPin = {
  pin: number;
  hashedPin: string;
};

export async function generateUserPin(): Promise<UserPin> {
  const randomSixDigitNumber = Math.floor(100000 + Math.random() * 900000);

  const hashedPin = await bcrypt.hash(String(randomSixDigitNumber), 10);

  return { pin: randomSixDigitNumber, hashedPin };
}
