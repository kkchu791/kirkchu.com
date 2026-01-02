import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pair-up-block-images.s3.us-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'd21xunamr1em9.cloudfront.net',
      },
    ],
  },
};

export default nextConfig;


