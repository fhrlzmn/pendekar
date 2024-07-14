/*
  Warnings:

  - You are about to drop the column `pertama_login` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `pertama_login` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "admin" DROP COLUMN "pertama_login";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "pertama_login";
