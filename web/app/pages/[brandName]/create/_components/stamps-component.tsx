import React from "react";

import { Merchant } from "@prisma/client";
import StampsCard from "./stamps/stamps-card";
import StampsInputDescription from "./stamps/stamps-input-description";
import StampsPublishButton from "./stamps/stamps-publish-button";
import ProductSummary from "./common/product-summary";
import ProductDetails from "./common/product-details";

const StampsPage = ({ params, searchParams, merchant }: { params: { brandName: string }; searchParams: { type: string }; merchant: Merchant | null }) => {
  const borderStyles = { borderColor: merchant?.brandColor };

  return (
    <>
      <StampsPublishButton searchParams={searchParams} params={params} />

      <div className="relative mx-auto grid max-w-7xl items-center gap-6 px-6 py-6 md:grid-cols-2 lg:gap-36">
        {/* Left Metadata Section */}
        <LeftMetadata borderStyles={borderStyles} merchant={merchant} />

        {/* Vertical Line */}
        <div className="absolute left-1/2 top-1/2 hidden h-3/4 -translate-x-1/2 -translate-y-1/2 transform border-l border-muted-foreground md:block" />

        {/* Right Payment Section */}
        <RightPayments />
      </div>
    </>
  );
};

const LeftMetadata = ({ borderStyles, merchant }: { borderStyles: React.CSSProperties; merchant: Merchant | null }) => {
  return (
    <div className="md:no-scrollbar grid items-center justify-center gap-4 md:h-[90vh] md:gap-10 md:overflow-y-auto">
      <div className="flex items-center">
        <div className="grid gap-4 p-1">
          <h1 className="relative text-5xl font-bold">
            {merchant?.websiteName} <span className="absolute -bottom-2 left-0 w-14 border-b-4" style={borderStyles}></span>
          </h1>
          <div className="grid gap-4 text-sm leading-loose">
            <ProductDetails />
            <div className="mt-4">
              <StampsInputDescription />
            </div>
            <div className="mt-4">
              <h4 className="text-xl font-semibold">Contact Us</h4>
              <p>Email: {merchant?.supportEmail}</p>
              <p>Phone: {merchant?.supportPhone}</p>
            </div>
          </div>
          <img
            src="https://raw.githubusercontent.com/mehul-srivastava/so.loyal/main/web/public/placeholder.png"
            alt="Product Image"
            width={600}
            height={400}
            className="aspect-[4/2] w-full overflow-hidden rounded-lg border object-cover"
          />
        </div>
      </div>
    </div>
  );
};

const RightPayments = () => {
  return (
    <div className="relative grid gap-6 md:gap-8">
      <ProductSummary />
      <StampsCard />
    </div>
  );
};

export default StampsPage;
