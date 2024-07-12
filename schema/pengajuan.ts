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

export const skklhrSchema = z.object({
  namaAnak: z
    .string()
    .min(1, 'Nama anak harus diisi')
    .max(255, 'Nama anak harus kurang dari 255 karakter'),
  tanggalLahirAnak: z.string().date('Tanggal lahir anak harus diisi'),
  pukulLahirAnak: z
    .string()
    .regex(new RegExp(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/))
    .min(1, 'Pukul lahir anak harus diisi'),
  tempatLahirAnak: z
    .string()
    .min(1, 'Tempat lahir anak harus diisi')
    .max(128, 'Tempat lahir anak harus kurang dari 128 karakter'),
  jenisKelaminAnak: JenisKelaminEnum,
  namaIbu: z
    .string()
    .min(1, 'Nama ibu harus diisi')
    .max(255, 'Nama ibu harus kurang dari 255 karakter'),
  nikIbu: z
    .string()
    .regex(new RegExp('^\\d+$'), 'NIK harus berisi angka')
    .min(16, 'NIK harus 16 karakter'),
  umurIbu: z
    .string()
    .regex(new RegExp('^\\d+$'))
    .min(1, 'Umur ibu harus diisi'),
  pekerjaanIbu: PekerjaanEnum,
  alamatIbu: z
    .string()
    .min(1, 'Alamat ibu harus diisi')
    .max(255, 'Alamat ibu harus kurang dari 255 karakter'),
  namaAyah: z
    .string()
    .min(1, 'Nama ayah harus diisi')
    .max(255, 'Nama ayah harus kurang dari 255 karakter'),
  nikAyah: z
    .string()
    .regex(new RegExp('^\\d+$'), 'NIK harus berisi angka')
    .min(16, 'NIK harus 16 karakter'),
  umurAyah: z
    .string()
    .regex(new RegExp('^\\d+$'))
    .min(1, 'Umur ayah harus diisi'),
  pekerjaanAyah: PekerjaanEnum,
  alamatAyah: z
    .string()
    .min(1, 'Alamat ayah harus diisi')
    .max(255, 'Alamat ayah harus kurang dari 255 karakter'),
  hubunganPelapor: z
    .string()
    .min(1, 'Hubungan pelapor harus diisi')
    .max(255, 'Hubungan pelapor harus kurang dari 255 karakter'),
});

export const skkmtnSchema = z.object({
  nama: z
    .string()
    .min(1, 'Nama orang meninggal harus diisi')
    .max(255, 'Nama orang meninggal harus kurang dari 255 karakter'),
  nik: z
    .string()
    .regex(new RegExp('^\\d+$'), 'NIK harus berisi angka')
    .min(16, 'NIK harus 16 karakter'),
  jenisKelamin: JenisKelaminEnum,
  tempatLahir: z
    .string()
    .min(1, 'Tempat lahir harus diisi')
    .max(128, 'Tempat lahir harus kurang dari 128 karakter'),
  tanggalLahir: z.string().date('Tanggal lahir anak harus diisi'),
  agama: AgamaEnum,
  alamat: z
    .string()
    .min(1, 'Alamat harus diisi')
    .max(255, 'Alamat harus kurang dari 255 karakter'),
  tempatMeninggal: z
    .string()
    .min(1, 'Tempat lahir harus diisi')
    .max(128, 'Tempat lahir harus kurang dari 128 karakter'),
  tanggalMeninggal: z.string().date('Tanggal lahir anak harus diisi'),
  pukulMeninggal: z
    .string()
    .regex(new RegExp(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/))
    .min(1, 'Pukul lahir anak harus diisi'),
  sebabMeninggal: z
    .string()
    .min(1, 'Sebab meninggal harus diisi')
    .max(255, 'Sebab meninggal harus kurang dari 255 karakter'),
  hubunganPelapor: z
    .string()
    .min(1, 'Hubungan pelapor harus diisi')
    .max(255, 'Hubungan pelapor harus kurang dari 255 karakter'),
});
