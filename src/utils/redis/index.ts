import { redisClient } from "@/lib/redis";
import { promisify } from "util";
import zlib from "zlib";
import { cacheDurationRedis } from "@/utils/duration";
import type { ByProvinceGroup, ProvinceGroup } from "@/types/village";

const gzip = promisify(zlib.gzip);
const gunzip = promisify(zlib.gunzip);
const { CACHE_DURATION } = cacheDurationRedis();

async function getOrSetCacheWeather<T>(
    key: string,
    fetcher?: () => Promise<T>,
    ttl = CACHE_DURATION
): Promise<T> {
    const cached = await redisClient.get(key);
    if (cached) {
        console.log("🌐 Data diambil dari Redis:", key);
        const buffer = Buffer.from(cached, "base64");
        const decompressed = await gunzip(buffer);
        return JSON.parse(decompressed.toString()) as T;
    }

    if (!fetcher) throw new Error("fetcher is required");
    const data = await fetcher();

    const stringified = JSON.stringify(data);
    const compressed = await gzip(stringified);
    const compressedBase64 = compressed.toString("base64");

    await redisClient.set(key, compressedBase64, { EX: ttl });

    console.log("🌐 Data fresh, simpan ke Redis:", key);

    return data;
}

async function getOrSetCacheVillage<T>(
    key: string,
    data: ProvinceGroup["villages"] = [],
    ttl = CACHE_DURATION
) {
    const cached = await redisClient.get(key);
    if (cached) {
        const buffer = Buffer.from(cached, "base64");
        const decompressed = await gunzip(buffer);
        return JSON.parse(decompressed.toString()) as T;
    }

    const stringified = JSON.stringify(
        data.map(item => {
            const { province_name: _, ...rest } = item;
            return rest;
        })
    );
    const compressed = await gzip(stringified);
    const compressedBase64 = compressed.toString("base64");

    await redisClient.set(key, compressedBase64, { EX: ttl });

    console.log("🌐 Data fresh, simpan ke Redis:", key);

    return data;
}

export {
    redisClient,
    CACHE_DURATION,
    getOrSetCacheWeather,
    getOrSetCacheVillage,
};