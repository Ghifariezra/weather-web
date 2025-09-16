"use client";

import { useMemo } from "react";
import Image from "next/image";
import { dateFormat, checkDay, Title } from "@/utils/date";
import { useProviderHome } from "@/hooks/providers/useHomeProviders";
import { getImageUrl } from "@/utils/icon";

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { CarouselSkeleton } from "@/components/skeleton/carousel";

type WeatherItem = {
	utc_datetime: string;
	local_datetime: string;
	weather_desc: string;
	weather_desc_en: string;
	t: number;
};

function WeatherCard({ item }: { item: WeatherItem }) {
	const { jam } = dateFormat(item.local_datetime);

	return (
		<Card>
			<CardHeader>
				<div className="flex flex-col items-center w-full gap-1">
					{/* <span className="text-base font-semibold">{tanggal}</span> */}
					<span className="text-base font-semibold">{jam}</span>
				</div>
			</CardHeader>

			<CardContent className="flex aspect-square items-center justify-center p-6">
				<div className="flex flex-col items-center gap-4">
					<div className="flex flex-col items-center gap-2">
						<div className="w-24 h-24">
							<Image
								src={getImageUrl(item.weather_desc_en)}
								alt={item.weather_desc}
								width={100}
								height={100}
								className="w-full h-full object-cover"
							/>
						</div>
						<div className="flex flex-col items-center gap-1">
							<span className="text-lg font-medium">
								{item.t}&deg;C
							</span>
							<span className="text-sm text-muted-foreground">
								{item.weather_desc}
							</span>
						</div>
					</div>
					<q className="text-sm text-center w-full text-muted-foreground">
						{Title(item.local_datetime, item.weather_desc)}
					</q>
				</div>
			</CardContent>

			<CardFooter>
				<div className="flex w-full items-center justify-center">
					<Button
						variant={"outline"}
						className="cursor-pointer !font-semibold">
						Ingatkan Saya
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
}

export function CarouselCards() {
	const { weatherLoc, weatherLocLoading } = useProviderHome();
	const rawWeather = weatherLoc?.data?.cuaca?.flat();

	const todayWeather = useMemo(() => {
		if (rawWeather) {
			const current = rawWeather.filter((item) => {
				const today = checkDay(item.local_datetime) === "Hari ini";
				return today;
			});

			// const interpolation = current.flatMap((_, i) => {
			// 	const next = current[i + 1];

			// 	const currentTime = new Date(current[i].local_datetime).getTime();
			// 	const nextTime = new Date(next?.local_datetime).getTime();

			// 	const diffHours = (nextTime - currentTime) / (1000 * 60 * 60);

			// 	let result = [current[i]];

			// 	for (let j = 1; j < diffHours; j++) {
			// 		if (next) {
			// 			const interpolatedTime = new Date(currentTime + j * 3600 * 1000).toLocaleDateString("sv-SE", {
			// 				hour12: false,
			// 				year: "numeric",
			// 				month: "2-digit",
			// 				day: "2-digit",
			// 				hour: "2-digit",
			// 				minute: "2-digit",
			// 				second: "2-digit",
			// 			});

			// 			const interpolatedItem = {
			// 				...current[i],
			// 				local_datetime: interpolatedTime,
			// 			};
			// 			result.push(interpolatedItem);
			// 		}
			// 	}

			// 	return result;
			// });
			
			return current.filter((item) => {
				const hoursNow = new Date().getHours();
				const time = new Date(item.local_datetime).getHours();
				return hoursNow < time;
			});
		}
	}, [rawWeather]);

	if (weatherLocLoading) return <CarouselSkeleton />;
	if (!rawWeather || !todayWeather) return <CarouselSkeleton />;

	const totalTimeToday = todayWeather.length;
	if (totalTimeToday === 0) return null;

	return (
		<Carousel
			className={`${
				totalTimeToday >= 3 ? "w-full" : "w-full sm:w-sm"
			} h-full`}>
			<CarouselContent className="-ml-1 w-full h-full">
				{todayWeather.length > 0 ? (
					todayWeather.map((item, index) => (
						<CarouselItem
							key={index}
							className={`pl-1 select-none ${
								totalTimeToday === 1 ? "" : "md:basis-1/3"
							} h-full`}>
							<div className="p-1 cursor-grab h-full">
								<WeatherCard item={item} />
							</div>
						</CarouselItem>
					))
				) : (
					<div className="flex flex-col items-center justify-center h-full gap-2 text-center p-4">
						<h1 className="text-lg font-semibold">
							Cuaca hari ini sudah selesai
						</h1>
						<p className="text-sm text-muted-foreground">
							Tunggu update cuaca besok yaa
						</p>
					</div>
				)}
			</CarouselContent>

			{totalTimeToday > 3 && (
				<>
					<CarouselPrevious className="cursor-pointer absolute left-0 hidden sm:flex" />
					<CarouselNext className="cursor-pointer absolute right-0 hidden sm:flex" />
				</>
			)}

			{totalTimeToday > 0 && (
				<>
					<CarouselPrevious className="cursor-pointer absolute left-0 flex sm:hidden" />
					<CarouselNext className="cursor-pointer absolute right-0 flex sm:hidden" />
				</>
			)}
		</Carousel>
	);
}
