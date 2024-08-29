import { NextRequest, NextResponse } from "next/server";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import BigNumber from "bignumber.js";
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function POST(request: NextRequest) {
  try {
    const { buyerAddress, orderId, price, sellerAddress, merchantId, pageId } =
      await request.json();

    if (!buyerAddress) {
      return new NextResponse("Missing buyer address", { status: 400 });
    }

    if (!sellerAddress) {
      return new NextResponse("Missing seller address", { status: 400 });
    }

    if (!orderId) {
      return new NextResponse("Missing order ID", { status: 400 });
    }

    const bigAmount = BigNumber(price);
    const buyerPublicKey = new PublicKey(buyerAddress);
    const sellerPublicKey = new PublicKey(sellerAddress);
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = clusterApiUrl(network);
    const connection = new Connection(endpoint);

    const { blockhash } = await connection.getLatestBlockhash("finalized");

    const tx = new Transaction({
      recentBlockhash: blockhash,
      feePayer: buyerPublicKey,
    });

    const transferInstruction = SystemProgram.transfer({
      fromPubkey: buyerPublicKey,
      lamports: bigAmount.multipliedBy(LAMPORTS_PER_SOL).toNumber(),
      toPubkey: sellerPublicKey,
    });

    transferInstruction.keys.push({
      pubkey: new PublicKey(orderId),
      isSigner: false,
      isWritable: false,
    });

    tx.add(transferInstruction);

    const serializedTransaction = tx.serialize({
      requireAllSignatures: false,
    });
    const base64 = serializedTransaction.toString("base64");

    const orderExists = await prisma.order.findFirst({
      where: {
        orderPublicKey: orderId,
      },
    });

    if (orderExists) {
      return new NextResponse("Cannot create the same order twice", {
        status: 400,
      });
    }

    const order = await prisma.order.create({
      data: {
        merchantId,
        customerPublicKey: buyerAddress,
        amount: new Prisma.Decimal(price),
        orderPublicKey: orderId,
        pageId,
      },
    });

    return NextResponse.json({
      transaction: base64,
      id: order.id,
    });
  } catch (error) {
    console.error("[CUSTOMER TRANSACTION]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
