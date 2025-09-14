import { areaCodeService } from "@/services/server/village";
import {
    getOrSetCacheVillage,
} from "@/utils/redis";

export async function GET() {
    const { getVillageAreaCode, getProvinceAreaCode } = areaCodeService;
    const dataProvince = await getProvinceAreaCode();
    const data = await getVillageAreaCode();

    const newData = dataProvince.map((item) => {
        const found = data.find((p) => p.province === item);

        if (!found) return;

        const firstVillage = found?.villages?.[0];
        return {
            province: item,
            subdistrict_name: firstVillage?.subdistrict_name,
            villages: firstVillage ? [firstVillage] : []
        };
    });

    const promises = newData.flatMap((p, index) => {
        if (!p || p.villages.length === 0) return [];

        return [
            getOrSetCacheVillage(
                `villages:${p.province}:${p.subdistrict_name}:${p.villages[0].village_name}`,
                data[index].villages
            ),
            getOrSetCacheVillage(
                `provinces:${data[index].province}`,
                data[index].villages
            ),
        ];
    });

    await Promise.all(promises);

    return Response.json({
        message: "Data fetched successfully",
        total: data.length,
        data: newData
    }, { status: 200 });
}
