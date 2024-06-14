/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.jsdelivr.net",
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            // "https://cdn.jsdelivr.net/gh/",
        ],
    },
};

export default nextConfig;
