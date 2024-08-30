import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { pageId, customerPublicKey, websiteName, requiredCount } = await request.json();
    if (!pageId) return new NextResponse("Missing field", { status: 400 });
    if (!customerPublicKey) return new NextResponse("Missing field", { status: 400 });
    if (!websiteName) return new NextResponse("Missing field", { status: 400 });

    await prisma.$transaction(async (tx) => {
      await tx.order.create({
        data: {
          merchantId: websiteName,
          pageId,
          amount: 0,
          customerPublicKey,
          status: "CONFIRMED",
        },
      });

      const history = await tx.history.findMany({
        where: {
          customerWalletAddress: customerPublicKey,
          websiteName,
          used: false,
        },
        take: requiredCount,
      });

      const historyIds = history.map((item: any) => item.id);

      await tx.history.updateMany({
        where: {
          id: { in: historyIds },
        },
        data: {
          used: true,
        },
      });
    });

    return NextResponse.json({});
  } catch (error) {
    console.log("[CUSTOMER FREE STAMP]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
