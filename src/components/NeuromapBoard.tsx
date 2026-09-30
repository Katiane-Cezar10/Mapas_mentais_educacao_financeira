import React from 'react';

export interface NeuromapBoardData {
  id: number;
  code: string;
  title: string;
  subtitle: string;
  tagline: string;
  category: string;
  headerBg?: string;
  isUnlocked: boolean;
}

export const ATTACHED_MAPS_LIST: NeuromapBoardData[] = [
  {
    id: 1,
    code: "MAPA 001",
    title: "FINANÇAS PESSOAIS",
    subtitle: "ORGANIZE, PROTEJA E FAÇA O DINHEIRO CRESCER",
    tagline: "Um guia completo para construir sua liberdade financeira.",
    category: "Visão Geral & Fluxo Completo",
    isUnlocked: true,
  },
  {
    id: 2,
    code: "MAPA 002",
    title: "RESERVA DE EMERGÊNCIA",
    subtitle: "Proteja-se dos imprevistos e mantenha sua tranquilidade financeira.",
    tagline: "Entenda, planeje e construa sua reserva de emergência de forma prática.",
    category: "Proteção & Colchão Financeiro",
    isUnlocked: true,
  },
  {
    id: 3,
    code: "MAPA 003",
    title: "ORÇAMENTO PESSOAL",
    subtitle: "Saiba para onde seu dinheiro vai e tome melhores decisões.",
    tagline: "Organize suas receitas e despesas para ter mais controle e alcançar seus objetivos.",
    category: "Organização & 50/30/20",
    isUnlocked: true,
  },
  {
    id: 4,
    code: "MAPA 004",
    title: "DÍVIDAS",
    subtitle: "Use o crédito com estratégia e recupere sua liberdade financeira.",
    tagline: "Entenda, organize e elimine suas dívidas para viver com mais tranquilidade.",
    category: "Crédito, Bola de Neve & Negociação",
    isUnlocked: true,
  },
  {
    id: 5,
    code: "MAPA 005",
    title: "PATRIMÔNIO",
    subtitle: "Transforme sua renda em liberdade",
    tagline: "Construa e multiplique seu patrimônio com consistência e visão de longo prazo.",
    category: "Multiplicação & Renda Passiva",
    isUnlocked: true,
  },
];

interface NeuromapBoardProps {
  boardId: number;
  className?: string;
  onExpand?: () => void;
  showZoomHint?: boolean;
  customImage?: string | null;
}

