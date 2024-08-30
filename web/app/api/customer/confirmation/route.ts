import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { orderDbId, websiteName, customerWalletAddress, txSignature } = await request.json();

    if (!orderDbId) return new NextResponse("Order Id is missing", { status: 400 });
    if (!websiteName) return new NextResponse("Website name is missing", { status: 400 });
    if (!customerWalletAddress) return new NextResponse("customer wallet address is missing", { status: 400 });
    if (!txSignature) return new NextResponse("txSignature is missing", { status: 400 });

    await prisma.$transaction([
      prisma.order.update({
        where: {
          id: orderDbId,
        },
        data: {
          status: {
            set: "CONFIRMED",
          },
        },
      }),
      prisma.history.create({
        data: {
          websiteName,
          txSignature,
          customerWalletAddress,
        },
      }),
    ]);

    return NextResponse.json({});
  } catch (error) {
    console.log("[CUSTOMER CONFIRMATION]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
