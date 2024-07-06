import { z } from 'zod';

import {
  AgamaEnum,
  JenisKelaminEnum,
  KewarganegaraanEnum,
  PekerjaanEnum,
  PendidikanDitempuhEnum,
  PendidikanTerakhirEnum,
  StatusDalamKeluargaEnum,
  StatusPerkawinanEnum,
} from '@/enums/penduduk';

export const pendudukSchema = z.object({
  nik: z
    .string()
    .regex(new RegExp('^\\d+$'), 'NIK harus berisi angka')
    .min(16, 'NIK harus 16 karakter'),
  noKK: z
    .string()
    .regex(new RegExp('^\\d+$'), 'NIK harus berisi angka')
    .min(16, 'NIK harus 16 karakter'),
  nama: z
    .string()
    .min(3, 'Nama harus lebih dari 3 karakter')
    .max(255, 'Nama harus kurang dari 255 karakter'),
  tempatLahir: z
    .string()
    .min(1, 'Tempat lahir harus diisi')
    .max(128, 'Tempat lahir harus kurang dari 128 karakter'),
  tanggalLahir: z
    .string({ required_error: 'Tanggal lahir harus diisi' })
    .date('Tanggal lahir harus diisi'),
  jenisKelamin: JenisKelaminEnum,
  agama: AgamaEnum,
  alamat: z
    .string()
    .min(1, 'Alamat harus diisi')
    .max(128, 'Alamat harus kurang dari 255 karakter'),
  rt: z.string().length(3, 'RT harus 3 karakter, contoh: 001'),
  rw: z.string().length(3, 'RW harus 3 karakter, contoh: 001'),
  desa: z
    .string()
    .min(1, 'Desa harus diisi')
    .max(128, 'Desa harus kurang dari 128 karakter'),
  kecamatan: z
    .string()
    .min(1, 'Kecamatan harus diisi')
    .max(128, 'Kecamatan harus kurang dari 128 karakter'),
  kotaKabupaten: z
    .string()
    .min(1, 'Kota/Kabupaten harus diisi')
    .max(128, 'Kota/Kabupaten harus kurang dari 128 karakter'),
  provinsi: z
    .string()
    .min(1, 'Provinsi harus diisi')
    .max(128, 'Provinsi harus kurang dari 128 karakter'),
  pendidikanTerakhir: PendidikanTerakhirEnum,
  pendidikanDitempuh: PendidikanDitempuhEnum,
  pekerjaan: PekerjaanEnum,
  statusPerkawinan: StatusPerkawinanEnum,
  statusDalamKeluarga: StatusDalamKeluargaEnum,
  kewarganegaraan: KewarganegaraanEnum,
  namaAyah: z
    .string()
    .min(3, 'Nama ayah harus lebih dari 3 karakter')
    .max(255, 'Nama ayah harus kurang dari 255 karakter'),
  namaIbu: z
    .string()
    .min(3, 'Nama ibu harus lebih dari 3 karakter')
    .max(255, 'Nama ibu harus kurang dari 255 karakter'),
});
