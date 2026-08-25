import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/shree-hanuman-chalisa",
        destination: "/",
        permanent: true, // 301 permanent redirect for SEO preservation
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/wikipedia/commons/**",
      },
    ],
  },
};

export default nextConfig;
