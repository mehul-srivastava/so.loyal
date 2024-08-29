import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

interface IData {
  date: string;
  amount: number;
}

export async function GET() {
  const { userId } = auth();
  if (!userId) return new NextResponse("You are unauthorized", { status: 411 });

  const orders = await prisma.order.findMany({
    where: {
      merchantId: userId,
      status: "CONFIRMED",
    },
    select: {
      amount: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: "asc",
    },
  });

  let total = 0;

  const groupedOrders = orders.reduce((acc: any, order) => {
    const date = new Date(order.updatedAt).toISOString().split("T")[0];
    const amount = Number(order.amount);

    if (acc[date]) acc[date].amount += amount;
    else acc[date] = { date, amount };

    total += amount;

    return acc;
  }, {});

  let arr: IData[] = Object.values(groupedOrders).slice(0, 30) as IData[];

  if (arr.length < 30) {
    const times = 30 - arr.length;
    for (let i = 2; i < times; i++) {
      let today = new Date();
      today.setDate(today.getDate() - i + 1);

      arr.unshift({ date: today.toISOString().split("T")[0], amount: 0 });
    }
  }

  return NextResponse.json({
    chart: arr,
    total,
  });
}
