/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  output: "export",
  distDir: "./api/public",
    images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
