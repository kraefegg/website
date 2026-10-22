import React, { useState } from 'react';
import { Language, NavRoute } from '../types';
import { Microscope, Cpu, Leaf, Globe2, Radio, Server, Layers, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ResearchPageProps {
  lang: Language;
  onNavigate: (route: NavRoute) => void;
}

export const ResearchPage: React.FC<ResearchPageProps> = ({ lang, onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const researchProjects = [
    {
      id: 'res-1',
      code: 'R&D-AI-01',
      title: 'Modelos de Visão Computacional para Detecção Subaquática de Bioincrustação',
      titleEn: 'Underwater Computer Vision Models for Biofouling & Hull Diagnostics',
      domain: 'MARITIME & AI',
      status: 'PROTOTYPE',
      stage: 'Laboratório & Teste Hidrodinâmico',
      summary: 'Redes neurais convolucionais otimizadas para hardware edge submarino, operando em baixa visibilidade aquática em cascos e amarras portuárias.',
      specs: ['Inference: 18ms on Jetson Orin', 'Resolução: 4K Underwater Optical', 'Autonomia: ROV Integrado']
    },
    {
      id: 'res-2',
      code: 'R&D-ECO-02',
      title: 'Sensoriamento Espectral Hiperespectral para Detecção Precoce de Estresse Hídrico Florestal',
      titleEn: 'Hyperspectral Remote Sensing for Early Forest Canopy Water Stress Detection',
      domain: 'ENVIRONMENT & SATELLITE',
      status: 'EXPERIMENTAL',
      stage: 'Validação de Campo com Drones Lidar',
      summary: 'Combinação de índices de reflectância de clorofila com telemetria de umidade de solo em tempo real via LoRaWAN e constelações orbitais.',
      specs: ['Bandas: 400nm - 1000nm', 'Acurácia de detecção: 94.8%', 'Área piloto: Bioma Cerrado/Caatinga']
    },
    {
      id: 'res-3',
      code: 'R&D-IND-03',
      title: 'Digital Twin Físico-Termodinâmico para Previsão de Falhas em Correias de Mineração',
      titleEn: 'Thermodynamic Digital Twin for Mining Overland Conveyor Failure Prediction',
      domain: 'MINING & DIGITAL TWIN',
      status: 'CONCEPT',
      stage: 'Modelagem de Elementos Finitos (FEM)',
      summary: 'Simulação matemática de tensões mecânicas e dissipação térmica em roletes industriais sob vibração extrema e calor ambiente.',
      specs: ['Antecedência preditiva: 72 horas', 'Sensores virtuais estimativos', 'Integração SCADA/Modbus']
    },
    {
      id: 'res-4',
      code: 'R&D-IOT-04',
      title: 'Módulo Microcontrolado de Baixíssimo Consumo para Telemetria em Áreas Remotas Sem Sinal',
      titleEn: 'Ultra-Low-Power Microcontroller Telemetry Node for Zero-Connectivity Zones',
      domain: 'EMBEDDED & EDGE',
      status: 'PROTOTYPE',
      stage: 'Homologação de Firmware e Baterias LiFePO4',
      summary: 'Firmware proprietário em C++ bare-metal com fallback automático entre LoRaWAN, satélite NTN e rede celular NB-IoT para estações meteorológicas.',
      specs: ['Consumo em sleep: 4.2 µA', 'Bateria solar integrada', 'Transmissão criptografada AES-128']
    },
  ];

  return (
    <div className="min-h-screen bg-[#05070B] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-white/[0.08] pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
            <Microscope className="w-3.5 h-3.5" />
            <span>KRAEFEGG M.O. • RESEARCH & EXPERIMENTAL INNOVATION</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white font-heading">
            {lang === 'pt' ? 'Pesquisa Aplicada & Sistemas Experimentais' : 'Applied Research & Experimental Systems'}
          </h1>
          <p className="text-slate-400 max-w-3xl text-sm sm:text-base leading-relaxed">
            {lang === 'pt'
              ? 'Nossa divisão de P&D investiga fronteiras de hardware embarcado, sensoriamento ambiental de alta resolução e algoritmos de controle industrial. Todos os projetos experimentais são estritamente distinguidos de sistemas comerciais em produção.'
              : 'Our R&D division explores frontiers of embedded hardware, high-resolution environmental sensing, and industrial control algorithms. All experimental initiatives are clearly distinguished from commercial production deployments.'}
          </p>
        </div>

        {/* Disclaimer Banner */}
        <div className="p-4 rounded-xl bg-slate-900 border border-amber-500/30 flex items-center justify-between text-xs font-mono text-amber-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>AVISO DE TRANSPARÊNCIA: ITENS LISTADOS NESTA SEÇÃO SÃO PROTÓTIPOS E CONCEITOS EM ESTUDO.</span>
          </div>
          <span className="hidden sm:inline text-slate-400">P&D KRAEFEGG LABS</span>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {researchProjects.map((p) => (
            <div key={p.id} className="p-6 sm:p-8 rounded-2xl bg-[#090E17] border border-white/[0.08] hover:border-cyan-500/40 transition-all space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded border border-cyan-500/30">
                  {p.code}
                </span>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-950/80 border border-amber-500/30 px-2 py-0.5 rounded font-bold">
                  {p.status}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">{p.domain}</span>
                <h3 className="text-lg font-bold text-white font-heading">{lang === 'pt' ? p.title : p.titleEn}</h3>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {p.summary}
              </p>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <span className="text-[10px] font-mono text-cyan-400 uppercase block">Especificações Experimentais:</span>
                <div className="grid grid-cols-1 gap-1.5 text-[11px] font-mono text-slate-300">
                  {p.specs.map((s, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs font-mono text-slate-500">
                <span>Estágio: <strong className="text-slate-300">{p.stage}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
