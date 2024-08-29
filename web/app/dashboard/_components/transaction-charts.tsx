"use client";

import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import axios from "axios";

export const description = "Lifetime collections";

interface IChartData {
  date: string;
  amount: number;
}

const chartConfig = {
  views: {
    label: "Received",
  },
  amount: {
    label: "amount",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const TransactionCard = () => {
  const [chartData, setChartData] = useState<IChartData[]>([]);
  const [total, setTotal] = useState(0);

  async function getLifetimeCollections() {
    const response = await axios.get("/api/merchant/collection");
    setChartData(response.data.chart);
    setTotal(response.data.total);
  }

  useEffect(() => {
    getLifetimeCollections();
  }, []);

  return (
    <Card className="mt-10 border border-gray-700 bg-transparent text-white">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b border-gray-700 p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle className="font-normal">Payments</CardTitle>
          <CardDescription>Showing total payments for the past month</CardDescription>
        </div>
        <div className="flex">
          <div className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t border-gray-700 px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/25 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">Lifetime Collection</span>
            <span className="text-lg font-semibold leading-none sm:text-3xl">
              SOL {Math.round(total * 100) / 100}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        {chartData.length <= 0 && <p>Fetching data...</p>}
        {chartData.length > 0 && (
          <ChartContainer config={chartConfig} className="dark aspect-auto h-[450px] w-full">
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="views"
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      });
                    }}
                  />
                }
              />
              <Bar dataKey={"amount"} fill={`var(--color-amount)`} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionCard;
