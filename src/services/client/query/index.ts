import { useQuery, useMutation } from "@tanstack/react-query";
import { CloudyCatService } from "@/services/client/cloudycat";
import { cacheDurationApi } from "@/utils/duration";

const { STALE_DATA_DURATION, CACHE_DURATION } = cacheDurationApi();
const service = new CloudyCatService();

export const useWeather = () =>
    useMutation({
        mutationKey: ["weather"],
        mutationFn: (adm4: string[]) => service.getWeather(adm4),
        gcTime: CACHE_DURATION,
    });

export const useWeatherLoc = (adm: string) =>
    useQuery({
        queryKey: ["weather-loc"],
        queryFn: () => service.getWeatherLoc(adm),
        staleTime: STALE_DATA_DURATION,
        enabled: !!adm,
    });

export const useDistrictCode = () =>
    useMutation({
        mutationKey: ["district-code"],
        mutationFn: ({ slug, lat, lon }: { slug: string; lat: number; lon: number }) =>
            service.getDistrictCode(slug, lat, lon),
        gcTime: CACHE_DURATION,
    });

export const useVillage = () =>
    useQuery({
        queryKey: ["village"],
        queryFn: () => service.getVillageAreaCode(),
        staleTime: STALE_DATA_DURATION,
    });

export const useProvince = (province_name: string) =>
    useQuery({
        queryKey: ["province", province_name],
        queryFn: () => service.getProvinceAreaCode(province_name),
        staleTime: STALE_DATA_DURATION,
    });
