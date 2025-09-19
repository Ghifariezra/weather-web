"use client";

import Section from "@/components/templates/section";
import { CarouselCards } from "@/components/common/carousel/carousel";
import {
	ChartAreaGradient,
	WeatherStatus,
} from "@/components/common/charts/area-perjam";
import { useProviderHome } from "@/hooks/providers/useHomeProviders";
import { useMemo } from "react";
import { currentData } from "@/utils/summary";
import { SecondSkeleton } from "@/components/skeleton/second";

const WEATHER_STATUS = ["suhu", "kelembapan", "angin", "jarak_pandang"];

export function Second() {
	const { weatherLocLoading, rawWeather } = useProviderHome();

	const filteredWeather = useMemo(() => {
		if (!rawWeather) return [];
		const today = currentData(rawWeather);
		const nowHour = new Date().getHours();
		return today.filter(
			(item) => new Date(item.local_datetime).getHours() >= nowHour
		);
	}, [rawWeather]);

	if (weatherLocLoading || filteredWeather.length === 0) {
		return <SecondSkeleton />;
	}

	return (
		<Section>
			<div className="flex flex-col w-full h-full gap-4 p-4 sm:p-8">
				{/* Cuaca Per Jam */}
				<div className="flex flex-col gap-4">
					<h1 className="text-base sm:text-lg md:text-xl font-bold">
						Cuaca Tiap Jam
					</h1>
					<CarouselCards />
				</div>

				{/* Statistik Cuaca */}
				<div className="flex flex-col gap-4">
					<h1 className="text-base sm:text-lg md:text-xl font-bold">
						Statistik Cuaca
					</h1>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{WEATHER_STATUS.map((status) => (
							<ChartAreaGradient
								key={status}
								data={filteredWeather}
								status={status as WeatherStatus}
							/>
						))}
					</div>
				</div>
			</div>
		</Section>
	);
}
