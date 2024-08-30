"use client";

import React, { useContext } from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IPaymentPageDataContext, PaymentPageDataContext } from "@/components/providers/payment-page-data-provider";

const ProductDetails = () => {
  const { appendData } = useContext(PaymentPageDataContext) as IPaymentPageDataContext;

  function handler(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    appendData({ [e.target.name]: e.target.value });
  }
  return (
    <div>
      <div>
        <h4 className="my-0 font-semibold">Title</h4>
        <Input className="mb-4 border-gray-200 bg-white" onChange={handler} name="title" placeholder="Your amazing product title here" />
      </div>
      <div>
        <h4 className="my-0 font-semibold">Description</h4>
        <Textarea
          onChange={handler}
          name="description"
          placeholder="This is where the amazing description for your out-of-the-world product goes. The product is so amazing, it is going to sell like anything"
        ></Textarea>
      </div>
    </div>
  );
};

export default ProductDetails;
