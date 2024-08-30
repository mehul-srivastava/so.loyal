import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

import prisma from "@/lib/prisma";
import TransactionCharts from "./_components/transaction-charts";
import PaymentPagesTable from "./_components/pages-table";
import { Button } from "@/components/ui/button";

async function shouldRedirectToOnboarding(userId: string) {
  const merchant = await prisma.merchant.findFirst({
    where: {
      id: userId,
    },
  });

  return !merchant;
}

const page = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  (await shouldRedirectToOnboarding(userId)) && redirect("/dashboard/onboarding");

  return (
    <div className="p-14 px-40">
      <div className="flex w-full items-center justify-between">
        <div>
          <h2 className="text-3xl">Hello, Mehul Srivastava 👋</h2>
          <h4 className="text-xl text-gray-500">Welcome to so.loyal!</h4>
        </div>
        <Link href="/dashboard/payment-pages">
          <Button className="block" variant="secondary">
            Create Payment Page
          </Button>
        </Link>
      </div>
      <TransactionCharts />
      <PaymentPagesTable merchantId={userId} />
    </div>
  );
};

export default page;
