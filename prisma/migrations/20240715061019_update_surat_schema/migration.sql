/*
  Warnings:

  - Made the column `dicetak_pada` on table `surat` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "surat" ALTER COLUMN "dicetak_pada" SET NOT NULL;
