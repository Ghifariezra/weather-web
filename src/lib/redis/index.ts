import { createClient } from "redis";

const redisClient = createClient({
    username: process.env.REDIS_USER,
    password: process.env.REDIS_PASS,
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
    },
});

// 🔎 Error handling
redisClient.on("error", (err) => {
    console.error("❌ Redis Client Error:", err);
});

// 🚀 Auto-connect saat pertama dipanggil
(async () => {
    if (!redisClient.isOpen) {
        await redisClient.connect();
        console.log("✅ Connected to Redis Cloud");
    }
})();

export { redisClient };
