import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { FileDigit, Gift, Stamp, WalletCards } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const rewardPrograms = [
  {
    title: "Buy X, Get 1 Free",
    type: "stamp",
    description: "The classic coffee stamp reward. Treat your repeat customers with a freebie after every X purchases.",
    icon: Gift,
  },
  {
    title: "NFT Rewards",
    type: "nft",
    description: "Products come with a unique NFT versions of them which is automatically added to the user's wallet on checkout.",
    icon: WalletCards,
  },
];

const page = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const merchant = await prisma.merchant.findFirst({
    where: {
      id: userId!,
    },
    select: {
      websiteName: true,
    },
  });

  const route = `/pages/${merchant!.websiteName}/create`;

  return (
    <div className="h-auto p-14 px-40">
      <h2 className="text-3xl">Create New Payment Page 💰</h2>
      <h4 className="text-xl text-gray-500">Choose one of the programs below that you want to implment on your page</h4>

      <div className="mt-10 grid grid-cols-3 gap-6">
        {rewardPrograms.map(({ icon: Icon, ...program }) => (
          <Link href={route.concat(`?type=${program.type}`)}>
            <div className="cursor-pointer rounded-lg border border-gray-500 p-6 shadow-md transition-all duration-150 hover:border-green-400 hover:bg-black/95">
              <Icon className="mb-4 h-12 w-12" />
              <h3 className="text-2xl">{program.title}</h3>
              <p className="mt-2 text-gray-400">{program.description}</p>
            </div>
          </Link>
        ))}

        <div className="relative select-none rounded-lg border border-gray-500 p-6 opacity-50 shadow-md transition-all duration-150">
          <FileDigit className="mb-4 h-12 w-12" />
          <h3 className="text-2xl">Points Program</h3>
          <p className="mt-2 text-gray-400">Reward loyal customers with points for each purchase. They can later redeem these points instead of purchasing the product.</p>
          <span className="absolute right-0 top-0 rounded-bl-[inherit] rounded-tr-[inherit] bg-green-700 p-2">Coming Soon</span>
        </div>
        <div className="relative select-none rounded-lg border border-gray-500 p-6 opacity-50 shadow-md transition-all duration-150">
          <Stamp className="mb-4 h-12 w-12" />
          <h3 className="text-2xl">Collateral Pay</h3>
          <p className="mt-2 text-gray-400">
            Allow customers to lock SOL as collateral instead of paying upfront. Merchants can use gains on the locked assets to gain their profits, and customers get their crypto back once the
            payment is complete.
          </p>
          <span className="absolute right-0 top-0 rounded-bl-[inherit] rounded-tr-[inherit] bg-green-700 p-2">Coming Soon</span>
        </div>
      </div>
    </div>
  );
};

export default page;
