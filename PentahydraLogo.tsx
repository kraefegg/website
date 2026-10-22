import React from 'react';

interface PentahydraLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  variant?: 'emblem' | 'full' | 'badge' | 'image';
}

export const PentahydraEmblem: React.FC<{ size?: number; className?: string }> = ({
  size = 64,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      <defs>
        <linearGradient id="phMetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="50%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>

        <linearGradient id="neonRed" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF3366" />
          <stop offset="100%" stopColor="#E11D48" />
        </linearGradient>

        <filter id="phGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <filter id="hMatrixGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Red Laser Grid Lines surrounding the crest */}
      <g stroke="#EF4444" strokeWidth="0.8" opacity="0.45">
        <line x1="120" y1="10" x2="195" y2="35" />
        <line x1="125" y1="18" x2="195" y2="45" />
        <line x1="130" y1="26" x2="195" y2="55" />
        <line x1="135" y1="34" x2="195" y2="65" />
        <line x1="140" y1="42" x2="195" y2="75" />
        <line x1="145" y1="50" x2="195" y2="85" />
        <line x1="150" y1="58" x2="195" y2="95" />
        <line x1="155" y1="66" x2="195" y2="105" />
      </g>

      {/* Outer Red Shield Framing */}
      <rect
        x="18"
        y="18"
        width="164"
        height="164"
        fill="#070B14"
        stroke="#DC2626"
        strokeWidth="2.5"
        rx="2"
      />

      {/* Inner Shadow Area with Radial Gradient */}
      <circle cx="100" cy="100" r="75" fill="radial-gradient(circle, #1E293B 0%, #030712 100%)" />

      {/* The 5 Cybernetic Hydra Heads positioned radially around the 5 vertices of the pentagon */}
      {/* Head 1: Top (90 deg) */}
      <g transform="translate(100, 100) rotate(0) translate(-100, -100)">
        <path
          d="M 92 40 C 92 28, 108 28, 108 40 L 112 60 L 88 60 Z"
          fill="url(#phMetalGrad)"
          stroke="#475569"
          strokeWidth="1.2"
        />
        <circle cx="100" cy="36" r="2.5" fill="#A855F7" filter="url(#phGlow)" />
        <circle cx="95" cy="46" r="1.5" fill="#38BDF8" />
        <circle cx="105" cy="46" r="1.5" fill="#38BDF8" />
      </g>

      {/* Head 2: Top Right (72 deg) */}
      <g transform="translate(100, 100) rotate(72) translate(-100, -100)">
        <path
          d="M 92 40 C 92 28, 108 28, 108 40 L 112 60 L 88 60 Z"
          fill="url(#phMetalGrad)"
          stroke="#475569"
          strokeWidth="1.2"
        />
        <circle cx="100" cy="36" r="2.5" fill="#A855F7" filter="url(#phGlow)" />
        <circle cx="95" cy="46" r="1.5" fill="#38BDF8" />
        <circle cx="105" cy="46" r="1.5" fill="#38BDF8" />
      </g>

      {/* Head 3: Bottom Right (144 deg) */}
      <g transform="translate(100, 100) rotate(144) translate(-100, -100)">
        <path
          d="M 92 40 C 92 28, 108 28, 108 40 L 112 60 L 88 60 Z"
          fill="url(#phMetalGrad)"
          stroke="#475569"
          strokeWidth="1.2"
        />
        <circle cx="100" cy="36" r="2.5" fill="#A855F7" filter="url(#phGlow)" />
        <circle cx="95" cy="46" r="1.5" fill="#38BDF8" />
        <circle cx="105" cy="46" r="1.5" fill="#38BDF8" />
      </g>

      {/* Head 4: Bottom Left (216 deg) */}
      <g transform="translate(100, 100) rotate(216) translate(-100, -100)">
        <path
          d="M 92 40 C 92 28, 108 28, 108 40 L 112 60 L 88 60 Z"
          fill="url(#phMetalGrad)"
          stroke="#475569"
          strokeWidth="1.2"
        />
        <circle cx="100" cy="36" r="2.5" fill="#A855F7" filter="url(#phGlow)" />
        <circle cx="95" cy="46" r="1.5" fill="#38BDF8" />
        <circle cx="105" cy="46" r="1.5" fill="#38BDF8" />
      </g>

      {/* Head 5: Top Left (288 deg) */}
      <g transform="translate(100, 100) rotate(288) translate(-100, -100)">
        <path
          d="M 92 40 C 92 28, 108 28, 108 40 L 112 60 L 88 60 Z"
          fill="url(#phMetalGrad)"
          stroke="#475569"
          strokeWidth="1.2"
        />
        <circle cx="100" cy="36" r="2.5" fill="#A855F7" filter="url(#phGlow)" />
        <circle cx="95" cy="46" r="1.5" fill="#38BDF8" />
        <circle cx="105" cy="46" r="1.5" fill="#38BDF8" />
      </g>

      {/* Central Metallic Pentagon Base */}
      <polygon
        points="100,55 142,85 126,135 74,135 58,85"
        fill="#090E17"
        stroke="#3B82F6"
        strokeWidth="3.5"
        filter="url(#phGlow)"
      />
      <polygon
        points="100,60 137,87 123,131 77,131 63,87"
        fill="#0B1120"
        stroke="#1E293B"
        strokeWidth="1.5"
      />

      {/* Central Matrix Ladder "H" (Red & Blue circuit bus bars) */}
      <g filter="url(#hMatrixGlow)">
        {/* White vertical side columns */}
        <rect x="78" y="78" width="6" height="44" fill="#FFFFFF" rx="1" />
        <rect x="116" y="78" width="6" height="44" fill="#FFFFFF" rx="1" />

        {/* Blue horizontal bus rails extending outwards */}
        <line x1="70" y1="88" x2="130" y2="88" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
        <line x1="70" y1="112" x2="130" y2="112" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />

        {/* Central Red Ladder Rungs */}
        <rect x="91" y="75" width="5" height="50" fill="#EF4444" rx="1" />
        <rect x="104" y="75" width="5" height="50" fill="#EF4444" rx="1" />

        <line x1="91" y1="83" x2="109" y2="83" stroke="#F87171" strokeWidth="2.5" />
        <line x1="91" y1="94" x2="109" y2="94" stroke="#F87171" strokeWidth="2.5" />
        <line x1="91" y1="105" x2="109" y2="105" stroke="#F87171" strokeWidth="2.5" />
        <line x1="91" y1="116" x2="109" y2="116" stroke="#F87171" strokeWidth="2.5" />
      </g>

      {/* Tech registration marks on corners */}
      <circle cx="26" cy="26" r="2" fill="#EF4444" />
      <circle cx="174" cy="26" r="2" fill="#EF4444" />
      <circle cx="26" cy="174" r="2" fill="#EF4444" />
      <circle cx="174" cy="174" r="2" fill="#EF4444" />
    </svg>
  );
};

