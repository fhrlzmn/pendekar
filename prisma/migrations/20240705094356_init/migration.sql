-- CreateEnum
CREATE TYPE "jenis_kelamin" AS ENUM ('L', 'P');

-- CreateEnum
CREATE TYPE "status_permohonan" AS ENUM ('Dikirim', 'Diterima', 'Ditolak', 'Selesai');

-- CreateTable
CREATE TABLE "penduduk" (
    "nik" VARCHAR(16) NOT NULL,
    "noKK" VARCHAR(16) NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "tempat_lahir" VARCHAR(128) NOT NULL,
    "tanggal_lahir" DATE NOT NULL,
    "jenis_kelamin" "jenis_kelamin" NOT NULL,
    "agama" VARCHAR(30) NOT NULL,
    "alamat" VARCHAR(128) NOT NULL,
    "rt" VARCHAR(3) NOT NULL,
    "rw" VARCHAR(3) NOT NULL,
    "desa" VARCHAR(128) NOT NULL,
    "kecamatan" VARCHAR(128) NOT NULL,
    "kota_kabupaten" VARCHAR(128) NOT NULL,
    "provinsi" VARCHAR(128) NOT NULL,
    "pendidikan_terakhir" VARCHAR(30) NOT NULL,
    "pendidikan_ditempuh" VARCHAR(30),
    "pekerjaan" VARCHAR(30) NOT NULL,
    "status_perkawinan" VARCHAR(30) NOT NULL,
    "status_dalam_keluarga" VARCHAR(30) NOT NULL,
    "kewarganegaraan" VARCHAR(30) NOT NULL,
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
    "jabatan" VARCHAR(30) NOT NULL,
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
    "username" VARCHAR(30) NOT NULL,
    "password" VARCHAR NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "dibuat_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diubah_pada" TIMESTAMP(3) NOT NULL,
    "aparat_desa_id" INTEGER,

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
    "nomor_surat" VARCHAR(30) NOT NULL,
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
CREATE UNIQUE INDEX "admin_aparat_desa_id_key" ON "admin"("aparat_desa_id");

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
ALTER TABLE "admin" ADD CONSTRAINT "admin_aparat_desa_id_fkey" FOREIGN KEY ("aparat_desa_id") REFERENCES "aparat_desa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "surat" ADD CONSTRAINT "surat_jenis_surat_id_fkey" FOREIGN KEY ("jenis_surat_id") REFERENCES "jenis_surat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permohonan_surat" ADD CONSTRAINT "permohonan_surat_idSurat_fkey" FOREIGN KEY ("idSurat") REFERENCES "surat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
