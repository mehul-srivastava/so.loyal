import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { signatures, websiteName } = await request.json();

  const signatureStrings = signatures.map((sig: any) => sig.signature);
  const availableNum = await prisma.history.count({
    where: {
      websiteName: websiteName,
      txSignature: { in: signatureStrings },
      used: false,
    },
  });

  return NextResponse.json({
    count: availableNum,
  });
}
