"use client";

import React, { useContext } from "react";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { type IPaymentPageDataContext, PaymentPageDataContext } from "@/components/providers/payment-page-data-provider";

const ProductSummary = () => {
  const { appendData } = useContext(PaymentPageDataContext) as IPaymentPageDataContext;

  function handler(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    appendData({ [e.target.name]: e.target.value });
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Summary</CardTitle>
        <CardDescription>Customers can pay easily using their favourite wallets. We got Phantom, Backpack, Solflare, Glow, Tiplink and many more.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="relative">
          <Input placeholder="SOL 0.034" type="number" name="price" onChange={handler} className="border-gray-200" />
          <small className="text-gray-400">Enter price for product in SOL</small>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductSummary;
