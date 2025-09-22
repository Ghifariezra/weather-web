import { supabaseClient } from "@/lib/supabase";
import { ProvinceGroup } from "@/types/village";

class AreaCodeService {
    async getVillageAreaCode(): Promise<ProvinceGroup[]> {
        const { data, error } = await supabaseClient().rpc(
            "get_village_area_codes"
        );

        if (error) {
            throw new Error(error.message);
        }
        return data as ProvinceGroup[];
    }

    async getProvinceAreaCode(): Promise<string[]> {
        const { data, error } = await supabaseClient().from("province").select("area");

        if (error) throw new Error(error.message);

        return data.map((item) => item.area);
    }
}

export const areaCodeService = new AreaCodeService();