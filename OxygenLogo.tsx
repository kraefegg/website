import React from 'react';

interface OxygenLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  showText?: boolean;
}

export const OxygenLogo: React.FC<OxygenLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  showText = true,
}) => {
  const pixelSize = {
    sm: 36,
    md: 48,
    lg: 60,
  }[size];

  if (!showText) {
    return (
      <svg
        width={pixelSize}
        height={pixelSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
        aria-label="Oxygen Ecosystem"
      >
        <defs>
          <linearGradient id="o2Ring" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="50%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <filter id="o2Glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Hexagonal Shield with Biosphere lines */}
        <polygon
          points="50,6 88,27 88,73 50,94 12,73 12,27"
          fill="#061A14"
          stroke="url(#o2Ring)"
          strokeWidth="2"
        />

        {/* Orbiting Environmental rings */}
        <circle cx="50" cy="50" r="28" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.6" />
        <circle cx="50" cy="50" r="36" stroke="#06B6D4" strokeWidth="1" strokeDasharray="6 8" opacity="0.4" />

        {/* Stylized O2 Molecular Core with Emerald Leaf & Geospatial coordinates */}
        <path
          d="M 50 28 C 40 40, 36 55, 50 72 C 64 55, 60 40, 50 28 Z"
          fill="url(#o2Ring)"
          filter="url(#o2Glow)"
        />
        <circle cx="50" cy="50" r="4" fill="#ECFDF5" />
        <path d="M 50 35 L 50 65" stroke="#064E3B" strokeWidth="1.2" strokeLinecap="round" />

        {/* Node satellites */}
        <circle cx="76" cy="35" r="2.5" fill="#34D399" />
        <circle cx="24" cy="65" r="2.5" fill="#22D3EE" />
      </svg>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3.5 ${className}`}>
      <svg
        width={pixelSize}
        height={pixelSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="o2Ring" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="50%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <filter id="o2Glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Hexagonal Shield with Biosphere lines */}
        <polygon
          points="50,6 88,27 88,73 50,94 12,73 12,27"
          fill="#061A14"
          stroke="url(#o2Ring)"
          strokeWidth="2"
        />

        {/* Orbiting Environmental rings */}
        <circle cx="50" cy="50" r="28" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.6" />
        <circle cx="50" cy="50" r="36" stroke="#06B6D4" strokeWidth="1" strokeDasharray="6 8" opacity="0.4" />

        {/* Stylized O2 Molecular Core with Emerald Leaf & Geospatial coordinates */}
        <path
          d="M 50 28 C 40 40, 36 55, 50 72 C 64 55, 60 40, 50 28 Z"
          fill="url(#o2Ring)"
          filter="url(#o2Glow)"
        />
        <circle cx="50" cy="50" r="4" fill="#ECFDF5" />
        <path d="M 50 35 L 50 65" stroke="#064E3B" strokeWidth="1.2" strokeLinecap="round" />

        {/* Node satellites */}
        <circle cx="76" cy="35" r="2.5" fill="#34D399" />
        <circle cx="24" cy="65" r="2.5" fill="#22D3EE" />
      </svg>

      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5">
          <span className="font-heading text-lg md:text-xl font-bold tracking-wider text-emerald-300">
            OXYGEN
          </span>
          <span className="text-[10px] font-mono tracking-widest text-emerald-400/90 font-semibold uppercase bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.5 rounded">
            ECOSYSTEM
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[8.5px] font-mono tracking-[0.18em] text-slate-400 uppercase">
            Ecological Intelligence • ESG • Restoration
          </span>
        )}
      </div>
    </div>
  );
};
