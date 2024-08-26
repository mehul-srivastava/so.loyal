"use client";

import React, { useContext } from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  IPaymentPageDataContext,
  PaymentPageDataContext,
} from "@/components/providers/payment-page-context-provider";

const ProductDetailSetup = () => {
  const { appendData } = useContext(
    PaymentPageDataContext,
  ) as IPaymentPageDataContext;

  function handler(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    appendData({ [e.target.name]: e.target.value });
  }
  return (
    <div>
      <div>
        <h4 className="my-0 font-semibold">Title</h4>
        <Input
          className="mb-4 border-gray-200 bg-white"
          onChange={handler}
          name="title"
          placeholder="Full Stack Development Cohort 2.0"
        />
      </div>
      <div>
        <h4 className="my-0 font-semibold">Description</h4>
        <Textarea
          onChange={handler}
          name="description"
          placeholder="The course is led by Harkirat Singh where we go through an intense 8-10 weeks of learning the MERN stack in depth, and contributing to one big open source codebase."
        ></Textarea>
      </div>
    </div>
  );
};

export default ProductDetailSetup;
