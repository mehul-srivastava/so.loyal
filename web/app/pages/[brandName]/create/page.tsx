import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";
import StampsComponent from "./_components/stamps-component";
import PointsComponent from "./_components/points-component";
import PaymentPageDataProvider from "@/components/providers/payment-page-context-provider";

const page = async ({
  params,
  searchParams,
}: {
  params: { brandName: string };
  searchParams: { type: string };
}) => {
  const { userId } = auth();
  if (!searchParams?.type) return redirect("/");
  if (!userId) return redirect("/");

  const merchant = await prisma.merchant.findFirst({
    where: {
      id: userId!,
    },
  });

  const borderStyles = { borderColor: merchant?.brandColor };

  return (
    <PaymentPageDataProvider>
      <div className="flex h-full w-full items-start justify-center bg-[#f8f8f8] md:items-center">
        <div
          className="fixed left-0 top-0 hidden h-full border-r-[10px] md:block"
          style={borderStyles}
        />
        {searchParams.type === "stamp" && (
          <StampsComponent params={params} searchParams={searchParams} merchant={merchant} />
        )}

        {searchParams.type === "point" && (
          <PointsComponent params={params} searchParams={searchParams} merchant={merchant} />
        )}
      </div>
    </PaymentPageDataProvider>
  );
};

export default page;
