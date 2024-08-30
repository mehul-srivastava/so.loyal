"use client";

import React, { useContext, useEffect, useState } from "react";

import { Loader2, Lock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { IPaymentPageCustomerContext, PaymentPageCustomerContext } from "@/components/providers/payment-page-customer-provider";
import Image from "next/image";
import axios from "axios";
import { useWallet } from "@solana/wallet-adapter-react";
import { getStampsProgram } from "@/anchor/stamps_pages/setup";
import { PublicKey } from "@solana/web3.js";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface IStampRewardCardProps {
  websiteName: string;
  programPublicKey: string;
  pageId: string;
}

const StampRewardCard = ({ websiteName, programPublicKey, pageId }: IStampRewardCardProps) => {
  const { data, appendData } = useContext(PaymentPageCustomerContext) as IPaymentPageCustomerContext;
  const count = data.count!;

  const [isLoading, setIsLoading] = useState(false);

  const { publicKey, connected } = useWallet();
  const router = useRouter();

  async function getStampsCount() {
    const response = await axios.post("/api/customer/get-data", {
      walletPublicAddress: publicKey,
      websiteName,
    });

    const program = getStampsProgram("" as any);
    const data = await program.account.stampsPage.fetch(new PublicKey(programPublicKey));
    appendData({ requiredCount: data.stampCount, count: response.data.count });
  }

  async function processTransaction() {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/customer/free", {
        customerPublicKey: publicKey,
        websiteName,
        requiredCount: data?.requiredCount,
        pageId,
      });

      toast.success("Paid successfully using stamps!");
      appendData({ count: response.data.leftCount });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  }

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    if (connected) getStampsCount();
  }, [publicKey]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stamps Collection</CardTitle>
        <CardDescription>Get a stamp on your card after every purchase. You can unlock a freebie after every X purchases.</CardDescription>
      </CardHeader>
      <CardContent>
        {count <= 0 && (
          <div className="flex items-center justify-center gap-x-4">
            <p className="text-6xl">😞</p>
            <div className="text-gray-500">
              <p>You haven't unlocked any stamp cards yet.</p>
              <p>Please make a purchase to unlock one</p>
            </div>
          </div>
        )}

        {count > 0 && (
          <div className="mx-auto grid max-w-80 grid-cols-5 gap-4">
            {Array.from(new Array(count)).map((item, idx) => (
              <Image src="/stamp.svg" alt="stamp" height={32} width={32} key={idx} />
            ))}
          </div>
        )}
        <div className="mt-5">
          {count >= data.requiredCount! ? (
            <Button className="mt-5 w-full disabled:pointer-events-none disabled:select-none disabled:opacity-45" onClick={processTransaction} disabled={isLoading}>
              Get item for free {isLoading ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : <Sparkles className="ml-2 h-4 w-4" />}
            </Button>
          ) : (
            <Button className="mt-5 w-full" disabled>
              You need to collect {data.requiredCount} stamp cards <Lock className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StampRewardCard;
