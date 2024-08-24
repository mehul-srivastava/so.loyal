import { Gift, Stamp, WalletCards } from "lucide-react";

const page = () => {
  return (
    <div className="p-14 px-40 h-auto">
      <h2 className="text-3xl">Create New Payment Page 💰</h2>
      <h4 className="text-xl text-gray-500">
        Choose one of the programs below that you want to implment on your page
      </h4>

      <div className="mt-10 grid grid-cols-3 gap-6">
        <div className="cursor-pointer rounded-lg border border-gray-500 p-6 shadow-md transition-all duration-150 hover:border-green-400 hover:bg-black/95">
          <Gift className="mb-4 h-12 w-12" />
          <h3 className="text-2xl">Buy X, Get 1 Free</h3>
          <p className="mt-2 text-gray-400">
            The classic coffee stamp reward. Treat your repeat customers with a freebie
            after every X purchases.
          </p>
        </div>

        <div className="cursor-pointer rounded-lg border border-gray-500 p-6 shadow-md transition-all duration-150 hover:border-green-400 hover:bg-black/95">
          <Stamp className="mb-4 h-12 w-12" />
          <h3 className="text-2xl">Points program</h3>
          <p className="mt-2 text-gray-400">
            Reward loyal customers with points for each purchase. They can later redeem
            these points instead of purchasing the product.
          </p>
        </div>

        <div className="cursor-pointer rounded-lg border border-gray-500 p-6 shadow-md transition-all duration-150 hover:border-green-400 hover:bg-black/95">
          <WalletCards className="mb-4 h-12 w-12" />
          <h3 className="text-2xl">NFT Rewards</h3>
          <p className="mt-2 text-gray-400">
            Products come with a unique NFT versions of them which is automatically added
            to the user's wallet on checkout.
          </p>
        </div>

        <div className="relative rounded-lg select-none border border-gray-500 p-6 shadow-md opacity-50 transition-all duration-150">
          <Stamp className="mb-4 h-12 w-12" />
          <h3 className="text-2xl">Collateral Pay</h3>
          <p className="mt-2 text-gray-400">
            Allow customers to lock SOL as collateral instead of paying upfront. Merchants
            can use gains on the locked assets to gain their profits, and customers get
            their crypto back once the payment is complete.
          </p>
          <span className="absolute top-0 right-0 rounded-tr-[inherit] rounded-bl-[inherit] p-2 bg-green-700">
            Coming Soon
          </span>
        </div>
      </div>
    </div>
  );
};

export default page;
