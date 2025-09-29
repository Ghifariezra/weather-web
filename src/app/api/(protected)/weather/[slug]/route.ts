import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { areaCodeService } from "@/services/server/village";
import { verifyCsrfToken } from "@/utils/csrf";
import { SearchParams } from "@/types/searchParams";
import { getVillageByLatLng } from "@/services/server/openstreet";

export async function POST(
    req: NextRequest,
    { params }: SearchParams
) {
    const { slug } = await params;
    const { lat, lon } = await req.json();
    const { getVillageAreaCode } = areaCodeService;

    // CSRF check
    const token = (await cookies()).get("csrfToken")?.value;
    if (!token || !(await verifyCsrfToken(token))) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const province_name = slug.toUpperCase();
    const dataProvince = (await getVillageAreaCode()).flatMap((p) => p.province);

    if (dataProvince.includes(province_name)) {
        const getVillage = await getVillageByLatLng(Number(lat), Number(lon));

        if (!getVillage) {
            return Response.json({ error: "Data not found" }, { status: 404 });
        }

        // cari langsung di hasil areaCodeService, bukan dari cache
        const areaCodes = await getVillageAreaCode();
        const provinceData = areaCodes.find((p) => p.province === province_name);

        let found = undefined;
        if (provinceData) {
            found = provinceData.villages.find((p) =>
                (p.subdistrict_name.toLowerCase() === getVillage.raw.suburb?.toLowerCase() &&
                    p.village_name.toLowerCase() === getVillage.raw.neighbourhood?.toLowerCase()) ||
                p.village_name.toLowerCase() === getVillage.raw.suburb?.toLowerCase()
            );
        }

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

        return Response.json({
            message: "Village not found in area code",
            data: [],
        }, { status: 200 });
    }

    return Response.json({
        error: "Data not found"
    }, { status: 404 });
}
