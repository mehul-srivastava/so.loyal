import { NextRequest, NextResponse } from "next/server";
import { Keypair } from "@solana/web3.js";
import { auth } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();

    const { slug, accountPublicKey } = await request.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await prisma.pages.create({
      data: {
        id: slug,
        merchantId: userId,
        programPublicKey: accountPublicKey,
      },
    });

    return NextResponse.json({});
  } catch (error) {
    console.log("[PAYMENT PAGES]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}