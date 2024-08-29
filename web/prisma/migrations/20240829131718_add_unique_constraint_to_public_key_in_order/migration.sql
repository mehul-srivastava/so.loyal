/*
  Warnings:

  - A unique constraint covering the columns `[orderPublicKey]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Order_orderPublicKey_key" ON "Order"("orderPublicKey");
