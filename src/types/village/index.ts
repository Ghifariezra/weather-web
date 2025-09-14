export interface VillageAreaCode {
    id: string;
    province_name: string;
    district_name: string;
    subdistrict_name: string;
    village_name: string;
    village_code: string;
}

export type ProvinceGroup = {
    province: string;
    villages: VillageAreaCode[];
};

export type ByProvinceGroup = {
    province: string;
    village: VillageAreaCode;
};

export type VillageResponse = {
    message: string;
    total: number;
    data: ProvinceGroup[];
}