"use client";

import { createContext, useState } from "react";

type IPaymentPageCustomer = {
  loading?: boolean;
  count?: number;
  requiredCount?: number;
};

export type IPaymentPageCustomerContext = {
  data: IPaymentPageCustomer;
  appendData: (obj: IPaymentPageCustomer) => void;
};

export const PaymentPageCustomerContext = createContext<IPaymentPageCustomerContext | null>(null);

const PaymentPageCustomerProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<IPaymentPageCustomer>({
    loading: false,
  });

  function appendData(newData: IPaymentPageCustomer) {
    setData(() => ({
      ...data,
      ...newData,
    }));
  }

  return <PaymentPageCustomerContext.Provider value={{ data, appendData }}>{children}</PaymentPageCustomerContext.Provider>;
};

export default PaymentPageCustomerProvider;
