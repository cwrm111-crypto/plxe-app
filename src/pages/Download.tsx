import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDownCircle, Film, Globe, ShieldCheck, Smartphone } from 'lucide-react';

const APK_URL = 'https://github.com/cwrm111-crypto/plxe-app/releases/latest/download/PLEX.apk';

export const Download: React.FC = () => (
  <div className="min-h-screen bg-[#060a14] px-4 py-10 text-white">
    <div className="mx-auto max-w-md">
      <div className="mb-8 text-center">
        <div className="mx-auto inline-flex rounded-3xl bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600 px-8 py-4 text-5xl font-black text-black shadow-2xl">PLEX</div>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[4px] text-yellow-400">Web + Android</p>
        <h1 className="mt-3 text-2xl font-black">PLEX, everywhere</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">Use the same PLEX movie and trailer experience on the web or Android.</p>
      </div>

      <div className="rounded-3xl border border-yellow-400/20 bg-[#12121c]/90 p-6 shadow-2xl">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-yellow-400/20 bg-yellow-400/10"><Smartphone className="h-5 w-5 text-yellow-400" /></div>
          <div><h2 className="text-lg font-extrabold">PLEX Android App</h2><p className="text-xs text-slate-500">Latest GitHub Release APK</p></div>
        </div>

        <a href={APK_URL} download="PLEX.apk" className="group flex items-center justify-between rounded-2xl border border-yellow-400/25 bg-yellow-400/5 p-4 transition-all hover:border-yellow-400/60 hover:bg-yellow-400/10">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/15"><ArrowDownCircle className="h-7 w-7 text-green-400" /></div>
            <div><p className="font-bold">Download PLEX.apk</p><p className="text-xs text-slate-500">Direct Android installer</p></div>
          </div>
          <span className="text-2xl text-yellow-400 transition-transform group-hover:translate-y-1">â†“</span>
        </a>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="rounded-xl border border-white/10 bg-white/[.03] p-3 text-center"><ShieldCheck className="mx-auto mb-1.5 h-5 w-5 text-green-400" /><p className="text-[11px] font-bold">Installable</p></div>
          <div className="rounded-xl border border-white/10 bg-white/[.03] p-3 text-center"><Film className="mx-auto mb-1.5 h-5 w-5 text-yellow-400" /><p className="text-[11px] font-bold">Trailers</p></div>
          <div className="rounded-xl border border-white/10 bg-white/[.03] p-3 text-center"><Globe className="mx-auto mb-1.5 h-5 w-5 text-blue-400" /><p className="text-[11px] font-bold">Same UI</p></div>
        </div>
      </div>

      <Link to="/" className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-yellow-400 py-3.5 font-black text-black hover:bg-yellow-300"><Film className="h-4 w-4" />Open PLEX Web App</Link>
    </div>
  </div>
);

