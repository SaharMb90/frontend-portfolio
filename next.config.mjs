/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // No external CDNs / remote scripts / remote fonts are used anywhere in this app.
  eslint: { ignoreDuringBuilds: true },
  experimental: {
    // Pin server actions / bundling behaviour that is stable on Node 20 and 22.
  },
};

export default nextConfig;
