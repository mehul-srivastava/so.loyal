import React from "react";

import { Merchant } from "@prisma/client";

const PointsPage = ({
  params,
  searchParams,
  merchant,
}: {
  params: { brandName: string };
  searchParams: { type: string };
  merchant: Merchant | null;
}) => {
  return <div>PointsPage</div>;
};

export default PointsPage;
