import { Lock } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const StampsCard = () => {
  return (
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
            You need to collect 10 stamp cards <Lock className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StampsCard;
