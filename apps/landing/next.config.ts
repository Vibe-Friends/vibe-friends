import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@vibes/ui", "@vibes/utils"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.lumacdn.com",
      },
    ],
  },

  async rewrites() {
    const formsAppUrl = process.env.FORMS_APP_URL;

    if (!formsAppUrl) {
      return [];
    }

    return [
      {
        source: "/forms",
        destination: `${formsAppUrl}/forms`,
      },
      {
        source: "/forms/:path*",
        destination: `${formsAppUrl}/forms/:path*`,
      },
    ];
  },
};

export default nextConfig;
