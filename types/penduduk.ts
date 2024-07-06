import { z } from 'zod';
import { pendudukSchema } from '@/schema/penduduk';
import {
  AgamaEnum,
  JenisKelaminEnum,
  KewarganegaraanEnum,
  PekerjaanEnum,
  PendidikanTerakhirEnum,
  StatusDalamKeluargaEnum,
  StatusPerkawinanEnum,
} from '@/enums/penduduk';

export type Agama = z.infer<typeof AgamaEnum>;
export type JenisKelamin = z.infer<typeof JenisKelaminEnum>;
export type Pendidikan = z.infer<typeof PendidikanTerakhirEnum>;
export type Pekerjaan = z.infer<typeof PekerjaanEnum>;
export type StatusPerkawinan = z.infer<typeof StatusPerkawinanEnum>;
export type StatusDalamKeluarga = z.infer<typeof StatusDalamKeluargaEnum>;
export type Kewarganegaraan = z.infer<typeof KewarganegaraanEnum>;

export type Penduduk = z.infer<typeof pendudukSchema>;
