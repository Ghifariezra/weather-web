import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export const supabaseClient = () => {
    return createBrowserClient(
        supabaseUrl!,
        supabaseKey!,
        { db: { schema: "weather_id" } }
    );
}