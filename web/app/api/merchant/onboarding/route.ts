import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    const {
      websiteName,
      websiteLink,
      brandColor,
      supportEmail,
      supportPhone,
      walletPublicAddress,
    } = await request.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const merchant = await prisma.merchant.findFirst({
      where: {
        OR: [
          { supportPhone },
          { websiteLink },
          { websiteName },
          { id: userId },
        ],
      },
    });

    if (merchant) {
      return new NextResponse("Account already exists", { status: 401 });
    }

    await prisma.merchant.create({
      data: {
        id: userId,
        websiteName,
        websiteLink,
        brandColor,
        supportEmail,
        supportPhone,
        walletPublicAddress,
      },
    });
    return NextResponse.json({});
  } catch (error) {
    console.log("[ONBOARDING]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
