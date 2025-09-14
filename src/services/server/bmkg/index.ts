import { weatherInstance } from "@/utils/axios/instance";

export const getWeather = async (adm4: string) => {
    const response = await weatherInstance.get("", {
        params: { adm4 },
    });

    if (response.status !== 200) {
        throw new Error("Failed to fetch weather data");
    }

    return response.data.data[0];
};
