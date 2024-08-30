"use client";

import React, { useEffect, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { Loader2 } from "lucide-react";
import { Merchant } from "@prisma/client";

import { getStampsProgram } from "@/anchor/stamps_pages/setup";
import { getNftsProgram } from "@/anchor/nfts_pages/setup";
import StampRewardDescription from "./stamp-reward-description";

interface IProductMetadata {
  type: string;
  programPublicKey: string;
  merchant: Pick<Merchant, "id" | "supportEmail" | "supportPhone" | "walletPublicAddress" | "brandColor" | "websiteName">;
}

interface IContractData {
  title: string;
  description: string;
  stampCount?: number;
  pointCount?: number;
  price: number;
  image: string;
}

const ProductMetadata = ({ type, programPublicKey, merchant }: IProductMetadata) => {
  const [data, setData] = useState<IContractData>();
  const [loading, setLoading] = useState(true);

  async function getStampsData() {
    const program = getStampsProgram("" as any);
    const publicKey = new PublicKey(programPublicKey);
    const data = await program.account.stampsPage.fetch(publicKey);
    setData(data);
    setLoading(false);
  }

  async function getNftsData() {
    const program = getNftsProgram("" as any);
    const publicKey = new PublicKey(programPublicKey);
    const data = await program.account.nftsPage.fetch(publicKey);
    console.log(data);
    setData(data);
    setLoading(false);
  }

  useEffect(() => {
    if (type === "stamp") getStampsData();
    if (type === "nft") getNftsData();
  }, []);

  const borderStyles = { borderColor: merchant.brandColor };

  if (loading) {
    return (
      <div className="fixed left-0 top-0 z-[100] grid h-screen w-screen place-items-center bg-white">
        <div className="flex flex-col items-center justify-center">
          <Loader2 className="h-28 w-28 animate-spin text-8xl font-thin" />
          <p className="space mt-4 font-medium uppercase tracking-widest">Fetching page from chain</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <div className="grid gap-4 p-1">
        <h1 className="relative text-5xl font-bold">
          {merchant.websiteName} <span className="absolute -bottom-2 left-0 w-14 border-b-4" style={borderStyles}></span>
        </h1>
        <div className="grid gap-4 text-sm leading-loose">
          <div>
            <div>
              <h4 className="mt-4 text-xl font-semibold">{data?.title}</h4>
            </div>
            <div>
              <h4 className="mt-2 text-lg font-normal">{data?.description}</h4>
            </div>
          </div>
          <div className="mt-4">
            {type === "stamp" && <StampRewardDescription stampCount={data?.stampCount} />}
            {/* {type === "nft" && <PointRewardDescription pointCount={data.pointCount} />} */}
          </div>
          <div className="mt-4">
            <h4 className="text-xl font-semibold">Contact Us</h4>
            <p>Email: {merchant.supportEmail}</p>
            <p>Phone: {merchant.supportPhone}</p>
          </div>
        </div>
        <img src={data?.image} alt="Product Image" width={600} height={400} className="aspect-[4/2] w-full overflow-hidden rounded-lg border object-cover" />
      </div>
    </div>
  );
};

export default ProductMetadata;
