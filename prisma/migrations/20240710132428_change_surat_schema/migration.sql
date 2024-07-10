/*
  Warnings:

  - You are about to drop the column `idSurat` on the `permohonan_surat` table. All the data in the column will be lost.
  - You are about to drop the column `tanggalPengajuan` on the `permohonan_surat` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[permohonan_id]` on the table `surat` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `jenis_surat_id` to the `permohonan_surat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `keperluan` to the `permohonan_surat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `keterangan` to the `permohonan_surat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nik_pemohon` to the `permohonan_surat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `permohonan_id` to the `surat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "permohonan_surat" DROP CONSTRAINT "permohonan_surat_idSurat_fkey";

-- DropIndex
DROP INDEX "permohonan_surat_idSurat_key";

-- AlterTable
ALTER TABLE "permohonan_surat" DROP COLUMN "idSurat",
DROP COLUMN "tanggalPengajuan",
ADD COLUMN     "data_tambahan" JSONB,
ADD COLUMN     "jenis_surat_id" INTEGER NOT NULL,
ADD COLUMN     "keperluan" TEXT NOT NULL,
ADD COLUMN     "keterangan" TEXT NOT NULL,
ADD COLUMN     "nik_pemohon" VARCHAR(16) NOT NULL,
ADD COLUMN     "tanggal_pengajuan" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "surat" ADD COLUMN     "permohonan_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "surat_permohonan_id_key" ON "surat"("permohonan_id");

-- AddForeignKey
ALTER TABLE "permohonan_surat" ADD CONSTRAINT "permohonan_surat_nik_pemohon_fkey" FOREIGN KEY ("nik_pemohon") REFERENCES "penduduk"("nik") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permohonan_surat" ADD CONSTRAINT "permohonan_surat_jenis_surat_id_fkey" FOREIGN KEY ("jenis_surat_id") REFERENCES "jenis_surat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "surat" ADD CONSTRAINT "surat_nik_pemohon_fkey" FOREIGN KEY ("nik_pemohon") REFERENCES "penduduk"("nik") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "surat" ADD CONSTRAINT "surat_permohonan_id_fkey" FOREIGN KEY ("permohonan_id") REFERENCES "permohonan_surat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
