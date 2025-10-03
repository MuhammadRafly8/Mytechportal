'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image'; // 👈 Import next/image
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CyberBackground from '@/bg/CyberBackground';
import api from '@/lib/api/axios';
import { getImageUrl } from '@/lib/utils/imageUrl';

interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  image?: string;
  published: boolean;
  featured: boolean;
  viewCount: number;
  publishedAt?: string;
  createdAt: string;
  author?: {
    id: string;
    name: string;
    avatar?: string;
  };
  category?: {
    id: string;
    name: string;
    slug: string;
  };
}

// Hapus dummy 3D agar jika gambar gagal, tidak menampilkan elemen 3D

export default function BeritaDetailPage() {
  const params = useParams();
  const slug = params.id as string;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/articles/${slug}`);
        if (response.data.success) {
          setArticle(response.data.data);
        } else {
          setError('Artikel tidak ditemukan');
        }
      } catch (err: any) {
        console.error('Error fetching article:', err);
        setError(err.response?.data?.message || 'Terjadi kesalahan saat memuat artikel');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <CyberBackground />
        </div>
        <Navbar />
        <main className="flex-1 w-full max-w-3xl mx-auto pt-32 pb-16 px-4 relative z-10">
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl border border-blue-400/30 p-8">
            <div className="animate-pulse">
              <div className="h-80 bg-gray-600 rounded-xl mb-8"></div>
              <div className="h-8 bg-gray-600 rounded mb-4"></div>
              <div className="h-4 bg-gray-600 rounded mb-2"></div>
              <div className="h-4 bg-gray-600 rounded w-3/4"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <CyberBackground />
        </div>
        <Navbar />
        <main className="flex-1 w-full max-w-3xl mx-auto pt-32 pb-16 px-4 relative z-10">
          <div className="text-center text-red-400 py-16">
            <div className="text-6xl mb-4">❌</div>
            <h3 className="text-xl font-semibold mb-2">Artikel tidak ditemukan</h3>
            <p>{error || 'Artikel yang Anda cari tidak tersedia'}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Resolve image URL
  const imageUrl = article.image ? getImageUrl(article.image) : null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <CyberBackground />
      </div>
      <Navbar />
      <main className="flex-1 w-full max-w-3xl mx-auto pt-32 pb-16 px-4 relative z-10">
        <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl border border-blue-400/30 p-8">
          {/* Article Image */}
          <div className="w-full flex justify-center mb-8">
            {imageUrl && !imageError ? (
              <div className="relative w-full h-80 rounded-xl overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  onError={() => setImageError(true)}
                />
              </div>
            ) : null}
          </div>

          {/* Article Header */}
          <div className="mb-6">
            {article.category && (
              <span className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-400 text-sm font-semibold rounded-full mb-4">
                {article.category.name}
              </span>
            )}

            <h1 className="text-4xl font-extrabold font-orbitron text-blue-900 mb-4 neon-glow">
              {article.title}
            </h1>

            <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
              <div className="flex items-center space-x-4">
                {article.author && <span>Oleh: {article.author.name}</span>}
                <span>👁️ {article.viewCount} views</span>
              </div>
              <span>{formatDate(article.publishedAt || article.createdAt)}</span>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-800 text-lg font-medium drop-shadow-lg whitespace-pre-line leading-relaxed">
              {article.content}
            </div>
          </div>

          {/* Article Footer */}
          <div className="mt-8 pt-6 border-t border-gray-300/30">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Dipublikasikan: {formatDate(article.publishedAt || article.createdAt)}</span>
              {article.featured && (
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-600 rounded-full font-semibold">
                  ⭐ Featured
                </span>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <style jsx global>{`
        .font-orbitron {
          font-family: 'Orbitron', 'Audiowide', sans-serif;
        }
        .neon-glow {
          text-shadow: 0 0 8px #00eaff, 0 0 16px #00eaff, 0 0 32px #00eaff;
        }
      `}</style>
    </div>
  );
}