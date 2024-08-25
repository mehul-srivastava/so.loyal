import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StampsSetup, StampsCard } from "./_components/stamps-reward";

function hexToRGBA(hex: string | undefined, alpha: number) {
  if (hex == undefined) return `rgb(255, 255, 255)`;

  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

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
  const backgroundStyles = { backgroundColor: hexToRGBA(merchant?.brandColor, 0.06) };

  return (
    <div className="h-full w-full flex justify-center items-start md:items-center bg-[#f8f8f8]">
      <div
        className="border-r-[10px] hidden md:block fixed h-full top-0 left-0"
        style={borderStyles}
      />
      <Button
        className="fixed top-4 right-10 z-50"
        style={{ backgroundColor: merchant?.brandColor }}
        variant="outline"
      >
        Publish
      </Button>
      <div className="grid md:grid-cols-2 max-w-7xl mx-auto gap-6 relative lg:gap-36 items-center px-6 py-6">
        <div className="grid gap-4 md:gap-10 md:overflow-auto justify-center items-center md:no-scrollbar md:h-[90vh]">
          <div className="flex items-center">
            <div className="grid gap-4 p-1">
              <h1 className="font-bold text-5xl relative">
                {merchant?.websiteName}{" "}
                <span
                  className="absolute -bottom-2 left-0 w-14 border-b-4"
                  style={borderStyles}
                ></span>
              </h1>
              <div className="grid gap-4 text-sm leading-loose">
                <div>
                  <div>
                    <h4 className="my-0 font-semibold">Title</h4>
                    <Input
                      className="mb-4 border-gray-200 bg-red"
                      placeholder="Full Stack Development Cohort 2.0"
                    />
                  </div>
                  <div>
                    <h4 className="my-0 font-semibold">Description</h4>
                    <Textarea placeholder="The course is led by Harkirat Singh where we go through an intense 8-10 weeks of learning the MERN stack in depth, and contributing to one big open source codebase."></Textarea>
                  </div>
                </div>
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
                className="aspect-[4/2] object-cover border w-full rounded-lg overflow-hidden"
              />
            </div>
          </div>
        </div>
        <div className="border-l hidden md:block border-muted-foreground absolute h-3/4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        <div className="grid gap-6 md:gap-8 relative">
          <Card>
            <CardHeader>
              <CardTitle>Transaction Summary</CardTitle>
              <CardDescription>
                Customers can pay easily using their favourite wallets. We got Phantom,
                Backpack, Solflare, Glow, Tiplink and many more.
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
                <Input placeholder="USD20.99" type="number" className="border-gray-200" />
                <small className="text-gray-400">Enter price for product in USD</small>
              </div>
            </CardContent>
          </Card>
          <StampsCard />
        </div>
      </div>
    </div>
  );
};

export default page;
