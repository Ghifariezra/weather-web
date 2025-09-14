import { SignJWT, jwtVerify, JWTPayload } from "jose";

const secret = new TextEncoder().encode(process.env.CSRF_SECRET!);

export async function generateCsrfToken(): Promise<string> {
    return new SignJWT({ csrf: true })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("15m")
        .sign(secret);
}

export async function verifyCsrfToken(token: string): Promise<boolean> {
    try {
        const { payload }: { payload: JWTPayload } = await jwtVerify(token, secret);

        // validasi payload custom
        if (!payload.csrf) return false;

        return true;
    } catch (err) {
        console.error("❌ Invalid CSRF token:", err);
        return false;
    }
}
