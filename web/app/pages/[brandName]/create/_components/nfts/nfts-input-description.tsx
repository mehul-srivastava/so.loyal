"use client";

import { useContext } from "react";

import { IPaymentPageDataContext, PaymentPageDataContext } from "@/components/providers/payment-page-data-provider";
import { Input } from "@/components/ui/input";

const NftsInputDescription = () => {
  const { appendData } = useContext(PaymentPageDataContext) as IPaymentPageDataContext;

  function handler(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    appendData({ [e.target.name]: parseInt(e.target.value) });
  }
  return (
    <div>
      <p>
        <span className="underline">LOYALTY PROGRAM:</span> Discover the future of loyalty rewards with our NFT-based coupons! Each NFT coupon represents a loyalty incentive, offering a secure and
        transparent way to earn and redeem rewards. Say goodbye to physical cards and hello to a modern, efficient loyalty program. Start collecting your NFT coupons today and enjoy seamless tracking
        and exclusive perks!
      </p>
      <div className="mt-4">
        <Input type="number" max={15} min={1} onChange={handler} name="nft_count" className="border border-gray-300 bg-white" placeholder="Enter no. of coupons to unlock a freebie (e.g. 4)" />
      </div>
    </div>
  );
};

export default NftsInputDescription;
