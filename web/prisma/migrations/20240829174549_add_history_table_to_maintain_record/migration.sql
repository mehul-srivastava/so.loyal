-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "websiteName" TEXT NOT NULL,
    "accountPublicKey" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "customerWalletAddress" TEXT NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);
