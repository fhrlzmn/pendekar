-- CreateEnum
CREATE TYPE "jenis_kelamin" AS ENUM ('Laki-laki', 'Perempuan');

-- CreateEnum
CREATE TYPE "agama" AS ENUM ('Islam', 'Kristen', 'Katholik', 'Hindu', 'Budha', 'Khonghucu', 'Lainnya');

-- CreateEnum
CREATE TYPE "pendidikan" AS ENUM ('Tidak/Belum Sekolah', 'Belum Tamat SD/Sederajat', 'Tamat SD/Sederajat', 'SLTP/Sederajat', 'SLTA/Sederajat', 'Diploma I/II', 'Akademi/Diploma III/Sarjana Muda', 'Diploma IV/Strata I', 'Strata II', 'Strata III');

-- CreateEnum
CREATE TYPE "pekerjaan" AS ENUM ('Belum/Tidak Bekerja', 'Mengurus Rumah Tangga', 'Pelajar/Mahasiswa', 'Pensiunan', 'Pegawai Negeri Sipil', 'Tentara Nasional Indonesia', 'Kepolisian RI', 'Perdagangan', 'Petani/Pekebun', 'Peternak', 'Nelayan/Perikanan', 'Industri', 'Konstruksi', 'Transportasi', 'Karyawan Swasta', 'Karyawan BUMN', 'Karyawan BUMD', 'Karyawan Honorer', 'Buruh Harian Lepas', 'Buruh Tani/Perkebunan', 'Buruh Nelayan/Perikanan', 'Buruh Peternakan', 'Pembantu Rumah Tangga', 'Tukang Cukur', 'Tukang Listrik', 'Tukang Batu', 'Tukang Kayu', 'Tukang Sol Sepatu', 'Tukang Las/Pandai Besi', 'Tukang Jahit', 'Tukang Gigi', 'Penata Rias', 'Penata Busana', 'Mekanik', 'Seniman', 'Tabib', 'Paraji', 'Perancang Busana', 'Penterjemah', 'Imam Masjid', 'Pendeta', 'Pastor', 'Wartawan', 'Ustadz/Mubaligh', 'Juru Masak', 'Promotor Acara', 'Anggota DPR-RI', 'Anggota DPD', 'Anggota BPK', 'Presiden', 'Wakil Presiden', 'Anggota Mahkamah Konstitusi', 'Anggota Kabinet Kementrian', 'Duta Besar', 'Gubernur', 'Wakil Gubernur', 'Bupati', 'Wakil Bupati', 'Walikota', 'Wakil Walikota', 'Anggota DPRP Prop.', 'Anggota DPRP Kab.', 'Dosen', 'Guru', 'Pilot', 'Pengacara', 'Notaris', 'Arsitek', 'Akuntan', 'Konsultan', 'Dokter', 'Bidan', 'Perawat', 'Apoteker', 'Psikiater/Psikolog', 'Penyiar Televisi', 'Penyiar Radio', 'Pelaut', 'Peneliti', 'Sopir', 'Pialang', 'Paranormal', 'Pedagang', 'Perangkat Desa', 'Kepala Desa', 'Biarawati', 'Wiraswasta');

-- CreateEnum
CREATE TYPE "status_perkawinan" AS ENUM ('Belum Kawin', 'Kawin', 'Cerai Hidup', 'Cerai Mati');

-- CreateEnum
CREATE TYPE "status_dalam_keluarga" AS ENUM ('Kepala Keluarga', 'Suami', 'Istri', 'Anak', 'Menantu', 'Cucu', 'Orang Tua', 'Mertua', 'Famili Lain', 'Pembantu', 'Lainnya');

-- CreateEnum
CREATE TYPE "kewarganegaraan" AS ENUM ('WNI', 'WNA', 'Lainnya');

-- CreateEnum
CREATE TYPE "jabatan" AS ENUM ('Kepala Desa', 'Sekretaris Desa', 'Operator', 'Lainnya');

-- CreateEnum
CREATE TYPE "status_permohonan" AS ENUM ('Dikirim', 'Diterima', 'Ditolak', 'Selesai');

