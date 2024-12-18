/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "out",
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false
};

export default nextConfig;