import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { generateCsrfToken } from "@/utils/csrf";

export async function GET() {
    const token = await generateCsrfToken();

    // simpan di cookie HttpOnly
    (await cookies()).set("csrfToken", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 15, // 15 menit
    });

    // ⚠️ kalau pure CSRF defense, TIDAK perlu expose token ke client
    // return Response.json({ success: true });

    // kalau mau SPA fetch token buat header -> bisa dikirim juga
    return NextResponse.json({ 
        csrfToken: token
     });
}
