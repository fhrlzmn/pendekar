import { z } from 'zod';

export const userAccountSchema = z.object({
  nik: z
    .string()
    .regex(new RegExp('^\\d+$'), 'NIK harus berisi angka')
    .min(16, 'NIK harus 16 karakter'),
  nama: z
    .string()
    .min(3, 'Nama harus lebih dari 3 karakter')
    .max(255, 'Nama harus kurang dari 255 karakter'),
});

export const adminAccountSchema = z.object({
  username: z
    .string()
    .min(3, 'Username harus lebih dari 3 karakter')
    .max(30, 'Username harus kurang dari 30 karakter'),
  nama: z
    .string()
    .min(3, 'Nama harus lebih dari 3 karakter')
    .max(255, 'Nama harus kurang dari 255 karakter'),
  aparatDesaId: z
    .string()
    .regex(new RegExp('^\\d+$'), 'Aparat Desa harus berisi angka')
    .min(1, 'Aparat Desa ID harus diisi'),
});
