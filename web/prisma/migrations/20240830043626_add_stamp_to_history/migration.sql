/*
  Warnings:

  - You are about to drop the column `accountPublicKey` on the `History` table. All the data in the column will be lost.
  - Added the required column `stampCount` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "History" DROP COLUMN "accountPublicKey",
ADD COLUMN     "stampCount" INTEGER NOT NULL;
