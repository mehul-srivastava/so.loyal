import { NextRequest, NextResponse } from "next/server";
import { Keypair } from "@solana/web3.js";
import { auth } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();

    const { slug, account } = await request.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const page = await prisma.pages.create({
      data: {
        id: slug,
        merchantId: userId,
        programPublicKey: account.publicKey.toString(),
      },
    });

    return NextResponse.json({ programAccount: account });
  } catch (error) {
    console.log("[PAYMENT PAGES]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
