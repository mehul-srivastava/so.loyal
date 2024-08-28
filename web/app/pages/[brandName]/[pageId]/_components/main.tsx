"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Keypair, PublicKey, Transaction } from "@solana/web3.js";
import { findReference, FindReferenceError } from "@solana/pay";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2Icon, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getStampsProgram } from "@/anchor/stamps/setup";
import { ConnectThirdPartyWalletButton } from "@/components/ConnectWalletButton";
import axios from "axios";
import { LoaderIcon } from "react-hot-toast";

type MainProps = {
  merchant: {
    id: string;
    websiteName: string;
    walletPublicAddress: string;
    supportPhone: string;
    supportEmail: string;
    brandColor: string;
  } | null;

  page: {
    id: string;
    programPublicKey: string;
  } | null;

  params: {
    brandName: string;
    pageId: string;
  };
};

interface IPageData {
  title: string;
  description: string;
  price: number;
  stampCount: number;
  image: string;
}

const STATUS = {
  Initial: "Initial",
  Submitted: "Submitted",
  Paid: "Paid",
};

const Main = ({ merchant, page, params }: MainProps) => {
  const [data, setData] = useState<IPageData>();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(STATUS.Initial);

  const anchorWallet = useAnchorWallet();
  const customerWallet = useWallet();
  const { connection } = useConnection();

  const orderId = useMemo(() => Keypair.generate().publicKey, []);
  const order = useMemo(
    () => ({
      buyerAddress: customerWallet.publicKey?.toString(),
      orderId: orderId.toString(),
      price: Number(data?.price.toFixed(2)!),
      sellerAddress: merchant?.walletPublicAddress,
    }),
    [customerWallet.publicKey, orderId, data],
  );

  const fetchOnchainData = async () => {
    const program = getStampsProgram(anchorWallet!); // #2: This is the program object which contains all the methods
    const publicKey = new PublicKey(page?.programPublicKey!);

    const data = await program.account.stampsPage.fetch(publicKey);
    setData(data);
  };

  const processTransaction = async () => {
    setIsLoading(true);
    const txResponse = await axios.post("/api/customer/transaction", order);
    const txData = txResponse.data;

    const tx = Transaction.from(Buffer.from(txData.transaction, "base64"));
    console.log("Tx data is", tx);

    try {
      const txHash = await customerWallet.sendTransaction(tx, connection);
      console.log(
        `Transaction sent: https://solscan.io/tx/${txHash}?cluster=devnet`,
      );
      setPaymentStatus(STATUS.Submitted);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOnchainData();
  }, []);

  useEffect(() => {
    if (paymentStatus === STATUS.Submitted) {
      setIsLoading(true);
      const interval = setInterval(async () => {
        try {
          const result = await findReference(connection, orderId);
          console.log("Finding tx reference", result.confirmationStatus);
          if (
            result.confirmationStatus === "confirmed" ||
            result.confirmationStatus === "finalized"
          ) {
            clearInterval(interval);
            setPaymentStatus(STATUS.Paid);
            setIsLoading(false);
            await axios.post("/api/customer/confirmation", {
              buyerAddress: order.buyerAddress,
              merchantId: merchant?.id,
              price: order.price,
              orderId: order.orderId,
            });
            alert("Thank you for your purchase!");
          }
        } catch (e) {
          if (e instanceof FindReferenceError) {
            return null;
          }
          console.error("Unknown error", e);
        } finally {
          setIsLoading(false);
        }
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [paymentStatus]);

  const borderStyles = { borderColor: merchant?.brandColor };

  if (!data?.title) {
    return (
      <div className="grid place-items-center">
        <Loader2Icon className="h-28 w-28 animate-spin text-8xl font-thin" />
        <p className="space mt-4 font-medium uppercase tracking-widest">
          Fetching page from chain
        </p>
      </div>
    );
  }

  if (!customerWallet.connected) {
    return (
      <div className="grid place-items-center">
        <ConnectThirdPartyWalletButton />
        <p className="space mt-4 max-w-80 text-center font-medium uppercase tracking-widest">
          You must connect to your wallet before proceeding
        </p>
      </div>
    );
  }

  return (
    <div className="relative mx-auto grid max-w-7xl items-center gap-6 px-6 py-6 md:grid-cols-2 lg:gap-36">
      <div className="md:no-scrollbar grid items-center justify-center gap-4 md:h-[90vh] md:gap-10 md:overflow-auto">
        <div className="fixed right-10 top-4 z-50 disabled:pointer-events-none disabled:select-none disabled:opacity-45">
          <ConnectThirdPartyWalletButton />
        </div>
        <div className="flex items-center">
          <div className="grid gap-4 p-1">
            <h1 className="relative text-5xl font-bold">
              {merchant?.websiteName}{" "}
              <span
                className="absolute -bottom-2 left-0 w-14 border-b-4"
                style={borderStyles}
              ></span>
            </h1>
            <div className="grid gap-4 text-sm leading-loose">
              <div>
                <div>
                  <h4 className="mt-4 text-xl font-semibold">{data.title}</h4>
                </div>
                <div>
                  <h4 className="mt-2 text-lg font-normal">
                    {data.description}
                  </h4>
                </div>
              </div>
              <div className="mt-4">
                <div>
                  <p>
                    <span className="underline">LOYALTY PROGRAM:</span>{" "}
                    Introducing our exciting loyalty program! Earn a stamp with
                    every purchase and unlock a freebie after collecting a
                    certain number of stamps. It's our way of thanking you for
                    being a loyal customer. Start collecting those stamps and
                    treat yourself to a freebie after every {data.stampCount}{" "}
                    purchases. Happy rewarding!
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-xl font-semibold">Contact Us</h4>
                <p>Email: {merchant?.supportEmail}</p>
                <p>Phone: {merchant?.supportPhone}</p>
              </div>
            </div>
            <img
              src={data.image}
              alt="Product Image"
              width={600}
              height={400}
              className="aspect-[4/2] w-full overflow-hidden rounded-lg border object-cover"
            />
          </div>
        </div>
      </div>
      <div className="absolute left-1/2 top-1/2 hidden h-3/4 -translate-x-1/2 -translate-y-1/2 transform border-l border-muted-foreground md:block" />
      <div className="relative grid gap-6 md:gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
            <CardDescription>
              Following is the amount you have to pay. Alternatively, if you had
              enough stamps then you could pay using those.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <small>Product Price</small>
            <Input
              value={`SOL ${data.price}`}
              disabled
              readOnly
              className="bg-gray-300"
            />
            <Button
              className="mt-4 w-full disabled:pointer-events-none disabled:select-none disabled:opacity-40"
              variant={"secondary"}
              disabled={isLoading}
              onClick={processTransaction}
            >
              Pay with SolanaPay {isLoading && <LoaderIcon className="ml-2" />}
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Stamps Collection</CardTitle>
            <CardDescription>
              Get a stamp on your card after every purchase. You can unlock a
              freebie after every X purchases.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center gap-x-4">
              <p className="text-6xl">😞</p>
              <div className="text-gray-500">
                <p>You haven't unlocked any stamp cards yet.</p>
                <p>Please make a purchase to unlock one</p>
              </div>
            </div>
            {/* <div className="grid gap-4 grid-cols-5 max-w-80 mx-auto">
          <Image src="/stamp.svg" alt="stamp" height={32} width={32} />
        </div> */}
            <div className="mt-5">
              {/* <Button className="mt-5 w-full">
            Get item for free <Sparkles className="w-4 h-4 ml-2" />
          </Button> */}
              <Button className="mt-5 w-full" disabled>
                You need to collect 10 stamp cards{" "}
                <Lock className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Main;
