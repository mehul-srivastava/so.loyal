import { Gift, Stamp } from "lucide-react";

const page = () => {
  return (
    <div className="p-14 px-40">
      <h1 className="text-4xl">Choose a rewards program</h1>
      <h3 className="text-2xl text-gray-600/80">Pick one from our templates</h3>

      <div className="mt-10 grid grid-cols-3 gap-x-6">
        <div className="cursor-pointer rounded-lg border border-gray-500 p-6 shadow-md transition-all duration-150 hover:border-green-400 hover:bg-black/95">
          <Gift className="mb-4 h-12 w-12" />
          <h3 className="text-2xl">Buy X, Get 1 Free</h3>
          <p className="mt-2 text-gray-400">
            The classic coffee stamp reward. Treat your repeat customers with a
            freebie after every X purchases.
          </p>
        </div>

        <div className="cursor-pointer rounded-lg border border-gray-500 p-6 shadow-md transition-all duration-150 hover:border-green-400 hover:bg-black/95">
          <Stamp className="mb-4 h-12 w-12" />
          <h3 className="text-2xl">Points program</h3>
          <p className="mt-2 text-gray-400">
            Reward loyal customers with points for each purchase. You can add
            more prizes over time, and based on the level of loyalty.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
