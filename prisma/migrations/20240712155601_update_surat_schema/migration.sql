/*
  Warnings:

  - The `tanggal_pengajuan` column on the `surat` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "permohonan_surat" DROP CONSTRAINT "permohonan_surat_kode_jenis_surat_fkey";

-- DropForeignKey
ALTER TABLE "permohonan_surat" DROP CONSTRAINT "permohonan_surat_nik_pemohon_fkey";

-- DropForeignKey
ALTER TABLE "surat" DROP CONSTRAINT "surat_kode_jenis_surat_fkey";

-- DropForeignKey
ALTER TABLE "surat" DROP CONSTRAINT "surat_nik_pemohon_fkey";

-- DropForeignKey
ALTER TABLE "surat" DROP CONSTRAINT "surat_permohonan_id_fkey";

-- AlterTable
ALTER TABLE "surat" DROP COLUMN "tanggal_pengajuan",
ADD COLUMN     "tanggal_pengajuan" TIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "permohonan_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "permohonan_surat" ADD CONSTRAINT "permohonan_surat_nik_pemohon_fkey" FOREIGN KEY ("nik_pemohon") REFERENCES "penduduk"("nik") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permohonan_surat" ADD CONSTRAINT "permohonan_surat_kode_jenis_surat_fkey" FOREIGN KEY ("kode_jenis_surat") REFERENCES "jenis_surat"("kode") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "surat" ADD CONSTRAINT "surat_nik_pemohon_fkey" FOREIGN KEY ("nik_pemohon") REFERENCES "penduduk"("nik") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "surat" ADD CONSTRAINT "surat_permohonan_id_fkey" FOREIGN KEY ("permohonan_id") REFERENCES "permohonan_surat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "surat" ADD CONSTRAINT "surat_kode_jenis_surat_fkey" FOREIGN KEY ("kode_jenis_surat") REFERENCES "jenis_surat"("kode") ON DELETE CASCADE ON UPDATE CASCADE;
