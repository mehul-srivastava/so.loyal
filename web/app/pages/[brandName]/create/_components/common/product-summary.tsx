"use client";

import React, { useContext } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  type IPaymentPageDataContext,
  PaymentPageDataContext,
} from "@/components/providers/payment-page-context-provider";

const ProductSummary = () => {
  const { appendData } = useContext(
    PaymentPageDataContext,
  ) as IPaymentPageDataContext;

  function handler(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    appendData({ [e.target.name]: e.target.value });
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Summary</CardTitle>
        <CardDescription>
          Customers can pay easily using their favourite wallets. We got
          Phantom, Backpack, Solflare, Glow, Tiplink and many more.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex gap-x-4">
          <img
            src="https://play-lh.googleusercontent.com/obRvW02OTYLzJuvic1ZbVDVXLXzI0Vt_JGOjlxZ92XMdBF_i3kqU92u9SgHvJ5pySdM=w480-h960-rw"
            className="h-10 w-10 rounded-md"
            alt=""
          />
          <img
            src="https://play-lh.googleusercontent.com/waPoKLrd8VeNAmRt6Nv0k4Dph8NHkMjqnreU9UHBKwhLCs_02C7yq4P5k0ebd0G6qZw=w480-h960-rw"
            className="h-10 w-10 rounded-md"
            alt=""
          />
          <img
            src="https://play-lh.googleusercontent.com/giRrV952bRxhgGVL9MQvfE83FBBngWBqKybaBC6cBDJV1VrvtSDrszFVFY6bIa0CqTk=w480-h960-rw"
            className="h-10 w-10 rounded-md"
            alt=""
          />
          <img
            src="https://play-lh.googleusercontent.com/wjRjMDJ0GJDURRVhHeJ9GvBs171vfUuW1chLMPqeqHqB3o5LBQHWjYmt--eGwej4Ng=w480-h960-rw"
            className="h-10 w-10 rounded-md"
            alt=""
          />
          <img
            src="https://play-lh.googleusercontent.com/EhgMPJGUYrA7-8PNfOdZgVGzxrOw4toX8tQXv-YzIvN6sAMYFunQ55MVo2SS_hLiNm8=w480-h960-rw"
            className="h-10 w-10 rounded-md border"
            alt=""
          />
        </div>

        <div className="relative">
          <Input
            placeholder="USD 20.99"
            type="number"
            name="price"
            onChange={handler}
            className="border-gray-200"
          />
          <small className="text-gray-400">
            Enter price for product in USD
          </small>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductSummary;
