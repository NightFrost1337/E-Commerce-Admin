import React from 'react';
import { useAuth } from "@/lib/hooks/useAuth";
import { Bar, BarChart, CartesianGrid } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

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

export default function News() {
    const { user } = useAuth();

    return (
        <>
            <div className="flex flex-col justify-start h-screen">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="mb-6">Welcome {user.username}</p>
                <hr />
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
                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </div>
       </>
    );
}
