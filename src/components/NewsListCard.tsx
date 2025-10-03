'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getImageUrl } from '@/lib/utils/imageUrl';

// Tipe data props
interface NewsListCardProps {
  id: string;
  title: string;
  content: string;
  date: string;
  time?: string;
  imageUrl?: string;
}

const NewsListCard: React.FC<NewsListCardProps> = ({ id, title, content, date, time, imageUrl }) => {
  // State untuk menangani error loading gambar
  const [imageLoadError, setImageLoadError] = useState(false);

  // Fungsi untuk menangani error loading gambar dari next/image
  const handleImageError = () => {
    console.warn(`Gagal memuat gambar dari Next/Image: ${imageUrl}`);
    setImageLoadError(true);
  };

  return (
    <div
      className="flex flex-col md:flex-row items-stretch bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-cyan-400/60 group hover:scale-[1.02] hover:shadow-cyan-400/40 hover:border-cyan-300/90 transition-transform duration-200 overflow-hidden mb-8 relative"
      style={{ boxShadow: '0 0 24px 0 #00eaff33, 0 0 2px 0 #00eaff55' }}
    >
      {/* Kontainer Gambar */}
      <div className="md:w-1/3 w-full h-56 md:h-auto flex items-center justify-center bg-gradient-to-br from-blue-900/60 to-purple-900/60 relative"> {/* Tambahkan relative untuk next/image fill */}
        {/* Tampilkan gambar jika imageUrl ada dan tidak ada error */}
        {imageUrl && !imageLoadError ? (
          // Gunakan next/image dengan fill dan objectFit
          <Image
            src={getImageUrl(imageUrl) || imageUrl}
            alt={`Gambar untuk artikel: ${title}`}
            fill // Isi seluruh parent container
            style={{ objectFit: 'cover' }} // object-cover
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Opsional: bantu next/image pilih ukuran yang tepat
            onError={handleImageError} // Tangani error loading
            className="rounded-t-lg md:rounded-l-lg md:rounded-t-none" // Tambahkan class Tailwind jika diperlukan untuk rounding
          />
        ) : (
          // Fallback jika tidak ada imageUrl atau error loading
          <div className="flex flex-col items-center justify-center text-center p-4 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm">Gambar tidak tersedia</span>
          </div>
        )}
      </div>

      {/* Konten Teks */}
      <div className="flex-1 p-6 flex flex-col justify-center">
        {/* Gunakan next/link dengan <a> tag di dalamnya untuk kontrol penuh */}
        <Link href={`/berita/${id}`} className="block">
        <h2 className="text-2xl md:text-3xl font-extrabold font-orbitron text-blue-900 group-hover:text-cyan-400 transition-colors duration-200 mb-3 neon-glow hover:underline">
        {title}
      </h2>
      </Link>
        <p className="text-gray-200 text-base md:text-lg mb-3 line-clamp-3 font-medium drop-shadow-lg">
          {content}
        </p>
        <div className="text-xs md:text-sm text-cyan-300 mt-2">
          Dipublikasikan: {date}{time ? `, ${time}` : ''}
        </div>
      </div>

      {/* Efek Hover Glow Tambahan */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl group-hover:shadow-[0_0_32px_8px_#00eaff99] transition-all duration-200" />

      {/* Styling Global (bisa dipindah ke CSS module atau globals.css untuk performa lebih baik) */}
      <style jsx global>{`
        .font-orbitron {
          /* Pastikan font Orbitron sudah diimpor di _app.tsx atau globals.css */
          font-family: 'Orbitron', 'Audiowide', 'sans-serif';
        }
        .neon-glow {
          text-shadow: 0 0 8px #00eaff, 0 0 16px #00eaff, 0 0 32px #00eaff;
        }
        .line-clamp-3 {
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
        }
      `}</style>
    </div>
  );
};

export default NewsListCard;