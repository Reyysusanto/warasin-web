import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["127.0.0.1"], // ✅ Tambahkan IP/domain backend kamu
  },
  /* config options here */
};

export default nextConfig;
