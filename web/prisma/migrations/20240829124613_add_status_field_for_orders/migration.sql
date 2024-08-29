-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'CONFIRMED');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';
