import { CuacaDetail } from "@/types/weather";
import { checkDay } from "../date";

function tempDesc(avg: number) {
    if (avg < 22) return `Dingin nih 🥶 (${avg}°C)`;
    if (avg >= 22 && avg <= 23) return `Agak sejuk ❄️ (${avg}°C)`;
    if (avg >= 24 && avg <= 27) return `Masih nyaman 🌤️ (${avg}°C)`;
    if (avg >= 28 && avg <= 30) return `Mulai gerah 😅 (${avg}°C)`;
    if (avg > 30) return `Panas banget! 🔥 (${avg}°C)`;
    return `${avg}°C`;
}

function humidityDesc(avg: number) {
    if (avg < 40) return `Udara kering 🚰 (${avg}%)`;
    if (avg >= 40 && avg <= 60) return `Nyaman buat bernapas 😌 (${avg}%)`;
    if (avg >= 61 && avg <= 70) return `Agak lembap 🌫️ (${avg}%)`;
    if (avg > 70) return `Lembap banget, gerah nih 💦 (${avg}%)`;
    return `${avg}%`;
}

function windDesc(avg: number) {
    if (avg <= 5) return `Sepoi-sepoi 🌬️ (${avg} km/h)`;
    if (avg > 5 && avg <= 15) return `Adem enak buat jalan 😎 (${avg} km/h)`;
    if (avg > 15 && avg <= 30) return `Lumayan kencang 💨 (${avg} km/h)`;
    if (avg > 30) return `Kenceng banget, hati-hati! 🌀 (${avg} km/h)`;
    return `${avg} km/h`;
}


export function footerDesc(type: string, min: number, max: number, avg: string) {
    switch (type) {
        case "suhu":
            if (Number(avg) < 22) {
                return `Brrr… dingin banget 🥶 (${min}°C – ${max}°C, avg ${avg}°C). Cocok selimutan ☕ tapi hati-hati masuk angin ya 😉`;
            }
            if (Number(avg) <= 27) {
                return `Sejuk nyaman 🌤️ (${min}°C – ${max}°C, avg ${avg}°C). Waktu pas buat jalan santai 👟, tetap jaga stamina 👍`;
            }
            if (Number(avg) <= 30) {
                return `Mulai gerah 😅 (${min}°C – ${max}°C, avg ${avg}°C). Jangan lupa minum air 🧋 biar nggak dehidrasi 🚰`;
            }
            return `Panas pol! 🔥 (${min}°C – ${max}°C, avg ${avg}°C). Saatnya cari AC ❄️, hati-hati kepanasan ya 🥵`;

        case "kelembapan":
            if (Number(avg) < 40) {
                return `Kering banget 🌵 (${min}% – ${max}%, avg ${avg}%). Minum cukup air 💧 biar badan nggak lemas 😉`;
            }
            if (Number(avg) <= 70) {
                return `Udara pas 👍 (${min}% – ${max}%, avg ${avg}%). Adem 🌿, tapi tetap jaga kesehatan tubuh ya ✨`;
            }
            return `Lembap parah 😮‍💨 (${min}% – ${max}%, avg ${avg}%). Bisa bikin gerah 💦, hati-hati jangan terlalu lama di luar 🚶`;

        case "angin":
            if (Number(avg) < 5) {
                return `Sepoi-sepoi santai 🍃 (${min} – ${max} km/jam, avg ${avg} km/jam). Rambut aman ✨, tapi jangan sampai ketiduran di luar 🤭`;
            }
            if (Number(avg) <= 20) {
                return `Lumayan kencang 💨 (${min} – ${max} km/jam, avg ${avg} km/jam). Rambut agak berantakan 😅, hati-hati kalau naik motor 🛵`;
            }
            return `Kenceng banget 🌪️ (${min} – ${max} km/jam, avg ${avg} km/jam). Jangan melawan angin 😂, hati-hati barang bisa kebawa!`;

        default:
            return "";
    }
}

export const desc: Record<string, (avg: string) => string> = {
    suhu: (avg) => tempDesc(parseFloat(avg || "0")),
    kelembapan: (avg) => humidityDesc(parseFloat(avg || "0")),
    angin: (avg) => windDesc(parseFloat(avg || "0")),
};

export function getSummary(today: CuacaDetail[]) {
    const minInfinity = -Infinity;
    const maxInfinity = Infinity;

    const timeMax = today.reduce(
        (acc, cur) =>
            Math.max(acc, new Date(cur.local_datetime).getTime()),
        minInfinity
    );

    const timeMin = today.reduce(
        (acc, cur) =>
            Math.min(acc, new Date(cur.local_datetime).getTime()),
        maxInfinity
    );

    return {
        time_max: new Date(timeMax).toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        }),
        time_min: new Date(timeMin).toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        }),
        suhu_max: today.reduce(
            (acc, cur) => Math.max(acc, cur.t),
            minInfinity
        ),
        suhu_min: today.reduce(
            (acc, cur) => Math.min(acc, cur.t),
            maxInfinity
        ),
        suhu_avg: (
            today.reduce((acc, cur) => acc + cur.t, 0) / today.length
        ).toFixed(1),
        humidity_max: today.reduce(
            (acc, cur) => Math.max(acc, cur.hu),
            minInfinity
        ),
        humidity_min: today.reduce(
            (acc, cur) => Math.min(acc, cur.hu),
            maxInfinity
        ),
        humidity_avg: (
            today.reduce((acc, cur) => acc + cur.hu, 0) / today.length
        ).toFixed(1),
        wind_max: today.reduce(
            (acc, cur) => Math.max(acc, cur.ws),
            minInfinity
        ),
        wind_min: today.reduce(
            (acc, cur) => Math.min(acc, cur.ws),
            maxInfinity
        ),
        wind_avg: (
            today.reduce((acc, cur) => acc + cur.ws, 0) / today.length
        ).toFixed(1),
    };
}

export function currentData(data: CuacaDetail[]) {
    return data
        .filter((item) => {
            const today = checkDay(item.local_datetime) === "Hari ini";
            return today;
        })
        .filter((item) => {
            const hoursNow = new Date().getHours();
            const time = new Date(item.local_datetime).getHours();
            return hoursNow <= time;
        });
}