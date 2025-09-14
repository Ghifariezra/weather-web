import type { Coords, MultiPolygon } from "@/types/maps";

export function getCoords(data: MultiPolygon): Coords {
    return data[0].map((coord) => {
        if (coord.length === 2) {
            const [lng, lat] = coord;
            return [lat, lng];
        }
        throw new Error(
            "Invalid coordinate length"
        );
    });
}

export function checkCoord(data: Coords, coordinates: Coords): boolean {
    return data.some((coord) => {
        const [lat, lng] = coord;

        return coordinates.some((coordinate) => coordinate[0] === lat && coordinate[1] === lng);
    })
}