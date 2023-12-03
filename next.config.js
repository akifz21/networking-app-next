/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8010",
        pathname: "/post-images/download/**",
      },
    ],
  },
};

module.exports = nextConfig;
