/*
  Warnings:

  - You are about to drop the `Pages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pages" DROP CONSTRAINT "Pages_merchantId_fkey";

-- DropTable
DROP TABLE "Pages";

-- CreateTable
CREATE TABLE "Page" (
    "id" TEXT NOT NULL,
    "merchantId" TEXT NOT NULL,
    "programPublicKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "merchantId" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,
    "customerPublicKey" TEXT NOT NULL,
    "orderPublicKey" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "merchantId_fk" ON "Page"("merchantId");

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
