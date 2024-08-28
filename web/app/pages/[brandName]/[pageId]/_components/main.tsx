"use client";

import React, { useEffect, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

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

const Main = ({ merchant, page, params }: MainProps) => {
  const wallet = useAnchorWallet();
  const [data, setData] = useState<IPageData>();

  const fetchOnchainData = async () => {
    const program = getStampsProgram(wallet!); // #2: This is the program object which contains all the methods
    const publicKey = new PublicKey(page?.programPublicKey!);

    const data = await program.account.stampsPage.fetch(publicKey);
    setData(data);
  };

  useEffect(() => {
    fetchOnchainData();
  }, []);

  const borderStyles = { borderColor: merchant?.brandColor };

  if (!data?.title) {
    return (
      <div className="grid place-items-center">
        <Loader2Icon className="h-28 w-28 animate-spin text-8xl font-thin" />
        Fetching page from chain...
      </div>
    );
  }

  return (
    <div className="relative mx-auto grid max-w-7xl items-center gap-6 px-6 py-6 md:grid-cols-2 lg:gap-36">
      <div className="md:no-scrollbar grid items-center justify-center gap-4 md:h-[90vh] md:gap-10 md:overflow-auto">
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
              value={`USD ${data.price}`}
              disabled
              readOnly
              className="bg-gray-300"
            />
            <Button className="mt-4 w-full" variant={"secondary"}>
              Pay with SolanaPay
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
