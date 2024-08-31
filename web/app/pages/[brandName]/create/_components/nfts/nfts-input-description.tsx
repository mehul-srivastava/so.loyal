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
        <span className="underline">LOYALTY PROGRAM:</span> Introducing our new loyalty rewards program using SLC (Soloyal Coupon) Tokens! With each purchase, you will receive SLC Tokens directly to
        your wallet which can be combined to redeem exclusive perks and discounts on future purchases from the same merchant. Start earning SLC Tokens today and enjoy seamless tracking of your loyalty
        rewards!
      </p>
      <div className="mt-4">
        <Input type="number" max={15} min={1} onChange={handler} name="nft_count" className="border border-gray-300 bg-white" placeholder="Enter no. of coupons to unlock a freebie (e.g. 4)" />
      </div>
    </div>
  );
};

export default NftsInputDescription;
