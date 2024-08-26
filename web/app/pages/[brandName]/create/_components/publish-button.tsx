"use client";

import React, { useContext, useState } from "react";
import { LoaderIcon } from "react-hot-toast";
import { Keypair } from "@solana/web3.js";

import {
  Dialog,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  type IPaymentPageDataContext,
  PaymentPageDataContext,
} from "@/components/providers/payment-page-context-provider";

const PublishButton = () => {
  const [loading, setLoading] = useState(false);
  const { data, appendData } = useContext(
    PaymentPageDataContext,
  ) as IPaymentPageDataContext;

  function handler(e: React.ChangeEvent<HTMLInputElement>) {
    appendData({ [e.target.name]: e.target.value });
  }

  function handleClick() {
    // first create a keypair
    const account = new Keypair();

    // save info to db with public key

    // save data on chain
    // redirect to view page
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="fixed right-10 top-4 z-50 disabled:pointer-events-none disabled:select-none disabled:opacity-45"
          disabled={
            !data.title || !data.description || !data.price || !data.stamp_count
          }
          variant="default"
          size="sm"
        >
          Finish
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium">Settings</DialogTitle>
          <DialogDescription>
            Add a custom slug for this payment page and you're good to publish
            it 👍
          </DialogDescription>
        </DialogHeader>
        <div className="pb-4">
          <Label htmlFor="name" className="text-right">
            Custom Slug
          </Label>
          <div className="flex">
            <span className="inline-flex items-center rounded-md rounded-e-none border border-e-0 border-gray-300 bg-gray-100 px-3 text-sm">
              /100xdevs
            </span>
            <Input
              name="slug"
              onChange={handler}
              placeholder="cohort-2-fullstack"
              className="col-span-3 rounded-s-none border-s-0 border-gray-300 !ring-0"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            size="sm"
            disabled={!data.slug || loading}
            className="disabled:pointer-events-none disabled:select-none disabled:opacity-45"
            onClick={handleClick}
          >
            Publish {loading && <LoaderIcon className="ml-2" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PublishButton;
