import { z } from 'zod';

export const sktmSchema = z.object({
  keperluan: z
    .string()
    .min(1, 'Keperluan harus diisi')
    .max(255, 'Keperluan harus kurang dari 255 karakter'),
});
