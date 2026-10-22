import React, { useState, useEffect } from 'react';
import { NavRoute, Language, ShowcaseDemo } from '../types';
import { showcasesData } from '../data/showcasesData';
import { CinematicVideoPlayer } from '../components/media/CinematicVideoPlayer';
import { 
  Activity, Terminal, Cpu, Radio, Play, 
  Pause, RefreshCw, Sliders, ShieldCheck, 
  Eye, Layers, ArrowUpRight 
} from 'lucide-react';
import { showcasesI18n, localize } from '../data/pageTranslations';

interface ShowcasesPageProps {
  onNavigate: (route: NavRoute) => void;
  lang: Language;
}

export const ShowcasesPage: React.FC<ShowcasesPageProps> = ({ onNavigate, lang }) => {
  const [activeShowcaseId, setActiveShowcaseId] = useState<string>(showcasesData[0].id);
  const [simRunning, setSimRunning] = useState<boolean>(true);
  const [simStep, setSimStep] = useState<number>(104);
  const [sliderVal, setSliderVal] = useState<number>(65);

  const activeDemo = showcasesData.find((d) => d.id === activeShowcaseId) || showcasesData[0];

  useEffect(() => {
    if (!simRunning) return;
    const interval = setInterval(() => {
      setSimStep((prev) => prev + 1);
    }, 1200);
    return () => clearInterval(interval);
  }, [simRunning]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Page Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span>{localize(lang, showcasesI18n.badge)}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-heading font-black text-white">
          {localize(lang, showcasesI18n.title)}
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          {localize(lang, showcasesI18n.subtitle)}
        </p>
      </div>

      {/* Embedded High Definition Motion Lab Reel */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span className="flex items-center gap-2 text-cyan-300">
            <Radio className="w-3.5 h-3.5 animate-pulse text-rose-400" />
            {localize(lang, showcasesI18n.videoReelFeed)}
          </span>
          <span className="text-slate-500">{localize(lang, showcasesI18n.videoReelFormat)}</span>
        </div>

        <CinematicVideoPlayer
          title="PENTAHYDRA × KRAEFEGG LAB BROADCAST"
          subtitle="MOTION REEL 01: REAL-WORLD EMBEDDED AI // MARITIME CONVERGENCE"
          defaultMode="convergence"
        />
      </div>

      {/* Main Interactive Demo Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left selector sidebar */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider px-1">
            {localize(lang, showcasesI18n.simulationModules)}
          </div>

          <div className="space-y-2">
            {showcasesData.map((item) => {
              const isSelected = item.id === activeShowcaseId;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveShowcaseId(item.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-950/70 border-cyan-500/60 shadow-[0_0_20px_-5px_rgba(6,182,212,0.4)]'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-950 text-cyan-300 border border-slate-800">
                      {item.type}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      {item.status}
                    </span>
                  </div>
                  <div className="text-xs font-heading font-bold text-white line-clamp-1">
                    {lang === 'pt' ? item.title : item.titleEn}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                    {item.domain}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Active Interactive Console */}
        <div className="lg:col-span-8 rounded-2xl bg-gradient-to-b from-[#080E18] to-slate-950 border border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 font-mono text-[10px] border border-rose-500/40">
                  {activeDemo.type}
                </span>
                <span className="text-xs font-mono text-cyan-400">
                  DOMAIN: {activeDemo.domain.toUpperCase()}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white mt-1">
                {lang === 'pt' ? activeDemo.title : activeDemo.titleEn}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSimRunning(!simRunning)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors ${
                  simRunning
                    ? 'bg-rose-950 text-rose-300 border border-rose-500/40'
                    : 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                }`}
              >
                {simRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{simRunning ? localize(lang, showcasesI18n.pause) : localize(lang, showcasesI18n.execute)}</span>
              </button>

              <button
                onClick={() => setSimStep(100)}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                title="Reset simulation step"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {lang === 'pt' ? activeDemo.description : activeDemo.descriptionEn}
          </p>

          {/* Real-time Telemetry Readout Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {activeDemo.metrics.map((m, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1 relative overflow-hidden"
              >
                <div className="text-[11px] font-mono text-slate-400 truncate">
                  {lang === 'pt' ? m.label : m.labelEn}
                </div>
                <div className="text-2xl font-heading font-black text-cyan-300 flex items-baseline gap-1">
                  <span>{m.value}</span>
                  <span className="text-xs font-mono text-slate-400">{m.unit}</span>
                </div>
                <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-cyan-500 h-full transition-all duration-700"
                    style={{ width: `${(idx + 1) * 23}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Parameter Tuner Slider */}
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                <span>{localize(lang, showcasesI18n.sensitivitySlider)}</span>
              </span>
              <span className="text-cyan-400 font-bold">{sliderVal}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={sliderVal}
              onChange={(e) => setSliderVal(Number(e.target.value))}
              className="w-full accent-cyan-400 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Simulated Raw Telemetry Feed Console */}
          <div className="rounded-xl bg-black border border-slate-800 p-4 font-mono text-xs text-slate-300 space-y-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[11px] text-slate-500">
              <span className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                STREAM_OUTPUT_CONSOLE // PACKET_BUFFER
              </span>
              <span className="text-cyan-400">{localize(lang, showcasesI18n.packetSeq)} #{simStep}</span>
            </div>

            <div className="space-y-1 text-[11px] text-slate-400">
              <div className="text-cyan-300">
                [T+{(simStep * 0.12).toFixed(2)}s] &gt; Sync node heartbeat OK | CPU Load: 14.2% | RAM: 1.8GB / 16GB
              </div>
              <div>
                [T+{(simStep * 0.12).toFixed(2)}s] &gt; Channel payload verified (CRC32: 0x8F92A1) | Filter calibration: {sliderVal}%
              </div>
              <div className="text-emerald-400">
                [T+{(simStep * 0.12).toFixed(2)}s] &gt; Model output: Nominal state confirmed. Threshold delta &lt; 0.02%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

