/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Ensures better debugging and catches potential issues
  swcMinify: true, // Uses SWC compiler for faster and optimized minification

  images: {
    domains: ["your-image-domain.com"], // Replace with actual allowed image domains
    formats: ["image/avif", "image/webp"], // Optimize images with modern formats
  },

  experimental: {
    appDir: false, // Set to `true` if using the Next.js App Router (Optional)
  },

  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000",
  },

  webpack: (config, { isServer }) => {
    config.resolve.fallback = { fs: false }; // Prevents server-side-only modules from breaking
    if (!isServer) {
      config.resolve.fallback = { ...config.resolve.fallback, net: false, tls: false }; // Handles additional client-side issues
    }
    return config;
  },

  async redirects() {
    return [
      {
        source: "/old-route",
        destination: "/new-route",
        permanent: true, // Use 301 for SEO-friendly redirects
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*`, // Proxy API requests
      },
    ];
  },
};

module.exports = nextConfig;
