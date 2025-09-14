import { createInstance } from "@/utils/axios";

// Special for Server
const weatherInstance = createInstance({
    base: process.env.NEXT_PUBLIC_WEATHER_API!,
})

const nominatimInstance = createInstance({
    base: process.env.NEXT_PUBLIC_NOMINATIM_API!,
})

// Special for Client
const clientInstance = createInstance({
    credentials: true,
})

clientInstance.interceptors.response.use(async (response) => {
    return response
});

export { weatherInstance, clientInstance, nominatimInstance };