export const NeuromapBoard: React.FC<NeuromapBoardProps> = ({
  boardId,
  className = '',
  onExpand,
  showZoomHint = true,
  customImage,
}) => {
  // Se houver foto personalizada definida pelo usuário, exibe diretamente a imagem
  if (customImage) {
    const boardMeta = ATTACHED_MAPS_LIST.find((b) => b.id === boardId);
    return (
      <div 
        className={`relative w-full aspect-[16/10] bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer group flex items-center justify-center border border-purple-100 ${className}`}
        onClick={onExpand}
      >
        <img
          src={customImage}
          alt={boardMeta?.title ? `${boardMeta.code}: ${boardMeta.title}` : `Mapa Mental ${boardId}`}
          className="w-full h-full object-contain select-none group-hover:scale-[1.02] transition-transform duration-300"
          loading="lazy"
        />

        {showZoomHint && (
          <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
            <span className="px-4 py-2 bg-[#0A2540] text-cyan-300 text-xs font-black rounded-xl border border-cyan-400 shadow-xl transform scale-95 group-hover:scale-100 transition-transform flex items-center gap-1.5">
              🔍 Toque para ver em tela cheia
            </span>
          </div>
        )}
      </div>
    );
  }

  const renderBoardContent = () => {
    switch (boardId) {
      // ══════════════════════════════════════════════════════════════════════
      // PRANCHA 1: FINANÇAS PESSOAIS (VISÃO GERAL)
      // ══════════════════════════════════════════════════════════════════════
      case 1:
        return (
          <div className="w-full h-full bg-[#FAF9F5] text-slate-800 p-2.5 sm:p-4 flex flex-col justify-between text-[11px] sm:text-xs select-none">
            {/* Top Navy Header */}
            <div className="bg-[#0A2540] text-white rounded-lg p-2.5 sm:p-3 mb-2 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2">
                <span className="bg-white/20 text-white font-black px-2 py-0.5 rounded text-[10px] tracking-wider uppercase">
                  MAPA MENTAL
                </span>
                <div>
                  <h2 className="text-sm sm:text-lg font-black tracking-wide leading-tight">
                    FINANÇAS PESSOAIS
                  </h2>
                  <p className="text-[10px] sm:text-xs text-cyan-200 font-semibold tracking-wider uppercase">
                    ORGANIZE, PROTEJA E FAÇA O DINHEIRO CRESCER
                  </p>
                </div>
              </div>
              <span className="hidden sm:block text-[11px] text-slate-300 max-w-[200px] text-right font-medium">
                Um guia completo para construir sua liberdade financeira.
              </span>
            </div>

            {/* Grid 6 Pilares */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 flex-1 my-1">
              {/* 1 RENDA */}
              <div className="bg-white rounded-lg p-2 border-l-4 border-blue-600 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 font-black text-blue-900 mb-1 border-b border-blue-100 pb-1">
                    <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center">1</span>
                    <span className="font-extrabold text-[11px]">RENDA</span>
                  </div>
                  <p className="text-[10px] text-blue-800 font-semibold mb-1">Aumente sua capacidade de gerar dinheiro</p>
                  <ul className="text-[9px] sm:text-[10px] text-slate-600 space-y-0.5">
                    <li>• <strong>Salário:</strong> CLT ou PJ</li>
                    <li>• <strong>Renda extra:</strong> freelas, vendas</li>
                    <li>• <strong>Investimentos:</strong> FIIs, dividendos</li>
                  </ul>
                </div>
                <div className="mt-1 bg-blue-50 text-[9px] text-blue-800 p-1 rounded font-bold">
                  ★ Evite depender de apenas uma fonte.
                </div>
              </div>

              {/* 2 ORÇAMENTO */}
              <div className="bg-white rounded-lg p-2 border-l-4 border-amber-600 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 font-black text-amber-900 mb-1 border-b border-amber-100 pb-1">
                    <span className="w-4 h-4 rounded-full bg-amber-600 text-white text-[10px] flex items-center justify-center">2</span>
                    <span className="font-extrabold text-[11px]">ORÇAMENTO</span>
                  </div>
                  <p className="text-[10px] text-amber-800 font-semibold mb-1">Saiba para onde seu dinheiro vai</p>
                  <ul className="text-[9px] sm:text-[10px] text-slate-600 space-y-0.5">
                    <li>• Liste todas as receitas</li>
                    <li>• Separe fixas de variáveis</li>
                    <li>• Defina limites por categoria</li>
                  </ul>
                </div>
                <div className="mt-1 bg-amber-50 text-[9px] text-amber-900 p-1 rounded font-bold">
                  ★ Reduz o estresse e evita desperdícios.
                </div>
              </div>

              {/* 3 RESERVA DE EMERGÊNCIA */}
              <div className="bg-white rounded-lg p-2 border-l-4 border-emerald-600 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 font-black text-emerald-900 mb-1 border-b border-emerald-100 pb-1">
                    <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center">3</span>
                    <span className="font-extrabold text-[11px]">RESERVA</span>
                  </div>
                  <p className="text-[10px] text-emerald-800 font-semibold mb-1">Proteja-se dos imprevistos</p>
                  <ul className="text-[9px] sm:text-[10px] text-slate-600 space-y-0.5">
                    <li>• Guarde de <strong>6 a 12 meses</strong></li>
                    <li>• Alta liquidez e baixo risco</li>
                    <li>• Tesouro Selic ou CDB 100% CDI</li>
                  </ul>
                </div>
                <div className="mt-1 bg-emerald-50 text-[9px] text-emerald-900 p-1 rounded font-bold">
                  ★ Colchão que evita novas dívidas.
                </div>
              </div>

              {/* 4 DÍVIDAS */}
              <div className="bg-white rounded-lg p-2 border-l-4 border-rose-600 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 font-black text-rose-900 mb-1 border-b border-rose-100 pb-1">
                    <span className="w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] flex items-center justify-center">4</span>
                    <span className="font-extrabold text-[11px]">DÍVIDAS</span>
                  </div>
                  <p className="text-[10px] text-rose-800 font-semibold mb-1">Use o crédito com estratégia</p>
                  <ul className="text-[9px] sm:text-[10px] text-slate-600 space-y-0.5">
                    <li>• <strong>Boas:</strong> financ. imóvel</li>
                    <li>• <strong>Ruins:</strong> rotativo e cheque especial</li>
                    <li>• Priorize juros mais altos</li>
                  </ul>
                </div>
                <div className="mt-1 bg-rose-50 text-[9px] text-rose-900 p-1 rounded font-bold">
                  ★ Estanque o cartão de crédito primeiro.
                </div>
              </div>

              {/* 5 INVESTIMENTOS */}
              <div className="bg-white rounded-lg p-2 border-l-4 border-purple-600 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 font-black text-purple-900 mb-1 border-b border-purple-100 pb-1">
                    <span className="w-4 h-4 rounded-full bg-purple-600 text-white text-[10px] flex items-center justify-center">5</span>
                    <span className="font-extrabold text-[11px]">INVESTIMENTOS</span>
                  </div>
                  <p className="text-[10px] text-purple-800 font-semibold mb-1">Faça o dinheiro trabalhar por você</p>
                  <ul className="text-[9px] sm:text-[10px] text-slate-600 space-y-0.5">
                    <li>• Renda fixa: CDB, Tesouro, LCI</li>
                    <li>• FIIs, Ações e ETFs</li>
                    <li>• Pense sempre no longo prazo</li>
                  </ul>
                </div>
                <div className="mt-1 bg-purple-50 text-[9px] text-purple-900 p-1 rounded font-bold">
                  ★ Juros compostos a seu favor.
                </div>
              </div>

              {/* 6 PATRIMÔNIO */}
              <div className="bg-white rounded-lg p-2 border-l-4 border-fuchsia-600 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 font-black text-fuchsia-900 mb-1 border-b border-fuchsia-100 pb-1">
                    <span className="w-4 h-4 rounded-full bg-fuchsia-600 text-white text-[10px] flex items-center justify-center">6</span>
                    <span className="font-extrabold text-[11px]">PATRIMÔNIO</span>
                  </div>
                  <p className="text-[10px] text-fuchsia-800 font-semibold mb-1">Transforme renda em liberdade</p>
                  <ul className="text-[9px] sm:text-[10px] text-slate-600 space-y-0.5">
                    <li>• Bens que geram segurança</li>
                    <li>• Renda passiva no futuro</li>
                    <li>• Consistência e disciplina</li>
                  </ul>
                </div>
                <div className="mt-1 bg-fuchsia-50 text-[9px] text-fuchsia-900 p-1 rounded font-bold">
                  ★ O que permanece e gera riqueza.
                </div>
              </div>
            </div>

            {/* Bottom Step-by-Step Banner */}
            <div className="mt-2 bg-[#E2E8F0] p-1.5 rounded-lg flex flex-wrap items-center justify-between text-[9px] font-bold text-slate-700">
              <span className="uppercase text-slate-900">Passo a passo da vida financeira:</span>
              <span>1. Aumente renda → 2. Orçamento → 3. Reserva → 4. Elimine dívidas → 5. Invista → 6. Patrimônio</span>
            </div>
          </div>
        );

      // ══════════════════════════════════════════════════════════════════════
      // PRANCHA 2: RESERVA DE EMERGÊNCIA (MAPA 002)
      // ══════════════════════════════════════════════════════════════════════
      case 2:
        return (
          <div className="w-full h-full bg-[#FAF9F5] text-slate-800 p-2.5 sm:p-4 flex flex-col justify-between text-[11px] sm:text-xs select-none">
            {/* Header */}
            <div className="bg-[#0A2540] text-white rounded-lg p-2.5 sm:p-3 mb-2 flex items-center justify-between shadow-sm">
              <div>
                <span className="text-[9px] font-black tracking-widest text-cyan-300 uppercase block">NEUROMAP · MAPA 002</span>
                <h2 className="text-sm sm:text-lg font-black tracking-wide leading-tight">
                  RESERVA DE EMERGÊNCIA
                </h2>
                <p className="text-[10px] sm:text-xs text-slate-300">
                  Proteja-se dos imprevistos e mantenha sua tranquilidade financeira.
                </p>
              </div>
              <span className="bg-emerald-500/20 text-emerald-300 font-bold px-2 py-1 rounded text-[10px] border border-emerald-400/40">
                Colchão de Segurança
              </span>
            </div>

            {/* Top Cards: O que é + Tabela Prática */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 my-1 flex-1">
              {/* O que é & Para que serve */}
              <div className="md:col-span-5 bg-white rounded-lg p-2.5 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 font-black text-blue-900 mb-1">
                    <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center">1</span>
                    <span className="font-extrabold text-[11px]">O QUE É & PARA QUE SERVE</span>
                  </div>
                  <p className="text-[10px] text-slate-600 mb-2 leading-relaxed">
                    Valor guardado para cobrir imprevistos sem precisar se endividar ou resgatar investimentos de longo prazo.
                  </p>
                  <ul className="text-[9px] text-slate-700 space-y-1">
                    <li className="flex items-center gap-1"><span className="text-emerald-600 font-bold">✓</span> Cobrir despesas médicas urgentes</li>
                    <li className="flex items-center gap-1"><span className="text-emerald-600 font-bold">✓</span> Queda de renda ou desemprego</li>
                    <li className="flex items-center gap-1"><span className="text-emerald-600 font-bold">✓</span> Manutenção inadiável de casa/carro</li>
                  </ul>
                </div>
                <div className="bg-blue-50 border border-blue-200 text-blue-900 rounded p-1.5 text-[9px] font-semibold mt-2">
                  🔒 Onde investir: <strong>Tesouro Selic</strong> ou <strong>CDB 100% CDI</strong> com liquidez diária.
                </div>
              </div>

              {/* Tabela de Exemplos Reais (Exata da imagem!) */}
              <div className="md:col-span-7 bg-white rounded-lg p-2.5 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5 font-black text-emerald-900">
                    <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center">3</span>
                    <span className="font-extrabold text-[11px]">QUANTO GUARDAR (6 A 12 MESES)</span>
                  </div>
                  <span className="text-[9px] font-bold text-slate-500">Exemplos em Reais</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-[9px] sm:text-[10px] text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 font-bold">
                        <th className="p-1 rounded-l">Custo Mensal</th>
                        <th className="p-1">Reserva (6 meses)</th>
                        <th className="p-1 rounded-r">Reserva (12 meses)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-800">
                      <tr>
                        <td className="p-1 font-semibold">R$ 2.000</td>
                        <td className="p-1 text-emerald-700 font-bold">R$ 12.000</td>
                        <td className="p-1 text-blue-700 font-bold">R$ 24.000</td>
                      </tr>
                      <tr>
                        <td className="p-1 font-semibold">R$ 3.000</td>
                        <td className="p-1 text-emerald-700 font-bold">R$ 18.000</td>
                        <td className="p-1 text-blue-700 font-bold">R$ 36.000</td>
                      </tr>
                      <tr>
                        <td className="p-1 font-semibold">R$ 5.000</td>
                        <td className="p-1 text-emerald-700 font-bold">R$ 30.000</td>
                        <td className="p-1 text-blue-700 font-bold">R$ 60.000</td>
                      </tr>
                      <tr>
                        <td className="p-1 font-semibold">R$ 10.000</td>
                        <td className="p-1 text-emerald-700 font-bold">R$ 60.000</td>
                        <td className="p-1 text-blue-700 font-bold">R$ 120.000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-2 bg-rose-50 border border-rose-200 text-rose-800 rounded p-1 text-[9px] font-bold flex items-center justify-between">
                  <span>⛔ NUNCA use a reserva para: viagens, promoções ou apostas.</span>
                </div>
              </div>
            </div>

            {/* Bottom Rule */}
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-950 p-1.5 rounded-lg text-[9px] font-bold flex items-center justify-between">
              <span>RESUMO: Liquidez diária imediata + risco zero. Seu sono tranquilo vale mais que rendimento arriscado.</span>
            </div>
          </div>
        );

      // ══════════════════════════════════════════════════════════════════════
      // PRANCHA 3: ORÇAMENTO PESSOAL (MAPA 003)
      // ══════════════════════════════════════════════════════════════════════
      case 3:
        return (
          <div className="w-full h-full bg-[#FAF9F5] text-slate-800 p-2.5 sm:p-4 flex flex-col justify-between text-[11px] sm:text-xs select-none">
            {/* Header */}
            <div className="bg-[#0A2540] text-white rounded-lg p-2.5 sm:p-3 mb-2 flex items-center justify-between shadow-sm">
              <div>
                <span className="text-[9px] font-black tracking-widest text-cyan-300 uppercase block">NEUROMAP · MAPA 003</span>
                <h2 className="text-sm sm:text-lg font-black tracking-wide leading-tight">
                  ORÇAMENTO PESSOAL
                </h2>
                <p className="text-[10px] sm:text-xs text-slate-300">
                  Saiba para onde seu dinheiro vai e tome melhores decisões.
                </p>
              </div>
              <span className="bg-amber-500/20 text-amber-300 font-bold px-2 py-1 rounded text-[10px] border border-amber-400/40">
                Regra 50/30/20
              </span>
            </div>

            {/* Content: Métodos Populares & Exemplo Prático de R$ 5.000 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 my-1 flex-1">
              {/* Regra 50/30/20 */}
              <div className="md:col-span-6 bg-white rounded-lg p-2.5 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 font-black text-purple-900 mb-1">
                    <span className="w-4 h-4 rounded-full bg-purple-600 text-white text-[10px] flex items-center justify-center">4</span>
                    <span className="font-extrabold text-[11px]">MÉTODO 50 / 30 / 20</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 my-2 text-center text-[9px] font-bold">
                    <div className="bg-blue-100 text-blue-900 p-1.5 rounded border border-blue-300">
                      <div className="text-xs font-black">50%</div>
                      <div>Necessidades</div>
                      <div className="text-[8px] text-slate-500 font-normal">aluguel, mercado, luz</div>
                    </div>
                    <div className="bg-amber-100 text-amber-900 p-1.5 rounded border border-amber-300">
                      <div className="text-xs font-black">30%</div>
                      <div>Desejos</div>
                      <div className="text-[8px] text-slate-500 font-normal">lazer, delivery, cinema</div>
                    </div>
                    <div className="bg-emerald-100 text-emerald-900 p-1.5 rounded border border-emerald-300">
                      <div className="text-xs font-black">20%</div>
                      <div>Futuro</div>
                      <div className="text-[8px] text-slate-500 font-normal">reserva & dívidas</div>
                    </div>
                  </div>
                </div>
                <div className="text-[9px] text-slate-600 bg-slate-50 p-1.5 rounded border border-slate-200">
                  💡 <strong>Alternativas:</strong> Orçamento Base Zero ou Método dos Envelopes.
                </div>
              </div>

              {/* Exemplo Prático Salário R$ 5.000 */}
              <div className="md:col-span-6 bg-white rounded-lg p-2.5 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 font-black text-blue-900">
                    <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center">5</span>
                    <span className="font-extrabold text-[11px]">EXEMPLO PRÁTICO (SALÁRIO R$ 5.000)</span>
                  </div>
                </div>
                <table className="w-full text-[9px] text-left border-collapse my-1">
                  <tbody>
                    <tr className="border-b border-slate-100">
                      <td className="py-0.5 font-bold text-blue-800">Despesas fixas (40%)</td>
                      <td className="py-0.5 text-right font-black">R$ 2.000</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-0.5 font-bold text-amber-800">Despesas variáveis (25%)</td>
                      <td className="py-0.5 text-right font-black">R$ 1.250</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-0.5 font-bold text-purple-800">Despesas eventuais (5%)</td>
                      <td className="py-0.5 text-right font-black">R$ 250</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-0.5 font-bold text-emerald-800">Investimentos & Metas (20%)</td>
                      <td className="py-0.5 text-right font-black text-emerald-700">R$ 1.000</td>
                    </tr>
                    <tr>
                      <td className="py-0.5 font-bold text-fuchsia-800">Lazer sem culpa (10%)</td>
                      <td className="py-0.5 text-right font-black">R$ 500</td>
                    </tr>
                  </tbody>
                </table>
                <div className="bg-slate-100 p-1 rounded text-[9px] font-bold text-slate-800 text-right">
                  Total Distribuído: R$ 5.000 (100%)
                </div>
              </div>
            </div>

            {/* Bottom Advice */}
            <div className="bg-amber-50 border border-amber-300 text-amber-900 p-1.5 rounded-lg text-[9px] font-bold flex items-center justify-between">
              <span>LEMBRE-SE: Quem controla o dinheiro constrói a vida que deseja. Disciplina hoje, liberdade amanhã.</span>
            </div>
          </div>
        );

      // ══════════════════════════════════════════════════════════════════════
      // PRANCHA 4: DÍVIDAS (MAPA 004)
      // ══════════════════════════════════════════════════════════════════════
      case 4:
        return (
          <div className="w-full h-full bg-[#FAF9F5] text-slate-800 p-2.5 sm:p-4 flex flex-col justify-between text-[11px] sm:text-xs select-none">
            {/* Header */}
            <div className="bg-[#0A2540] text-white rounded-lg p-2.5 sm:p-3 mb-2 flex items-center justify-between shadow-sm">
              <div>
                <span className="text-[9px] font-black tracking-widest text-rose-300 uppercase block">NEUROMAP · MAPA 004</span>
                <h2 className="text-sm sm:text-lg font-black tracking-wide leading-tight">
                  DÍVIDAS
                </h2>
                <p className="text-[10px] sm:text-xs text-slate-300">
                  Use o crédito com estratégia e recupere sua liberdade financeira.
                </p>
              </div>
              <span className="bg-rose-500/20 text-rose-300 font-bold px-2 py-1 rounded text-[10px] border border-rose-400/40">
                Bola de Neve & Avalanche
              </span>
            </div>

            {/* Content: Métodos de Quitação */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 my-1 flex-1">
              {/* Tipos & Estratégias */}
              <div className="md:col-span-6 bg-white rounded-lg p-2.5 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 font-black text-rose-900 mb-1">
                    <span className="w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] flex items-center justify-center">4</span>
                    <span className="font-extrabold text-[11px]">COMO QUITAR DÍVIDAS</span>
                  </div>
                  <div className="space-y-1.5 my-1.5">
                    <div className="p-1.5 bg-blue-50 rounded border border-blue-200">
                      <strong className="text-blue-900 text-[10px]">Método Bola de Neve:</strong>
                      <p className="text-[9px] text-slate-600">Quite a menor dívida primeiro. Traz vitória psicológica rápida e ânimo para continuar.</p>
                    </div>
                    <div className="p-1.5 bg-amber-50 rounded border border-amber-200">
                      <strong className="text-amber-900 text-[10px]">Método Avalanche:</strong>
                      <p className="text-[9px] text-slate-600">Foque na dívida de maior taxa de juros (ex: rotativo de 12% a.m.). Economiza mais dinheiro.</p>
                    </div>
                  </div>
                </div>
                <div className="bg-rose-50 text-rose-900 text-[9px] p-1.5 rounded font-bold border border-rose-200">
                  ⛔ Cuidado: nunca faça nova dívida para cobrir juros de parcelas antigas.
                </div>
              </div>

              {/* Tabela Exemplo Prático Quitação */}
              <div className="md:col-span-6 bg-white rounded-lg p-2.5 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-black text-slate-900">EXEMPLO PRÁTICO (AVALANCHE)</span>
                  <span className="text-[9px] text-rose-600 font-bold">Ordem de Prioridade</span>
                </div>
                <table className="w-full text-[9px] text-left border-collapse my-1">
                  <thead>
                    <tr className="bg-slate-100 font-bold text-slate-700">
                      <th className="p-1">Dívida</th>
                      <th className="p-1">Saldo</th>
                      <th className="p-1">Juros a.m.</th>
                      <th className="p-1">Ordem</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="bg-rose-50/50">
                      <td className="p-1 font-bold">Cartão A</td>
                      <td className="p-1">R$ 3.000</td>
                      <td className="p-1 text-rose-700 font-black">12%</td>
                      <td className="p-1 font-black text-rose-800">1º (Urgente)</td>
                    </tr>
                    <tr>
                      <td className="p-1 font-bold">Empréstimo</td>
                      <td className="p-1">R$ 5.000</td>
                      <td className="p-1">5%</td>
                      <td className="p-1 font-bold">2º</td>
                    </tr>
                    <tr>
                      <td className="p-1 font-bold">Crediário</td>
                      <td className="p-1">R$ 1.500</td>
                      <td className="p-1">3%</td>
                      <td className="p-1 font-bold">3º</td>
                    </tr>
                    <tr>
                      <td className="p-1 font-bold">Cartão B</td>
                      <td className="p-1">R$ 2.000</td>
                      <td className="p-1">2%</td>
                      <td className="p-1 font-bold">4º</td>
                    </tr>
                  </tbody>
                </table>
                <div className="bg-emerald-50 text-emerald-900 text-[9px] p-1 rounded font-bold border border-emerald-200">
                  ✓ Negociação: aproveite feirões como Serasa Limpa Nome com até 90% de desconto.
                </div>
              </div>
            </div>

            {/* Bottom Advice */}
            <div className="bg-slate-100 border border-slate-300 text-slate-800 p-1.5 rounded-lg text-[9px] font-bold flex items-center justify-between">
              <span>RESUMO: Dívida não é falta de caráter, é falta de método. Mapeie, priorize e negocie.</span>
            </div>
          </div>
        );

      // ══════════════════════════════════════════════════════════════════════
      // PRANCHA 5: PATRIMÔNIO (MAPA 005) - FOTO 2 OFICIAL
      // ══════════════════════════════════════════════════════════════════════
      case 5:
      default:
        return (
          <div className="w-full h-full bg-[#FAF9F5] text-slate-800 p-2 sm:p-3.5 flex flex-col justify-between text-[10px] sm:text-xs select-none overflow-hidden">
            {/* Top Navy Header */}
            <div className="bg-[#0A2540] text-white rounded-xl p-2.5 sm:p-3 mb-2 flex items-center justify-between shadow-md">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-black tracking-widest text-cyan-300 uppercase">NEUROMAP</span>
                  <span className="text-[9px] text-slate-400">•</span>
                  <span className="text-[9px] font-bold text-slate-300 uppercase">FINANÇAS PESSOAIS</span>
                </div>
                <h2 className="text-sm sm:text-xl font-black tracking-wider leading-tight text-white mt-0.5">
                  PATRIMÔNIO
                </h2>
                <p className="text-[10px] sm:text-xs text-cyan-200 font-semibold">
                  Transforme sua renda em liberdade
                </p>
              </div>
              <div className="text-right">
                <span className="bg-white/10 text-cyan-200 font-mono font-black px-2 py-0.5 rounded text-[9px] tracking-wider uppercase border border-white/20">
                  MAPA 005
                </span>
                <p className="hidden sm:block text-[9px] text-slate-300 mt-1 max-w-[220px]">
                  Construa e multiplique seu patrimônio com consistência e visão de longo prazo.
                </p>
              </div>
            </div>

            {/* Linha 1: 1 O Que É + 2 Por Que Construir + 3 Como Construir */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 my-1">
              
              {/* 1 O QUE É? */}
              <div className="md:col-span-4 bg-white rounded-xl p-2.5 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 font-black text-blue-900 mb-1">
                    <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">1</span>
                    <span className="font-extrabold text-[11px]">O QUE É?</span>
                  </div>
                  <p className="text-[9px] text-slate-600 mb-2 leading-tight">
                    Seu patrimônio é tudo o que você possui que tem valor e gera benefícios.
                  </p>
                  <div className="grid grid-cols-2 gap-1 text-[9px] text-slate-700 font-medium">
                    <span className="flex items-center gap-1">🏠 Imóveis</span>
                    <span className="flex items-center gap-1">📈 Investimentos</span>
                    <span className="flex items-center gap-1">🏪 Negócios</span>
                    <span className="flex items-center gap-1">💰 Dinheiro aplicado</span>
                    <span className="flex items-center gap-1 col-span-2">🚗 Veículos e outros bens</span>
                  </div>
                </div>
                <div className="mt-2 pt-1 border-t border-slate-100 flex items-center justify-between text-[8px] text-blue-800 font-bold">
                  <span>Ativos que geram renda passiva</span>
                  <span>🪙 🪙 🪙</span>
                </div>
              </div>

              {/* 2 POR QUE CONSTRUIR? */}
              <div className="md:col-span-4 bg-white rounded-xl p-2.5 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 font-black text-amber-900 mb-1">
                    <span className="w-4 h-4 rounded-full bg-amber-600 text-white text-[10px] font-bold flex items-center justify-center">2</span>
                    <span className="font-extrabold text-[11px]">POR QUE CONSTRUIR?</span>
                  </div>
                  <p className="text-[9px] text-slate-600 mb-2 leading-tight">
                    Mais segurança, liberdade e escolhas no futuro.
                  </p>
                  <ul className="text-[9px] text-slate-700 space-y-1">
                    <li className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded-full bg-emerald-100 text-emerald-700 text-[8px] flex items-center justify-center font-bold">🛡️</span>
                      <span><strong>Segurança</strong> financeira</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded-full bg-blue-100 text-blue-700 text-[8px] flex items-center justify-center font-bold">🏖️</span>
                      <span><strong>Liberdade</strong> de escolhas</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded-full bg-rose-100 text-rose-700 text-[8px] flex items-center justify-center font-bold">🎯</span>
                      <span><strong>Renda passiva</strong> no futuro</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded-full bg-purple-100 text-purple-700 text-[8px] flex items-center justify-center font-bold">👥</span>
                      <span><strong>Proteção</strong> para você e sua família</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 3 COMO CONSTRUIR? */}
              <div className="md:col-span-4 bg-white rounded-xl p-2.5 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 font-black text-emerald-900 mb-1">
                    <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">3</span>
                    <span className="font-extrabold text-[11px]">COMO CONSTRUIR?</span>
                  </div>
                  <p className="text-[9px] text-slate-600 mb-1.5 leading-tight">
                    Pilares para fazer seu patrimônio crescer:
                  </p>
                  <ol className="text-[9px] text-slate-700 space-y-1">
                    <li className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded-full bg-amber-100 text-amber-900 font-black text-[8px] flex items-center justify-center">1</span>
                      <span>Controle seus gastos</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded-full bg-emerald-100 text-emerald-900 font-black text-[8px] flex items-center justify-center">2</span>
                      <span>Invista regularmente</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded-full bg-blue-100 text-blue-900 font-black text-[8px] flex items-center justify-center">3</span>
                      <span>Diversifique seus ativos</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded-full bg-purple-100 text-purple-900 font-black text-[8px] flex items-center justify-center">4</span>
                      <span>Pense no longo prazo</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded-full bg-cyan-100 text-cyan-900 font-black text-[8px] flex items-center justify-center">5</span>
                      <span>Reinvista os rendimentos</span>
                    </li>
                  </ol>
                </div>
                <div className="mt-1 text-right text-[8px] font-bold text-emerald-700">
                  Crescimento exponencial ↗
                </div>
              </div>

            </div>

            {/* Linha 2: 4 Principais Tipos de Ativos + 5 Estratégia Simples */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 my-1">
              
              {/* 4 PRINCIPAIS TIPOS DE ATIVOS */}
              <div className="md:col-span-6 bg-white rounded-xl p-2.5 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-1.5 font-black text-rose-900 mb-1">
                  <span className="w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center">4</span>
                  <span className="font-extrabold text-[11px]">PRINCIPAIS TIPOS DE ATIVOS</span>
                </div>
                <p className="text-[9px] text-slate-600 mb-2">
                  Combine diferentes ativos para mais segurança e crescimento.
                </p>
                <div className="grid grid-cols-4 gap-1.5 text-center text-[9px] font-bold">
                  <div className="p-1.5 rounded-lg bg-purple-50 border border-purple-200">
                    <div className="text-base mb-0.5">🏠</div>
                    <div className="text-purple-950 font-black">Imóveis</div>
                  </div>
                  <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
                    <div className="text-base mb-0.5">📄</div>
                    <div className="text-emerald-950 font-black">Renda fixa</div>
                  </div>
                  <div className="p-1.5 rounded-lg bg-blue-50 border border-blue-200">
                    <div className="text-base mb-0.5">📊</div>
                    <div className="text-blue-950 font-black">Renda variável</div>
                  </div>
                  <div className="p-1.5 rounded-lg bg-amber-50 border border-amber-200">
                    <div className="text-base mb-0.5">🏪</div>
                    <div className="text-amber-950 font-black">Negócios</div>
                  </div>
                </div>
              </div>

              {/* 5 ESTRATÉGIA SIMPLES */}
              <div className="md:col-span-6 bg-white rounded-xl p-2.5 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 font-black text-purple-900 mb-1">
                    <span className="w-4 h-4 rounded-full bg-purple-600 text-white text-[10px] font-bold flex items-center justify-center">5</span>
                    <span className="font-extrabold text-[11px]">ESTRATÉGIA SIMPLES</span>
                  </div>
                  <p className="text-[9px] text-slate-600 mb-2">
                    Construa de forma consistente passo a passo:
                  </p>
                  <div className="flex items-center justify-between text-[9px] font-bold text-center gap-1">
                    <div className="p-1 rounded bg-slate-50 border border-slate-200 flex-1">
                      <div className="text-xs">💡</div>
                      <span>Defina objetivos</span>
                    </div>
                    <span className="text-slate-400 font-bold">→</span>
                    <div className="p-1 rounded bg-slate-50 border border-slate-200 flex-1">
                      <div className="text-xs">📋</div>
                      <span>Escolha ativos</span>
                    </div>
                    <span className="text-slate-400 font-bold">→</span>
                    <div className="p-1 rounded bg-slate-50 border border-slate-200 flex-1">
                      <div className="text-xs">📅</div>
                      <span>Aporte regular</span>
                    </div>
                    <span className="text-slate-400 font-bold">→</span>
                    <div className="p-1 rounded bg-slate-50 border border-slate-200 flex-1">
                      <div className="text-xs">🎯</div>
                      <span>Ajuste anual</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Linha 3: 6 Pirâmide do Patrimônio + 7 Resultado + 8 Lembre-se */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 my-1">
              
              {/* 6 PIRÂMIDE DO PATRIMÔNIO */}
              <div className="md:col-span-5 bg-white rounded-xl p-2.5 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-1.5 font-black text-emerald-900 mb-1">
                  <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">6</span>
                  <span className="font-extrabold text-[11px]">PIRÂMIDE DO PATRIMÔNIO</span>
                </div>
                <p className="text-[8px] text-slate-500 mb-1.5">
                  Construa em etapas, do essencial ao crescimento:
                </p>
                
                {/* 4 Níveis da Pirâmide */}
                <div className="space-y-1 text-[9px]">
                  <div className="bg-rose-500 text-white p-1 rounded font-black text-center shadow-xs">
                    🔴 Liberdade: Renda passiva e independência
                  </div>
                  <div className="bg-amber-500 text-white p-1 rounded font-bold text-center shadow-xs">
                    🟠 Crescimento: Investimentos e novos ativos
                  </div>
                  <div className="bg-emerald-600 text-white p-1 rounded font-bold text-center shadow-xs">
                    🟢 Proteção: Reserva e dívidas sob controle
                  </div>
                  <div className="bg-blue-600 text-white p-1 rounded font-bold text-center shadow-xs">
                    🔵 Base: Organização financeira e orçamento
                  </div>
                </div>
              </div>

              {/* 7 RESULTADO */}
              <div className="md:col-span-3 bg-white rounded-xl p-2.5 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 font-black text-amber-900 mb-1">
                    <span className="w-4 h-4 rounded-full bg-amber-600 text-white text-[10px] font-bold flex items-center justify-center">7</span>
                    <span className="font-extrabold text-[11px]">RESULTADO</span>
                  </div>
                  <p className="text-[8px] text-slate-500 mb-1.5">Um futuro com mais possibilidades:</p>
                  <ul className="text-[9px] text-slate-700 space-y-1 font-semibold">
                    <li className="flex items-center gap-1">📊 Mais patrimônio</li>
                    <li className="flex items-center gap-1">🛡️ Mais tranquilidade</li>
                    <li className="flex items-center gap-1">👑 Mais liberdade</li>
                    <li className="flex items-center gap-1">⭐ Mais qualidade de vida</li>
                  </ul>
                </div>
              </div>

              {/* 8 LEMBRE-SE */}
              <div className="md:col-span-4 bg-white rounded-xl p-2.5 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 font-black text-rose-900 mb-1">
                    <span className="w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center">8</span>
                    <span className="font-extrabold text-[11px]">LEMBRE-SE</span>
                  </div>
                  <p className="text-[8px] text-slate-500 mb-1.5 leading-tight">
                    Patrimônio se constrói com tempo, disciplina e consistência:
                  </p>
                  <div className="bg-amber-50/80 p-1.5 rounded-lg border border-amber-200 text-[9px] space-y-0.5 font-bold text-amber-950">
                    <div className="flex items-center gap-1">☑ Comece hoje</div>
                    <div className="flex items-center gap-1">☑ Seja constante</div>
                    <div className="flex items-center gap-1">☑ Pense no longo prazo</div>
                    <div className="flex items-center gap-1">☑ Deixe o tempo trabalhar para você</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Resumo Bar */}
            <div className="mt-1.5 bg-[#0A2540] text-white p-2 rounded-xl flex flex-wrap items-center justify-between text-[9px] font-bold shadow-md">
              <div className="flex items-center gap-2">
                <span className="bg-white/20 px-1.5 py-0.5 rounded text-[8px] uppercase tracking-wider font-black">RESUMO</span>
                <span className="text-cyan-200">Patrimônio é o resultado de boas escolhas hoje para mais liberdade no amanhã.</span>
              </div>
              <div className="flex items-center gap-3 text-[8px] text-slate-300">
                <span>🛡️ CONTROLE SUAS FINANÇAS</span>
                <span>🌱 INVISTA REGULARMENTE</span>
                <span>📊 DIVERSIFIQUE</span>
                <span>⏱️ VISÃO LONGO PRAZO</span>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div 
      className={`relative w-full aspect-[16/10] bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer group border border-purple-100/60 ${className}`}
      onClick={onExpand}
    >
      {renderBoardContent()}

      {/* Hover Zoom Overlay */}
      {showZoomHint && (
        <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
          <span className="px-4 py-2 bg-[#0A2540] text-cyan-300 text-xs font-black rounded-xl border border-cyan-400 shadow-xl transform scale-95 group-hover:scale-100 transition-transform flex items-center gap-1.5">
            🔍 Toque para ver em tela cheia
          </span>
        </div>
      )}
    </div>
  );
};
