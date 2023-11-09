/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    domains: ["api.opendota.com"],
  },
};

module.exports = nextConfig;
