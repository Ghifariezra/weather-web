import { clientInstance } from "@/utils/axios/instance";
import type { ResponseDistrictCode, ResponseWeatherData, ResponseWeatherLoc } from "@/types/weather";
import type { ProvinceGroup, VillageResponse } from "@/types/village";

class CloudyCatService {
    async getWeather(adm4: string[]): Promise<ResponseWeatherData> {
        try {
            const response = await clientInstance.post("/api/weather", { adm4 });

            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                console.error("❌ Gagal fetch weather data:", error.message);
                throw new Error(error.message);
            }
            throw new Error("❌ Terjadi error yang tidak diketahui");
        }
    }

    async getWeatherLoc(adm4: string): Promise<ResponseWeatherLoc> {
        try {
            const response = await clientInstance.get(`/api/weather`, { params: { adm4 } });

            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                console.error("❌ Gagal fetch weather data:", error.message);
                throw new Error(error.message);
            }
            throw new Error("❌ Terjadi error yang tidak diketahui");
        }
    }

    async getDistrictCode(slug: string, lat: number, lon: number): Promise<ResponseDistrictCode> {
        try {
            const response = await clientInstance.post(`/api/weather/${slug}`, {
                lat,
                lon
            });
            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                console.error("❌ Gagal fetch weather data:", error.message);
                throw new Error(error.message);
            }
            throw new Error("❌ Terjadi error yang tidak diketahui");
        }
    }

    async getVillageAreaCode(): Promise<VillageResponse> {
        try {
            const response = await clientInstance.get("/api/village");
            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                console.error("❌ Gagal fetch area code data:", error.message);
                throw new Error(error.message);
            }
            throw new Error("❌ Terjadi error yang tidak diketahui");
        }
    }

    async getProvinceAreaCode(province_name: string): Promise<ProvinceGroup["villages"][]> {
        try {
            const response = await clientInstance.get("/api/province", { params: { province_name } });
            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                console.error("❌ Gagal fetch area code data:", error.message);
                throw new Error(error.message);
            }
            throw new Error("❌ Terjadi error yang tidak diketahui");
        }
    }
}

export { CloudyCatService };