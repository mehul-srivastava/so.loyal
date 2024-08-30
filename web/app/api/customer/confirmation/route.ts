import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { orderDbId, websiteName, customerWalletAddress } = await request.json();

    if (!orderDbId) return new NextResponse("Order Id is missing");
    if (!websiteName) return new NextResponse("Website name is missing");
    if (!customerWalletAddress) return new NextResponse("customer wallet address is missing");

    await prisma.order.update({
      where: {
        id: orderDbId,
      },
      data: {
        status: {
          set: "CONFIRMED",
        },
      },
    });

    const history = await prisma.history.findFirst({
      where: {
        customerWalletAddress,
      },
    });

    let count = 1;
    if (history) {
      const updated = await prisma.history.update({
        data: {
          stampCount: {
            increment: 1,
          },
        },
        where: {
          id: history.id,
        },
      });

      count = updated.stampCount;
    } else {
      await prisma.history.create({
        data: {
          websiteName,
          stampCount: 1,
          type: "stamps",
          customerWalletAddress,
        },
      });
    }

    return NextResponse.json({ stampsCount: count });
  } catch (error) {
    console.log("[CUSTOMER CONFIRMATION]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
