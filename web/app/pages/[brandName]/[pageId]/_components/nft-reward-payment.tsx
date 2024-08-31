"use client";

import axios from "axios";
import React, { useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { Keypair, PublicKey, Transaction } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { findReference } from "@solana/pay";
import { percentAmount, generateSigner, signerIdentity, createSignerFromKeypair } from "@metaplex-foundation/umi";
import { TokenStandard, createAndMint, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";

import secret from "@/secret.json";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConnectThirdPartyWalletButton } from "@/components/ConnectWalletButton";
import { getNftsProgram } from "@/anchor/nfts_pages/setup";
import { IPaymentPageCustomerContext, PaymentPageCustomerContext } from "@/components/providers/payment-page-customer-provider";

interface IProductPayment {
  programPublicKey: string;
  params: {
    brandName: string;
    pageId: string;
  };
  merchantId: string;
  merchantWalletAddress: string;
  merchantWebsiteName: string;
}

interface IContractData {
  title: string;
  description: string;
  stampCount?: number;
  pointCount?: number;
  price: number;
  image: string;
}

const metadata = {
  name: "Soloyal Coupons",
  symbol: "SLC",
  uri: "https://gist.githubusercontent.com/mehul-srivastava/edcc3207a270f176def355760b4cf877/raw/e5e76db7538e4dee2c8e7bd45ed40e681d7df6c0/token.json",
};

const StampRewardPayment = ({ programPublicKey, params, merchantWalletAddress, merchantId, merchantWebsiteName }: IProductPayment) => {
  const [data, setData] = useState<IContractData>();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isRunningTransaction, setIsRunningTransaction] = useState(false);
  const { data: contextData, appendData } = useContext(PaymentPageCustomerContext) as IPaymentPageCustomerContext;

  const { connection } = useConnection();
  const customerWallet = useWallet();

  const order = useMemo(
    () => ({
      buyerAddress: customerWallet.publicKey?.toString(),
      orderId: Keypair.generate().publicKey.toString(),
      price: Number(data?.price.toFixed(2)!),
      sellerAddress: merchantWalletAddress,
    }),
    [customerWallet.publicKey, data],
  );

  async function getNftsData() {
    const program = getNftsProgram("" as any);
    const publicKey = new PublicKey(programPublicKey);
    const data = await program.account.nftsPage.fetch(publicKey);
    setData(data);
    setIsPageLoading(false);
  }

  function showStamps() {
    appendData({ count: contextData.count! + 1 });
  }

  async function processTransaction() {
    try {
      setIsRunningTransaction(true);

      const { txResponse, txHash } = await initiliazeTransaction();

      while (true) {
        await new Promise((res, rej) => setTimeout(res, 1000));
        try {
          const result = await findReference(connection, new PublicKey(order.orderId));
          if (result.confirmationStatus === "confirmed" || result.confirmationStatus === "finalized") break;
        } catch (error) {
          console.log("not found");
        }
      }

      await axios.post("/api/customer/confirmation", {
        orderDbId: txResponse.data.id,
        websiteName: merchantWebsiteName,
        txSignature: txHash,
        customerWalletAddress: order.buyerAddress,
      });

      showStamps();
      toast.success("Your purchase was successful!");
      setTimeout(() => window.location.reload(), 2000);
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

    return { txResponse, txHash };
  }

  useEffect(() => {
    getNftsData();
  }, []);

  if (isPageLoading) {
    return (
      <div className="fixed left-0 top-0 z-[100] grid h-screen w-screen place-items-center bg-white">
        <div className="flex flex-col items-center justify-center">
          <Loader2 className="h-28 w-28 animate-spin text-8xl font-thin" />
          <p className="space mt-4 font-medium uppercase tracking-widest">Fetching page from chain</p>
        </div>
      </div>
    );
  }

  if (!customerWallet.connected) {
    return (
      <div className="fixed left-0 top-0 z-[100] grid h-screen w-screen place-items-center bg-white">
        <div className="flex flex-col items-center justify-center">
          <ConnectThirdPartyWalletButton />
          <p className="space mt-4 max-w-80 text-center font-medium uppercase tracking-widest">You must connect to your wallet before proceeding</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <small>Product Price</small>
      <Input value={`SOL ${data?.price!.toFixed(8).replace(/0+$/, "")}`} disabled readOnly className="bg-gray-300" />
      <Button className="mt-4 w-full disabled:pointer-events-none disabled:select-none disabled:opacity-40" variant={"secondary"} disabled={isRunningTransaction} onClick={processTransaction}>
        Pay Solana {isRunningTransaction && <Loader2 className="ml-2 animate-spin" size={14} />}
      </Button>
    </>
  );
};

export default StampRewardPayment;
