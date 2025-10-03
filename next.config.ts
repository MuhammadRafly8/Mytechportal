// next.config.js
/** @type {import('next').NextConfig} */
const buildRemotePatterns = () => {
  const patterns = [
    {
      protocol: 'http',
      hostname: 'localhost',
      port: '5000',
      pathname: '/uploads/**',
    },
  ];

  // Tambahkan host dari NEXT_PUBLIC_API_URL jika tersedia
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (apiUrl) {
    try {
      const url = new URL(apiUrl);
      // Hilangkan '/api' jika ada agar cocok dengan origin server
      const origin = new URL(url.origin);
      patterns.push({
        protocol: origin.protocol.replace(':', ''),
        hostname: origin.hostname,
        port: origin.port || undefined,
        pathname: '/uploads/**',
      } as any);
    } catch {}
  }

  return patterns;
};

const nextConfig = {
  images: {
    // Hindari blocking saat optimasi gambar gagal; gunakan tag <img> bawaan
    unoptimized: true,
    remotePatterns: buildRemotePatterns(),
  },
};

module.exports = nextConfig;