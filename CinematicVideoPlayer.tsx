import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize2, ShieldCheck, Cpu, Radio, Sparkles } from 'lucide-react';

interface CinematicVideoPlayerProps {
  title?: string;
  subtitle?: string;
  autoplay?: boolean;
  className?: string;
  defaultMode?: 'cyber' | 'marine' | 'convergence';
}

export const CinematicVideoPlayer: React.FC<CinematicVideoPlayerProps> = ({
  title = 'KRAEFEGG × PENTAHYDRA MOTION REEL',
  subtitle = 'SYSTEMS // CINEMATIC BROADCAST 01: REAL WORLD EMBEDDED AI & MULTIDISCIPLINARY OPS',
  autoplay = true,
  className = '',
  defaultMode = 'cyber',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(autoplay);
  const [activeMode, setActiveMode] = useState<'cyber' | 'marine' | 'convergence'>(defaultMode);
  const [progress, setProgress] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [glitchActive, setGlitchActive] = useState<boolean>(true);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthOscRef = useRef<OscillatorNode | null>(null);
  const animFrameIdRef = useRef<number>(0);

  // Audio ambient synthesizer toggle
  const toggleAudio = () => {
    if (isMuted) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioCtx();
        }
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }
        // Create subtle futuristic ambient drone
        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(55, audioCtxRef.current.currentTime); // Low A hum
        gain.gain.setValueAtTime(0.04, audioCtxRef.current.currentTime);
        
        // Lowpass filter for smooth deep rumble
        const filter = audioCtxRef.current.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(180, audioCtxRef.current.currentTime);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtxRef.current.destination);
        osc.start();
        synthOscRef.current = osc;
        setIsMuted(false);
      } catch {
        setIsMuted(true);
      }
    } else {
      if (synthOscRef.current) {
        try {
          synthOscRef.current.stop();
          synthOscRef.current.disconnect();
        } catch {
          // ignore
        }
        synthOscRef.current = null;
      }
      setIsMuted(true);
    }
  };

  useEffect(() => {
    return () => {
      if (synthOscRef.current) {
        try {
          synthOscRef.current.stop();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  // Main Canvas Render Loop (Replicating the user's video motion graphics)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    const totalDuration = 24; // 24 seconds loop
    let lastTimestamp = performance.now();

    const render = (now: number) => {
      const dt = (now - lastTimestamp) / 1000;
      lastTimestamp = now;

      if (isPlaying) {
        time = (time + dt) % totalDuration;
        setProgress((time / totalDuration) * 100);
      }

      // Handle canvas resolution
      const width = canvas.width;
      const height = canvas.height;

      // Clear with deep tone
      if (activeMode === 'marine') {
        // Ocean deep turquoise gradient
        const oceanGrad = ctx.createLinearGradient(0, 0, 0, height);
        oceanGrad.addColorStop(0, '#021824');
        oceanGrad.addColorStop(0.5, '#052D3F');
        oceanGrad.addColorStop(1, '#02111A');
        ctx.fillStyle = oceanGrad;
        ctx.fillRect(0, 0, width, height);

        // Water caustic light bands
        ctx.save();
        ctx.globalAlpha = 0.15;
        for (let i = 0; i < 6; i++) {
          const waveY = (time * 40 + i * 90) % (height + 100) - 50;
          ctx.beginPath();
          ctx.moveTo(0, waveY);
          for (let x = 0; x <= width; x += 40) {
            const dy = Math.sin(x * 0.015 + time * 2 + i) * 18;
            ctx.lineTo(x, waveY + dy);
          }
          ctx.strokeStyle = '#38BDF8';
          ctx.lineWidth = 14;
          ctx.stroke();
        }
        ctx.restore();
      } else {
        // Deep Black Tech Matrix
        ctx.fillStyle = '#05070B';
        ctx.fillRect(0, 0, width, height);

        // Radial subtle red glow
        const glowGrad = ctx.createRadialGradient(width * 0.7, height * 0.3, 10, width * 0.7, height * 0.3, width * 0.5);
        glowGrad.addColorStop(0, 'rgba(239, 68, 68, 0.18)');
        glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glowGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // 1. Perspective Red Laser Grid (From Top-Right corner in user video)
      ctx.save();
      ctx.strokeStyle = '#EF4444';
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.65;
      const gridOriginX = width * 0.75;
      const gridOriginY = height * 0.15;

      const numLines = 28;
      for (let i = 0; i < numLines; i++) {
        const offset = ((i * 18 + time * 35) % (width * 0.7));
        ctx.beginPath();
        ctx.moveTo(gridOriginX + offset * 0.6, gridOriginY + offset * 0.1);
        ctx.lineTo(width, gridOriginY + offset * 0.7);
        ctx.stroke();

        // Horizontal connecting lines
        ctx.beginPath();
        ctx.moveTo(gridOriginX - 100 + i * 20, gridOriginY + i * 15);
        ctx.lineTo(width, gridOriginY + i * 22);
        ctx.stroke();
      }
      ctx.restore();

      // 2. Center Rotating Pentahydra Shield with Red Frame
      const centerX = width * 0.52;
      const centerY = height * 0.48;
      const boxSize = Math.min(width, height) * 0.44;

      // Outer Red Framing Box
      ctx.save();
      ctx.strokeStyle = '#DC2626';
      ctx.lineWidth = 4;
      ctx.strokeRect(centerX - boxSize / 2, centerY - boxSize / 2, boxSize, boxSize);

      // Inner Dark background for emblem
      ctx.fillStyle = '#080E1A';
      ctx.fillRect(centerX - boxSize / 2 + 2, centerY - boxSize / 2 + 2, boxSize - 4, boxSize - 4);
      ctx.restore();

      // Rotating Crest inside box
      ctx.save();
      ctx.translate(centerX, centerY);

      // Slight pulsation & rotation
      const scale = 1 + Math.sin(time * 3) * 0.03;
      ctx.scale(scale, scale);

      // Pentagon Shield Outline
      const pentagonRadius = boxSize * 0.38;
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
        const px = Math.cos(angle) * pentagonRadius;
        const py = Math.sin(angle) * pentagonRadius;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fillStyle = '#0F172A';
      ctx.fill();
      ctx.strokeStyle = '#38BDF8';
      ctx.lineWidth = 3;
      ctx.stroke();

      // 5 Hydra Heads
      for (let i = 0; i < 5; i++) {
        const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
        const headDist = pentagonRadius * 0.95;
        const hx = Math.cos(angle) * headDist;
        const hy = Math.sin(angle) * headDist;

        ctx.save();
        ctx.translate(hx, hy);
        ctx.rotate(angle + Math.PI / 2);

        // Dragon / Hydra silhouette
        ctx.beginPath();
        ctx.moveTo(-10, 0);
        ctx.lineTo(0, -22);
        ctx.lineTo(10, 0);
        ctx.closePath();
        ctx.fillStyle = '#334155';
        ctx.fill();
        ctx.strokeStyle = '#64748B';
        ctx.stroke();

        // Glowing purple eye
        ctx.beginPath();
        ctx.arc(0, -10, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#C084FC';
        ctx.shadowColor = '#E879F9';
        ctx.shadowBlur = 8;
        ctx.fill();

        ctx.restore();
      }

      // Central H Matrix Ladder
      const hWidth = boxSize * 0.16;
      const hHeight = boxSize * 0.24;
      // White vertical legs
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(-hWidth / 2, -hHeight / 2, 5, hHeight);
      ctx.fillRect(hWidth / 2 - 5, -hHeight / 2, 5, hHeight);

      // Blue crossbars
      ctx.strokeStyle = '#0284C7';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-hWidth / 2 - 10, -hHeight * 0.2);
      ctx.lineTo(hWidth / 2 + 10, -hHeight * 0.2);
      ctx.moveTo(-hWidth / 2 - 10, hHeight * 0.2);
      ctx.lineTo(hWidth / 2 + 10, hHeight * 0.2);
      ctx.stroke();

      // Red central ladder
      ctx.fillStyle = '#EF4444';
      ctx.fillRect(-6, -hHeight / 2 - 2, 4, hHeight + 4);
      ctx.fillRect(2, -hHeight / 2 - 2, 4, hHeight + 4);
      ctx.strokeStyle = '#EF4444';
      ctx.lineWidth = 2;
      for (let r = -3; r <= 3; r++) {
        ctx.beginPath();
        ctx.moveTo(-6, r * 6);
        ctx.lineTo(6, r * 6);
        ctx.stroke();
      }

      ctx.restore();

      // 3. Typography Overlays (from the actual video)
      ctx.save();
      // Neon Pink PENTA
      ctx.font = '900 36px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#F472B6';
      ctx.shadowColor = '#F43F5E';
      ctx.shadowBlur = 12;
      ctx.fillText('PENTA', width * 0.08, height * 0.22);

      // Red Wireframe HYDRA
      ctx.font = '900 36px "Space Grotesk", sans-serif';
      ctx.strokeStyle = '#EF4444';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#EF4444';
      ctx.shadowBlur = 6;
      ctx.strokeText('HYDRA', width * 0.08, height * 0.32);

      // Red 3D Extruded AGENCY / SYSTEMS
      ctx.font = '700 20px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#EF4444';
      ctx.shadowBlur = 0;
      ctx.fillText('AGENCY', centerX - 55, centerY + boxSize / 2 + 32);
      ctx.fillText('SYSTEMS', centerX - 60, centerY + boxSize / 2 + 58);
      ctx.restore();

      // 4. Kraefegg Logo stamp on corner
      ctx.save();
      const kX = width * 0.84;
      const kY = height * 0.78;
      // Mini Kraefegg badge
      ctx.fillStyle = '#080E18';
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.lineWidth = 1;
      ctx.strokeRect(kX - 35, kY - 25, 70, 50);
      ctx.fillRect(kX - 35, kY - 25, 70, 50);

      // Stylized K
      ctx.font = '700 16px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#34D399';
      ctx.fillText('K', kX - 22, kY);
      ctx.font = '600 7px "JetBrains Mono", monospace';
      ctx.fillStyle = '#F8FAFC';
      ctx.fillText('KRAEFEGG', kX - 10, kY - 3);
      ctx.fillStyle = '#38BDF8';
      ctx.fillText('M.O.', kX + 16, kY + 6);
      ctx.restore();

      // 5. Lower Tech Banner (from video)
      ctx.save();
      const bannerY = height * 0.88;
      ctx.fillStyle = 'rgba(10, 15, 26, 0.85)';
      ctx.fillRect(0, bannerY - 20, width, 40);
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(20, bannerY - 16, width - 40, 32);

      ctx.font = '700 13px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#FBBF24';
      const marquee = 'Embedded Systems • Edge AI • IoT • AI Automation • Technologies Development & Applications';
      ctx.fillText(marquee, 35, bannerY + 4);

      ctx.font = '600 11px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText('Europe — Asia — North & South America', width - 280, bannerY + 4);
      ctx.restore();

      // 6. Digital Glitch & Radar Scanlines
      if (glitchActive && Math.sin(time * 12) > 0.82) {
        ctx.save();
        ctx.fillStyle = 'rgba(6, 182, 212, 0.15)';
        const glitchY = (time * 190) % height;
        ctx.fillRect(0, glitchY, width, 14);
        ctx.fillStyle = 'rgba(239, 68, 68, 0.12)';
        ctx.fillRect(10, glitchY + 8, width - 20, 6);
        ctx.restore();
      }

      // Radar Crosshair & GPS Telemetry Overlay
      ctx.save();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      // Telemetry HUD
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = '#38BDF8';
      ctx.fillText(`FEED: ${activeMode.toUpperCase()} // LAT: 0.12ms // BUFFER: 100%`, 24, 28);
      ctx.fillText(`SEQ: ${Math.floor(time * 30).toString().padStart(4, '0')} FPS: 60`, width - 160, 28);
      ctx.restore();

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [isPlaying, activeMode, glitchActive]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative rounded-xl overflow-hidden border border-slate-800 bg-[#05070B] shadow-2xl ${className}`}
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/90 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span className="text-xs font-mono font-bold tracking-wider text-slate-200">
            {title}
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
            PROPRIETARY MEDIA REEL
          </span>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveMode('cyber')}
            className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors ${
              activeMode === 'cyber'
                ? 'bg-rose-950/90 text-rose-300 border border-rose-500/50'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            01. CYBER MATRIX
          </button>
          <button
            onClick={() => setActiveMode('marine')}
            className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors ${
              activeMode === 'marine'
                ? 'bg-cyan-950/90 text-cyan-300 border border-cyan-500/50'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            02. MARINE & TECH
          </button>
          <button
            onClick={() => setActiveMode('convergence')}
            className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors ${
              activeMode === 'convergence'
                ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-500/50'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            03. CONVERGENCE
          </button>
        </div>
      </div>

      {/* Main Video Viewport Canvas */}
      <div className="relative aspect-video w-full bg-black">
        <canvas
          ref={canvasRef}
          width={960}
          height={540}
          className="w-full h-full object-contain block"
        />

        {/* Scanline CRT overlay filter */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-35" />

        {/* Quick Watermark stamp */}
        <div className="absolute bottom-3 left-4 pointer-events-none flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
            KRAEFEGG M.O. // PENTAHYDRA MOTION LAB
          </span>
        </div>
      </div>

      {/* Progress Scrubber Bar */}
      <div className="w-full bg-slate-900 h-1 relative cursor-pointer">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 via-rose-500 to-amber-400 transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Media Controls Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-t border-slate-800/80">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white transition-colors"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-cyan-400" />}
          </button>

          <button
            onClick={() => setProgress(0)}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Restart Reel"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={toggleAudio}
            className={`p-1.5 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-mono ${
              !isMuted
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
            title="Toggle Ambient Audio Synthesizer"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
            <span className="hidden sm:inline text-[10px]">
              {isMuted ? 'AUDIO OFF' : 'AUDIO SYNTH LIVE'}
            </span>
          </button>

          <button
            onClick={() => setGlitchActive(!glitchActive)}
            className={`px-2 py-1 rounded text-[10px] font-mono transition-colors ${
              glitchActive
                ? 'bg-rose-950/70 text-rose-300 border border-rose-500/40'
                : 'bg-slate-900 text-slate-500'
            }`}
          >
            GLITCH FX: {glitchActive ? 'ON' : 'OFF'}
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-slate-400 hidden md:inline">
            {subtitle}
          </span>

          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
