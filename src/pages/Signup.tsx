import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { signup, showToast } = useApp();
  const [countryCode, setCountryCode] = useState('+88');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [invitationCode, setInvitationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !password) { showToast('সব ফিল্ড পূরণ করুন', 'error'); return; }
    if (password !== confirmPassword) { showToast('পাসওয়ার্ড মিলছে না', 'error'); return; }
    if (password.length < 6) { showToast('কমপক্ষে ৬ অক্ষর', 'error'); return; }
    setLoading(true);
    setTimeout(() => {
      signup({ email: `${phone}@plex.app`, phone: `${countryCode}${phone}`, password, invitationCode });
      setLoading(false);
      showToast('✅ অ্যাকাউন্ট তৈরি হয়েছে!', 'success');
      navigate('/login');
    }, 900);
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{background: 'radial-gradient(circle at 20% 30%, #1a1a2e 0%, #0a0a0f 70%)'}}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-br from-yellow-400 to-yellow-600 text-black font-black text-4xl tracking-tighter px-6 py-3 rounded-2xl shadow-2xl"
            style={{boxShadow: '0 0 40px rgba(245,197,24,0.35)'}}>
            PLEX
          </div>
          <p className="text-yellow-400 text-xs tracking-[3px] mt-3 uppercase font-semibold">Create Your Account</p>
        </div>
        <div className="rounded-3xl p-8 border border-yellow-400/20"
          style={{background: 'rgba(18,18,28,0.75)', backdropFilter: 'blur(24px)',
                  boxShadow: '0 30px 60px -12px rgba(0,0,0,0.8), 0 0 80px -20px rgba(245,197,24,0.35)'}}>
          <h1 className="text-white text-2xl font-bold mb-6">Sign Up</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
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
            <div className="rounded-xl px-4 py-3 border border-white/10"
              style={{background: 'rgba(255,255,255,0.04)'}}>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (min 6 characters)" className="w-full bg-transparent text-white outline-none placeholder-slate-500"/>
            </div>
            <div className="rounded-xl px-4 py-3 border border-white/10"
              style={{background: 'rgba(255,255,255,0.04)'}}>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password" className="w-full bg-transparent text-white outline-none placeholder-slate-500"/>
            </div>
            <div className="rounded-xl px-4 py-3 border border-white/10"
              style={{background: 'rgba(255,255,255,0.04)'}}>
              <input type="text" value={invitationCode} onChange={(e) => setInvitationCode(e.target.value)}
                placeholder="Invitation Code (optional)" className="w-full bg-transparent text-white outline-none placeholder-slate-500"/>
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-4 rounded-xl font-bold text-base text-black transition-all hover:scale-[1.02]"
              style={{background: 'linear-gradient(135deg, #f5c518 0%, #eab308 100%)',
                      boxShadow: '0 10px 30px -5px rgba(245,197,24,0.35)'}}>
              {loading ? '⏳ Creating...' : 'Create Account'}
            </button>
          </form>
          <div className="text-center mt-6 text-sm text-slate-400">
            Already have an account? <Link to="/login" className="text-yellow-400 font-semibold hover:text-white">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
