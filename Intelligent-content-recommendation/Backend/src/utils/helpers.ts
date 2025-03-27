export const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {  
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

export const truncateText = (text: string, maxLength = 100): string => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

/* src/utils/config.ts - Environment variables and constants */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.example.com";
export const DEFAULT_AVATAR = "/images/default-avatar.png";
export const CONTENT_CATEGORIES = ["Tech", "Health", "Business", "Education"];

/* src/config/nextConfig.js - Next.js configuration file */
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,  
    swcMinify: true,  
    images: {
        domains: ["your-image-domain.com"],
    },
    env: {
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000",
    },
    webpack: (config) => {
        config.resolve.fallback = { fs: false };
        return config;
    },
};

module.exports = nextConfig;
