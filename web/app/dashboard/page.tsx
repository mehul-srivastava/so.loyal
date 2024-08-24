import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";
import TransactionCard from "./_components/transaction-charts";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
  (await shouldRedirectToOnboarding(userId!)) && redirect("/dashboard/onboarding");

  return (
    <div className="p-14 px-40">
      <h2 className="text-3xl">Hello, Mehul Srivastava 👋</h2>
      <h4 className="text-xl text-gray-500">Welcome to so.loyal!</h4>
      <TransactionCard />
      <Link href="/dashboard/payment-pages">
        <Button className="mt-10" variant="secondary">
          Create Payment Page
        </Button>
      </Link>
    </div>
  );
};

export default page;
