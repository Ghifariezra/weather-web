const cacheDurationRedis = () => {
    const CACHE_DURATION_PROD = 12 * 60 * 60;
    const CACHE_DURATION_DEV = 5 * 60;

    const CACHE_DURATION = process.env.NODE_ENV === "production" ? CACHE_DURATION_PROD : CACHE_DURATION_DEV;

    return { CACHE_DURATION };
}

const cacheDurationApi = () => {
    const STALE_DATA_DURATION_PROD = 12 * 60 * 60 * 1000; // 12 jam
    const CACHE_DURATION_PROD = 24 * 60 * 60 * 1000; // 24 jam

    const STALE_DATA_DURATION_DEV = 5 * 60 * 1000; // 5 menit
    const CACHE_DURATION_DEV = 10 * 60 * 1000; // 10 menit

    const STALE_DATA_DURATION = process.env.NODE_ENV === "production" ? STALE_DATA_DURATION_PROD : STALE_DATA_DURATION_DEV;
    const CACHE_DURATION = process.env.NODE_ENV === "production" ? CACHE_DURATION_PROD : CACHE_DURATION_DEV;

    return { STALE_DATA_DURATION, CACHE_DURATION };
}

export { cacheDurationRedis, cacheDurationApi };