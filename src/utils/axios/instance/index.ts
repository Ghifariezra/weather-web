import { createInstance } from "@/utils/axios";

// Special for Server
const weatherInstance = createInstance({
    base: process.env.WEATHER_API!,
})

const nominatimInstance = createInstance({
    base: process.env.NOMINATIM_API!,
})
nominatimInstance.defaults.headers["User-Agent"] = "my-weather-app/1.0 (ghifariezraramadhan@gmail.com)";

// Special for Client
const clientInstance = createInstance({
    credentials: true,
})

clientInstance.interceptors.response.use(async (response) => {
    return response
});

export { weatherInstance, clientInstance, nominatimInstance };