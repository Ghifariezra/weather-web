import { useState, useMemo, useEffect } from "react";
import { useWeatherLoc, useWeather, useVillage, useDistrictCode } from "@/services/client/query";
import { geoIND } from "@/utils/geo";
import type { LatLng } from "leaflet";
import type { Center, Coords } from "@/types/maps";
import { point, booleanPointInPolygon } from "@turf/turf";

const useMaps = () => {
    const [center] = useState<Center>([-2.5489, 118.0149]);
    const [position, setPosition] = useState<LatLng | null>(null);
    const [coordinates, setCoordinates] = useState<Coords>([]);
    const [lastReq, setLastReq] = useState<{ slug: string | null; lat: number; lon: number } | null>(null);

    // Mutations
    const { mutate: wDistrictMutate, data: wDistrictData, isPending: wDistrictLoading } = useDistrictCode();
    const { mutate: wMutate, data: wData, isPending: wLoading } = useWeather();
    
    // Queries
    const { data: v, isLoading: vLoad, isError: vError } = useVillage();
    
    const villageCode = wDistrictData?.data?.village_code;

    const { data: weatherLoc, isLoading: weatherLocLoading, isError: weatherLocError } =
        useWeatherLoc(villageCode ?? "", {
            enabled: !!villageCode, // hanya jalan kalau ada villageCode
        });


    const { features } = geoIND;

    const findVillageAreaCode = useMemo(() => {
        if (!v?.data) return null;

        return v.data.flatMap((province) => {
            const feature = features.find(
                (f) => f.properties.name.toUpperCase() === province.province.toUpperCase()
            );

            if (!feature) return [];

            return province.villages.map((village) => {
                const { id:_ , province_name, subdistrict_name, district_name, ...rest } = village;

                return {
                    province_name,
                    district_name,
                    subdistrict_name,
                    ...rest,
                    geometry: feature.geometry
                };
            });
        });
    }, [v, features]);

    const findProvinceByLoc = useMemo(() => {
        if (!position) return null;

        const pointTurf = point([position.lng, position.lat]);

        const found = features.find((feature) =>
            booleanPointInPolygon(pointTurf, feature)
        );

        return found ? found.properties.name : null;
    }, [position, features]);

    useEffect(() => {
        if (findVillageAreaCode) {
            const codes = findVillageAreaCode.map((village) => village.village_code);
            if (codes.length > 0) {
                wMutate(codes);
            }
        }
    }, [findVillageAreaCode, wMutate]);

    const transformWeatherData = useMemo(() => {
        if (!wData) return null;

        return wData?.data.map((item) => {
            return {
                province: item.lokasi.provinsi,
                village: item.lokasi.desa,
                lngLat: [item.lokasi.lat, item.lokasi.lon] as Center,
                cuaca: [...item.cuaca],
            };
        });
    }, [wData]);

    useEffect(() => {
        if (!position || !findProvinceByLoc) return;

        const req = { slug: findProvinceByLoc, lat: position.lat, lon: position.lng };

        if (
            lastReq &&
            lastReq.slug === req.slug &&
            lastReq.lat === req.lat &&
            lastReq.lon === req.lon
        ) {
            return;
        }

        setLastReq(req);
        wDistrictMutate(req);
    }, [position, findProvinceByLoc, wDistrictMutate, lastReq]);

    const rawWeather = useMemo(() => {
        if (!weatherLoc) return null;

        return weatherLoc?.data?.cuaca?.flat();
    }, [weatherLoc]);
 
    return {
        center,
        position,
        setPosition,
        coordinates,
        setCoordinates,
        findVillageAreaCode,
        v,
        vLoad,
        vError,
        transformWeatherData,
        wLoading,
        weatherLoc,
        weatherLocLoading,
        weatherLocError,
        wDistrictData,
        wDistrictLoading,
        rawWeather
    }
}

export { useMaps }