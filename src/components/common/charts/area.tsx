"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

import type { Summary } from "@/types/summary";
import { desc, footerDesc } from "@/utils/summary";

export function ChartAreaDefault({
	data,
	type,
}: {
	data: Summary;
	type: string;
}) {
	const title = type[0].toUpperCase() + type.slice(1);
	let checkData = {
		min: 0,
		max: 0,
		avg: "0",
	};

	switch (type) {
		case "suhu":
			checkData = {
				min: data.suhu_min,
				max: data.suhu_max,
				avg: data.suhu_avg,
			};
			break;
		case "kelembapan":
			checkData = {
				min: data.humidity_min,
				max: data.humidity_max,
				avg: data.humidity_avg,
			};
			break;
		case "angin":
			checkData = {
				min: data.wind_min,
				max: data.wind_max,
				avg: data.wind_avg,
			};
			break;
	}

	// Siapkan data chart
	const chartData = [
		{ label: "Min", value: checkData.min },
		{ label: "Avg", value: parseFloat(checkData.avg) },
		{ label: "Max", value: checkData.max },
	];

	const chartConfig = {
		value: {
			label: "Nilai",
			color: "var(--chart-1)",
		},
	} satisfies ChartConfig;

	return (
		<Card>
			<CardHeader>
				<CardTitle>
                    {title} rata-rata hari ini
                </CardTitle>
				<CardDescription>{desc[type](checkData.avg)}</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<AreaChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: 12,
							right: 12,
						}}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="label"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator="line" />}
						/>
						<defs>
							<linearGradient
								id="fillGradient"
								x1="0"
								y1="0"
								x2="0"
								y2="1">
								<stop
									offset="5%"
									stopColor="var(--color-value)"
									stopOpacity={0.7}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-value)"
									stopOpacity={0.05}
								/>
							</linearGradient>
						</defs>

						<Area
							dataKey="value"
							type="natural"
							fill="url(#fillGradient)"
							stroke="var(--color-value)"
							strokeWidth={2}
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
			<CardFooter>
				<div className="flex w-full items-start gap-2">
					<p className="text-muted-foreground leading-5 text-xs sm:text-sm">
						{footerDesc(
							type,
							checkData.min,
							checkData.max,
							checkData.avg
						)}
					</p>
				</div>
			</CardFooter>
		</Card>
	);
}
