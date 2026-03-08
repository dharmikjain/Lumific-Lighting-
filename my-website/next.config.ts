import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@clerk/nextjs"],
  },
};

export default nextConfig;
