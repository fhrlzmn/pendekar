import { z } from 'zod';

export const adminLoginSchema = z.object({
  username: z.string().min(3, 'Username harus lebih dari 3 karakter'),
  password: z.string().min(6, 'Password harus lebih dari 6 karakter'),
});

export const userLoginSchema = z.object({
  nik: z
    .string()
    .regex(new RegExp('^\\d+$'), 'NIK harus berisi angka')
    .min(16, 'NIK harus 16 karakter'),
  pin: z
    .string()
    .regex(new RegExp('^\\d+$'), 'PIN harus berisi angka')
    .min(6, 'PIN harus berjumlah 6 karakter'),
});
