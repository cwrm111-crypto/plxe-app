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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) { showToast('Phone number required', 'error'); return; }
    if (password.length < 6) { showToast('Password min 6 characters', 'error'); return; }
    if (password !== confirmPassword) { showToast('Passwords do not match', 'error'); return; }
    if (!agree) { showToast('Please accept terms', 'error'); return; }
    setLoading(true);
    setTimeout(() => {
      signup({ email: `${phone}@plex.app`, phone: `${countryCode}${phone}`, password, invitationCode });
      setLoading(false);
      showToast('✅ Account created successfully!', 'success');
      setTimeout(() => navigate('/login'), 1200);
    }, 900);
  };
  const passwordStrength = () => {
    if (password.length === 0) return { text: '', color: '' };
    if (password.length < 6) return { text: 'Weak', color: '#ef4444' };
    if (password.length < 10) return { text: 'Good', color: '#f5c518' };
    return { text: 'Strong', color: '#10b981' };
  };
  const strength = passwordStrength();
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
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto rounded-[28px] flex items-center justify-center shadow-2xl mb-4"
            style={{
              background: 'linear-gradient(145deg, #f5c518, #d4a017)',
              boxShadow: '0 0 40px rgba(245,197,24,0.4), 0 20px 40px rgba(0,0,0,0.6)'
            }}>
            <span className="text-black font-black text-4xl tracking-tighter">PLEX</span>
          </div>
          <p className="text-[11px] tracking-[3px] uppercase font-semibold"
            style={{color: '#f5c518', textShadow: '0 0 20px rgba(245,197,24,0.3)'}}>
            Create Your Account
          </p>
        </div>
        {/* Signup Card */}
        <div className="rounded-[28px] p-9 border"
          style={{
            background: 'rgba(20,20,30,0.75)',
            backdropFilter: 'blur(24px)',
            borderColor: 'rgba(245,197,24,0.2)',
            boxShadow: '0 30px 60px -12px rgba(0,0,0,0.8), 0 0 80px -20px rgba(245,197,24,0.35)'
          }}>
          <h1 className="text-white text-3xl font-bold mb-8">Sign Up</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Phone */}
            <div className="flex items-center gap-3 rounded-2xl px-4 py-1 border transition-all focus-within:border-yellow-400"
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
            {/* Password */}
            <div>
              <div className="flex items-center rounded-2xl px-4 py-1 border transition-all focus-within:border-yellow-400"
                style={{background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)'}}>
                <input type={showPassword ? 'text' : 'password'} value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password (min 6 chars)"
                  className="flex-1 bg-transparent text-white outline-none placeholder-slate-500 py-3 text-[15px] font-medium" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-yellow-400 transition-colors p-1">
                  {showPassword ? '🙈' : '👁'}
                </button>
              </div>
              {password && (
                <div className="flex items-center gap-2 mt-2 px-1">
                  <div className="flex-1 h-1 rounded-full overflow-hidden" style={{background: 'rgba(255,255,255,0.08)'}}>
                    <div className="h-full transition-all" style={{
                      width: password.length < 6 ? '33%' : password.length < 10 ? '66%' : '100%',
                      background: strength.color
                    }} />
                  </div>
                  <span className="text-[11px] font-semibold" style={{color: strength.color}}>{strength.text}</span>
                </div>
              )}
            </div>
            {/* Confirm Password */}
            <div className="flex items-center rounded-2xl px-4 py-1 border transition-all focus-within:border-yellow-400"
              style={{background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)'}}>
              <input type={showConfirm ? 'text' : 'password'} value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="flex-1 bg-transparent text-white outline-none placeholder-slate-500 py-3 text-[15px] font-medium" />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                className="text-slate-400 hover:text-yellow-400 transition-colors p-1">
                {showConfirm ? '🙈' : '👁'}
              </button>
            </div>
            {/* Invitation Code */}
            <div className="flex items-center rounded-2xl px-4 py-1 border transition-all focus-within:border-yellow-400"
              style={{background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)'}}>
              <input type="text" value={invitationCode}
                onChange={(e) => setInvitationCode(e.target.value)}
                placeholder="Invitation Code (optional)"
                className="flex-1 bg-transparent text-white outline-none placeholder-slate-500 py-3 text-[15px] font-medium" />
            </div>
            {/* Terms */}
            <label className="flex items-start gap-2 text-[12.5px] text-slate-400 cursor-pointer py-1">
              <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)}
                className="w-4 h-4 rounded cursor-pointer mt-0.5" style={{accentColor: '#f5c518'}} />
              <span>I agree to the <a href="#" className="text-yellow-400 hover:underline">Terms & Conditions</a> and <a href="#" className="text-yellow-400 hover:underline">Privacy Policy</a></span>
            </label>
            {/* Submit */}
            <button type="submit" disabled={loading}
              className="w-full py-4 mt-2 rounded-2xl font-bold text-base text-black transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, #f5c518 0%, #d4a017 100%)',
                boxShadow: '0 10px 30px -5px rgba(245,197,24,0.35)'
              }}>
              {loading ? '⏳ Creating Account...' : 'Create Account'}
            </button>
          </form>
          {/* Login Link */}
          <p className="text-center text-[13.5px] text-slate-400 mt-7">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold transition-colors hover:text-white" style={{color: '#f5c518'}}>
              Sign In
            </Link>
          </p>
        </div>
        {/* Footer */}
        <div className="flex flex-wrap justify-center gap-4 mt-8 text-xs">
          <a href="#" className="text-slate-500 hover:text-yellow-400 transition-colors font-medium">Help</a>
          <a href="#" className="text-slate-500 hover:text-yellow-400 transition-colors font-medium">Conditions</a>
          <a href="#" className="text-slate-500 hover:text-yellow-400 transition-colors font-medium">Privacy</a>
        </div>
      </div>
    </div>
  );
};
