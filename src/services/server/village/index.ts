import { supabaseClient } from "@/lib/supabase";
import { VillageAreaCode, ProvinceGroup } from "@/types/village";

class AreaCodeService {
    async getVillageAreaCode(): Promise<ProvinceGroup[]> {
        const batchSize = 1000;
        let from = 0;
        let to = batchSize - 1;
        const allData: VillageAreaCode[] = [];

        while (true) {
            const { data, error } = await supabaseClient()
                .from("village_hierarchy_mv")
                .select("*")
                .range(from, to);

            if (error) throw new Error(error.message);
            if (!data || data.length === 0) break;

            allData.push(...data);

            // console.log(`✅ Batch ${from}-${to} berhasil, total: ${allData.length}`);

            if (data.length < batchSize) break;

            from += batchSize;
            to += batchSize;
        }

        // Grouping
        const groupByProvinces: Record<string, VillageAreaCode[]> = allData.reduce(
            (acc, cur) => {
                acc[cur.province_name] = acc[cur.province_name] || [];
                acc[cur.province_name].push(cur);
                return acc;
            },
            {} as Record<string, VillageAreaCode[]>
        );

        return Object.entries(groupByProvinces).map(([province, villages]) => ({
            province,
            villages,
        }));
    }

    async getProvinceAreaCode(): Promise<string[]> {
        const { data, error } = await supabaseClient().from("province").select("area");

        if (error) throw new Error(error.message);

        return data.map((item) => item.area);
    }
}

export const areaCodeService = new AreaCodeService();