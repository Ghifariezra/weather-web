import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { areaCodeService } from "@/services/server/village";
import { verifyCsrfToken } from "@/utils/csrf";

export async function GET(req: NextRequest) {
    const { getVillageAreaCode } = areaCodeService;
    const { searchParams } = new URL(req.url);

    // CSRF check
    const token = (await cookies()).get("csrfToken")?.value;
    if (!token || !(await verifyCsrfToken(token))) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const province_name = searchParams.get("province_name")?.toUpperCase();
    if (!province_name) {
        return Response.json({ error: "province_name is required" }, { status: 400 });
    }

    const areaCodes = await getVillageAreaCode();
    const provinceData = areaCodes.find((p) => p.province === province_name);

    if (!provinceData) {
        return Response.json({ error: "Data not found" }, { status: 404 });
    }

    return Response.json({
        message: "Data fetched successfully",
        total: provinceData.villages.length,
        data: provinceData.villages,
    }, { status: 200 });
}
