import React, { useState } from 'react';

interface KraefeggLogoProps {
  className?: string;
  variant?: 'full' | 'symbol' | 'horizontal' | 'image';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  lightMode?: boolean;
  interactive?: boolean;
}

export const KraefeggSymbol: React.FC<{ size?: number; className?: string; interactive?: boolean }> = ({
  size = 54,
  className = '',
  interactive = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 group ${className}`}
      style={{ width: size, height: size }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dynamic Ambient Glow Layer */}
      <div
        className={`absolute -inset-1.5 rounded-xl bg-gradient-to-r from-cyan-500/40 via-emerald-500/30 to-amber-500/40 blur-md transition-all duration-700 pointer-events-none ${
          isHovered
            ? 'opacity-100 scale-110 shadow-[0_0_30px_rgba(6,182,212,0.6)]'
            : 'opacity-40 scale-95 group-hover:opacity-80'
        }`}
      />

      {/* Cybernetic High-Tech Pod Container */}
      <div
        className={`relative w-full h-full rounded-xl overflow-hidden bg-[#04070E] border border-cyan-500/40 shadow-2xl transition-all duration-500 ${
          interactive ? 'group-hover:border-cyan-400 group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]' : ''
        }`}
      >
        <img
          src="/kraefegg-new-tech-logo.jpg"
          alt="KRAEFEGG M.O."
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/kraefegg-tech-logo.png';
          }}
        />

        {/* Dynamic Light Sheen Sweep on Hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transition-all duration-1000 pointer-events-none ${
            isHovered ? 'translate-x-full opacity-100' : '-translate-x-full opacity-0'
          }`}
        />

        {/* Micro Calibration Markers */}
        <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-cyan-400/80 rounded-full" />
        <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-amber-400/80 rounded-full" />
        <div className="absolute bottom-0.5 left-0.5 w-1 h-1 bg-emerald-400/80 rounded-full" />
        <div className="absolute bottom-0.5 right-0.5 w-1 h-1 bg-rose-500/80 rounded-full" />
      </div>
    </div>
  );
};

export const KraefeggLogo: React.FC<KraefeggLogoProps> = ({
  className = '',
  variant = 'horizontal',
  size = 'md',
  interactive = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Height sizing calibrated for premium visual impact
  const sizeMap = {
    sm: { symbol: 42, height: 42, fontK: 'text-base', fontSub: 'text-[9px]' },
    md: { symbol: 52, height: 52, fontK: 'text-xl', fontSub: 'text-[10px]' },
    lg: { symbol: 72, height: 72, fontK: 'text-2xl', fontSub: 'text-xs' },
    xl: { symbol: 100, height: 100, fontK: 'text-3xl', fontSub: 'text-sm' },
    '2xl': { symbol: 140, height: 140, fontK: 'text-4xl', fontSub: 'text-base' },
  }[size];

  // Image only variant
  if (variant === 'image') {
    return (
      <div
        className={`relative inline-flex items-center justify-center group ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Dynamic Outer Glow */}
        <div
          className={`absolute -inset-2 rounded-2xl bg-gradient-to-r from-cyan-500/30 via-emerald-500/20 to-amber-500/30 blur-lg transition-all duration-700 pointer-events-none ${
            isHovered ? 'opacity-100 scale-105' : 'opacity-30 scale-95'
          }`}
        />

        <div
          className={`relative rounded-2xl overflow-hidden border border-cyan-500/40 bg-[#04070E] shadow-2xl transition-all duration-500 ${
            interactive ? 'group-hover:border-cyan-300 group-hover:scale-[1.02] group-hover:shadow-[0_0_35px_rgba(6,182,212,0.4)]' : ''
          }`}
          style={{ height: sizeMap.height * 1.5, width: 'auto', maxWidth: '100%' }}
        >
          <img
            src="/kraefegg-new-tech-logo.jpg"
            alt="KRAEFEGG M.O. Multi Office"
            referrerPolicy="no-referrer"
            className={`h-full w-auto object-contain transition-transform duration-700 ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/kraefegg-tech-logo.png';
            }}
          />
        </div>
      </div>
    );
  }

  // Symbol only
  if (variant === 'symbol') {
    return <KraefeggSymbol size={sizeMap.symbol} className={className} interactive={interactive} />;
  }

  // Horizontal Brand Lockup (Ideal for Navbar & Section Headers)
  if (variant === 'horizontal') {
    return (
      <div
        className={`inline-flex items-center gap-3.5 group cursor-pointer select-none ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Technological Symbol with dynamic glow */}
        <KraefeggSymbol size={sizeMap.symbol} interactive={interactive} />

        {/* High-Tech Typography Lockup */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <span
              className={`font-heading ${sizeMap.fontK} font-black tracking-widest text-white transition-colors duration-300 ${
                isHovered ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-300 drop-shadow-[0_0_12px_rgba(6,182,212,0.6)]' : ''
              }`}
            >
              KRAEFEGG
            </span>
            <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-300 bg-cyan-950/80 border border-cyan-500/50 px-1.5 py-0.5 rounded shadow-[0_0_10px_rgba(6,182,212,0.2)]">
              M.O.
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono font-bold tracking-[0.22em] text-emerald-400 uppercase">
              MULTI OFFICE
            </span>
            <span className="text-slate-600 text-[10px]">•</span>
            <span className="text-[8.5px] font-mono tracking-widest text-slate-400 uppercase hidden sm:inline">
              TECH & ENGINEERING
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Full Institutional Lockup (Hero / Footer / Corporate Profile)
  return (
    <div
      className={`inline-flex flex-col items-start group select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-4">
        <KraefeggSymbol size={sizeMap.symbol * 1.15} interactive={interactive} />
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2.5">
            <span
              className={`font-heading text-2xl sm:text-3xl font-black tracking-widest text-white transition-colors duration-300 ${
                isHovered ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]' : ''
              }`}
            >
              KRAEFEGG
            </span>
            <span className="text-xs font-mono font-bold tracking-widest text-cyan-300 bg-cyan-950/90 border border-cyan-500/50 px-2 py-0.5 rounded shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              M.O.
            </span>
          </div>
          <span className="text-xs font-mono tracking-[0.25em] text-emerald-400 font-bold uppercase mt-0.5">
            MULTI OFFICE
          </span>
        </div>
      </div>

      {/* High-Tech Spectral Indicator & Subtitle */}
      <div className="mt-2.5 pt-2 border-t border-slate-800/80 w-full flex flex-col gap-1">
        {/* Spectrum Rainbow Calibration Bar */}
        <div className="h-0.5 w-full rounded-full bg-gradient-to-r from-cyan-400 via-emerald-400 via-amber-400 to-rose-500 opacity-80 group-hover:opacity-100 transition-opacity" />

        <div className="flex items-center justify-between text-[9px] font-mono tracking-[0.2em] text-slate-400 uppercase pt-0.5">
          <span className="text-cyan-300 font-semibold">TECHNOLOGY • DATA • AI</span>
          <span className="text-emerald-400 font-semibold hidden sm:inline">ENVIRONMENTAL ENGINEERING</span>
        </div>
      </div>
    </div>
  );
};
