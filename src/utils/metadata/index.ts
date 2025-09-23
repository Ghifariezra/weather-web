import type { Metadata } from "next";

const metaRoot: Metadata = {
    title: "Langit Kita – Real-Time Weather Forecast dengan Data BMKG",
    description:
        "Langit Kita adalah aplikasi web untuk prakiraan cuaca real-time menggunakan data resmi BMKG. Tampilkan cuaca harian, per jam, serta visualisasi interaktif melalui grafik dan peta.",
    keywords: [
        "Langit Kita",
        "Cuaca",
        "BMKG",
        "Prakiraan Cuaca",
        "Weather Forecast",
        "Next.js",
        "Supabase",
        "Redis",
    ],
    publisher: "Langit Kita",
    openGraph: {
        title: "Langit Kita – Real-Time Weather Forecast dengan Data BMKG",
        description:
            "Web app prakiraan cuaca real-time berbasis data BMKG. Menampilkan cuaca harian, per jam, grafik interaktif, dan peta.",
        url: "https://langit-kita.vercel.app/",
        siteName: "Langit Kita",
        images: [
            {
                url: "https://langit-kita.vercel.app/favicon.ico",
                width: 1200,
                height: 630,
                alt: "Langit Kita – Real-Time Weather Forecast",
            },
        ],
        locale: "id_ID",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Langit Kita – Real-Time Weather Forecast dengan Data BMKG",
        description:
            "Aplikasi web prakiraan cuaca real-time dengan data resmi BMKG. Tampilkan cuaca harian, per jam, grafik, dan peta interaktif.",
        images: ["https://langit-kita.vercel.app/favicon.ico"],
    },
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    },
    metadataBase: new URL("https://langit-kita.vercel.app"),
};

export { metaRoot };
