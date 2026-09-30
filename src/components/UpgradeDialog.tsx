import React from 'react';

interface UpgradeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  onContinueBasic: () => void;
}

export const UpgradeDialog: React.FC<UpgradeDialogProps> = ({
  isOpen,
  onClose,
  onUpgrade,
  onContinueBasic,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071a33]/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl border-3 border-[#071a33] shadow-2xl p-6 sm:p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 font-bold text-xl p-1"
          aria-label="Fechar diálogo"
        >
          ×
        </button>

        <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black uppercase tracking-wider mb-3">
          ⚡ ANTES DE CONTINUAR
        </span>

        <h3 className="text-2xl sm:text-3xl font-black text-[#071a33] tracking-tight leading-tight mb-3">
          Por mais R$ 4,00, leve o pacote completo
        </h3>

        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          Você já escolheu os <strong>30 mapas mentais</strong>. No Completo, você também recebe os <strong>5 bônus de prática e revisão</strong> — incluindo o <em>Guia de ChatGPT para Finanças</em> e o <em>Quadro de Metas 2027</em>, em um único pagamento.
        </p>

        {/* Upgrade value comparison */}
        <div className="flex items-center justify-center gap-4 p-4 rounded-2xl bg-[#fffdf4] border-2 border-dashed border-[#ffc94d] mb-6">
          <div>
            <span className="text-xs text-slate-500 block">Essencial</span>
            <strong className="text-base text-slate-700">R$ 15,90</strong>
          </div>
          <span className="text-xl text-[#ff6b4a] font-bold">→</span>
          <div>
            <span className="text-xs font-bold text-emerald-700 block">Pacote Completo</span>
            <strong className="text-xl text-[#e2502f] font-black">R$ 19,90</strong>
          </div>
        </div>

        {/* Primary Hot CTA */}
        <button
          onClick={onUpgrade}
          type="button"
          className="w-full py-4 px-6 btn-hot text-base sm:text-lg uppercase tracking-wide mb-3 block"
        >
          QUERO O COMPLETO COM OS 5 BÔNUS →
        </button>

        {/* Fallback to basic */}
        <button
          onClick={onContinueBasic}
          type="button"
          className="text-xs text-slate-500 hover:text-slate-800 underline font-medium py-1"
        >
          Não, prefiro continuar apenas com o Essencial por R$ 15,90
        </button>
      </div>
    </div>
  );
};
