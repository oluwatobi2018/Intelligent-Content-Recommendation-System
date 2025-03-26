/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,  // Enables React's Strict Mode for better debugging
    swcMinify: true,  // Uses SWC for faster minification
    images: {
      domains: ["your-image-domain.com"], // Replace with your allowed image domains
    },
    experimental: {
      appDir: false, // Set to true if using Next.js App Router (optional)
    },
    env: {
      NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000",
    },
    webpack: (config) => {
      config.resolve.fallback = { fs: false }; // Fixes errors for certain packages
      return config;
    },
  };
  
  module.exports = nextConfig;
  