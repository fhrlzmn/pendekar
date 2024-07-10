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
