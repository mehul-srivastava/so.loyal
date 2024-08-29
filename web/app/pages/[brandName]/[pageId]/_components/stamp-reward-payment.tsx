"use client";

import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { Keypair, PublicKey, Transaction } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getStampsProgram } from "@/anchor/stamps/setup";
import { ConnectThirdPartyWalletButton } from "@/components/ConnectWalletButton";
import { findReference, FindReferenceError } from "@solana/pay";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Prisma } from "@prisma/client";

interface IProductPayment {
  programPublicKey: string;
  params: {
    brandName: string;
    pageId: string;
  };
  merchantId: string;
  merchantWalletAddress: string;
}

interface IContractData {
  title: string;
  description: string;
  stampCount?: number;
  pointCount?: number;
  price: number;
  image: string;
}

const StampRewardPayment = ({
  programPublicKey,
  params,
  merchantWalletAddress,
  merchantId,
}: IProductPayment) => {
  const [data, setData] = useState<IContractData>();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isRunningTransaction, setIsRunningTransaction] = useState(false);

  const { connection } = useConnection();
  const customerWallet = useWallet();
  const router = useRouter();

  const order = useMemo(
    () => ({
      buyerAddress: customerWallet.publicKey?.toString(),
      orderId: Keypair.generate().publicKey.toString(),
      price: Number(data?.price.toFixed(2)!),
      sellerAddress: merchantWalletAddress,
    }),
    [customerWallet.publicKey, data],
  );

  async function getStampsData() {
    const program = getStampsProgram("" as any);
    const publicKey = new PublicKey(programPublicKey);
    const data = await program.account.stampsPage.fetch(publicKey);
    setData(data);
    setIsPageLoading(false);
  }

  async function processTransaction() {
    try {
      setIsRunningTransaction(true);

      const txResponse = await initiliazeTransaction();

      let count = 0,
        time: any;
      time = setInterval(async () => {
        const result = await findReference(connection, new PublicKey(order.orderId));
        if (result.confirmationStatus === "confirmed") {
          if (count !== 0) return;

          await axios.post("/api/customer/confirmation", {
            orderDbId: txResponse.data.id,
          });
          toast.success("Your purchase was successful!");
          setTimeout(() => router.refresh(), 1000);
          clearInterval(time);
          count++;
        }
      }, 1000);
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    } finally {
      setIsRunningTransaction(false);
    }
  }

  async function initiliazeTransaction() {
    const txResponse = await axios.post("/api/customer/transaction", {
      ...order,
      merchantId: merchantId,
      pageId: params.pageId,
    });
    const tx = Transaction.from(Buffer.from(txResponse.data.transaction, "base64"));
    const txHash = await customerWallet.sendTransaction(tx, connection);
    console.log(`Transaction sent: https://explorer.solana.com/tx/${txHash}?cluster=devnet`);

    return txResponse;
  }

  useEffect(() => {
    getStampsData();
  }, []);

  if (isPageLoading) {
    return (
      <div className="fixed left-0 top-0 z-[100] grid h-screen w-screen place-items-center bg-white">
        <div className="flex flex-col items-center justify-center">
          <Loader2 className="h-28 w-28 animate-spin text-8xl font-thin" />
          <p className="space mt-4 font-medium uppercase tracking-widest">
            Fetching page from chain
          </p>
        </div>
      </div>
    );
  }

  if (!customerWallet.connected) {
    return (
      <div className="fixed left-0 top-0 z-[100] grid h-screen w-screen place-items-center bg-white">
        <div className="flex flex-col items-center justify-center">
          <ConnectThirdPartyWalletButton />
          <p className="space mt-4 max-w-80 text-center font-medium uppercase tracking-widest">
            You must connect to your wallet before proceeding
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <small>Product Price</small>
      <Input value={`SOL ${data?.price}`} disabled readOnly className="bg-gray-300" />
      <Button
        className="mt-4 w-full disabled:pointer-events-none disabled:select-none disabled:opacity-40"
        variant={"secondary"}
        disabled={isRunningTransaction}
        onClick={processTransaction}
      >
        Pay using SOL {isRunningTransaction && <Loader2 className="ml-2 animate-spin" size={14} />}
      </Button>
    </>
  );
};

export default StampRewardPayment;
