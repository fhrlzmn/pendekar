/*
  Warnings:

  - You are about to drop the column `data_tambahan` on the `permohonan_surat` table. All the data in the column will be lost.
  - You are about to drop the column `jenis_surat_id` on the `permohonan_surat` table. All the data in the column will be lost.
  - You are about to drop the column `keperluan` on the `permohonan_surat` table. All the data in the column will be lost.
  - You are about to drop the column `data_tambahan` on the `surat` table. All the data in the column will be lost.
  - You are about to drop the column `jenis_surat_id` on the `surat` table. All the data in the column will be lost.
  - You are about to drop the column `keperluan` on the `surat` table. All the data in the column will be lost.
  - Added the required column `kode_jenis_surat` to the `permohonan_surat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kode_jenis_surat` to the `surat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "permohonan_surat" DROP CONSTRAINT "permohonan_surat_jenis_surat_id_fkey";

-- DropForeignKey
ALTER TABLE "surat" DROP CONSTRAINT "surat_jenis_surat_id_fkey";

-- AlterTable
ALTER TABLE "jenis_surat" ALTER COLUMN "kode" SET DATA TYPE VARCHAR(10);

-- AlterTable
ALTER TABLE "permohonan_surat" DROP COLUMN "data_tambahan",
DROP COLUMN "jenis_surat_id",
DROP COLUMN "keperluan",
ADD COLUMN     "data" JSONB,
ADD COLUMN     "kode_jenis_surat" TEXT NOT NULL,
ALTER COLUMN "keterangan" DROP NOT NULL;

-- AlterTable
ALTER TABLE "surat" DROP COLUMN "data_tambahan",
DROP COLUMN "jenis_surat_id",
DROP COLUMN "keperluan",
ADD COLUMN     "data" JSONB,
ADD COLUMN     "kode_jenis_surat" TEXT NOT NULL,
ALTER COLUMN "keterangan" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "permohonan_surat" ADD CONSTRAINT "permohonan_surat_kode_jenis_surat_fkey" FOREIGN KEY ("kode_jenis_surat") REFERENCES "jenis_surat"("kode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "surat" ADD CONSTRAINT "surat_kode_jenis_surat_fkey" FOREIGN KEY ("kode_jenis_surat") REFERENCES "jenis_surat"("kode") ON DELETE RESTRICT ON UPDATE CASCADE;
