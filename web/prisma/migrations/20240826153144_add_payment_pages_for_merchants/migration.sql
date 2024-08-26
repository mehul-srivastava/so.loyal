-- CreateTable
CREATE TABLE "Pages" (
    "id" TEXT NOT NULL,
    "merchantId" TEXT NOT NULL,
    "programPublicKey" TEXT NOT NULL,

    CONSTRAINT "Pages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "merchantId_fk" ON "Pages"("merchantId");

-- AddForeignKey
ALTER TABLE "Pages" ADD CONSTRAINT "Pages_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
