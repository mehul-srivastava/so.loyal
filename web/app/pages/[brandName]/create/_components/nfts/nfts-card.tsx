import { Lock } from "lucide-react";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const NftsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>NFT Coupons</CardTitle>
        <CardDescription>Get an NFT coupon that you can show-off to your friends. You can unlock a freebie after every X purchases.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center gap-x-4">
          <p className="text-6xl">🙁</p>
          <div className="text-gray-500">
            <p>You haven't unlocked any coupons yet.</p>
            <p>Please make a purchase to unlock one</p>
          </div>
        </div>
        <div className="mt-5">
          <Button className="mt-5 w-full" disabled>
            You need to collect 4 coupon
            <Lock className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NftsCard;
