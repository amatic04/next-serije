/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "static.tvmaze.com",
                port: "",
                pathname: "/**",                //omogućene sve slike s ovog API-ja
            },
        ],
    },
};

export default nextConfig;
