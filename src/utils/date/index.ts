export function formatLocalDate(date: Date) {
    const pad = (n: number) => n.toString().padStart(2, "0");

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1); // bulan dimulai dari 0
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


export function dateFormat(date: string) {
    const d = new Date(date);
    const tanggal = d.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    const jam = d.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    return {
        tanggal,
        jam,
    };
}

export function checkDay(date: string) {
    const d = new Date(date);

    // Normalisasi semua ke pukul 00:00:00
    d.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(today.getDate() + 2);

    if (d.getTime() === today.getTime()) return "Hari ini";
    if (d.getTime() === tomorrow.getTime()) return "Besok";
    if (d.getTime() === dayAfterTomorrow.getTime()) return "Lusa";

    return "Kemarin";
}

export function Title(datetime: string, weather: string) {
    const hour = new Date(datetime).getHours();

    if (weather.includes("Hujan")) return "☔ Hujan — siap-siap payung!";
    if (hour >= 5 && hour < 10) return "🌞 Pagi cerah — semangat beraktivitas!";
    if (hour >= 10 && hour < 15) return "🔆 Siang terik — minum air yang cukup!";
    if (hour >= 15 && hour < 18) return "🌤️ Sore adem — cocok jalan santai!";
    if (hour >= 18 || hour < 5) return "🌙 Malam tenang — waktunya rebahan";

    return weather;
}