import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, ShieldAlert } from 'lucide-react';

interface ErrorBoundaryProps {
  children?: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('[ErrorBoundary caught error]:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  handleReload = (): void => {
    window.location.hash = '';
    window.location.reload();
  };

  handleGoHome = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    window.location.hash = '';
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const errorMessage = this.state.error?.message || 'Unknown runtime anomaly detected.';

      return (
        <div className="min-h-screen bg-[#05070B] text-slate-100 flex items-center justify-center p-4 sm:p-6 select-text">
          <div className="max-w-xl w-full rounded-2xl border border-rose-900/60 bg-slate-950/90 p-6 sm:p-8 shadow-[0_0_50px_rgba(244,63,94,0.15)] relative overflow-hidden">
            {/* Ambient accent top bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-amber-500 to-cyan-500" />

            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-rose-400 uppercase tracking-wider">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>KRAEFEGG M.O. // RUNTIME EXCEPTION GUARD</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-heading font-black text-white">
                  Instabilidade Temporária Contida
                </h2>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              O sistema de proteção de runtime da KRAEFEGG capturou uma exceção não tratada nesta visualização. Os dados e a navegação permanecem íntegros.
            </p>

            {/* Diagnostic Box */}
            <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-3.5 mb-6 font-mono text-xs text-rose-300/90 overflow-x-auto">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Diagnóstico do Erro:</div>
              <p className="break-words font-semibold">{errorMessage}</p>
            </div>

            {/* Recovery Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={this.handleReset}
                className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] cursor-pointer flex items-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Restaurar Visualização</span>
              </button>

              <button
                type="button"
                onClick={this.handleGoHome}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-mono text-xs tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Página Inicial</span>
              </button>

              <button
                type="button"
                onClick={this.handleReload}
                className="px-4 py-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 font-mono text-xs tracking-wider uppercase transition-all cursor-pointer"
              >
                Recarregar Aplicação
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
