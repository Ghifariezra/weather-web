"use client";

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

export function ChartAreaGradient({ data }: { data: CuacaDetail[] }) {
	// transformasi data untuk chart
	const chartData = data.map((item) => {
		const hours =
			new Date(item.local_datetime)
				.getHours()
				.toString()
				.padStart(2, "0") + ":00";

		return {
			hours,
			suhu: item.t,
			kelembapan: item.hu,
			angin: item.ws / 3.6,
			jarak_pandang: item.vs / 1000,
		};
	});

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

	// ambil rentang waktu data untuk deskripsi
	const start = data[0]?.local_datetime
		? new Date(data[0].local_datetime).toLocaleDateString("id-ID", {
				day: "numeric",
				month: "long",
				year: "numeric",
		  })
		: "";
	const end = data[data.length - 1]?.local_datetime
		? new Date(data[data.length - 1].local_datetime).toLocaleDateString(
				"id-ID",
				{ day: "numeric", month: "long", year: "numeric" }
		  )
		: "";

	return (
		<Card>
			<CardHeader>
				<CardTitle>Cuaca Harian</CardTitle>
				<CardDescription>
					Periode {start} - {end}
				</CardDescription>
			</CardHeader>

			<CardContent>
				<ChartContainer config={chartConfig}>
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
							Menampilkan suhu, kelembapan, angin, dan jarak
							pandang
						</div>
					</div>
				</div>
			</CardFooter>
		</Card>
	);
}
