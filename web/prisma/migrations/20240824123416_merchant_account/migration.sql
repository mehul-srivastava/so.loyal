-- CreateTable
CREATE TABLE "Merchant" (
    "id" TEXT NOT NULL,
    "websiteName" TEXT NOT NULL,
    "websiteLink" TEXT NOT NULL,
    "walletPublicAddress" TEXT NOT NULL,
    "supportPhone" TEXT NOT NULL,
    "supportEmail" TEXT NOT NULL,
    "brandColor" TEXT NOT NULL,
    "brandImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Merchant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Merchant_websiteLink_key" ON "Merchant"("websiteLink");

-- CreateIndex
CREATE UNIQUE INDEX "Merchant_walletPublicAddress_key" ON "Merchant"("walletPublicAddress");
