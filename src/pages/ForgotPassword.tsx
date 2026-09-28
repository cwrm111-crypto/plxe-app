import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
export const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useApp();
  const [step, setStep] = useState(1);
  const [countryCode, setCountryCode] = useState('+88');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const sendOtp = () => {
    if (!phone.trim()) { showToast('Phone number required', 'error'); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast('📱 OTP sent successfully!', 'success');
      setStep(2);
    }, 800);
  };
  const verifyOtp = () => {
    if (otp.length !== 6) { showToast('Enter 6-digit OTP', 'error'); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast('✅ OTP verified!', 'success');
      setStep(3);
    }, 800);
  };
  const resetPassword = () => {
    if (newPassword.length < 6) { showToast('Password min 6 chars', 'error'); return; }
    if (newPassword !== confirmPassword) { showToast('Passwords do not match', 'error'); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast('🎉 Password reset successful!', 'success');
      setTimeout(() => navigate('/login'), 1200);
    }, 900);
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
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto rounded-[28px] flex items-center justify-center shadow-2xl mb-4"
            style={{background: 'linear-gradient(145deg, #f5c518, #d4a017)',
              boxShadow: '0 0 40px rgba(245,197,24,0.4), 0 20px 40px rgba(0,0,0,0.6)'}}>
            <span className="text-black font-black text-4xl tracking-tighter">PLEX</span>
          </div>
          <p className="text-[11px] tracking-[3px] uppercase font-semibold"
            style={{color: '#f5c518', textShadow: '0 0 20px rgba(245,197,24,0.3)'}}>Password Recovery</p>
        </div>
        <div className="rounded-[28px] p-9 border"
          style={{background: 'rgba(20,20,30,0.75)', backdropFilter: 'blur(24px)',
            borderColor: 'rgba(245,197,24,0.2)',
            boxShadow: '0 30px 60px -12px rgba(0,0,0,0.8), 0 0 80px -20px rgba(245,197,24,0.35)'}}>
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8 px-4">
            {[1, 2, 3].map((s) => (
              <React.Fragment key={s}>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all"
                    style={{
                      background: step >= s ? 'linear-gradient(135deg, #f5c518, #d4a017)' : 'rgba(255,255,255,0.06)',
                      color: step >= s ? '#000' : '#64748b',
                      border: step >= s ? 'none' : '1px solid rgba(255,255,255,0.1)'
                    }}>
                    {step > s ? '✓' : s}
                  </div>
                </div>
                {s < 3 && (
                  <div className="flex-1 h-0.5 mx-2 rounded-full transition-all"
                    style={{background: step > s ? '#f5c518' : 'rgba(255,255,255,0.08)'}} />
                )}
              </React.Fragment>
            ))}
          </div>
          {/* STEP 1: Phone */}
          {step === 1 && (
            <div>
              <h1 className="text-white text-2xl font-bold mb-2">Forgot Password?</h1>
              <p className="text-slate-400 text-sm mb-6">Enter your registered phone number</p>
              <div className="flex items-center gap-3 rounded-2xl px-4 py-1 border focus-within:border-yellow-400 mb-6"
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
              <button onClick={sendOtp} disabled={loading}
                className="w-full py-4 rounded-2xl font-bold text-base text-black hover:-translate-y-0.5 disabled:opacity-70"
                style={{background: 'linear-gradient(135deg, #f5c518 0%, #d4a017 100%)',
                  boxShadow: '0 10px 30px -5px rgba(245,197,24,0.35)'}}>
                {loading ? '⏳ Sending...' : 'Send OTP'}
              </button>
            </div>
          )}
          {/* STEP 2: OTP */}
          {step === 2 && (
            <div>
              <h1 className="text-white text-2xl font-bold mb-2">Verify OTP</h1>
              <p className="text-slate-400 text-sm mb-6">Enter 6-digit code sent to {countryCode}{phone}</p>
              <div className="flex items-center justify-center gap-2 mb-6">
                <input type="text" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="● ● ● ● ● ●" maxLength={6}
                  className="w-full bg-transparent text-white text-center outline-none py-4 text-3xl font-bold tracking-[12px] rounded-2xl border focus-within:border-yellow-400"
                  style={{background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)'}} />
              </div>
              <button onClick={verifyOtp} disabled={loading}
                className="w-full py-4 rounded-2xl font-bold text-base text-black hover:-translate-y-0.5 disabled:opacity-70 mb-3"
                style={{background: 'linear-gradient(135deg, #f5c518 0%, #d4a017 100%)',
                  boxShadow: '0 10px 30px -5px rgba(245,197,24,0.35)'}}>
                {loading ? '⏳ Verifying...' : 'Verify OTP'}
              </button>
              <button onClick={() => setStep(1)}
                className="w-full py-3 text-slate-400 text-sm hover:text-yellow-400">
                ← Change phone number
              </button>
            </div>
          )}
          {/* STEP 3: New Password */}
          {step === 3 && (
            <div>
              <h1 className="text-white text-2xl font-bold mb-2">New Password</h1>
              <p className="text-slate-400 text-sm mb-6">Create a strong new password</p>
              <div className="space-y-4 mb-6">
                <div className="flex items-center rounded-2xl px-4 py-1 border focus-within:border-yellow-400"
                  style={{background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)'}}>
                  <input type={showPassword ? 'text' : 'password'} value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New Password"
                    className="flex-1 bg-transparent text-white outline-none placeholder-slate-500 py-3 text-[15px] font-medium" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-yellow-400 p-1">
                    {showPassword ? '🙈' : '👁'}
                  </button>
                </div>
                <div className="flex items-center rounded-2xl px-4 py-1 border focus-within:border-yellow-400"
                  style={{background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)'}}>
                  <input type="password" value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    className="flex-1 bg-transparent text-white outline-none placeholder-slate-500 py-3 text-[15px] font-medium" />
                </div>
              </div>
              <button onClick={resetPassword} disabled={loading}
                className="w-full py-4 rounded-2xl font-bold text-base text-black hover:-translate-y-0.5 disabled:opacity-70"
                style={{background: 'linear-gradient(135deg, #f5c518 0%, #d4a017 100%)',
                  boxShadow: '0 10px 30px -5px rgba(245,197,24,0.35)'}}>
                {loading ? '⏳ Resetting...' : 'Reset Password'}
              </button>
            </div>
          )}
          <p className="text-center text-[13.5px] text-slate-400 mt-7">
            Remember your password?{' '}
            <Link to="/login" className="font-semibold hover:text-white" style={{color: '#f5c518'}}>Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
