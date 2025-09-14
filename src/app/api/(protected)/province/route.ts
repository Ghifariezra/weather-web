import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { areaCodeService } from "@/services/server/village";
import { verifyCsrfToken } from "@/utils/csrf";
import {
    getCacheProvince,
} from "@/utils/redis";

export async function GET(
    req: NextRequest,
) {
    const { getProvinceAreaCode } = areaCodeService;
    const { searchParams } = new URL(req.url);

    // CSRF check
    const token = (await cookies()).get("csrfToken")?.value;
    if (!token || !(await verifyCsrfToken(token))) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dataProvince = await getProvinceAreaCode();
    const province_name = searchParams.get("province_name")!.toUpperCase();

    // Get cache data
    if (dataProvince.includes(province_name)) {
        const keyProvince = `provinces:${province_name}`;
        const cacheProvince = await getCacheProvince(keyProvince);

        if (cacheProvince) {
            return Response.json({
                message: "Data fetched successfully",
                total: cacheProvince.length,
                data: cacheProvince
            }, { status: 200 });
        }

        // fallback jika cacheProvince kosong
        return Response.json({
            message: "No cached data available",
            data: [],
        }, { status: 200 });
    } else {
        return Response.json({ error: "Data not found" }, { status: 404 });
    }
}
