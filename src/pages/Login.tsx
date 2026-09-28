import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, showToast } = useApp();
  const [countryCode, setCountryCode] = useState('+88');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !password) { showToast('Phone & password required', 'error'); return; }
    setLoading(true);
    setTimeout(() => {
      const ok = login(`${countryCode}${phone}`, password);
      setLoading(false);
      if (ok) { showToast('Login successful!', 'success'); navigate('/task-hub'); }
      else { showToast('Invalid credentials', 'error'); }
    }, 800);
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{background: 'radial-gradient(circle at 20% 30%, #1a1a2e 0%, #0a0a0f 70%)'}}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-br from-yellow-400 to-yellow-600 text-black font-black text-4xl tracking-tighter px-6 py-3 rounded-2xl shadow-2xl"
            style={{boxShadow: '0 0 40px rgba(245,197,24,0.35)'}}>
            PLEX
          </div>
          <p className="text-yellow-400 text-xs tracking-[3px] mt-3 uppercase font-semibold">Official Media Portal</p>
        </div>
        {/* Card */}
        <div className="rounded-3xl p-8 border border-yellow-400/20"
          style={{background: 'rgba(18,18,28,0.75)', backdropFilter: 'blur(24px)',
                  boxShadow: '0 30px 60px -12px rgba(0,0,0,0.8), 0 0 80px -20px rgba(245,197,24,0.35)'}}>
          <h1 className="text-white text-2xl font-bold mb-6">Sign In</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Phone */}
            <div className="flex items-center gap-3 rounded-xl px-4 py-3 border border-white/10"
              style={{background: 'rgba(255,255,255,0.04)'}}>
              <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)}
                className="bg-transparent text-slate-400 font-semibold outline-none cursor-pointer">
                <option value="+88" className="bg-[#1a1a2e] text-white">+88 BD</option>
                <option value="+1" className="bg-[#1a1a2e] text-white">+1 US</option>
                <option value="+44" className="bg-[#1a1a2e] text-white">+44 UK</option>
              </select>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number" className="flex-1 bg-transparent text-white outline-none placeholder-slate-500"/>
            </div>
            {/* Password */}
            <div className="flex items-center gap-3 rounded-xl px-4 py-3 border border-white/10 relative"
              style={{background: 'rgba(255,255,255,0.04)'}}>
              <input type={showPassword ? 'text' : 'password'} value={password}
                onChange={(e) => setPassword(e.target.value)} placeholder="Password"
                className="flex-1 bg-transparent text-white outline-none placeholder-slate-500 pr-8"/>
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-slate-400 hover:text-yellow-400">
                {showPassword ? '🙈' : '👁'}
              </button>
            </div>
            {/* Submit */}
            <button type="submit" disabled={loading}
              className="w-full py-4 rounded-xl font-bold text-base text-black transition-all hover:scale-[1.02]"
              style={{background: 'linear-gradient(135deg, #f5c518 0%, #eab308 100%)',
                      boxShadow: '0 10px 30px -5px rgba(245,197,24,0.35)'}}>
              {loading ? '⏳ Loading...' : 'Sign in to PLEX'}
            </button>
          </form>
          {/* Links */}
          <div className="flex justify-between mt-6 text-sm">
            <Link to="/forgot-password" className="text-slate-400 hover:text-yellow-400">Forgot password?</Link>
            <Link to="/signup" className="text-yellow-400 font-semibold hover:text-white">Create account</Link>
          </div>
          {/* Download */}
          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-slate-400 text-sm mb-3">Get the official PLEX App</p>
            <Link to="/download" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm border border-white/10 hover:border-yellow-400 transition-all"
              style={{background: 'rgba(255,255,255,0.06)'}}>
              ⬇ Download App
            </Link>
          </div>
        </div>
        {/* Footer */}
        <div className="flex flex-wrap justify-center gap-4 mt-8 text-xs text-slate-500">
          <a href="#" className="hover:text-yellow-400">Help</a>
          <a href="#" className="hover:text-yellow-400">Privacy</a>
          <a href="#" className="hover:text-yellow-400">Terms</a>
        </div>
      </div>
    </div>
  );
};
