import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "export",
	basePath: "/CW-COFFEE-DES-2025",
	assetPrefix: "/CW-COFFEE-DES-2025",
	images: {
    unoptimized: true,
  },
};

export default nextConfig;
