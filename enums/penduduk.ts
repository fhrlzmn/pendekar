import { JenisKelamin } from '@prisma/client';
import { z } from 'zod';

export const AgamaEnum = z.enum(
  ['Islam', 'Kristen', 'Katholik', 'Hindu', 'Budha', 'Khonghucu'],
  {
    required_error: 'Agama harus diisi',
    message: 'Agama harus diisi',
  }
);

export const JenisKelaminEnum = z.nativeEnum(JenisKelamin, {
  required_error: 'Jenis kelamin harus diisi',
  message: 'Jenis kelamin harus diisi',
});

export const PendidikanEnum = z.enum(
  [
    'Tidak/Belum Sekolah',
    'Belum Tamat SD/Sederajat',
    'SD/Sederajat',
    'SLTP/Sederajat',
    'SLTA/Sederajat',
    'Diploma I/II',
    'Akademi/Diploma III/Sarjana Muda',
    'Diploma IV/Strata I',
    'Strata II',
    'Strata III',
    'Lainnya',
  ],
  {
    required_error: 'Pendidikan harus diisi',
    message: 'Pendidikan harus diisi',
  }
);

export const PekerjaanEnum = z.enum(
  [
    'Belum/Tidak Bekerja',
    'Mengurus Rumah Tangga',
    'Pelajar/Mahasiswa',
    'Pensiunan',
    'Pegawai Negeri Sipil',
    'Tentara Nasional Indonesia',
    'Kepolisian RI',
    'Perdagangan',
    'Petani/Pekebun',
    'Peternak',
    'Nelayan/Perikanan',
    'Industri',
    'Konstruksi',
    'Transportasi',
    'Karyawan Swasta',
    'Karyawan BUMN',
    'Karyawan BUMD',
    'Karyawan Honorer',
    'Buruh Harian Lepas',
    'Buruh Tani/Perkebunan',
    'Buruh Nelayan/Perikanan',
    'Buruh Peternakan',
    'Pembantu Rumah Tangga',
    'Tukang Cukur',
    'Tukang Listrik',
    'Tukang Batu',
    'Tukang Kayu',
    'Tukang Sol Sepatu',
    'Tukang Las/Pandai Besi',
    'Tukang Jahit',
    'Tukang Gigi',
    'Penata Rias',
    'Penata Busana',
    'Mekanik',
    'Seniman',
    'Tabib',
    'Paraji',
    'Perancang Busana',
    'Penterjemah',
    'Imam Masjid',
    'Pendeta',
    'Pastor',
    'Wartawan',
    'Ustadz/Mubaligh',
    'Juru Masak',
    'Promotor Acara',
    'Anggota DPR-RI',
    'Anggota DPD',
    'Anggota BPK',
    'Presiden',
    'Wakil Presiden',
    'Anggota Mahkamah Konstitusi',
    'Anggota Kabinet Kementrian',
    'Duta Besar',
    'Gubernur',
    'Wakil Gubernur',
    'Bupati',
    'Wakil Bupati',
    'Walikota',
    'Wakil Walikota',
    'Anggota DPRP Prop.',
    'Anggota DPRP Kab.',
    'Dosen',
    'Guru',
    'Pilot',
    'Pengacara',
    'Notaris',
    'Arsitek',
    'Akuntan',
    'Konsultan',
    'Dokter',
    'Bidan',
    'Perawat',
    'Apoteker',
    'Psikiater/Psikolog',
    'Penyiar Televisi',
    'Penyiar Radio',
    'Pelaut',
    'Peneliti',
    'Sopir',
    'Pialang',
    'Paranormal',
    'Pedagang',
    'Perangkat Desa',
    'Kepala Desa',
    'Biarawati',
    'Wiraswasta',
  ],
  {
    required_error: 'Pekerjaan harus diisi',
    message: 'Pekerjaan harus diisi',
  }
);

export const StatusPerkawinanEnum = z.enum(
  ['Belum Kawin', 'Kawin', 'Cerai Hidup', 'Cerai Mati'],
  {
    required_error: 'Status perkawinan harus diisi',
    message: 'Status perkawinan harus diisi',
  }
);

export const StatusDalamKeluargaEnum = z.enum(
  [
    'Kepala Keluarga',
    'Suami',
    'Istri',
    'Anak',
    'Menantu',
    'Cucu',
    'Orang Tua',
    'Mertua',
    'Famili Lain',
    'Pembantu',
    'Lainnya',
  ],
  {
    required_error: 'Status dalam keluarga harus diisi',
    message: 'Status dalam keluarga harus diisi',
  }
);

export const KewarganegaraanEnum = z.enum(['WNI', 'WNA'], {
  required_error: 'Kewarganegaraan harus diisi',
  message: 'Kewarganegaraan harus diisi',
});
