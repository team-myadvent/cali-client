import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cali-bucket.s3.ap-northeast-2.amazonaws.com",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
