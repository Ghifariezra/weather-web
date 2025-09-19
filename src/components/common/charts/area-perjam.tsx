"use client";

import { useMemo } from "react";
import { TrendingUp } from "lucide-react";
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
import { CuacaDetail } from "@/types/weather";

const chartConfig = {
	suhu: {
		label: "Suhu (°C)",
		color: "var(--chart-1)",
	},
	kelembapan: {
		label: "Kelembapan (%)",
		color: "var(--chart-2)",
	},
	angin: {
		label: "Kecepatan Angin (m/s)",
		color: "var(--chart-3)",
	},
	jarak_pandang: {
		label: "Jarak Pandang (km)",
		color: "var(--chart-4)",
	},
} satisfies ChartConfig;

export type WeatherStatus = keyof typeof chartConfig;

export function ChartAreaGradient({
	data,
	status,
}: {
	data: CuacaDetail[];
	status: WeatherStatus;
}) {
	// transformasi data untuk chart
	const chartData = useMemo(() => {
		return data.map((item) => {
			const hours =
				new Date(item.local_datetime)
					.getHours()
					.toString()
					.padStart(2, "0") + ":00";

			switch (status) {
				case "suhu":
					return { hours, suhu: item.t };
				case "kelembapan":
					return { hours, kelembapan: item.hu };
				case "angin":
					return { hours, angin: item.ws / 3.6 };
				case "jarak_pandang":
					return { hours, jarak_pandang: item.vs / 1000 };
			}
		});
	}, [data, status]);

	const viewDesc =
		status.split("_").length > 1
			? status
					.split("_")
					.map((word) => word[0].toUpperCase() + word.slice(1))
					.join(" ")
			: status[0].toUpperCase() + status.slice(1);

	return (
		<Card>
			<CardHeader>
				<CardTitle>{chartConfig[status].label}</CardTitle>
				<CardDescription>
					Statistik {viewDesc} per jam
				</CardDescription>
			</CardHeader>

			<CardContent>
				<ChartContainer config={{ [status]: chartConfig[status] }}>
					<AreaChart
						accessibilityLayer
						data={chartData}
						margin={{ left: 12, right: 12 }}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="hours"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							allowDecimals={false}
							interval="preserveStartEnd"
						/>

						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent />}
						/>

						{/* Generate gradient otomatis */}
						<defs>
							{Object.entries(chartConfig).map(
								([key, config]) => (
									<linearGradient
										key={key}
										id={`fill-${key}`}
										x1="0"
										y1="0"
										x2="0"
										y2="1">
										<stop
											offset="5%"
											stopColor={config.color}
											stopOpacity={0.8}
										/>
										<stop
											offset="95%"
											stopColor={config.color}
											stopOpacity={0.1}
										/>
									</linearGradient>
								)
							)}
						</defs>

						{/* Generate Area otomatis */}
						{Object.entries(chartConfig).map(([key, config]) => (
							<Area
								key={key}
								dataKey={key}
								type="natural"
								fill={`url(#fill-${key})`}
								fillOpacity={0.4}
								stroke={config.color}
								stackId="a"
							/>
						))}
					</AreaChart>
				</ChartContainer>
			</CardContent>

			<CardFooter>
				<div className="flex w-full items-start gap-2 text-sm">
					<div className="grid gap-2">
						<div className="flex items-center gap-2 leading-none font-medium">
							Data cuaca diperbarui secara berkala{" "}
							<TrendingUp className="h-4 w-4" />
						</div>
						<div className="text-muted-foreground flex items-center gap-2 leading-none">
							Menampilkan {viewDesc} per jam
						</div>
					</div>
				</div>
			</CardFooter>
		</Card>
	);
}
