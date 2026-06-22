import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  // Allow cross-origin requests from preview deployment domains
  allowedDevOrigins: [
    "preview-chat-e12791af-4619-446a-9a2c-892008526cc7.space-z.ai",
    ".space-z.ai",
    "localhost",
  ],
  async headers() {
    return [
      {
        // Prevent 412 Precondition Failed for _next/data routes (RSC flight data)
        source: '/_next/data/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate',
          },
        ],
      },
      {
        // Cache uploaded images properly
        source: '/uploads/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Allow cross-origin for all routes (needed for preview deployment)
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization, RSC, Next-Router-State-Tree, Next-Url',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
