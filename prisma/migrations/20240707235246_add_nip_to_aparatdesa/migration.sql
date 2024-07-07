/*
  Warnings:

  - A unique constraint covering the columns `[nip]` on the table `aparat_desa` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "aparat_desa" ADD COLUMN     "nip" VARCHAR(18);

-- CreateIndex
CREATE UNIQUE INDEX "aparat_desa_nip_key" ON "aparat_desa"("nip");
