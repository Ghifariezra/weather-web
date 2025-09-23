# 🌤️ Langit Kita

Langit Kita adalah aplikasi web prakiraan cuaca real-time yang menggunakan data resmi dari BMKG (Badan Meteorologi, Klimatologi, dan Geofisika Indonesia).

Aplikasi ini menampilkan prakiraan harian dan per jam, dilengkapi dengan grafik interaktif serta visualisasi peta dalam antarmuka yang bersih, modern, dan responsif.

#### 🔗 Live Demo: https://langit-kita.vercel.app/

### ✨ Features

-   🌍 Real-time weather forecasts with official BMKG data
-   🕒 Daily & hourly forecast visualization
-   📊 Interactive charts & maps
-   ⚡ Optimized performance with caching (Redis)
-   🔐 Secure authentication & CSRF protection
-   📱 Responsive UI for desktop & mobile

### 🚀 Tech Stack

-   Next.js 14 → React framework with App Router
-   Supabase → Database & authentication
-   Redis → High-speed caching for API responses
-   TailwindCSS → Utility-first styling framework
-   Shadcn UI → Accessible & modern UI components
-   TanStack Query → Data fetching & state management
-   Axios → Simplified API requests
-   jose → Security handling (CSRF protection)

### 📦 Installation & Setup

Clone repository dan jalankan perintah berikut:

```bash
git clone https://github.com/your-username/langit-kita.git

cd langit-kita

pnpm install

cp .env.example .env.local

pnpm dev
```

Aplikasi akan berjalan di **http://localhost:3000**.

### 🛠️ Environment Variables
Buat file .env.local berdasarkan .env.example dan isi variabel berikut:

```bash
NODE_ENV="development"

# SECRET
CSRF_SECRET="your-csrf-secret"

# ENDPOINT
WEATHER_API="your-weather-api-url"
NOMINATIM_API="your-nominatim-api-url"
NEXT_PUBLIC_AREACODE_API="your-areacode-api-url"
 
# REDIS
REDIS_USER="your-redis-username"
REDIS_HOST="your-redis-host"
REDIS_PASS="your-redis-password"
REDIS_PORT="your-redis-port"

# SUPABASE
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY="your-anon-key"
```