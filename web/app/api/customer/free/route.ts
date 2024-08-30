import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { pageId, customerPublicKey, websiteName, requiredCount } = await request.json();
    if (!pageId) return new NextResponse("Missing field", { status: 400 });
    if (!customerPublicKey) return new NextResponse("Missing field", { status: 400 });
    if (!websiteName) return new NextResponse("Missing field", { status: 400 });

    await prisma.order.create({
      data: {
        merchantId: websiteName,
        pageId,
        customerPublicKey,
        status: "CONFIRMED",
      },
    });

    const history = await prisma.history.findFirst({
      where: {
        customerWalletAddress: customerPublicKey,
      },
    });

    const leftCount = await prisma.history.update({
      where: {
        id: history!.id,
      },
      data: {
        stampCount: {
          decrement: requiredCount,
        },
      },
    });

    return NextResponse.json({ leftCount: leftCount.stampCount });
  } catch (error) {
    console.log("[CUSTOMER FREE STAMP]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
