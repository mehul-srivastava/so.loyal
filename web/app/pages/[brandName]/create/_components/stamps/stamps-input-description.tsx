"use client";

import {
  IPaymentPageDataContext,
  PaymentPageDataContext,
} from "@/components/providers/payment-page-data-provider";
import { Input } from "@/components/ui/input";
import { useContext } from "react";

const StampsInputDescription = () => {
  const { appendData } = useContext(PaymentPageDataContext) as IPaymentPageDataContext;

  function handler(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    appendData({ [e.target.name]: parseInt(e.target.value) });
  }
  return (
    <div>
      <p>
        <span className="underline">LOYALTY PROGRAM:</span> Introducing our exciting loyalty
        program! Earn a stamp with every purchase and unlock a freebie after collecting a certain
        number of stamps. It's our way of thanking you for being a loyal customer. Start collecting
        those stamps and treat yourself to a freebie after every X purchases. Happy rewarding!
      </p>
      <div className="mt-4">
        <Input
          type="number"
          max={15}
          min={1}
          onChange={handler}
          name="stamp_count"
          className="border border-gray-300 bg-white"
          placeholder="Enter no. of stamps to unlock a freebie"
        />
      </div>
    </div>
  );
};

export default StampsInputDescription;
