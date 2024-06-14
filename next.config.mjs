/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.alias["pdfjs-dist/build/pdf.worker.entry"] =
                "pdfjs-dist/build/pdf.worker.entry.js";
        }

        return config;
    },
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
            {
                protocol: "https",
                hostname: "images.pexels.com",
            },

            // "https://cdn.jsdelivr.net/gh/",
        ],
    },
};

export default nextConfig;
