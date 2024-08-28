import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { buyerAddress, orderId, price, merchantId, pageId } =
      await request.json();

    await prisma.order.create({
      data: {
        merchantId,
        customerPublicKey: buyerAddress,
        amount: price,
        orderPublicKey: orderId,
        pageId,
      },
    });

    return NextResponse.json({});
  } catch (error) {
    console.log("[CUSTOMER CONFIRMATION]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
