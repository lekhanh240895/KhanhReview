/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.**",
      },
    ],
    unoptimized: true,
  },
  output: "export",
};

module.exports = nextConfig;
