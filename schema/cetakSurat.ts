import { z } from 'zod';

export const cetakSuratSchema = z.object({
  nomorSurat: z
    .string()
    .min(1, 'Nomor surat harus diisi')
    .max(32, 'Nomor surat maksimal 32 karakter'),
  idPenandatangan: z.string().min(1, 'Penandatangan harus diisi'),
});
