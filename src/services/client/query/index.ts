import { useQuery, useMutation } from "@tanstack/react-query";
import { CloudyCatService } from "@/services/client/cloudycat";
import { cacheDurationApi } from "@/utils/duration";

const { STALE_DATA_DURATION, CACHE_DURATION } = cacheDurationApi();

class UseCloudyQuery extends CloudyCatService {
    useWeather() {
        return useMutation({
            mutationKey: ["weather"],
            mutationFn: (adm4: string[]) => this.getWeather(adm4),
            gcTime: CACHE_DURATION,
            // retryDelay: 2 * 60 * 1000,
        })
    }

    useWeatherLoc(adm: string) {
        return useQuery({
            queryKey: ["weather-loc"],
            queryFn: () => this.getWeatherLoc(adm),
            staleTime: STALE_DATA_DURATION,
            enabled: !!adm
        })
    }

    useDistrictCode() {
        return useMutation({
            mutationKey: ["district-code"],
            mutationFn: ({ slug, lat, lon }: { slug: string; lat: number; lon: number }) =>
                this.getDistrictCode(slug, lat, lon),
            gcTime: CACHE_DURATION,
            // retryDelay: 2 * 60 * 1000,
        });
    }

    useVillage() {
        return useQuery({
            queryKey: ["village"],
            queryFn: () => this.getVillageAreaCode(),
            staleTime: STALE_DATA_DURATION
        });
    }

    useProvince(province_name: string) {
        return useQuery({
            queryKey: ["province", province_name],
            queryFn: () => this.getProvinceAreaCode(province_name),
            staleTime: STALE_DATA_DURATION
        });
    }
}

export const cloudyQuery = new UseCloudyQuery();