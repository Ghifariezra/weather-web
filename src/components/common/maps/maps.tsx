"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useProviderHome } from "@/hooks/providers/useHomeProviders";
import {
	MapContainer,
	TileLayer,
} from "react-leaflet";
import { MapSkeleton } from "@/components/skeleton/maps";
import type { ResponseWeatherLoc, TransformWeatherData } from "@/types/weather";

const LocationMarker = dynamic(() => import("./location"), { ssr: false });
const LabelArea = dynamic(() => import("./label"), { ssr: false });

export default function Maps() {
	const {
		vLoad,
		vError,
		center,
		setCoordinates,
		position,
		setPosition,
		transformWeatherData,
		weatherLoc
	} = useProviderHome();

	const [mounted, setMounted] = useState(false);

	// pastikan render hanya terjadi di client
	useEffect(() => {
		setMounted(true);
	}, []);

	// guard agar tidak crash
	if (!mounted || !center) {
		return <MapSkeleton loading={vLoad} error={vError} />;
	}

	return (
		<div className="relative w-full h-[300px] sm:h-full rounded-2xl overflow-hidden border shadow-lg">
			<MapContainer
				center={center}
				boxZoom={true}
				zoom={5}
				maxZoom={18}
				scrollWheelZoom={true}
				className="w-full h-full cursor-grab">
				<TileLayer
					zIndex={0}
					url="https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=hwpuA2DGE375x1iYrDxK"
				/>
				<LabelArea setCoordinates={setCoordinates} />
				<LocationMarker
					position={position}
					setPosition={setPosition}
					transformWeatherData={
						transformWeatherData as TransformWeatherData[]
					}
					currentLocation={weatherLoc as ResponseWeatherLoc}
				/>
			</MapContainer>
		</div>
	);
}