-- CreateTable
CREATE TABLE "penduduk" (
    "nik" VARCHAR(16) NOT NULL,
    "noKK" VARCHAR(16) NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "tempat_lahir" VARCHAR(255) NOT NULL,
    "tanggal_lahir" DATE NOT NULL,
    "jenis_kelamin" "jenis_kelamin" NOT NULL,
    "agama" "agama" NOT NULL,
    "alamat" VARCHAR(255) NOT NULL,
    "rt" VARCHAR(3) NOT NULL,
    "rw" VARCHAR(3) NOT NULL,
    "desa" VARCHAR(255) NOT NULL,
    "kota_kabupaten" VARCHAR(255) NOT NULL,
    "provinsi" VARCHAR(255) NOT NULL,
    "pendidikan_terakhir" "pendidikan" NOT NULL,
    "pendidikan_sedang_ditempuh" "pendidikan" NOT NULL,
    "status_perkawinan" "status_perkawinan" NOT NULL,
    "status_dalam_keluarga" "status_dalam_keluarga" NOT NULL,
    "kewarganegaraan" "kewarganegaraan" NOT NULL,
    "nama_ayah" VARCHAR(255) NOT NULL,
    "nama_ibu" VARCHAR(255) NOT NULL,
    "dibuat_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diubah_pada" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "penduduk_pkey" PRIMARY KEY ("nik")
);

-- CreateTable
CREATE TABLE "aparat_desa" (
    "id" SERIAL NOT NULL,
    "nik" VARCHAR(16) NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "jabatan" "jabatan" NOT NULL,
    "dibuat_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diubah_pada" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "aparat_desa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "nik" VARCHAR(16) NOT NULL,
    "pin" VARCHAR NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "dibuat_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diubah_pada" TIMESTAMP(3) NOT NULL,
    "pertama_login" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "dibuat_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diubah_pada" TIMESTAMP(3) NOT NULL,
    "apat_desa_id" INTEGER,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jenis_surat" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "kode" VARCHAR(5) NOT NULL,

    CONSTRAINT "jenis_surat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "surat" (
    "id" SERIAL NOT NULL,
    "nomor_surat" VARCHAR(255) NOT NULL,
    "nik_pemohon" VARCHAR(16) NOT NULL,
    "keperluan" TEXT NOT NULL,
    "keterangan" TEXT NOT NULL,
    "data_tambahan" JSONB,
    "tanggal_pengajuan" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "berlaku_hingga" DATE NOT NULL,
    "jenis_surat_id" INTEGER NOT NULL,

    CONSTRAINT "surat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permohonan_surat" (
    "id" SERIAL NOT NULL,
    "idSurat" INTEGER NOT NULL,
    "status" "status_permohonan" NOT NULL,
    "tanggalPengajuan" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "permohonan_surat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "penduduk_nik_key" ON "penduduk"("nik");

-- CreateIndex
CREATE UNIQUE INDEX "aparat_desa_nik_key" ON "aparat_desa"("nik");

-- CreateIndex
CREATE UNIQUE INDEX "user_nik_key" ON "user"("nik");

-- CreateIndex
CREATE UNIQUE INDEX "admin_username_key" ON "admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "admin_apat_desa_id_key" ON "admin"("apat_desa_id");

-- CreateIndex
CREATE UNIQUE INDEX "jenis_surat_nama_key" ON "jenis_surat"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "jenis_surat_kode_key" ON "jenis_surat"("kode");

-- CreateIndex
CREATE UNIQUE INDEX "surat_nomor_surat_key" ON "surat"("nomor_surat");

-- CreateIndex
CREATE UNIQUE INDEX "permohonan_surat_idSurat_key" ON "permohonan_surat"("idSurat");

-- AddForeignKey
ALTER TABLE "aparat_desa" ADD CONSTRAINT "aparat_desa_nik_fkey" FOREIGN KEY ("nik") REFERENCES "penduduk"("nik") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_nik_fkey" FOREIGN KEY ("nik") REFERENCES "penduduk"("nik") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin" ADD CONSTRAINT "admin_apat_desa_id_fkey" FOREIGN KEY ("apat_desa_id") REFERENCES "aparat_desa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "surat" ADD CONSTRAINT "surat_jenis_surat_id_fkey" FOREIGN KEY ("jenis_surat_id") REFERENCES "jenis_surat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permohonan_surat" ADD CONSTRAINT "permohonan_surat_idSurat_fkey" FOREIGN KEY ("idSurat") REFERENCES "surat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
