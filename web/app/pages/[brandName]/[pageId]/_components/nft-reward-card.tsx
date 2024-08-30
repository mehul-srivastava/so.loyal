"use client";

import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import axios from "axios";

import { Loader2, Lock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { IPaymentPageCustomerContext, PaymentPageCustomerContext } from "@/components/providers/payment-page-customer-provider";
import { getNftsProgram } from "@/anchor/nfts_pages/setup";

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

  async function getNftsRequiredCount() {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const customerPublicKey = new PublicKey(publicKey!);

    const program = getNftsProgram("" as any);
    const data = await program.account.nftsPage.fetch(new PublicKey(programPublicKey));

    try {
      const signatures = await connection.getSignaturesForAddress(customerPublicKey);
      const response = await axios.post("/api/customer/get-data", { signatures, websiteName });
      appendData({ requiredCount: data.nftCount, count: response.data.count });
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }

  async function processTransaction() {
    try {
      setIsLoading(true);
      await axios.post("/api/customer/free", {
        customerPublicKey: publicKey,
        websiteName,
        requiredCount: data?.requiredCount,
        pageId,
      });

      toast.success("Paid successfully using coupons!");
      appendData({ count: data.count! - data.requiredCount! });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  }

  useEffect(() => {
    if (connected) {
      getNftsRequiredCount();
    }
  }, [publicKey]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>SLC Tokens</CardTitle>
        <CardDescription>Get an SLC token that you can show-off to your friends. You can unlock a freebie after every X purchases.</CardDescription>
      </CardHeader>
      <CardContent>
        {count <= 0 && (
          <div className="flex items-center justify-center gap-x-4">
            <p className="text-6xl">😞</p>
            <div className="text-gray-500">
              <p>You haven't unlocked any tokens yet.</p>
              <p>Please make a purchase to unlock one</p>
            </div>
          </div>
        )}

        {count > 0 && (
          <p className="px-4 text-sm text-gray-700">
            You have {count} SLC token{count > 1 && "s"} in your wallet. You still need {data.requiredCount! - count} to enable a freebie.
          </p>
        )}
        <div className="mt-5">
          {count >= data.requiredCount! ? (
            <Button className="mt-5 w-full disabled:pointer-events-none disabled:select-none disabled:opacity-45" onClick={processTransaction} disabled={isLoading}>
              Get item for free {isLoading ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : <Sparkles className="ml-2 h-4 w-4" />}
            </Button>
          ) : (
            <Button className="mt-5 w-full" disabled>
              You need to collect {data.requiredCount} SLC tokens <Lock className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StampRewardCard;
