"use client";

import { createContext, useState } from "react";

type IPaymentPageData = {
  title?: string;
  description?: string;
  price?: number;
  stamp_count?: number;
  slug?: string;
};

export type IPaymentPageDataContext = {
  data: IPaymentPageData;
  appendData: (obj: IPaymentPageData) => void;
};

export const PaymentPageDataContext =
  createContext<IPaymentPageDataContext | null>(null);

const PaymentPageDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, setData] = useState<IPaymentPageData>({
    title: "",
    description: "",
    price: 0,
    stamp_count: 0,
    slug: "",
  });

  function appendData(newData: IPaymentPageData) {
    setData(() => ({
      ...data,
      ...newData,
    }));
  }

  return (
    <PaymentPageDataContext.Provider value={{ data, appendData }}>
      {children}
    </PaymentPageDataContext.Provider>
  );
};

export default PaymentPageDataProvider;
