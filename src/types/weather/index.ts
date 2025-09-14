export type InfoItemProps = {
    icon: string;
    alt: string;
    value: string | number | undefined;
    unit?: string;
    label: string;
    className?: string;
};

export interface Lokasi {
    adm1: string;
    adm2: string;
    adm3: string;
    adm4: string;
    provinsi: string;
    kotkab: string;
    kecamatan: string;
    desa: string;
    lon: number;
    lat: number;
    timezone: string;
    type?: string;
}

export interface CuacaDetail {
    datetime: string;
    t: number;
    tcc: number;
    tp: number;
    weather: number;
    weather_desc: string;
    weather_desc_en: string;
    wd_deg: number;
    wd: string;
    wd_to: string;
    ws: number;
    hu: number;
    vs: number;
    vs_text: string;
    time_index: string;
    analysis_date: string;
    image: string;
    utc_datetime: string;
    local_datetime: string;
}

export type WeatherLoc = {
    full_address?: string;
    province: string;
    district_name: string;
    subdistrict_name: string;
    village_name: string;
    village_code: string;
}

export interface TransformWeatherData {
    province: string;
    village: string;
    lngLat: [number, number];
    cuaca: CuacaDetail[][];
}

export interface WeatherDataItem {
    lokasi: Lokasi;
    cuaca: CuacaDetail[][];
}

export interface WeatherData {
    lokasi: Lokasi;
    data: WeatherDataItem[];
}

export interface ResponseWeather {
    message: string;
    total: number;
}

export interface ResponseWeatherData extends ResponseWeather {
    data: WeatherDataItem[];
}

export interface ResponseWeatherLoc extends Omit<ResponseWeather, "total"> {
    data: WeatherDataItem;
}

export interface ResponseDistrictCode extends Omit<ResponseWeather, "total"> {
    data: WeatherLoc;
}