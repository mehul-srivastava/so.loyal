"use client";

import axios from "axios";
import React, { useContext, useState } from "react";
import toast, { LoaderIcon } from "react-hot-toast";
import { Keypair, SystemProgram } from "@solana/web3.js";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getNftsProgram } from "@/anchor/nfts_pages/setup";
import { Dialog, DialogTrigger, DialogDescription, DialogFooter, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { type IPaymentPageDataContext, PaymentPageDataContext } from "@/components/providers/payment-page-data-provider";
import { formatInput } from "@/lib/utils";

type INftsPublishButtonProps = {
  params: { brandName: string };
  searchParams: { type: string };
};

const NftsPublishButton = ({ params, searchParams }: INftsPublishButtonProps) => {
  const [loading, setLoading] = useState(false);
  const { data, appendData } = useContext(PaymentPageDataContext) as IPaymentPageDataContext;
  const type = searchParams.type;

  const router = useRouter();
  const wallet = useAnchorWallet();
  const { publicKey } = useWallet();

  function handler(e: React.ChangeEvent<HTMLInputElement>) {
    appendData({ [e.target.name]: formatInput(e.target.value) });
  }

  async function handleClick() {
    setLoading(true);
    try {
      const account = new Keypair();
      await axios.post("/api/merchant/pages", {
        slug: data.slug!,
        accountPublicKey: account.publicKey.toString(),
        type,
      });

      await putNftsOnChain(account);

      const route = `/pages/${params.brandName}/${data.slug!}`;
      toast.success("Your page has been published!");

      setTimeout(() => {
        router.push(route);
        router.refresh();
      }, 3000);
    } catch (error) {
      toast.error("Something went wrong!");
      setLoading(false);
    }
  }

  async function putNftsOnChain(account: Keypair) {
    const program = getNftsProgram(wallet!); // #2: This is the program object which contains all the methods

    const txnSignature = await program.methods
      .initializePage(data.title!, data.description!, data.price!, data.nft_count!, "https://img.freepik.com/free-photo/delicious-coffee-beans-cup_23-2150691429.jpg")
      .accounts({
        pageAccount: account.publicKey, // #3: Page account is basically the owner of this payment page as mentioned in #1
        user: publicKey!, // #4: Use wallet's public key because the end-user is going to pay the gas fee
        systemProgram: SystemProgram.programId, // #5: Ignore!
      })
      .signers([account])
      .rpc();

    console.log(`View transaction on https://solana.fm/tx/${txnSignature}?cluster=devnet-alpha`);

    return account.publicKey.toString();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="fixed right-10 top-4 z-50 disabled:pointer-events-none disabled:select-none disabled:opacity-45"
          disabled={!data.title || !data.description || !data.price || !data.nft_count}
          variant="default"
          size="sm"
        >
          Finish
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium">Settings</DialogTitle>
          <DialogDescription>Add a custom slug for this payment page and you're good to publish it 👍</DialogDescription>
        </DialogHeader>
        <div className="pb-4">
          <Label htmlFor="name" className="text-right">
            Custom Slug
          </Label>
          <div className="flex">
            <span className="inline-flex items-center rounded-md rounded-e-none border border-e-0 border-gray-300 bg-gray-100 px-3 text-sm">
              /{params.brandName.slice(0, 10).concat(params.brandName.length > 10 ? "..." : "")}/
            </span>
            <Input name="slug" onChange={handler} placeholder="an-amazing-slug" className="col-span-3 rounded-s-none border-s-0 border-gray-300 !ring-0" />
          </div>
        </div>
        <DialogFooter>
          <Button size="sm" disabled={!data.slug || loading} className="disabled:pointer-events-none disabled:select-none disabled:opacity-45" onClick={handleClick}>
            Publish {loading && <LoaderIcon className="ml-2" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NftsPublishButton;
