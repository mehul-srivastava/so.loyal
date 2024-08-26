"use client";

import Image from "next/image";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Sparkles } from "lucide-react";

export const StampsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Stamps Collection</CardTitle>
        <CardDescription>
          Get a stamp on your card after every purchase. You can unlock a freebie after
          every X purchases.
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
            You need to collect 10 stamp cards <Lock className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const StampsSetup = () => {
  return (
    <div>
      <p>
        <span className="underline">LOYALTY PROGRAM:</span> Introducing our exciting
        loyalty program! Earn a stamp with every purchase and unlock a freebie after
        collecting a certain number of stamps. It's our way of thanking you for being a
        loyal customer. Start collecting those stamps and treat yourself to a freebie
        after every X purchases. Happy rewarding!
      </p>
      <div className="mt-4">
        <Input
          type="number"
          max={15}
          className="border bg-white border-gray-300"
          placeholder="Enter no. of stamps to unlock a freebie"
        />
      </div>
    </div>
  );
};