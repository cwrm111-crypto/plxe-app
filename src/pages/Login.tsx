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
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) { showToast('Phone number required', 'error'); return; }
    if (!password.trim()) { showToast('Password required', 'error'); return; }
    if (password.length < 4) { showToast('Min 4 characters', 'error'); return; }
    setLoading(true);
    setTimeout(() => {
      const ok = login(`${countryCode}${phone}`, password);
      setLoading(false);
      if (ok) { showToast('Welcome back!', 'success'); navigate('/task-hub'); }
      else { showToast('Invalid credentials', 'error'); }
    }, 800);
  };
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 py-8"
      style={{background: 'radial-gradient(circle at 20% 30%, #1a1a2e 0%, #0a0a0f 70%)'}}>
      <div className="fixed top-0 left-0 w-full h-5 opacity-20 pointer-events-none z-0"
        style={{background: 'repeating-linear-gradient(90deg, #111 0px, #111 10px, #2a2a2a 10px, #2a2a2a 20px)'}} />
      <div className="fixed bottom-0 left-0 w-full h-5 opacity-20 pointer-events-none z-0"
        style={{background: 'repeating-linear-gradient(90deg, #111 0px, #111 10px, #2a2a2a 10px, #2a2a2a 20px)'}} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none rounded-full"
        style={{background: 'radial-gradient(circle, rgba(245,197,24,0.08) 0%, transparent 70%)'}} />
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-24 h-24 mx-auto rounded-[28px] flex items-center justify-center shadow-2xl mb-4"
            style={{
              background: 'linear-gradient(145deg, #f5c518, #d4a017)',
              boxShadow: '0 0 40px rgba(245,197,24,0.4), 0 20px 40px rgba(0,0,0,0.6)'
            }}>
            <span className="text-black font-black text-4xl tracking-tighter">PLEX</span>
          </div>
          <p className="text-[11px] tracking-[3px] uppercase font-semibold"
            style={{color: '#f5c518', textShadow: '0 0 20px rgba(245,197,24,0.3)'}}>
            Official Media Portal
          </p>
        </div>
        <div className="rounded-[28px] p-9 border"
          style={{
            background: 'rgba(20,20,30,0.75)',
            backdropFilter: 'blur(24px)',
            borderColor: 'rgba(245,197,24,0.2)',
            boxShadow: '0 30px 60px -12px rgba(0,0,0,0.8), 0 0 80px -20px rgba(245,197,24,0.35)'
          }}>
          <h1 className="text-white text-3xl font-bold mb-8">Sign In</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-3 rounded-2xl px-4 py-1 border focus-within:border-yellow-400"
              style={{background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)'}}>
              <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)}
                className="bg-transparent text-slate-400 font-medium outline-none cursor-pointer py-3 text-[15px]">
                <option value="+88" className="bg-[#1a1a2e] text-white">+88 BD</option>
                <option value="+1" className="bg-[#1a1a2e] text-white">+1 US</option>
                <option value="+44" className="bg-[#1a1a2e] text-white">+44 UK</option>
                <option value="+91" className="bg-[#1a1a2e] text-white">+91 IN</option>
              </select>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number"
                className="flex-1 bg-transparent text-white outline-none placeholder-slate-500 py-3 text-[15px] font-medium" />
            </div>
            <div className="flex items-center rounded-2xl px-4 py-1 border focus-within:border-yellow-400"
              style={{background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)'}}>
              <input type={showPassword ? 'text' : 'password'} value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="flex-1 bg-transparent text-white outline-none placeholder-slate-500 py-3 text-[15px] font-medium" />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-yellow-400 p-1">
                {showPassword ? '🙈' : '👁'}
              </button>
            </div>
            <div className="flex items-center justify-between text-[13px]">
              <label className="flex items-center gap-2 text-slate-400 cursor-pointer font-medium">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded cursor-pointer" style={{accentColor: '#f5c518'}} />
                Remember me
              </label>
              <Link to="/forgot-password" className="font-medium hover:text-white" style={{color: '#f5c518'}}>
                Forgot password?
              </Link>
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-4 mt-6 rounded-2xl font-bold text-base text-black hover:-translate-y-0.5 disabled:opacity-70"
              style={{
                background: 'linear-gradient(135deg, #f5c518 0%, #d4a017 100%)',
                boxShadow: '0 10px 30px -5px rgba(245,197,24,0.35)'
              }}>
              {loading ? '⏳ Signing in...' : 'Sign in to PLEX'}
            </button>
          </form>
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{background: 'rgba(255,255,255,0.08)'}} />
            <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">New to PLEX?</span>
            <div className="flex-1 h-px" style={{background: 'rgba(255,255,255,0.08)'}} />
          </div>
          <Link to="/signup"
            className="block w-full py-3.5 rounded-2xl text-center font-semibold text-[15px] hover:bg-yellow-400/10"
            style={{border: '1px solid rgba(245,197,24,0.2)', color: '#e2e8f0'}}>
            Create Account
          </Link>
          <div className="mt-7 pt-6 border-t text-center" style={{borderColor: 'rgba(255,255,255,0.06)'}}>
            <p className="text-[13px] text-slate-400 mb-3 font-medium">Get the official PLEX App</p>
            <Link to="/download"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm border hover:-translate-y-0.5 hover:border-yellow-400"
              style={{background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.08)'}}>
              ⬇ Download App
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-9 text-xs">
          <a href="#" className="text-slate-500 hover:text-yellow-400 font-medium">Help</a>
          <a href="#" className="text-slate-500 hover:text-yellow-400 font-medium">PLEX Pro</a>
          <a href="#" className="text-slate-500 hover:text-yellow-400 font-medium">Conditions</a>
          <a href="#" className="text-slate-500 hover:text-yellow-400 font-medium">Privacy</a>
        </div>
      </div>
      <button className="fixed bottom-7 right-7 w-14 h-14 rounded-full flex items-center justify-center text-black hover:scale-110"
        onClick={() => showToast('Support: support@plex.tv', 'success')}
        style={{background: 'linear-gradient(135deg, #f5c518, #d4a017)', boxShadow: '0 10px 30px -5px rgba(245,197,24,0.5)'}}>
        🎧
      </button>
    </div>
  );
};
