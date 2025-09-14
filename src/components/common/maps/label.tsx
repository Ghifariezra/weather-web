'use client';

import { Polygon } from "react-leaflet";
import { geoIND } from "@/utils/geo";
import { getCoords } from "@/utils/coords";
import type { Coords } from "@/types/maps";

export default function LabelArea({
    setCoordinates,
}: {
    setCoordinates: (coords: Coords) => void;
}) {
    return (
        <>
            {geoIND.features.map((feature) => {
                if (feature.geometry.type === "MultiPolygon") {
                    return feature.geometry.coordinates.map(
                        (multiPolygon, index) => {
                            const coords = getCoords(multiPolygon);
                            return (
                                <Polygon
                                    key={index}
                                    stroke-opacity={1}
                                    stroke-width={3}
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    fillColor="#3388ff"
                                    fill-opacity={0.2}
                                    fill-rule="evenodd"
                                    positions={coords}
                                    eventHandlers={{
                                        click: () => {
                                            setCoordinates(coords);
                                        },
                                    }}
                                />
                            );
                        }
                    );
                }
                return null;
            })}
        </>
    );
}
