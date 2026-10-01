import React from 'react';
import {
  ShieldCheck,
  Coins,
  AlertTriangle,
  Building,
  Car,
  Wrench,
  HeartPulse,
  Calendar,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Landmark,
  PiggyBank,
  Compass,
  FileCheck2,
  Flag,
} from 'lucide-react';

export const Mapa002ReservaEmergencia: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#FAF9F5] text-slate-800 p-2 sm:p-3.5 flex flex-col justify-between text-[11px] sm:text-xs select-none font-sans overflow-hidden">
      
      {/* ═════════════════════════════════════════════════════════════════════
          TOPO: CABEÇALHO OFICIAL NEUROMAP
      ══════════════════════════════════════════════════════════════════════ */}
      <header className="bg-[#071E3D] text-white rounded-xl p-2.5 sm:p-3 mb-2 flex flex-wrap items-center justify-between shadow-md border-b-2 border-cyan-400">
        <div className="flex items-center gap-3">
          <div className="bg-[#00B4D8] text-[#071E3D] font-black px-2.5 py-1 rounded text-[10px] sm:text-xs tracking-wider uppercase shadow">
            NEUROMAP
          </div>
          <div>
            <h1 className="text-base sm:text-xl font-black tracking-wide leading-tight text-white flex items-center gap-2">
              RESERVA DE EMERGÊNCIA
            </h1>
            <p className="text-[10px] sm:text-xs text-cyan-200 font-medium">
              Proteja-se dos imprevistos e mantenha sua tranquilidade financeira.
            </p>
          </div>
        </div>

        <div className="hidden md:flex flex-col items-end text-right">
          <span className="text-[10px] font-black text-white uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded">
            MAPA 002 • FINANÇAS PESSOAIS
          </span>
          <span className="text-[9px] text-cyan-100 font-medium mt-0.5">
            Entenda, planeje e construa sua reserva de emergência de forma prática.
          </span>
        </div>
      </header>

      {/* ═════════════════════════════════════════════════════════════════════
          GRID PRINCIPAL: 8 BLOCOS ESTRUTURAIS
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2 flex-1 my-0.5">

        {/* ─────────────────────────────────────────────────────────────
            BLOCO 1: O QUE É (Col 1 a 4)
        ────────────────────────────────────────────────────────────── */}
        <div className="md:col-span-4 bg-white rounded-xl p-2.5 border-l-4 border-blue-600 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5 border-b border-blue-50 pb-1">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-black flex items-center justify-center shadow-sm">
                1
              </span>
              <div>
                <h3 className="font-black text-blue-900 text-xs sm:text-sm uppercase tracking-wide">
                  O QUE É
                </h3>
                <p className="text-[9px] font-bold text-blue-600">Seu colchão de segurança financeira</p>
              </div>
            </div>

            <p className="text-[9px] sm:text-[10px] text-slate-700 leading-snug mb-2">
              A reserva de emergência é um valor guardado para cobrir imprevistos, sem precisar se endividar ou vender investimentos de longo prazo.
            </p>

            <div className="bg-blue-50/70 border border-blue-100 rounded-lg p-2 mb-2">
              <span className="text-[9px] font-black text-blue-900 uppercase block mb-1">
                PARA QUE SERVE?
              </span>
              <ul className="text-[9px] text-slate-700 space-y-1 font-medium">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span>Cobrir gastos inesperados</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span>Evitar dívidas e juros altos</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span>Manter sua estabilidade financeira</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span>Dar tranquilidade para tomar decisões com mais calma</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-lg p-2 text-[9px] flex items-center gap-2 shadow-sm">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="leading-tight font-medium">
              É um dinheiro que fica disponível e seguro, mas rendendo, para quando você realmente precisar.
            </span>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            BLOCO 2: POR QUE É IMPORTANTE (Col 5 a 8)
        ────────────────────────────────────────────────────────────── */}
        <div className="md:col-span-4 bg-white rounded-xl p-2.5 border-l-4 border-orange-500 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5 border-b border-orange-50 pb-1">
              <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-[11px] font-black flex items-center justify-center shadow-sm">
                2
              </span>
              <div>
                <h3 className="font-black text-orange-950 text-xs sm:text-sm uppercase tracking-wide">
                  POR QUE É IMPORTANTE
                </h3>
                <p className="text-[9px] font-bold text-orange-600">Imprevistos acontecem</p>
              </div>
            </div>

            <div className="space-y-1.5 mt-1">
              <div className="flex items-start gap-2 p-1 rounded bg-rose-50/60 border border-rose-100">
                <HeartPulse className="w-3.5 h-3.5 text-rose-600 mt-0.5 shrink-0" />
                <div className="text-[9px] leading-tight">
                  <strong className="text-rose-950">Saúde:</strong> Consultas, exames, internações ou medicamentos inesperados.
                </div>
              </div>

              <div className="flex items-start gap-2 p-1 rounded bg-emerald-50/60 border border-emerald-100">
                <Wrench className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                <div className="text-[9px] leading-tight">
                  <strong className="text-emerald-950">Trabalho:</strong> Perda de emprego ou redução de renda.
                </div>
              </div>

              <div className="flex items-start gap-2 p-1 rounded bg-blue-50/60 border border-blue-100">
                <Car className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />
                <div className="text-[9px] leading-tight">
                  <strong className="text-blue-950">Carro:</strong> Manutenção inesperada ou acidente.
                </div>
              </div>

              <div className="flex items-start gap-2 p-1 rounded bg-purple-50/60 border border-purple-100">
                <Building className="w-3.5 h-3.5 text-purple-600 mt-0.5 shrink-0" />
                <div className="text-[9px] leading-tight">
                  <strong className="text-purple-950">Casa:</strong> Reformas urgentes, problemas elétricos ou hidráulicos.
                </div>
              </div>

              <div className="flex items-start gap-2 p-1 rounded bg-amber-50/60 border border-amber-100">
                <Calendar className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                <div className="text-[9px] leading-tight">
                  <strong className="text-amber-950">Outros:</strong> Impostos, viagem de emergência ou apoio a familiares.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2 bg-orange-50 text-orange-950 p-1.5 rounded-lg border border-orange-200 text-[9px] font-bold text-center">
            ⚡ Sem a reserva, o imprevisto vira dívida com juros abusivos.
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            BLOCO 3: QUANTO GUARDAR (Col 9 a 12)
        ────────────────────────────────────────────────────────────── */}
        <div className="md:col-span-4 bg-white rounded-xl p-2.5 border-l-4 border-emerald-600 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5 border-b border-emerald-50 pb-1">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] font-black flex items-center justify-center shadow-sm">
                  3
                </span>
                <div>
                  <h3 className="font-black text-emerald-950 text-xs sm:text-sm uppercase tracking-wide">
                    QUANTO GUARDAR
                  </h3>
                  <p className="text-[9px] font-bold text-emerald-600">6 a 12 meses dos seus gastos</p>
                </div>
              </div>
              <span className="bg-emerald-100 text-emerald-900 font-extrabold text-[9px] px-2 py-0.5 rounded-full">
                6 a 12 meses
              </span>
            </div>

            <p className="text-[9px] text-slate-600 mb-2 leading-tight">
              O valor da reserva deve cobrir de <strong>6 a 12 meses</strong> do seu custo de vida mensal (gastos essenciais).
            </p>

            {/* TABELA DE GASTOS EXATA DA FOTO */}
            <div className="border border-slate-200 rounded-lg overflow-hidden shadow-2xs">
              <table className="w-full text-[9px] text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 font-extrabold border-b border-slate-200">
                    <th className="p-1.5">Gasto Mensal</th>
                    <th className="p-1.5">Reserva (6 meses)</th>
                    <th className="p-1.5">Reserva (12 meses)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="p-1.5 font-bold text-slate-800">R$ 2.000</td>
                    <td className="p-1.5 font-black text-emerald-700">R$ 12.000</td>
                    <td className="p-1.5 font-black text-blue-700">R$ 24.000</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-1.5 font-bold text-slate-800">R$ 3.000</td>
                    <td className="p-1.5 font-black text-emerald-700">R$ 18.000</td>
                    <td className="p-1.5 font-black text-blue-700">R$ 36.000</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-1.5 font-bold text-slate-800">R$ 5.000</td>
                    <td className="p-1.5 font-black text-emerald-700">R$ 30.000</td>
                    <td className="p-1.5 font-black text-blue-700">R$ 60.000</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-1.5 font-bold text-slate-800">R$ 10.000</td>
                    <td className="p-1.5 font-black text-emerald-700">R$ 60.000</td>
                    <td className="p-1.5 font-black text-blue-700">R$ 120.000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-2 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded p-1.5 text-[9px] font-bold flex items-center justify-between">
            <span>🛡️ CLT estável: 6 meses</span>
            <span>💼 Autônomo / PJ: 12 meses</span>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            BLOCO 4: ONDE INVESTIR (Col 1 a 4)
        ────────────────────────────────────────────────────────────── */}
        <div className="md:col-span-4 bg-white rounded-xl p-2.5 border-l-4 border-purple-600 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5 border-b border-purple-50 pb-1">
              <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-[11px] font-black flex items-center justify-center shadow-sm">
                4
              </span>
              <div>
                <h3 className="font-black text-purple-950 text-xs sm:text-sm uppercase tracking-wide">
                  ONDE INVESTIR
                </h3>
                <p className="text-[9px] font-bold text-purple-600">Segurança, liquidez e baixo risco</p>
              </div>
            </div>

            <p className="text-[9px] text-slate-700 mb-2 leading-tight">
              A reserva de emergência deve estar em investimentos de alta liquidez e baixo risco, para resgatar rapidamente.
            </p>

            <div className="space-y-1.5">
              <div className="bg-purple-50/70 border border-purple-100 rounded-lg p-2">
                <span className="text-[9px] font-black text-purple-950 uppercase block mb-1">
                  MELHORES OPÇÕES:
                </span>
                <ul className="text-[9px] text-slate-700 space-y-1">
                  <li>
                    <strong className="text-purple-900">1. Tesouro Selic:</strong> Seguro, líquido e rende próximo ao CDI.
                  </li>
                  <li>
                    <strong className="text-purple-900">2. CDB de liquidez diária:</strong> Rende bem e tem proteção do FGC (até R$ 250 mil).
                  </li>
                  <li>
                    <strong className="text-purple-900">3. Conta remunerada:</strong> Boa opção para valores menores e giro rápido.
                  </li>
                </ul>
              </div>

              <div className="bg-rose-50 border border-rose-200 rounded-lg p-2">
                <span className="text-[9px] font-black text-rose-900 uppercase block mb-1">
                  EVITE NESTA FASE:
                </span>
                <div className="grid grid-cols-2 gap-1 text-[8.5px] font-bold text-rose-800">
                  <span className="flex items-center gap-1"><XCircle className="w-3 h-3 text-rose-600 shrink-0" /> Ações</span>
                  <span className="flex items-center gap-1"><XCircle className="w-3 h-3 text-rose-600 shrink-0" /> FIIs</span>
                  <span className="flex items-center gap-1"><XCircle className="w-3 h-3 text-rose-600 shrink-0" /> Criptomoedas</span>
                  <span className="flex items-center gap-1"><XCircle className="w-3 h-3 text-rose-600 shrink-0" /> Baixa liquidez</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2 bg-purple-950 text-purple-100 p-1.5 rounded text-[9px] font-bold text-center">
            Priorize sempre a segurança e o resgate imediato!
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            BLOCO 5: COMO MONTAR (Passo a passo com caminho 1-2-3-4-5) (Col 5 a 8)
        ────────────────────────────────────────────────────────────── */}
        <div className="md:col-span-4 bg-white rounded-xl p-2.5 border-l-4 border-cyan-600 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5 border-b border-cyan-50 pb-1">
              <span className="w-5 h-5 rounded-full bg-cyan-600 text-white text-[11px] font-black flex items-center justify-center shadow-sm">
                5
              </span>
              <div>
                <h3 className="font-black text-cyan-950 text-xs sm:text-sm uppercase tracking-wide">
                  COMO MONTAR
                </h3>
                <p className="text-[9px] font-bold text-cyan-600">Passo a passo simples e prático</p>
              </div>
            </div>

            {/* TRILHA NUMERADA ESTILO CAMINHO DA FOTO */}
            <div className="space-y-1.5 mt-1 relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-cyan-200">
              
              <div className="relative">
                <span className="absolute -left-6 top-0 w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] font-black flex items-center justify-center ring-2 ring-white">
                  1
                </span>
                <div className="text-[9px] leading-tight">
                  <strong className="text-blue-900 block">Calcule seus gastos mensais</strong>
                  <span className="text-slate-600">Liste moradia, alimentação, contas, saúde e transporte.</span>
                </div>
              </div>

              <div className="relative">
                <span className="absolute -left-6 top-0 w-4 h-4 rounded-full bg-orange-500 text-white text-[9px] font-black flex items-center justify-center ring-2 ring-white">
                  2
                </span>
                <div className="text-[9px] leading-tight">
                  <strong className="text-orange-950 block">Defina o valor da sua reserva</strong>
                  <span className="text-slate-600">Multiplique seu gasto essencial por 6 a 12 meses.</span>
                </div>
              </div>

              <div className="relative">
                <span className="absolute -left-6 top-0 w-4 h-4 rounded-full bg-emerald-600 text-white text-[9px] font-black flex items-center justify-center ring-2 ring-white">
                  3
                </span>
                <div className="text-[9px] leading-tight">
                  <strong className="text-emerald-950 block">Estabeleça um plano de aporte</strong>
                  <span className="text-slate-600">Defina um valor fixo mensal para guardar com disciplina.</span>
                </div>
              </div>

              <div className="relative">
                <span className="absolute -left-6 top-0 w-4 h-4 rounded-full bg-purple-600 text-white text-[9px] font-black flex items-center justify-center ring-2 ring-white">
                  4
                </span>
                <div className="text-[9px] leading-tight">
                  <strong className="text-purple-950 block">Escolha o investimento adequado</strong>
                  <span className="text-slate-600">Priorize segurança, liquidez diária e rendimento 100% CDI.</span>
                </div>
              </div>

              <div className="relative">
                <span className="absolute -left-6 top-0 w-4 h-4 rounded-full bg-pink-600 text-white text-[9px] font-black flex items-center justify-center ring-2 ring-white">
                  5
                </span>
                <div className="text-[9px] leading-tight">
                  <strong className="text-pink-950 block">Mantenha e revise</strong>
                  <span className="text-slate-600">Conforme sua renda e gastos aumentarem, reajuste a meta.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2 bg-cyan-50 border border-cyan-200 text-cyan-950 p-1.5 rounded text-[9px] font-bold flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Flag className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              Meta alcançada = Liberdade e paz mental.
            </span>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            BLOCO 6: REGRAS IMPORTANTES (Col 9 a 12)
        ────────────────────────────────────────────────────────────── */}
        <div className="md:col-span-4 bg-white rounded-xl p-2.5 border-l-4 border-pink-600 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5 border-b border-pink-50 pb-1">
              <span className="w-5 h-5 rounded-full bg-pink-600 text-white text-[11px] font-black flex items-center justify-center shadow-sm">
                6
              </span>
              <div>
                <h3 className="font-black text-pink-950 text-xs sm:text-sm uppercase tracking-wide">
                  REGRAS IMPORTANTES
                </h3>
                <p className="text-[9px] font-bold text-pink-600">Para usar sua reserva corretamente</p>
              </div>
            </div>

            <div className="space-y-1.5 mt-1">
              <div className="flex items-start gap-1.5 p-1 rounded bg-pink-50/50">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-[9px] leading-tight">
                  <strong className="text-slate-900 block">Use apenas em emergências reais:</strong>
                  <span className="text-slate-600">Situações inesperadas, inadiáveis e essenciais.</span>
                </div>
              </div>

              <div className="flex items-start gap-1.5 p-1 rounded bg-pink-50/50">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-[9px] leading-tight">
                  <strong className="text-slate-900 block">Não use para compras por impulso:</strong>
                  <span className="text-slate-600">Não é para viagens, trocar de celular ou festas.</span>
                </div>
              </div>

              <div className="flex items-start gap-1.5 p-1 rounded bg-pink-50/50">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-[9px] leading-tight">
                  <strong className="text-slate-900 block">Mantenha o dinheiro acessível:</strong>
                  <span className="text-slate-600">Em investimentos de liquidez diária (D+0 ou D+1).</span>
                </div>
              </div>

              <div className="flex items-start gap-1.5 p-1 rounded bg-pink-50/50">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-[9px] leading-tight">
                  <strong className="text-slate-900 block">Reponha o valor após usar:</strong>
                  <span className="text-slate-600">Se precisar gastar, volte a guardar assim que possível.</span>
                </div>
              </div>

              <div className="flex items-start gap-1.5 p-1 rounded bg-pink-50/50">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-[9px] leading-tight">
                  <strong className="text-slate-900 block">Revise periodicamente:</strong>
                  <span className="text-slate-600">A cada mudança de salário, novos custos ou fase da vida.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2 bg-pink-50 text-pink-950 p-1.5 rounded border border-pink-200 text-[9px] font-bold text-center">
            Disciplina no uso garante a sustentabilidade do seu futuro.
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            BLOCO 7: EXEMPLO REAL NA PRÁTICA (Col 1 a 8)
        ────────────────────────────────────────────────────────────── */}
        <div className="md:col-span-8 bg-white rounded-xl p-2.5 border-l-4 border-blue-500 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5 border-b border-blue-50 pb-1">
              <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-[11px] font-black flex items-center justify-center shadow-sm">
                7
              </span>
              <div>
                <h3 className="font-black text-blue-950 text-xs sm:text-sm uppercase tracking-wide">
                  EXEMPLO REAL
                </h3>
                <p className="text-[9px] font-bold text-blue-600">Na prática (Caso de Estudo)</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-1">
              {/* Perfil */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-[9px] space-y-1">
                <span className="font-black text-slate-800 uppercase block border-b pb-0.5">
                  DADOS DO CASO:
                </span>
                <p><strong>Perfil:</strong> Profissional CLT</p>
                <p><strong>Renda líquida:</strong> R$ 5.500</p>
                <p><strong>Gastos mensais:</strong> R$ 3.000</p>
                <p className="text-emerald-700 font-bold"><strong>Reserva (6 meses):</strong> R$ 18.000</p>
                <p className="text-blue-700 font-bold"><strong>Reserva (12 meses):</strong> R$ 36.000</p>
              </div>

              {/* Plano de Montagem */}
              <div className="bg-blue-50/70 border border-blue-200 rounded-lg p-2 text-[9px] flex flex-col justify-between">
                <div>
                  <span className="font-black text-blue-950 uppercase block border-b border-blue-200 pb-0.5 mb-1.5">
                    PLANO DE MONTAGEM:
                  </span>
                  <p className="font-bold text-blue-900 mb-2">Aporte mensal de R$ 1.000:</p>

                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between font-bold text-[8.5px] text-emerald-800">
                        <span>R$ 18.000</span>
                        <span>em 18 meses</span>
                      </div>
                      <div className="w-full bg-emerald-200 h-2 rounded-full overflow-hidden mt-0.5">
                        <div className="bg-emerald-600 h-full w-[50%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-bold text-[8.5px] text-blue-800">
                        <span>R$ 36.000</span>
                        <span>em 36 meses</span>
                      </div>
                      <div className="w-full bg-blue-200 h-2 rounded-full overflow-hidden mt-0.5">
                        <div className="bg-blue-600 h-full w-[100%]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resultado */}
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-lg p-2 text-[9px] space-y-1">
                <span className="font-black text-emerald-950 uppercase block border-b border-emerald-200 pb-0.5">
                  RESULTADO CONQUISTADO:
                </span>
                <ul className="space-y-1 text-slate-800 font-medium pt-0.5">
                  <li className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>Mais segurança no dia a dia</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>Tranquilidade para imprevistos</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>Evita dívidas e juros altos</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>Liberdade para melhores escolhas</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            BLOCO 8: ERROS COMUNS (Col 9 a 12)
        ────────────────────────────────────────────────────────────── */}
        <div className="md:col-span-4 bg-white rounded-xl p-2.5 border-l-4 border-amber-600 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5 border-b border-amber-50 pb-1">
              <span className="w-5 h-5 rounded-full bg-amber-600 text-white text-[11px] font-black flex items-center justify-center shadow-sm">
                8
              </span>
              <div>
                <h3 className="font-black text-amber-950 text-xs sm:text-sm uppercase tracking-wide">
                  ERROS COMUNS
                </h3>
                <p className="text-[9px] font-bold text-amber-600">Evite essas armadilhas</p>
              </div>
            </div>

            <ul className="text-[9px] text-slate-700 space-y-1 font-medium mt-1">
              <li className="flex items-center gap-1.5 text-rose-900 bg-rose-50/40 p-1 rounded">
                <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <span>Guardar um valor muito baixo</span>
              </li>
              <li className="flex items-center gap-1.5 text-rose-900 bg-rose-50/40 p-1 rounded">
                <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <span>Investir em ativos de alto risco</span>
              </li>
              <li className="flex items-center gap-1.5 text-rose-900 bg-rose-50/40 p-1 rounded">
                <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <span>Usar para gastos não emergenciais</span>
              </li>
              <li className="flex items-center gap-1.5 text-rose-900 bg-rose-50/40 p-1 rounded">
                <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <span>Não repor o valor após utilizar</span>
              </li>
              <li className="flex items-center gap-1.5 text-rose-900 bg-rose-50/40 p-1 rounded">
                <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <span>Deixar parado na conta corrente</span>
              </li>
              <li className="flex items-center gap-1.5 text-rose-900 bg-rose-50/40 p-1 rounded">
                <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <span>Não revisar conforme sua vida muda</span>
              </li>
            </ul>
          </div>

          <div className="mt-2 bg-amber-50 text-amber-950 p-1.5 rounded border border-amber-200 text-[9px] font-bold text-center">
            ⚠️ Atenção: Evite resgates para desejos impulsivos!
          </div>
        </div>

      </div>

      {/* ═════════════════════════════════════════════════════════════════════
          RODAPÉ RESUMO: EXATO DA FOTO
      ══════════════════════════════════════════════════════════════════════ */}
      <footer className="mt-2 bg-[#071E3D] text-white p-2 rounded-xl flex flex-wrap items-center justify-between gap-2 shadow text-[9px] sm:text-[10px] border-t-2 border-cyan-400">
        <div className="flex items-center gap-2">
          <span className="bg-[#00B4D8] text-[#071E3D] font-black px-2 py-0.5 rounded text-[9px] uppercase tracking-wider">
            RESUMO
          </span>
          <span className="font-extrabold text-cyan-100">
            A RESERVA DE EMERGÊNCIA É ESSENCIAL PARA SUA LIBERDADE FINANCEIRA.
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-[8.5px] font-bold">
          <span className="bg-white/10 px-2 py-0.5 rounded-full flex items-center gap-1 text-cyan-200">
            🛡️ 6 a 12 meses dos seus gastos
          </span>
          <span className="bg-white/10 px-2 py-0.5 rounded-full flex items-center gap-1 text-cyan-200">
            💰 Investimentos seguros e líquidos
          </span>
          <span className="bg-white/10 px-2 py-0.5 rounded-full flex items-center gap-1 text-cyan-200">
            ⚡ Use apenas em emergências
          </span>
          <span className="bg-white/10 px-2 py-0.5 rounded-full flex items-center gap-1 text-cyan-200">
            📈 Revise e mantenha sempre atualizada
          </span>
        </div>
      </footer>

    </div>
  );
};
