import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { orderDbId } = await request.json();

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

    return NextResponse.json({});
  } catch (error) {
    console.log("[CUSTOMER CONFIRMATION]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
