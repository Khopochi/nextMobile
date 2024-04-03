/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "api.jiabaili.shop"
          }
        ]
      },
};

export default nextConfig;
