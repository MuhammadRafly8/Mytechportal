'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CyberBackground from '@/bg/CyberBackground';

export default function TentangPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <CyberBackground />
      </div>
      <Navbar />
      
      <main className="flex-1 w-full max-w-4xl mx-auto pt-32 pb-16 px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold font-orbitron text-white mb-4 neon-glow">
            TENTANG KAMI
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Portal berita SMKN 8 JEMBER
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-blue-400/30 p-8 mb-8">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
              🏫
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              MyTECHPORTAL
            </h2>
          </div>
          
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <p>
              MyTECHPORTAL adalah portal berita dan informasi teknologi yang menyediakan 
              berita terkini seputar jurusan yang ada di smkn 8 jember.
            </p>
            
            <p>
              Kami berkomitmen untuk memberikan informasi yang akurat, terpercaya, 
              dan bermanfaat bagi pembaca kami.
            </p>
            
            <p>
              Portal ini dikembangkan dengan teknologi modern untuk memberikan 
              pengalaman membaca yang optimal dan responsif di berbagai perangkat.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-blue-400/30 p-6 text-center">
            <div className="text-3xl mb-4">📰</div>
            <h3 className="text-lg font-bold text-white mb-2">Berita Terkini</h3>
            <p className="text-gray-300 text-sm">
              Update berita teknologi dan informasi terbaru
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-blue-400/30 p-6 text-center">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-lg font-bold text-white mb-2">Informasi Akurat</h3>
            <p className="text-gray-300 text-sm">
              Berita yang terverifikasi dan dapat dipercaya
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-blue-400/30 p-6 text-center">
            <div className="text-3xl mb-4">💡</div>
            <h3 className="text-lg font-bold text-white mb-2">Edukasi</h3>
            <p className="text-gray-300 text-sm">
              Konten edukatif dan bermanfaat
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-blue-400/30 p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Hubungi Kami
          </h2>
          <p className="text-gray-300 mb-6">
            Untuk informasi lebih lanjut, silakan hubungi kami
          </p>
          <div className="flex justify-center space-x-4">
            <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:scale-105 transition-transform duration-200">
              Email
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:scale-105 transition-transform duration-200">
              WhatsApp
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
      
      <style jsx global>{`
        .font-orbitron {
          font-family: 'Orbitron', 'Audiowide', 'sans-serif';
        }
        .neon-glow {
          text-shadow: 0 0 8px #00eaff, 0 0 16px #00eaff, 0 0 32px #00eaff;
        }
      `}</style>
    </div>
  );
}
