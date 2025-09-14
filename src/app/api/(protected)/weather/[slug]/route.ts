import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { areaCodeService } from "@/services/server/village";
import { verifyCsrfToken } from "@/utils/csrf";
import {
    getCacheProvince,
} from "@/utils/redis";
import { SearchParams } from "@/types/searchParams";
import { getVillageByLatLng } from "@/services/server/openstreet";

export async function POST(
    req: NextRequest,
    { params }: SearchParams
) {
    const { slug } = await params;
    const { lat, lon } = await req.json();
    const { getProvinceAreaCode } = areaCodeService;

    // CSRF check
    const token = (await cookies()).get("csrfToken")?.value;
    if (!token || !(await verifyCsrfToken(token))) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const province_name = slug.toUpperCase();
    const dataProvince = await getProvinceAreaCode();

    // Get cache data
    if (dataProvince.includes(province_name)) {
        const keyProvince = `provinces:${province_name}`;
        const cacheProvince = await getCacheProvince(keyProvince);

        if (cacheProvince) {
            const getVillage = (await getVillageByLatLng(Number(lat), Number(lon)));

            if (!getVillage) {
                return Response.json({ error: "Data not found" }, { status: 404 });
            }

            const found = cacheProvince.flat().find((p) => 
                p.subdistrict_name.toLowerCase() === getVillage.raw.suburb.toLowerCase()! && p.village_name.toLowerCase() === getVillage.raw.neighbourhood.toLowerCase()! || p.village_name.toLowerCase() === getVillage.raw.suburb.toLowerCase()!);

            if (found) {
                return Response.json({
                    message: "Data fetched successfully",
                    data: {
                        full_address: getVillage.full_address,
                        province: province_name,
                        ...found,
                    },
                }, { status: 200 });
            }

            // fallback jika tidak ditemukan village
            return Response.json({
                message: "No cached data available",
                data: [],
            }, { status: 200 });
        }

        // ✅ tambahkan ini
        return Response.json({
            message: "Cache not found for this province",
            data: [],
        }, { status: 200 });
    }

    return Response.json({ 
        error: "Data not found"
     }, { status: 404 });
}
