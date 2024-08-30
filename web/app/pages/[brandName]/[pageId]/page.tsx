import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ConnectThirdPartyWalletButton } from "@/components/ConnectWalletButton";

import StampRewardCard from "./_components/stamp-reward-card";
import ProductMetadata from "./_components/product-metadata";
import NftRewardCard from "./_components/nft-reward-card";
import StampRewardPayment from "./_components/stamp-reward-payment";
import NftRewardPayment from "./_components/nft-reward-payment";

interface IPageProps {
  params: {
    brandName: string;
    pageId: string;
  };
}

const page = async ({ params }: IPageProps) => {
  if (!params.brandName || !params.pageId) return redirect("/");

  const merchant = await prisma.merchant.findFirst({
    where: {
      websiteName: params.brandName,
    },
    select: {
      id: true,
      brandColor: true,
      websiteName: true,
      walletPublicAddress: true,
      supportPhone: true,
      supportEmail: true,
    },
  });
  const borderStyles = { borderColor: merchant?.brandColor };

  if (!merchant) return redirect("/");

  const page = await prisma.page.findFirst({
    where: {
      id: params.pageId,
    },
    select: {
      id: true,
      type: true,
      programPublicKey: true,
    },
  });

  if (!page) return redirect("/");

  return (
    <div className="flex h-full min-h-screen w-full items-start justify-center bg-[#f8f8f8] md:items-center">
      <div className="fixed left-0 top-0 hidden h-full border-r-[10px] md:block" style={borderStyles} />

      <div className="relative mx-auto grid max-w-7xl items-center gap-6 px-6 py-6 md:grid-cols-2 lg:gap-36">
        <div className="md:no-scrollbar grid items-center justify-center gap-4 md:h-[90vh] md:gap-10 md:overflow-y-auto">
          <div className="fixed right-10 top-4 z-50 disabled:pointer-events-none disabled:select-none disabled:opacity-45">
            <ConnectThirdPartyWalletButton />
          </div>
          <ProductMetadata merchant={merchant} type={page.type} programPublicKey={page.programPublicKey} />
        </div>
        <div className="absolute left-1/2 top-1/2 hidden h-3/4 -translate-x-1/2 -translate-y-1/2 transform border-l border-muted-foreground md:block" />
        <div className="relative grid gap-6 md:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
              <CardDescription>Following is the amount you have to pay. Alternatively, if you have enough collection then you could pay using those.</CardDescription>
            </CardHeader>
            <CardContent>
              {page.type === "stamp" && (
                <StampRewardPayment
                  params={params}
                  merchantWebsiteName={merchant.websiteName}
                  programPublicKey={page.programPublicKey}
                  merchantWalletAddress={merchant.walletPublicAddress}
                  merchantId={merchant.id}
                />
              )}
              {page.type === "nft" && (
                <NftRewardPayment
                  params={params}
                  merchantWebsiteName={merchant.websiteName}
                  programPublicKey={page.programPublicKey}
                  merchantWalletAddress={merchant.walletPublicAddress}
                  merchantId={merchant.id}
                />
              )}
            </CardContent>
          </Card>
          {page.type === "stamp" && <StampRewardCard websiteName={merchant.websiteName} programPublicKey={page.programPublicKey} pageId={page.id} />}
          {page.type === "nft" && <NftRewardCard websiteName={merchant.websiteName} programPublicKey={page.programPublicKey} pageId={page.id} />}
        </div>
      </div>
    </div>
  );
};

export default page;
