import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { websiteName, walletPublicAddress } = await request.json();

  const history = await prisma.history.findFirst({
    where: {
      websiteName: websiteName,
      customerWalletAddress: walletPublicAddress,
    },
  });

  return NextResponse.json({
    count: history?.stampCount || 0,
  });
}
