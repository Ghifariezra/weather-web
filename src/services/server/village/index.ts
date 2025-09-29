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
}

export const areaCodeService = new AreaCodeService();