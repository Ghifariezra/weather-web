import { nominatimInstance } from "@/utils/axios/instance";

export const getVillageByLatLng = async (lat: number, lon: number) => {
    const response = await nominatimInstance.get("", {
        params: {
            format: "json",
            lat,
            lon,
            zoom: 18,
            addressdetails: 1
        }
    })
    
    if (response.status !== 200) {
        throw new Error("Failed to fetch data from nominatim");
    }

    const data = response.data;

    return {
        full_address: data.display_name,
        village: data.address.village || data.address.suburb || data.address.locality || null,
        raw: data.address
    };
}
