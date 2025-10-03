'use client';
import { useState, useEffect } from "react";
import { useFeaturedArticles } from "@/hooks/api/useArticles";
import { useCategories } from "@/hooks/api/useCategories";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DepartmentCard from "@/components/DepartmentCard";
import FeaturedNewsCard from "@/components/FeaturedNewsCard";
import CyberBackground from "@/bg/CyberBackground";
import Link from "next/link";
import { getImageUrl } from "@/lib/utils/imageUrl";

// Department/Jurusan data
const departments = [
  {
    id: 'rpl',
    name: 'Rekayasa Perangkat Lunak',
    shortName: 'RPL',
    description: 'Pengembangan aplikasi dan sistem perangkat lunak',
    icon: '💻',
    color: 'from-blue-600 to-cyan-500',
    bgColor: 'bg-blue-600/20',
    borderColor: 'border-blue-500/50'
  },
  {
    id: 'tkj',
    name: 'Teknik Komputer & Jaringan',
    shortName: 'TKJ',
    description: 'Infrastruktur jaringan dan sistem komputer',
    icon: '🌐',
    color: 'from-green-600 to-emerald-500',
    bgColor: 'bg-green-600/20',
    borderColor: 'border-green-500/50'
  },
  {
    id: 'mm',
    name: 'Multimedia',
    shortName: 'MM',
    description: 'Desain grafis, animasi, dan konten digital',
    icon: '🎨',
    color: 'from-purple-600 to-pink-500',
    bgColor: 'bg-purple-600/20',
    borderColor: 'border-purple-500/50'
  },
  {
    id: 'tsm',
    name: 'Teknik sepeda motor',
    shortName: 'TSM',
    description: 'Perbaikan dan perawatan sepeda motor',
    icon: '🏍️',
    color: 'from-orange-600 to-red-500',
    bgColor: 'bg-orange-600/20',
    borderColor: 'border-orange-500/50'
  },
  {
    id: 'apt',
    name: 'Agribisnis Pembenihan Tanaman',
    shortName: 'APT',
    description: 'Pengolahan dan pengembangan produk pertanian',
    icon: '🌾',
    color: 'from-yellow-600 to-amber-500',
    bgColor: 'bg-yellow-600/20',
    borderColor: 'border-yellow-500/50'
  },
  {
    id: 'tkr',
    name: 'Teknik Kendaraan Ringan',
    shortName: 'TKR',
    description: 'Perbaikan dan perawatan kendaraan',
    icon: '🚗',
    color: 'from-red-600 to-rose-500',
    bgColor: 'bg-red-600/20',
    borderColor: 'border-red-500/50'
  }
];

export default function Home() {
  const { data: featuredArticles = [], isLoading } = useFeaturedArticles(3);
  const { data: categories = [] } = useCategories();
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <CyberBackground />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 font-orbitron neon-glow animate-pulse">
            PORTAL BERITA
          </h1>
          <div className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-6">
            SMK NEGERI 8 JEMBER
          </div>
          <p className="text-xl md:text-2xl text-cyan-300 max-w-3xl mx-auto leading-relaxed mb-12">
            Temukan informasi terkini seputar dunia pendidikan, teknologi, dan perkembangan jurusan favorit Anda
          </p>

          {/* Interactive Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-cyan-400/30 hover:scale-105 transition-transform">
              <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">{featuredArticles.length}</div>
              <div className="text-sm text-gray-300">Artikel</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-blue-400/30 hover:scale-105 transition-transform">
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">{departments.length}</div>
              <div className="text-sm text-gray-300">Jurusan</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-400/30 hover:scale-105 transition-transform">
              <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">{categories.length}</div>
              <div className="text-sm text-gray-300">Kategori</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-green-400/30 hover:scale-105 transition-transform">
              <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">24/7</div>
              <div className="text-sm text-gray-300">Update</div>
            </div>
          </div>
        </div>
      </section>

      {/* Department/Jurusan Section */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-orbitron">
              Pilih Jurusan Favorit
            </h2>
            <p className="text-xl text-cyan-300 max-w-2xl mx-auto">
              Temukan berita dan informasi terkini sesuai dengan jurusan yang Anda minati
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => (
              <DepartmentCard
                key={dept.id}
                id={dept.id}
                name={dept.name}
                shortName={dept.shortName}
                description={dept.description}
                icon={dept.icon}
                color={dept.color}
                bgColor={dept.bgColor}
                borderColor={dept.borderColor}
                isSelected={selectedDepartment === dept.id}
                onClick={() => setSelectedDepartment(selectedDepartment === dept.id ? null : dept.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter Section */}
      {categories.length > 0 && (
        <section className="relative z-10 py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Filter Berita</h3>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
                    selectedCategory === null
                      ? 'bg-cyan-500 text-white shadow-lg'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  Semua
                </button>
                {categories.map((category: any) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                    className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-cyan-500 text-white shadow-lg'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured News Section */}
      {featuredArticles.length > 0 && (
        <section className="relative z-10 py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-orbitron">
                Berita Terpopuler
              </h2>
              <p className="text-xl text-cyan-300">Artikel pilihan yang sedang trending</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredArticles.map((article: any, index: number) => (
                <FeaturedNewsCard
                  key={article.id}
                  id={article.id}
                  title={article.title}
                  content={article.content}
                  date={article.createdAt}
                  imageUrl={article.imageUrl || article.image}
                  isFeatured={index === 0}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      

      <Footer />
      
      <style jsx global>{`
        .font-orbitron {
          font-family: 'Orbitron', 'Audiowide', 'sans-serif';
        }
        .neon-glow {
          text-shadow: 0 0 8px #00eaff, 0 0 16px #00eaff, 0 0 32px #00eaff;
        }
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
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
}       