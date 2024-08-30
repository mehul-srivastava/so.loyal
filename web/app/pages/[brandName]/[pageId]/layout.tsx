"use client";

import React from "react";

import PaymentPageCustomerProvider from "@/components/providers/payment-page-customer-provider";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <PaymentPageCustomerProvider>{children}</PaymentPageCustomerProvider>;
};

export default layout;
