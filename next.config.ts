import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/news/excel-sheetpic-tauri-devlog',
        destination: '/blog/excel-sheetpic-tauri-devlog',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
