'use client';

import Section from "@/components/templates/section";
import { CarouselCards } from "@/components/common/carousel/carousel";
import { ChartAreaGradient } from "@/components/common/charts/area-perjam";
import { useProviderHome } from "@/hooks/providers/useHomeProviders";
import { useMemo } from "react";
import { currentData } from "@/utils/summary";
import { SecondSkeleton } from "@/components/skeleton/second";

export function Second() {
	const { weatherLocLoading, rawWeather } = useProviderHome();

	const getSummary = useMemo(() => {
		if (rawWeather) {
			const today = currentData(rawWeather);
			return today.filter((item) => {
				const hoursNow = new Date().getHours();
				const time = new Date(item.local_datetime).getHours();

				return hoursNow <= time;
			});
		}
	}, [rawWeather]);
	
	if (weatherLocLoading) return <SecondSkeleton />;
	if (!rawWeather || !getSummary) return <SecondSkeleton />;

	return (
		<Section>
			<div className="flex flex-col w-full h-full gap-4 glassess border-glassess rounded-2xl p-8">
				<div className="flex flex-col w-full h-full gap-4">
					<h1 className="text-lg sm:text-xl font-bold">
						Cuaca Tiap Jam
					</h1>
					<CarouselCards />
				</div>
				<div className="flex flex-col w-full h-full gap-4">
					<h1 className="text-lg sm:text-xl font-bold">
						Langit Beberapa Jam ke Depan
					</h1>
					<ChartAreaGradient data={getSummary} />
				</div>
			</div>
		</Section>
	);
}
