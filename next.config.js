/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  distDir: "./api/public",
    images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
