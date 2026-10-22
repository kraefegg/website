import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles, Terminal, ShieldCheck, ChevronRight, CornerDownLeft } from 'lucide-react';
import { Language } from '../../types';

interface KraefeggAIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

interface Message {
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

export const KraefeggAIAssistant: React.FC<KraefeggAIAssistantProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text:
        lang === 'pt'
          ? 'Olá. Sou a inteligência institucional da KRAEFEGG M.O. Como posso orientar seu projeto em Engenharia Multidisciplinar, Soluções Tecnológicas PentaHydra ou Inteligência Ambiental Oxygen Ecosystem?'
          : 'Hello. I am the institutional intelligence of KRAEFEGG M.O. How may I guide your project across Multidisciplinary Engineering, PentaHydra Technologies, or Oxygen Ecosystem Environmental Intelligence?',
      time: '00:00:01',
    },
  ]);
  const [input, setInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const quickPrompts = lang === 'pt' ? [
    'Quais as capacidades da PentaHydra em Edge AI?',
    'Como a Oxygen Ecosystem atua na restauração PRAD?',
    'Quais normas MARPOL a Kraefegg monitora em portos?',
    'Como solicitar uma proposta de engenharia geotécnica?',
  ] : [
    'What are PentaHydra’s Edge AI capabilities?',
    'How does Oxygen Ecosystem handle PRAD restoration?',
    'Which MARPOL standards does Kraefegg monitor in ports?',
    'How to request a proposal for geotechnical engineering?',
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Contextual expert response logic
    setTimeout(() => {
      let reply = '';
      const q = query.toLowerCase();

      if (q.includes('pentahydra') || q.includes('edge') || q.includes('ia') || q.includes('ai') || q.includes('iot')) {
        reply = lang === 'pt'
          ? 'A PENTAHYDRA SYSTEMS é o braço tecnológico de ponta da Kraefegg M.O. Atuamos em Sistemas Embarcados de alta resiliência, Edge AI com latência inferior a 4.2ms (para visão computacional em portos e plataformas offshore), IoT industrial e Cibersegurança OT com proteção Zero-Trust para redes SCADA.'
          : 'PENTAHYDRA SYSTEMS is Kraefegg M.O.’s cutting-edge technology division. We specialize in mission-critical Embedded Systems, Edge AI inference with sub-4.2ms latency (for computer vision in ports and offshore rigs), Industrial IoT, and Zero-Trust OT Cybersecurity for SCADA networks.';
      } else if (q.includes('oxygen') || q.includes('ambiente') || q.includes('prad') || q.includes('carbono') || q.includes('esg')) {
        reply = lang === 'pt'
          ? 'A OXYGEN ECOSYSTEM integra sensoriamento remoto orbital (satélites multiespectrais e SAR), LiDAR por drone e bioacústica computacional para inventários de carbono e recuperação de áreas degradadas (PRAD). Geramos dados auditáveis para obtenção de Green Bonds e compliance integral com órgãos como IBAMA e CONAMA.'
          : 'OXYGEN ECOSYSTEM unites orbital remote sensing (multispectral & SAR satellites), drone LiDAR, and computational bioacoustics for carbon inventories and degraded area rehabilitation (PRAD). We produce verified audit trails for Green Bond financing and comprehensive regulatory compliance.';
      } else if (q.includes('marpol') || q.includes('porto') || q.includes('marítim') || q.includes('navio')) {
        reply = lang === 'pt'
          ? 'Nosso sistema para Portos Inteligentes monitora continuamente os anexos da Convenção MARPOL: Anexo I (hidrocarbonetos/óleos de porão), Anexo IV (esgoto) e Anexo VI (emissões atmosféricas de SOx/NOx nos berços de atracação), integrando boias oceanográficas com telemetria AIS e câmeras termais com Edge AI.'
          : 'Our Smart Port system continuously tracks MARPOL convention protocols: Annex I (hydrocarbons/bilge oil), Annex IV (sewage), and Annex VI (atmospheric SOx/NOx berth emissions), correlating oceanographic sensor buoys with real-time AIS transponders and thermal Edge AI vision.';
      } else if (q.includes('proposta') || q.includes('contato') || q.includes('contratar') || q.includes('reunião')) {
        reply = lang === 'pt'
          ? 'Para solicitar uma proposta técnica detalhada ou agendar uma reunião com nosso corpo de diretores de engenharia, você pode utilizar a aba "Contato" ou enviar uma mensagem formal através do formulário institucional nesta plataforma.'
          : 'To request an institutional engineering proposal or schedule a briefing with our technical directors, you can navigate to the "Contact" tab or submit a formal inquiry via our institutional form on this platform.';
      } else {
        reply = lang === 'pt'
          ? 'A KRAEFEGG M.O. é estruturada em três eixos simbióticos: Kraefegg M.O. (Engenharia física multidisciplinar e consultoria), PentaHydra Systems (Engenharia de IA, Sistemas Embarcados e IoT) e Oxygen Ecosystem (Inteligência Ecológica e ESG). Como podemos estruturar uma solução para o seu setor?'
          : 'KRAEFEGG M.O. is structured across three symbiotic pillars: Kraefegg M.O. (Multidisciplinary physical engineering and consulting), PentaHydra Systems (AI Engineering, Embedded Systems, and IoT), and Oxygen Ecosystem (Ecological Intelligence and ESG). How may we formulate a solution for your sector?';
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: reply,
          time: new Date().toLocaleTimeString(),
        },
      ]);
      setIsTyping(false);
    }, 700);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#060A12] border border-cyan-500/30 shadow-[0_0_50px_-10px_rgba(6,182,212,0.3)] flex flex-col h-[640px] max-h-[90vh] overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-400">
              <Bot className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold tracking-wider text-slate-100 flex items-center gap-2">
                <span>KRAEFEGG INTELLIGENCE ENGINE</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                  SYSTEM READY
                </span>
              </div>
              <div className="text-[10px] font-mono text-slate-400">
                PENTAHYDRA × OXYGEN KNOWLEDGE MATRIX
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 font-sans text-sm">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                  <Terminal className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-xl p-3.5 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-cyan-600 text-slate-950 font-medium'
                    : 'bg-slate-900/90 border border-slate-800 text-slate-200 shadow-md'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>
                <div
                  className={`text-[9px] font-mono mt-1 text-right ${
                    msg.sender === 'user' ? 'text-slate-900/70' : 'text-slate-500'
                  }`}
                >
                  {msg.time}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
                <Terminal className="w-3.5 h-3.5" />
              </div>
              <div className="rounded-xl p-3 bg-slate-900 border border-slate-800 text-slate-400 text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>Processando base de conhecimento técnico...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggested Queries */}
        <div className="px-5 py-2 bg-slate-950/60 border-t border-slate-800/60 flex items-center gap-2 overflow-x-auto text-[11px] font-mono scrollbar-none">
          <span className="text-slate-500 shrink-0">Tópicos:</span>
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="shrink-0 px-2.5 py-1 rounded bg-slate-900 hover:bg-cyan-950 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 transition-colors cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-slate-950 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                lang === 'pt'
                  ? 'Consulte sobre engenharia, IA embarcada ou meio ambiente...'
                  : 'Inquire about engineering, embedded AI, or environmental systems...'
              }
              className="flex-1 bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:hover:bg-cyan-500 text-slate-950 font-bold transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
