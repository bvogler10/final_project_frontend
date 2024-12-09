import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/**",
      },
      // Production environment
      {
        protocol: "https",
        hostname: "closeknit-backend-74fd3b290357.herokuapp.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
