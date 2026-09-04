/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true }
};

export default nextConfig;
