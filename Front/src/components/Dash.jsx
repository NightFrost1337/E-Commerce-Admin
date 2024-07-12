import React from 'react';
import { useAuth } from "@/hooks/useAuth";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa",
    },
}

export default function Dash() {
    const { user } = useAuth();

    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-8">
                <Card className="bg-transparent">
                    <CardHeader>
                        <div className="flex justify-between items-center w-full">
                            <CardTitle>Total Revenue</CardTitle>
                            <span className="text-lg text-gray-400">€</span>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">€119.99</p>
                    </CardContent>
                </Card>

                <Card className="bg-transparent">
                    <CardHeader>
                        <div className="flex justify-between items-center w-full">
                            <CardTitle>Sales</CardTitle>
                            <span className="text-lg text-gray-400">€</span>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">+1</p>
                    </CardContent>
                </Card>

                <Card className="bg-transparent">
                    <CardHeader>
                        <div className="flex justify-between items-center w-full">
                            <CardTitle>Products in Stock</CardTitle>
                            <span className="text-lg text-gray-400">€</span>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">5</p>
                    </CardContent>
                </Card>
            </div>
            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Sales overview</CardTitle>
                </CardHeader>
                <ChartContainer config={chartConfig} className="max-h-[400px] w-full">
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </Card>
       </>
    );
}
