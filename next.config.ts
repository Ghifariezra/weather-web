import type { NextConfig } from "next";

const host = [
  "cdn0.iconfinder.com",
  "cdn1.iconfinder.com",
  "cdn2.iconfinder.com",
  "cdn3.iconfinder.com",
  "cdn4.iconfinder.com",
]
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: host.flatMap((host) => ({
      protocol: "https",
      hostname: host,
      port: "",
      pathname: "/**",
    })),
  },
  devIndicators: false
};

export default nextConfig;
