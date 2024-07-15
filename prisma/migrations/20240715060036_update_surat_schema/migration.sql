/*
  Warnings:

  - You are about to drop the column `tanggal_pengajuan` on the `surat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "surat" DROP COLUMN "tanggal_pengajuan",
ADD COLUMN     "dicetak_oleh" VARCHAR(255),
ADD COLUMN     "dicetak_pada" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;
