import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getWeather } from "@/services/server/bmkg";
import { verifyCsrfToken } from "@/utils/csrf";
import {
    getOrSetCacheWeather,
} from "@/utils/redis";

export async function POST(
    req: NextRequest,
) {
    // CSRF check
    const token = (await cookies()).get("csrfToken")?.value;
    if (!token || !(await verifyCsrfToken(token))) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { adm4 } = await req.json();

    for (const item of adm4) {
        await getOrSetCacheWeather(`weather:villages:${item}`, () => getWeather(item));
    }

    const data = await Promise.all(
        adm4.map((item: string) => getOrSetCacheWeather(`weather:villages:${item}`))
    );
    
    return Response.json({ 
        message: "Data fetched successfully",
        total: data.length,
        data
     }, { status: 200 });
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const adm4 = searchParams.get("adm4");

    if (!adm4) {
        return Response.json({ error: "Missing adm4 parameter" }, { status: 400 });
    }

    const data = await getOrSetCacheWeather(
        `weather:villages:${adm4}`,
        () => getWeather(adm4)
    );

    return Response.json(
        {
            message: "Data fetched successfully",
            data,
        },
        { status: 200 }
    );
}