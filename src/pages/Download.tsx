import React from 'react';
import { Link } from 'react-router-dom';
export const Download: React.FC = () => {
  return (
    <div className="min-h-screen p-4"
      style={{background: 'radial-gradient(circle at 20% 30%, #1a1a2e 0%, #0a0a0f 70%)'}}>
      <div className="max-w-md mx-auto py-12">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-block bg-gradient-to-br from-yellow-400 to-yellow-600 text-black font-black text-5xl tracking-tighter px-8 py-4 rounded-3xl shadow-2xl"
            style={{boxShadow: '0 0 60px rgba(245,197,24,0.5)'}}>
            PLEX
          </div>
          <p className="text-yellow-400 text-xs tracking-[4px] mt-4 uppercase font-semibold">Download the App</p>
        </div>
        {/* Download Card */}
        <div className="rounded-3xl p-6 mb-6 border border-yellow-400/20"
          style={{background: 'rgba(18,18,28,0.75)', backdropFilter: 'blur(24px)',
                  boxShadow: '0 30px 60px -12px rgba(0,0,0,0.8), 0 0 80px -20px rgba(245,197,24,0.35)'}}>
          <h2 className="text-white text-xl font-bold mb-2">PLEX Mobile App</h2>
          <p className="text-slate-400 text-sm mb-6">Version 3.0.0 • 80 MB • Android 6.0+</p>
          {/* Android */}
          <a href="/plex-app.apk" download
            className="flex items-center justify-between p-4 rounded-2xl mb-3 border border-white/10 hover:border-yellow-400 transition-all group"
            style={{background: 'rgba(255,255,255,0.04)'}}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center text-2xl">🤖</div>
              <div>
                <p className="text-white font-bold">Download for Android</p>
                <p className="text-slate-500 text-xs">Direct APK • Free</p>
              </div>
            </div>
            <span className="text-yellow-400 text-2xl group-hover:translate-x-1 transition-transform">↓</span>
          </a>
          {/* iOS */}
          <a href="#" onClick={(e) => { e.preventDefault(); alert('iOS: Safari-তে খুলুন → Share → Add to Home Screen'); }}
            className="flex items-center justify-between p-4 rounded-2xl mb-3 border border-white/10 hover:border-yellow-400 transition-all group"
            style={{background: 'rgba(255,255,255,0.04)'}}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-2xl">🍏</div>
              <div>
                <p className="text-white font-bold">Download for iOS</p>
                <p className="text-slate-500 text-xs">Add to Home Screen</p>
              </div>
            </div>
            <span className="text-yellow-400 text-2xl group-hover:translate-x-1 transition-transform">→</span>
          </a>
          {/* Web */}
          <Link to="/login"
            className="flex items-center justify-between p-4 rounded-2xl border border-white/10 hover:border-yellow-400 transition-all group"
            style={{background: 'rgba(255,255,255,0.04)'}}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center text-2xl">🌐</div>
              <div>
                <p className="text-white font-bold">Use Web Version</p>
                <p className="text-slate-500 text-xs">No download needed</p>
              </div>
            </div>
            <span className="text-yellow-400 text-2xl group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
        {/* Features */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { icon: '🔒', title: 'Secure', desc: '256-bit SSL' },
            { icon: '⚡', title: 'Fast', desc: 'Instant transactions' },
            { icon: '💰', title: 'Earn', desc: 'Daily rewards' },
            { icon: '🎬', title: 'Movies', desc: '10,000+ titles' }
          ].map((f, i) => (
            <div key={i} className="p-4 rounded-2xl text-center border border-white/10"
              style={{background: 'rgba(255,255,255,0.04)'}}>
              <div className="text-3xl mb-2">{f.icon}</div>
              <p className="text-white font-bold text-sm">{f.title}</p>
              <p className="text-slate-500 text-xs">{f.desc}</p>
            </div>
          ))}
        </div>
        <Link to="/" className="block text-center text-yellow-400 text-sm hover:text-white transition-colors">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};
