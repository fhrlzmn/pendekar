/*
  Warnings:

  - You are about to drop the column `berlaku_hingga` on the `surat` table. All the data in the column will be lost.
  - The `tanggal_pengajuan` column on the `surat` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `aparat_desa_id` to the `surat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "surat" DROP COLUMN "berlaku_hingga",
ADD COLUMN     "aparat_desa_id" INTEGER NOT NULL,
DROP COLUMN "tanggal_pengajuan",
ADD COLUMN     "tanggal_pengajuan" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "surat" ADD CONSTRAINT "surat_aparat_desa_id_fkey" FOREIGN KEY ("aparat_desa_id") REFERENCES "aparat_desa"("id") ON DELETE CASCADE ON UPDATE CASCADE;
