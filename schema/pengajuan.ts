import { z } from 'zod';

import { AgamaEnum, JenisKelaminEnum, PekerjaanEnum } from '@/enums/penduduk';

export const sktmSchema = z.object({
  keperluan: z
    .string()
    .min(1, 'Keperluan harus diisi')
    .max(255, 'Keperluan harus kurang dari 255 karakter'),
});

export const skbnSchema = z.object({
  kartuIdentitasLain: z
    .string()
    .min(1, 'Identitas dalam harus diisi')
    .max(255, 'Identitas dalam harus kurang dari 255 karakter'),
  noIdentitas: z
    .string()
    .min(1, 'No. Identitas harus diisi')
    .max(255, 'No. Identitas harus kurang dari 255 karakter'),
  nama: z
    .string()
    .min(1, 'Nama harus diisi')
    .max(255, 'Nama harus kurang dari 255 karakter'),
  tempatLahir: z
    .string()
    .min(1, 'Tempat lahir harus diisi')
    .max(128, 'Tempat lahir harus kurang dari 128 karakter'),
  tanggalLahir: z
    .string({ required_error: 'Tanggal lahir harus diisi' })
    .date('Tanggal lahir harus diisi'),
  alamat: z
    .string()
    .min(1, 'Alamat harus diisi')
    .max(128, 'Alamat harus kurang dari 255 karakter'),
  jenisKelamin: JenisKelaminEnum,
  agama: AgamaEnum,
  pekerjaan: PekerjaanEnum,
  keterangan: z.string().max(255, 'Keterangan harus kurang dari 255 karakter'),
});
