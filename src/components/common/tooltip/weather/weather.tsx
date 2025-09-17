"use client";

import { memo, useMemo } from "react";
import Image from "next/image";
import WeatherSkeleton from "@/components/skeleton/weather";
import { ShowChartSummary } from "@/components/common/dropdown/summary";
import { useProviderHome } from "@/hooks/providers/useHomeProviders";
import { useSummary } from "@/hooks/useSummary";
import { getImageUrl } from "@/utils/icon";
import { dateFormat, checkDay } from "@/utils/date";
import { Calendar, Clock8 } from "lucide-react";
import { InfoItem } from "./info-item";
import { ChartAreaDefault } from "@/components/common/charts/area";
import { currentData, getSummary } from "@/utils/summary";

function WeatherTooltip() {
	const { chartType, setChartType } = useSummary();
	const { weatherLocLoading, rawWeather } = useProviderHome();

	const getDailySummary = useMemo(() => {
		if (rawWeather) {
			const today = currentData(rawWeather);
			return getSummary(today);
		}
	}, [rawWeather]);

	const currentWeather = useMemo(() => {
		if (!rawWeather) return undefined;

		const dataTodayOrTomorrow = currentData(rawWeather);
		const hoursNow = new Date().getHours();

		// cari data >= sekarang
		const upcoming = dataTodayOrTomorrow.find(
			(item) => new Date(item.local_datetime).getHours() >= hoursNow
		);

		// kalau tidak ada, ambil yang terakhir
		return upcoming ?? dataTodayOrTomorrow.at(-1);
	}, [rawWeather]);

	const nextWeather = useMemo(() => {
		if (!rawWeather) return [];

		const hoursNow = new Date().getHours();

		const groups = ["Hari ini", "Besok", "Lusa"];

		const result = groups
			.map((label) =>
				rawWeather.find((item) => {
					const day = checkDay(item.local_datetime);
					const time = new Date(item.local_datetime).getHours();

					return (
						(day === label && time >= hoursNow) ||
						(day === 'Lusa' && time < hoursNow && label === 'Lusa')
					);
				})
			)
			.filter(Boolean);
		return result;
	}, [rawWeather]);

	if (weatherLocLoading) {
		return <WeatherSkeleton />;
	}

	if (!currentWeather || !nextWeather || !rawWeather || !getDailySummary) {
		return <WeatherSkeleton />;
	}

	return (
		<>
			<div className="flex flex-col gap-4 w-full h-full">
				<h1 className="font-semibold text-2xl">Seputar Langit</h1>
				<div className="flex flex-wrap lg:flex-nowrap gap-2 w-full">
					{nextWeather.flatMap((item, index) => {
						if (!item) return [];
						return (
							<div
								key={index}
								className="flex flex-col-reverse sm:flex-row lg:flex-col gap-4 w-full p-4 border-glassess rounded-md text-xs">
								<div className="flex flex-col gap-4 w-full">
									<h1 className="font-semibold text-xl text-center">
										{checkDay(item.local_datetime)}
									</h1>
									<span className="flex flex-col justify-center items-center w-full gap-4">
										<InfoItem
											icon={getImageUrl(
												item.weather_desc_en
											)}
											alt={item.weather_desc_en}
											value={item.t}
											unit="&deg;C"
											label={item.weather_desc}
											className="w-fit justify-center"
										/>
										<div className="flex flex-wrap gap-2 w-full justify-between">
											<div className="flex items-center gap-2">
												<Calendar size={14} />
												<p>
													{
														dateFormat(
															item.local_datetime
														).tanggal
													}
												</p>
											</div>
											<div className="flex items-center gap-2">
												<Clock8 size={14} />
												<p>
													{
														dateFormat(
															item.local_datetime
														).jam
													}
												</p>
											</div>
										</div>
									</span>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			<hr className="sm:hidden" />

			<div className="flex flex-col gap-4 w-full h-full">
				{/* Icon + suhu utama */}
				<div className="flex flex-col lg:flex-row gap-2 w-full h-fit items-center justify-center">
					<div className="relative w-full h-full">
						<div className="aspect-square w-full h-full">
							<Image
								src={getImageUrl(
									currentWeather.weather_desc_en
								)}
								alt="weather-icon"
								width={500}
								height={500}
								priority
								className="object-cover w-full h-full"
							/>
						</div>
					</div>
					<div className="flex flex-col gap-2 text-xl lg:4xl w-full h-full justify-center">
						<div className="flex justify-center w-full gap-1 font-bold text-8xl">
							<h1>{currentWeather.t}</h1>
							<span className="text-xl">&deg;C</span>
						</div>
						<h1 className="text-center">
							{currentWeather.weather_desc}
						</h1>
					</div>
				</div>

				{/* Info items */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
					<InfoItem
						icon="https://cdn3.iconfinder.com/data/icons/weather-3d/256/Wind.png"
						alt="wind"
						value={currentWeather.ws}
						unit="km/jam"
						label="Kecepatan Angin"
					/>
					<InfoItem
						icon="https://cdn1.iconfinder.com/data/icons/weather-vol-1-10/256/humidity-weather-water-drop-rain-climate-percentage-3d.png"
						alt="humidity"
						value={currentWeather.hu}
						unit="%"
						label="Kelembapan Udara"
					/>
					<InfoItem
						icon="https://cdn2.iconfinder.com/data/icons/user-interface-essentials-11/256/32_Eye.png"
						alt="visibility"
						value={`${(currentWeather.vs / 1000).toFixed(0)} ${
							currentWeather.vs_text.split(" ")[0]
						} ${currentWeather.vs_text.split(" ")[1]}
						`}
						unit="km"
						label="Jarak Pandang"
					/>
				</div>
			</div>

			<hr className="sm:hidden" />

			<div className="flex flex-col gap-4 w-full h-full">
				<div className="flex flex-wrap lg:flex-nowrap justify-between w-full gap-2">
					<h1 className="font-semibold text-2xl w-full">
						Ringkasan Hari Ini
					</h1>
					<ShowChartSummary setChartType={setChartType} />
				</div>
				{chartType !== "default" ? (
					<ChartAreaDefault data={getDailySummary} type={chartType} />
				) : (
					getDailySummary && (
						<div className="grid sm:grid-cols-2 gap-4 w-full">
							<InfoItem
								icon="https://cdn1.iconfinder.com/data/icons/earthy-earth-3d-characters-set/256/19._Earth_Temperature.png"
								alt="suhu"
								value={getDailySummary.suhu_avg}
								unit="°C"
								label={`Rata-rata (${getDailySummary.suhu_min}° - ${getDailySummary.suhu_max}°)`}
							/>
							<InfoItem
								icon="https://cdn1.iconfinder.com/data/icons/weather-vol-1-10/256/humidity-weather-water-drop-rain-climate-percentage-3d.png"
								alt="humidity"
								value={getDailySummary.humidity_avg}
								unit="%"
								label={`Rata-rata (${getDailySummary.humidity_min}% - ${getDailySummary.humidity_max}% )`}
							/>
							<InfoItem
								icon="https://cdn3.iconfinder.com/data/icons/weather-3d/256/Wind.png"
								alt="wind"
								value={getDailySummary.wind_avg}
								unit="km/jam"
								label={`Rata-rata (${getDailySummary.wind_min}km/jam - ${getDailySummary.wind_max}km/jam)`}
							/>
							<InfoItem
								icon="https://cdn2.iconfinder.com/data/icons/user-interface-essentials-11/256/32_Eye.png"
								alt="visibility"
								value={getDailySummary.visibility_avg}
								unit="km"
								label={`Rata-rata (${getDailySummary.visibility_min}km - ${getDailySummary.visibility_max}km)`}
							/>
						</div>
					)
				)}
			</div>
		</>
	);
}

export default memo(WeatherTooltip);
