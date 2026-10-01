import React from 'react';
import { ShieldCheck, Lock, Fingerprint, CheckCircle2 } from 'lucide-react';

interface TrustBadgesProps {
  variant?: 'inline' | 'cards' | 'banner';
  className?: string;
}

export const TrustBadges: React.FC<TrustBadgesProps> = ({
  variant = 'inline',
  className = '',
}) => {
  if (variant === 'inline') {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-3 text-[11px] sm:text-xs text-purple-200/90 font-medium ${className}`}>
        <div className="flex items-center gap-1.5 bg-purple-950/60 border border-emerald-500/30 px-3 py-1.5 rounded-full shadow-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-bold text-white">Compra Segura</span>
        </div>

        <div className="flex items-center gap-1.5 bg-purple-950/60 border border-cyan-500/30 px-3 py-1.5 rounded-full shadow-xs">
          <Lock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="font-bold text-white">Pagamento Criptografado</span>
        </div>

        <div className="flex items-center gap-1.5 bg-purple-950/60 border border-purple-400/30 px-3 py-1.5 rounded-full shadow-xs">
          <Fingerprint className="w-4 h-4 text-purple-300 shrink-0" />
          <span className="font-bold text-white">Privacidade Garantida</span>
        </div>
      </div>
    );
  }

  // Variant 'cards': destaque completo com ícones maiores, perfeito para a seção de planos
  return (
    <div className={`w-full max-w-3xl mx-auto mt-8 sm:mt-10 ${className}`}>
      <div className="bg-[#120324]/90 border border-purple-500/30 rounded-2xl p-4 sm:p-5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-md">
        
        <div className="text-center mb-3.5">
          <span className="text-[10px] sm:text-xs font-black tracking-widest text-[#06B6D4] uppercase bg-cyan-950/80 border border-cyan-500/30 px-3 py-1 rounded-full inline-block">
            TRANSAÇÃO 100% BLINDADA E PROTEGIDA
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          
          {/* Selo 1: Compra Segura */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-purple-950/50 border border-emerald-500/30 hover:border-emerald-400/60 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-black text-white flex items-center gap-1">
                Compra Segura
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 inline" />
              </div>
              <p className="text-[10px] text-purple-200/80 leading-tight mt-0.5">
                Plataforma com verificação de segurança em tempo real.
              </p>
            </div>
          </div>

          {/* Selo 2: Pagamento Criptografado */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-purple-950/50 border border-cyan-500/30 hover:border-cyan-400/60 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-black text-white flex items-center gap-1">
                Pagamento Criptografado
              </div>
              <p className="text-[10px] text-purple-200/80 leading-tight mt-0.5">
                Criptografia SSL de ponta a ponta (256-bit).
              </p>
            </div>
          </div>

          {/* Selo 3: Privacidade Garantida */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-purple-950/50 border border-purple-400/30 hover:border-purple-400/60 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/40 flex items-center justify-center shrink-0">
              <Fingerprint className="w-5 h-5 text-purple-300" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-black text-white flex items-center gap-1">
                Privacidade Garantida
              </div>
              <p className="text-[10px] text-purple-200/80 leading-tight mt-0.5">
                Seus dados não são compartilhados com terceiros.
              </p>
            </div>
          </div>

        </div>

        {/* Rodapé informativo com logos e garantias */}
        <div className="mt-3.5 pt-3 border-t border-purple-500/20 flex flex-wrap items-center justify-between gap-2 text-[10px] text-purple-300/80">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Servidores seguros com certificado TLS/SSL ativo
          </span>
          <span className="text-purple-200 font-bold">
            🛡️ 7 Dias de Garantia Incondicional
          </span>
        </div>

      </div>
    </div>
  );
};