export const PentahydraLogo: React.FC<PentahydraLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  variant = 'full',
}) => {
  // Increased sizes as requested ("Aumente o tamanho")
  const sizeMap = {
    sm: 52,
    md: 84,
    lg: 120,
    xl: 160,
  };

  const titleSizeClass = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-5xl',
    xl: 'text-6xl',
  }[size];

  const subSizeClass = {
    sm: 'text-xs tracking-[0.24em]',
    md: 'text-sm tracking-[0.26em]',
    lg: 'text-base tracking-[0.28em]',
    xl: 'text-lg tracking-[0.3em]',
  }[size];

  if (variant === 'image') {
    return (
      <div className={`inline-flex items-center gap-4 ${className}`}>
        <img
          src="/Π (3).jpg"
          alt="PentaHydra Agency Technologies & Systems"
          referrerPolicy="no-referrer"
          style={{ height: sizeMap[size], width: 'auto' }}
          className="object-contain shrink-0 rounded-xl border border-rose-500/40 bg-slate-950/90 p-2 shadow-[0_0_30px_rgba(244,63,94,0.35)]"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/pentahydra-system-logo.jpg';
          }}
        />
        {showSubtitle && (
          <div className="flex flex-col justify-center">
            <span
              className={`font-heading font-black text-white ${titleSizeClass}`}
              style={{
                textShadow: '0 0 20px rgba(244, 63, 94, 0.45)',
              }}
            >
              PentaHydra
            </span>
            <span className={`font-mono font-bold text-rose-400 uppercase mt-0.5 ${subSizeClass}`}>
              Agency Technologies & Systems
            </span>
          </div>
        )}
      </div>
    );
  }

  if (variant === 'emblem') {
    return <PentahydraEmblem size={sizeMap[size]} className={className} />;
  }

  return (
    <div className={`inline-flex items-center gap-4 md:gap-5 ${className}`}>
      <PentahydraEmblem size={sizeMap[size]} />
      <div className="flex flex-col justify-center">
        {/* Only PentaHydra */}
        <span
          className={`font-heading font-black text-white tracking-wide ${titleSizeClass}`}
          style={{
            textShadow: '0 0 25px rgba(244, 63, 94, 0.45)',
          }}
        >
          PentaHydra
        </span>

        {/* Only Agency Technologies & Systems */}
        {showSubtitle && (
          <span className={`font-mono font-bold text-rose-400 uppercase mt-1 ${subSizeClass}`}>
            Agency Technologies & Systems
          </span>
        )}
      </div>
    </div>
  );
};
