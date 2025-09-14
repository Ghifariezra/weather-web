"use client";

import { Marker, Popup, useMapEvents } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { DivIcon, Point, LatLng } from "leaflet";
import { getImageUrl } from "@/utils/icon";
import type { ResponseWeatherLoc, TransformWeatherData } from "@/types/weather";

type ClusterLike = {
	getChildCount: () => number;
};

export default function LocationMarker({
	position,
	setPosition,
	transformWeatherData,
	currentLocation
}: {
	position: LatLng | null;
	setPosition: (position: LatLng) => void;
	transformWeatherData: TransformWeatherData[] | undefined;
	currentLocation: ResponseWeatherLoc | null;
}) {
	const map = useMapEvents({
		layeradd() {
			map.locate();
		},
		locationfound(e) {
			setPosition(e.latlng);
			map.flyTo(e.latlng, map.getZoom());
		},
	});

	const createCustomClusterIcon = (cluster: ClusterLike) => {
		return new DivIcon({
			html: `<div class="w-8 h-8 flex items-center justify-center rounded-full bg-blue-700 text-white shadow-md">
            ${cluster.getChildCount()}
           </div>`,
			className: "",
			iconSize: new Point(40, 40),
		});
	};

	const customCurrentLocationIcon = new DivIcon({
		className: "",
		html: `
      <div class="relative flex items-center justify-center">
        <span class="absolute w-20 h-20 rounded-full bg-red-500 opacity-30 animate-ping"></span>
        <span class="w-4 h-4 rounded-full bg-red-600 border-2 border-white"></span>
      </div>
    `,
	});

	return (
		<>
			{position && (
				<Marker position={position} icon={customCurrentLocationIcon}
				eventHandlers={{
					click: () => {
						map.flyTo(position, 15, {
							animate: true,
							duration: 2,
						});
					},
				}}>
					<Popup>
						<h4 className="text-center">
							{currentLocation ? currentLocation.data.lokasi.desa : "Tidak diketahui"}
						</h4>
					</Popup>
				</Marker>
			)}
			<MarkerClusterGroup
				iconCreateFunction={createCustomClusterIcon}
				chunkedLoading>
				{transformWeatherData?.flatMap((item: TransformWeatherData) => {
					if (!item.lngLat) return null;

					const firstWeather = item.cuaca?.[0]?.[0];

					const iconUrl = getImageUrl(firstWeather?.weather_desc_en);

					const customIcon = new DivIcon({
						html: `<div class="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md">
           <img src="${iconUrl}" class="w-8 h-8"/>
         </div>`,
						className: "",
						iconSize: [40, 40],
					});

					const weatherStatus = firstWeather
						? firstWeather.weather_desc
						: "Tidak diketahui";

					return (
						<Marker
							position={item.lngLat}
							icon={customIcon}
							key={item.province}>
							<Popup>
								<h4 className="text-center">{item.village}</h4>
								<p
									className={`text-center ${
										weatherStatus === "Tidak diketahui"
											? "bg-red-500"
											: "bg-green-500"
									} rounded-sm text-white`}>
									<span className="p-2">{weatherStatus}</span>
								</p>
							</Popup>
						</Marker>
					);
				})}
			</MarkerClusterGroup>
		</>
	);
}
