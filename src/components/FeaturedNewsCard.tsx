'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { getImageUrl } from '@/lib/utils/imageUrl';

interface FeaturedNewsCardProps {
  id: string;
  title: string;
  content: string;
  date: string;
  imageUrl?: string;
  isFeatured?: boolean;
  index: number;
}

const FeaturedNewsCard: React.FC<FeaturedNewsCardProps> = ({
  id,
  title,
  content,
  date,
  imageUrl,
  isFeatured = false,
  index
}) => {
  const [imageLoadError, setImageLoadError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleImageError = () => {
    setImageLoadError(true);
  };

  const gradientColors = [
    'from-red-500 to-pink-500',
    'from-blue-500 to-purple-500',
    'from-green-500 to-emerald-500',
    'from-yellow-500 to-orange-500',
    'from-purple-500 to-indigo-500',
    'from-cyan-500 to-blue-500'
  ];

  return (
    <div
      className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Featured Badge */}
      {isFeatured && (
        <div className="absolute top-4 left-4 z-20">
          <span className={`px-3 py-1 bg-gradient-to-r ${gradientColors[index % gradientColors.length]} text-white text-xs font-bold rounded-full shadow-lg animate-pulse`}>
            FEATURED
          </span>
        </div>
      )}

      {/* Trending Badge */}
      {index === 0 && (
        <div className="absolute top-4 right-4 z-20">
          <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full shadow-lg">
            🔥 TRENDING
          </span>
        </div>
      )}

      {/* Image Container */}
      <div className="h-48 relative overflow-hidden">
        {imageUrl && !imageLoadError ? (
          <img
            src={getImageUrl(imageUrl) || imageUrl}
            alt={title}
            onError={handleImageError}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-900/60 to-purple-900/60 flex items-center justify-center relative">
            <div className="text-4xl text-gray-400">📰</div>
                         {/* Animated background pattern */}
             <div className="absolute inset-0 opacity-20">
               {[...Array(20)].map((_, i) => (
                 <div
                   key={i}
                   className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
                   style={{
                     left: `${(i * 5) % 100}%`,
                     top: `${(i * 7) % 100}%`,
                     animationDelay: `${(i * 0.1) % 2}s`
                   }}
                 />
               ))}
             </div>
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6 relative">
        {/* Category Badge */}
        <div className="mb-3">
          <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs font-semibold rounded-full border border-cyan-500/30">
            Berita Terkini
          </span>
        </div>

        {/* Title */}
        <Link href={`/berita/${id}`}>
          <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors duration-300 cursor-pointer">
            {title}
          </h3>
        </Link>

        {/* Content Preview */}
        <p className="text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
          {content}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-xs text-cyan-300 font-medium">
              {new Date(date).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>

          {/* Read More Button */}
          <Link
            href={`/berita/${id}`}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-bold rounded-lg hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-200 flex items-center space-x-1"
          >
            <span>Baca</span>
            <svg 
              className={`w-4 h-4 transition-transform duration-200 ${isHovered ? 'translate-x-1' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

                 {/* View Count Badge */}
         <div className="absolute bottom-4 right-4">
           <div className="flex items-center space-x-1 text-xs text-gray-400">
             <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
               <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
               <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
             </svg>
             <span>{150 + (index * 50) + (parseInt(id.slice(-2)) || 0)}</span>
           </div>
         </div>
      </div>

      {/* Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-2xl group-hover:shadow-[0_0_30px_rgba(0,234,255,0.2)] transition-all duration-300" />
    </div>
  );
};

export default FeaturedNewsCard;
