import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";
import { StampsSetup, StampsCard } from "./_components/stamps-reward";
import PublishButton from "./_components/publish-button";
import ProductDetailSetup from "./_components/product-detail";
import PaymentPageDataProvider from "@/components/providers/payment-page-context-provider";
import TransactionSummarySetup from "./_components/transaction-summary-setup";

const page = async ({
  params,
  searchParams,
}: {
  params: { brandName: string };
  searchParams?: { type: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

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

        <PublishButton searchParams={searchParams} />

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
                  <ProductDetailSetup />
                  <div className="mt-4">
                    <StampsSetup />
                  </div>
                  <div className="mt-4">
                    <h4 className="text-xl font-semibold">Contact Us</h4>
                    <p>Email: {merchant?.supportEmail}</p>
                    <p>Phone: {merchant?.supportPhone}</p>
                  </div>
                </div>
                <img
                  src="https://img.freepik.com/free-photo/delicious-coffee-beans-cup_23-2150691429.jpg"
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
            <TransactionSummarySetup />
            <StampsCard />
          </div>
        </div>
      </div>
    </PaymentPageDataProvider>
  );
};

export default page;
