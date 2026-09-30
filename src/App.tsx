import React, { useState } from 'react';
import { MODULES_CURRICULUM } from './data/mapsData';
import { ATTACHED_MAPS_LIST, NeuromapBoard, NeuromapBoardData } from './components/NeuromapBoard';
import { ContinuousMarquee } from './components/ContinuousMarquee';
import { TestimonialsMarquee } from './components/TestimonialsMarquee';
import { UpgradeDialog } from './components/UpgradeDialog';
import { MapLightboxModal } from './components/MapLightboxModal';
import { LegalModal } from './components/LegalModals';
import { ImageManagerModal } from './components/ImageManagerModal';
import { getStoredImages, saveStoredImages, CustomImagesConfig } from './data/customImagesStore';

// Fotos dos combos geradas
import comboBundleImg from './assets/images/mind_maps_combo_bundle_1790724777833.jpg';
import comboPrintedImg from './assets/images/mind_maps_printed_combo_1790724790856.jpg';

// =========================================================================
// CONFIGURAÇÕES DO PRODUTO & LINKS DE CHECKOUT (EDITE AQUI)
// =========================================================================
const CHECKOUT_ESSENTIAL_URL = "https://pay.kiwify.com.br/[SEU_CHECKOUT_AQUI]?plan=essencial_1590";
const CHECKOUT_COMPLETE_URL = "https://pay.kiwify.com.br/[SEU_CHECKOUT_AQUI]?plan=completo_1990&bump=chatgpt2027";

export default function App() {
  // Modal de Upgrade (ao clicar no plano essencial)
  const [showUpgradeModal, setShowUpgradeModal] = useState<boolean>(false);

  // Modal Lightbox para inspecionar mapa em alta resolução
  const [selectedBoard, setSelectedBoard] = useState<NeuromapBoardData | null>(null);

  // Aba ativa na seção de amostra oficial
  const [activeBoardTab, setActiveBoardTab] = useState<number>(2);

  // Mapa exibido na amostra do Hero
  const [heroBoardId, setHeroBoardId] = useState<number>(2);

  // Configuração de Imagens Personalizadas dos Mapas e Combos
  const [customImages, setCustomImages] = useState<CustomImagesConfig>(() => getStoredImages());
  const [showImageManager, setShowImageManager] = useState<boolean>(false);

  // Garante que fotos adicionadas pelo usuário permaneçam sempre sincronizadas e fixadas
  React.useEffect(() => {
    const handleSync = () => {
      setCustomImages(getStoredImages());
    };
    window.addEventListener('neuromap_images_updated', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('neuromap_images_updated', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  // Modal Legal (Termos / Privacidade)
  const [legalModalType, setLegalModalType] = useState<'terms' | 'privacy' | null>(null);

  // Módulo aberto no Sumário (primeiro aberto por padrão)
  const [openModuleIndex, setOpenModuleIndex] = useState<number | null>(0);

  // FAQ acordeão (primeiro aberto por padrão)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Notificação toast para feedback
  const [checkoutNotice, setCheckoutNotice] = useState<string | null>(null);

  const currentHeroBoard = ATTACHED_MAPS_LIST.find((b) => b.id === heroBoardId) || ATTACHED_MAPS_LIST[1];

  const handleCheckoutRedirect = (url: string, planName: string, price: string) => {
    console.log('[Analytics Event: InitiateCheckout]', {
      content_name: planName,
      value: parseFloat(price.replace(',', '.')),
      currency: 'BRL',
    });

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('analytics_initiate_checkout', {
          detail: { planName, price },
        })
      );
    }

    if (url.includes('[SEU_CHECKOUT_AQUI]')) {
      setCheckoutNotice(`Direcionando para o Checkout (${planName} - R$ ${price}). Lembre-se de configurar seu link real de checkout no topo do código!`);
      setTimeout(() => setCheckoutNotice(null), 5000);
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleSaveCustomImages = (newConfig: CustomImagesConfig) => {
    setCustomImages(newConfig);
    saveStoredImages(newConfig);
    setCheckoutNotice('🎉 Suas fotos foram salvas e publicadas na landing page!');
    setTimeout(() => setCheckoutNotice(null), 5000);
  };

  const currentActiveBoard = ATTACHED_MAPS_LIST.find((b) => b.id === activeBoardTab) || ATTACHED_MAPS_LIST[0];


  return (
    <div className="min-h-screen bg-[#0A0116] text-[#1E293B] antialiased selection:bg-[#A855F7] selection:text-white pb-24 font-sans">
      
      {/* AVISO TOAST FLUTUANTE DE CHECKOUT */}
      {checkoutNotice && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#1E0836] text-[#F59E0B] px-5 py-3 rounded-xl border-2 border-[#A855F7] shadow-2xl text-xs sm:text-sm font-bold max-w-md text-center animate-bounce">
          ⚡ {checkoutNotice}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          1. BARRA SUPERIOR TECNOLÓGICA (DEEP PURPLE COM GLOW CYAN)
      ════════════════════════════════════════════════════════════════════ */}
      <aside 
        className="bg-gradient-to-r from-[#120322] via-[#240C46] to-[#120322] text-white text-xs sm:text-sm py-2.5 px-4 text-center font-medium border-b border-purple-500/30 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 shadow-[0_4px_20px_rgba(168,85,247,0.15)]"
        aria-label="Promoção tecnológica"
      >
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#06B6D4] animate-ping" />
          <strong className="bg-gradient-to-r from-[#9333EA] to-[#C026D3] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full tracking-wider uppercase shadow-sm">
            OFERTA ESPECIAL 2027
          </strong>
        </div>
        <span className="text-purple-100">
          Combo Completo dos 30 Mapas + 5 Bônus por apenas <b className="text-[#FFC94D] font-black text-sm">R$ 19,90</b>
        </span>
        <a 
          href="#planos" 
          className="text-[#06B6D4] hover:text-white font-bold underline transition-colors"
        >
          GARANTIR AGORA →
        </a>
      </aside>

      {/* ═══════════════════════════════════════════════════════════════════
          2. HERO COM FUNDO ROXO TECNOLÓGICO, DEGRADÊS E FOTO DO COMBO
      ════════════════════════════════════════════════════════════════════ */}
      <header className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 bg-tech-grid-dark text-white text-center overflow-hidden border-b border-purple-500/20" id="inicio">
        
        {/* Orbes de luz neon e reflexos futuristas */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-purple-600/20 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-10 w-[300px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[320px] h-[320px] bg-fuchsia-600/15 blur-[110px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          
          {/* Eyebrow Tecnológico com borda neon */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-tech-purple border border-purple-400/40 text-purple-200 text-xs font-black uppercase tracking-wider mb-6 shadow-[0_0_20px_rgba(168,85,247,0.25)]">
            <span className="w-2 h-2 rounded-full bg-[#06B6D4]" />
            <span>MÉTODO VISUAL DE ALTA PRECISÃO FINANCEIRA</span>
          </div>

          {/* H1 Principal com degradê tecnológico de Roxo para Ciano */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.12] mb-6">
            30 MAPAS MENTAIS de <span className="bg-gradient-to-r from-[#C084FC] via-[#E879F9] to-[#06B6D4] bg-clip-text text-transparent">Finanças Pessoais</span> para organizar e investir
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-purple-200/90 leading-relaxed font-body mb-8">
            <strong className="text-white font-bold">Esqueça as planilhas chatas e vídeos teóricos de 40 horas.</strong> Tenha um mapa mental colorido na mão para cada decisão: do corte de despesas invisíveis ao primeiro investimento em renda fixa.
          </p>

          {/* FOTO DO COMBO DO PRODUTO (3D BUNDLE MOCKUP) + MAPA INTERATIVO */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-8 max-w-5xl mx-auto">
            
            {/* Foto do Combo do Produto (Hero) */}
            <div className="lg:col-span-7 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 rounded-3xl blur-lg opacity-40 group-hover:opacity-75 transition duration-500" />
              <div className="relative bg-[#180630] rounded-2xl overflow-hidden border-2 border-purple-500/40 shadow-2xl">
                
                {/* Faixa superior do combo */}
                <div className="p-3 bg-[#120322] border-b border-purple-500/30 flex items-center justify-between">
                  <span className="text-[11px] font-black text-cyan-300 flex items-center gap-1.5 uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    COMBO COMPLETO DE MAPAS MENTAIS
                  </span>
                  <span className="text-[10px] font-bold text-purple-300 bg-purple-900/60 border border-purple-500/30 px-2.5 py-0.5 rounded-full">
                    Material Digital & Pranchas Impressas
                  </span>
                </div>

                <img 
                  src={customImages.comboHero || comboPrintedImg} 
                  alt="Combo Mapas do Dinheiro - 30 Mapas Mentais + 5 Bônus" 
                  className="w-full h-auto object-cover transform group-hover:scale-[1.01] transition-transform duration-500"
                />

                <div className="bg-gradient-to-t from-[#0A0116] via-[#0A0116]/90 to-transparent p-4 flex items-center justify-between text-xs">
                  <span className="font-black text-purple-200 flex items-center gap-1.5">
                    <span className="text-[#06B6D4]">★</span> COLEÇÃO COMPLETA: FINANÇAS PESSOAIS & INVESTIMENTOS
                  </span>
                  <span className="text-[11px] font-bold text-amber-300 bg-purple-950/80 px-2.5 py-0.5 rounded border border-purple-500/40">
                    30 Mapas + 5 Bônus
                  </span>
                </div>
              </div>
            </div>

            {/* Amostra da Prancha Oficial de Mapa Mental */}
            <div className="lg:col-span-5 text-left">
              <div className="glass-tech-purple rounded-2xl p-4 border border-purple-400/30 tech-neon-glow">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-purple-500/20">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setHeroBoardId(2)}
                      className={`text-[10px] sm:text-xs font-black px-3 py-1.5 rounded-lg transition-all ${
                        heroBoardId === 2
                          ? 'bg-[#06B6D4] text-slate-950 shadow-sm font-extrabold'
                          : 'text-purple-300 hover:text-white bg-purple-900/40'
                      }`}
                    >
                      MAPA 002: Reserva de Emergência
                    </button>
                    <button
                      onClick={() => setHeroBoardId(1)}
                      className={`text-[10px] sm:text-xs font-black px-3 py-1.5 rounded-lg transition-all ${
                        heroBoardId === 1
                          ? 'bg-[#A855F7] text-white shadow-sm font-extrabold'
                          : 'text-purple-300 hover:text-white bg-purple-900/40'
                      }`}
                    >
                      MAPA 001: Finanças Pessoais
                    </button>
                  </div>
                  <button 
                    onClick={() => setSelectedBoard(currentHeroBoard)}
                    className="text-[11px] font-bold text-cyan-300 hover:text-white underline flex items-center gap-1"
                  >
                    🔍 Ampliar
                  </button>
                </div>
                
                <div 
                  className="cursor-pointer overflow-hidden rounded-xl shadow-lg hover:ring-2 hover:ring-cyan-400 transition-all bg-white"
                  onClick={() => setSelectedBoard(currentHeroBoard)}
                >
                  <NeuromapBoard
                    boardId={currentHeroBoard.id}
                    customImage={customImages.maps[currentHeroBoard.id]}
                    onExpand={() => setSelectedBoard(currentHeroBoard)}
                  />
                </div>
                <p className="text-[11px] text-purple-300 mt-2 text-center font-medium">
                  {currentHeroBoard.code} — {currentHeroBoard.title}: Toque para ver em alta definição
                </p>
              </div>
            </div>

          </div>

          {/* CTA Principal de Alta Conversão */}
          <div className="pt-2 max-w-md mx-auto">
            <a 
              href="#planos"
              className="w-full inline-block py-4 px-8 btn-tech-hot btn-tech-pulse text-base sm:text-lg font-black uppercase tracking-wider"
            >
              QUERO OS MAPAS MENTAIS AGORA →
            </a>
            <div className="flex items-center justify-center gap-4 text-xs text-purple-300/80 mt-3 font-medium">
              <span>✓ Acesso Imediato</span>
              <span>•</span>
              <span>✓ Celular & Impressão</span>
              <span>•</span>
              <span>✓ 7 Dias de Garantia</span>
            </div>
          </div>

        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════
          3. SEÇÃO BRANCA TECNOLÓGICA: CARROSSEL DE PRANCHAS (MARQUEE)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-gradient-to-b from-white via-purple-50/40 to-white border-b border-purple-200/80 text-slate-900 bg-tech-grid-light" id="amostras">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          <header className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-black uppercase tracking-wider text-[#7E22CE] bg-purple-100 border border-purple-300 px-3.5 py-1 rounded-full inline-block mb-2 shadow-sm">
              TECNOLOGIA VISUAL DE APRENDIZADO
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1E0836] tracking-tight">
              Navegue pelas pranchas oficiais por dentro
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Veja as pranchas originais em alta definição. Selecione uma prancha abaixo ou toque no carrossel para ampliar:
            </p>
          </header>

          {/* Seletor Interativo das 5 Pranchas Oficiais */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8 max-w-4xl mx-auto">
            {ATTACHED_MAPS_LIST.map((board) => (
              <button
                key={board.id}
                onClick={() => setActiveBoardTab(board.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 border ${
                  activeBoardTab === board.id
                    ? 'bg-[#1E0836] text-white border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)] scale-105'
                    : 'bg-white text-purple-900 border-purple-200 hover:border-purple-400 hover:bg-purple-50'
                }`}
              >
                <span className="font-mono bg-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded text-[10px]">
                  {board.code}
                </span>
                <span>{board.title}</span>
              </button>
            ))}
          </div>

          {/* Prancha Oficial em Destaque Grande */}
          <div className="max-w-4xl mx-auto mb-10">
            <div className="rounded-2xl border border-purple-200 shadow-2xl overflow-hidden bg-white">
              <NeuromapBoard
                boardId={currentActiveBoard.id}
                customImage={customImages.maps[currentActiveBoard.id]}
                onExpand={() => setSelectedBoard(currentActiveBoard)}
              />
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-2 text-xs text-purple-950 font-bold">
              <span>📌 <strong>{currentActiveBoard.code}:</strong> {currentActiveBoard.subtitle}</span>
              <button
                onClick={() => setSelectedBoard(currentActiveBoard)}
                className="text-purple-700 hover:text-purple-950 underline flex items-center gap-1 font-black"
              >
                🔍 Toque para ver em tela cheia com alta resolução
              </button>
            </div>
          </div>

          {/* Carrossel Duplo em Movimento Contínuo */}
          <ContinuousMarquee 
            onSelectBoard={(board) => setSelectedBoard(board)}
            customImages={customImages.maps}
          />

          <div className="text-center mt-6">
            <a 
              href="#planos" 
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-purple-700 hover:text-purple-950 underline"
            >
              Liberar a coleção completa de 30 mapas mentais no checkout →
            </a>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          4. SEÇÃO ROXA: VITRINE DE COMBOS & KITS DO PRODUTO (NOVIDADE)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-[#0E021F] text-white border-b border-purple-500/20 relative overflow-hidden" id="combos">
        
        {/* Glow de fundo */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-wider text-[#06B6D4] bg-cyan-950/70 border border-cyan-500/40 px-3.5 py-1 rounded-full inline-block mb-2 shadow-sm">
              FORMATOS DO COMBO
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
              O que você recebe no combo completo
            </h2>
            <p className="text-sm sm:text-base text-purple-200/80 mt-2">
              Flexibilidade máxima: use digitalmente onde estiver ou imprima para manter sempre à vista.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Card Combo 1: Versão Caderno de Estudos e Impressão A4 */}
            <div className="glass-tech-purple rounded-3xl p-6 border-2 border-cyan-500/40 flex flex-col justify-between shadow-2xl relative">
              <div className="absolute -top-3.5 left-6 bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] text-slate-950 font-black text-[10px] sm:text-xs uppercase px-3.5 py-1 rounded-full shadow-md">
                ★ EDIÇÃO MAIS PROCURADA
              </div>
              <div>
                <div className="rounded-2xl overflow-hidden border border-purple-400/30 mb-5 mt-2 relative group">
                  <img 
                    src={customImages.comboPrinted || comboPrintedImg} 
                    alt="Edição Impressa em Folha A4 e Caderno de Estudos" 
                    className="w-full h-52 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#0A0116]/80 backdrop-blur-md px-3 py-1 rounded-full border border-purple-500/40 text-[11px] font-black text-[#FFC94D]">
                    📄 PRONTO PARA IMPRESSÃO EM FOLHA A4
                  </div>
                </div>

                <h3 className="text-xl font-black text-white mb-2">
                  Combo Caderno de Estudos & Impressão
                </h3>
                <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed font-body mb-4">
                  Prefere o papel físico? Você recebe o arquivo diagramado nas medidas oficiais de folha A4 com alta densidade de cor para imprimir, encadernar ou colar na porta da geladeira.
                </p>

                <ul className="text-xs text-purple-100 space-y-1.5 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-[#FFC94D] font-bold">✓</span> Margens seguras para encadernação e espiral
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#FFC94D] font-bold">✓</span> Resolução vetorial 300 DPI sem pixels estourados
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#FFC94D] font-bold">✓</span> Imprima quantas vezes quiser para a família
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-purple-500/20 flex items-center justify-between">
                <span className="text-xs font-bold text-purple-300">Imprima sem Limites</span>
                <span className="text-xs font-black text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-500/40">
                  Incluso no Pacote
                </span>
              </div>
            </div>

            {/* Card Combo 2: Versão Celular & Tablet */}
            <div className="glass-tech-purple rounded-3xl p-6 border border-purple-500/30 flex flex-col justify-between shadow-xl">
              <div>
                <div className="rounded-2xl overflow-hidden border border-purple-400/30 mb-5 relative group">
                  <img 
                    src={customImages.comboDigital || comboBundleImg} 
                    alt="Edição Digital para Smartphone e Tablet" 
                    className="w-full h-52 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#0A0116]/80 backdrop-blur-md px-3 py-1 rounded-full border border-purple-500/40 text-[11px] font-black text-cyan-300">
                    📱 100% OTIMIZADO PARA CELULAR & TABLET
                  </div>
                </div>

                <h3 className="text-xl font-black text-white mb-2">
                  Combo Digital Instantâneo
                </h3>
                <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed font-body mb-4">
                  Consulte os mapas a qualquer hora do dia na fila do banco, no mercado ou antes de fazer uma compra por impulso. Diagramação pensada para visualização nítida na palma da mão.
                </p>

                <ul className="text-xs text-purple-100 space-y-1.5 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-[#06B6D4] font-bold">✓</span> Zoom inteligente em alta resolução
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#06B6D4] font-bold">✓</span> Índice clicável para pular direto ao tema
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#06B6D4] font-bold">✓</span> Leve e rápido para carregar no WhatsApp e e-mail
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-purple-500/20 flex items-center justify-between">
                <span className="text-xs font-bold text-purple-300">Acesso Vitalício</span>
                <span className="text-xs font-black text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-500/40">
                  Incluso no Pacote
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          5. SEÇÃO BRANCA: SUMÁRIO COMPLETO DOS 6 MÓDULOS / 30 MAPAS
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-gradient-to-b from-white via-purple-50/30 to-white border-b border-purple-200/80 text-slate-900 bg-tech-grid-light" id="sumario">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-10">
            <span className="text-xs font-black uppercase tracking-wider text-purple-800 bg-purple-100 border border-purple-300 px-3.5 py-1 rounded-full inline-block mb-2">
              DO BÁSICO AOS INVESTIMENTOS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1E0836] tracking-tight">
              Sumário dos 30 Mapas Mentais
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Conteúdo dividido em 6 módulos práticos para guiar sua jornada sem confusão:
            </p>
          </div>

          {/* Lista de Acordeões dos Módulos */}
          <div className="space-y-3">
            {MODULES_CURRICULUM.map((module, idx) => {
              const isOpen = openModuleIndex === idx;
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-2xl border-2 border-purple-200/80 shadow-sm hover:border-purple-400 transition-all overflow-hidden"
                >
                  <button
                    onClick={() => setOpenModuleIndex(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-slate-900 hover:bg-purple-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 font-black flex items-center justify-center text-xs shrink-0 font-mono border border-purple-300">
                        {module.moduleNum}
                      </span>
                      <div>
                        <h3 className="text-sm sm:text-base font-extrabold text-[#1E0836]">
                          {module.title}
                        </h3>
                        <span className="text-xs text-purple-600 font-semibold">
                          {module.count}
                        </span>
                      </div>
                    </div>
                    <span className="text-purple-600 font-black text-lg">
                      {isOpen ? '▲' : '▼'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 border-t border-purple-100 bg-[#FAF8FE]">
                      <ol className="divide-y divide-purple-100 text-xs sm:text-sm text-slate-700">
                        {module.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="py-2.5 flex items-center gap-3">
                            <b className="w-7 text-purple-500 font-mono shrink-0">{item.num}</b>
                            <span className="font-semibold text-slate-800">{item.title}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          6. SEÇÃO ROXA: O QUE VEM NO MATERIAL & STATS
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-[#0B0117] text-white border-b border-purple-500/20" id="material">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-wider text-[#A855F7] bg-purple-950/80 border border-purple-500/40 px-3.5 py-1 rounded-full inline-block mb-2 shadow-sm">
              TECNOLOGIA DE ENSINO
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
              O que vem no material
            </h2>
            <p className="text-sm sm:text-base text-purple-200/80 mt-2">
              Conteúdo visual, sintetizado e pronto para consultar a qualquer momento.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Card Principal */}
            <article className="lg:col-span-6 bg-gradient-to-br from-[#1E0836] via-[#2A0B4B] to-[#140326] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-purple-400/30 tech-neon-glow">
              <div>
                <span className="text-[11px] font-black uppercase tracking-widest text-[#06B6D4] block mb-4">
                  ESTRUTURA COMPLETA
                </span>
                
                <div className="flex items-baseline gap-3 mb-4">
                  <strong className="text-6xl sm:text-7xl font-black bg-gradient-to-r from-purple-200 to-white bg-clip-text text-transparent font-mono leading-none">
                    30
                  </strong>
                  <span className="text-lg sm:text-xl font-bold text-purple-100 leading-tight">
                    mapas mentais<br />de Finanças Pessoais
                  </span>
                </div>

                <p className="text-sm text-purple-200/90 leading-relaxed font-body">
                  Um tema por mapa para você visualizar despesas, cortar vazamentos silenciosos, estancar dívidas e montar sua reserva sem se perder em termos técnicos.
                </p>
              </div>

              {/* Tags dos temas */}
              <div className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-purple-500/30">
                <span className="px-3 py-1 rounded-full bg-purple-900/60 text-xs font-semibold text-purple-200 border border-purple-500/40">
                  Orçamento 50/30/20
                </span>
                <span className="px-3 py-1 rounded-full bg-purple-900/60 text-xs font-semibold text-purple-200 border border-purple-500/40">
                  Sair das Dívidas
                </span>
                <span className="px-3 py-1 rounded-full bg-purple-900/60 text-xs font-semibold text-purple-200 border border-purple-500/40">
                  Reserva de Emergência
                </span>
                <span className="px-3 py-1 rounded-full bg-purple-900/60 text-xs font-semibold text-purple-200 border border-purple-500/40">
                  Renda Fixa & Selic
                </span>
              </div>
            </article>

            {/* Stats Cards */}
            <div className="lg:col-span-6 grid grid-cols-1 gap-4">
              <article className="glass-tech-purple border border-purple-400/30 rounded-2xl p-5 flex items-start gap-4">
                <span className="w-12 h-12 rounded-xl bg-purple-900/60 text-[#C084FC] border border-purple-500/40 font-black flex items-center justify-center text-lg shrink-0 font-mono">
                  01
                </span>
                <div>
                  <h3 className="font-extrabold text-white text-base">
                    <strong>6</strong> Módulos organizados
                  </h3>
                  <p className="text-xs sm:text-sm text-purple-200/80 mt-1">
                    Do fluxo de caixa e corte de gastos ao primeiro aporte em renda fixa com segurança.
                  </p>
                </div>
              </article>

              <article className="glass-tech-purple border border-purple-400/30 rounded-2xl p-5 flex items-start gap-4">
                <span className="w-12 h-12 rounded-xl bg-cyan-950/60 text-[#06B6D4] border border-cyan-500/40 font-black flex items-center justify-center text-lg shrink-0 font-mono">
                  02
                </span>
                <div>
                  <h3 className="font-extrabold text-white text-base">
                    <strong>5 a 6</strong> Ramos coloridos por mapa
                  </h3>
                  <p className="text-xs sm:text-sm text-purple-200/80 mt-1">
                    Informação separada por cor e conexão lógica para bater o olho e entender em 60 segundos.
                  </p>
                </div>
              </article>

              <article className="glass-tech-purple border border-purple-400/30 rounded-2xl p-5 flex items-start gap-4">
                <span className="w-12 h-12 rounded-xl bg-fuchsia-950/60 text-[#F472B6] border border-fuchsia-500/40 font-black flex items-center justify-center text-lg shrink-0 font-mono">
                  03
                </span>
                <div>
                  <h3 className="font-extrabold text-white text-base">
                    <strong>30</strong> Ações práticas imediatas
                  </h3>
                  <p className="text-xs sm:text-sm text-purple-200/80 mt-1">
                    Cada mapa acompanha uma regra de ouro direta para você aplicar no mesmo dia.
                  </p>
                </div>
              </article>
            </div>

          </div>

          {/* Faixa de Acesso Tecnológica */}
          <div className="mt-8 pt-6 border-t border-purple-500/20 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs sm:text-sm font-bold text-purple-200">
            <span className="flex items-center gap-2">
              <span className="text-[#06B6D4] font-black">✓</span> Material digital em PDF
            </span>
            <span className="flex items-center gap-2">
              <span className="text-[#06B6D4] font-black">✓</span> Acesso imediato no e-mail
            </span>
            <span className="flex items-center gap-2">
              <span className="text-[#06B6D4] font-black">✓</span> Celular, tablet ou impresso
            </span>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          7. SEÇÃO BRANCA: DEPOIMENTOS EM CARROSSEL CONTÍNUO
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-gradient-to-b from-white via-purple-50/40 to-white border-b border-purple-200/80 text-slate-900 bg-tech-grid-light" id="experiencias">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          
          <span className="text-xs font-black uppercase tracking-wider text-purple-800 bg-purple-100 border border-purple-300 px-3.5 py-1 rounded-full inline-block mb-2 shadow-sm">
            HISTÓRIAS DE SUCESSO
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1E0836] tracking-tight mb-2">
            Depoimentos reais de quem já aplicou
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto mb-8">
            Veja como a clareza visual dos mapas ajudou pessoas comuns a organizarem o salário:
          </p>

          <TestimonialsMarquee />

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          8. SEÇÃO ROXA: 5 BÔNUS DE PRÁTICA E REVISÃO
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-[#0E021F] text-white border-b border-purple-500/20" id="bonus">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-wider text-[#FFC94D] bg-amber-950/70 border border-amber-500/40 px-3.5 py-1 rounded-full inline-block mb-2 shadow-sm">
              ACELERADORES INCLUSOS
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
              Bônus exclusivos do pacote completo
            </h2>
            <p className="text-sm sm:text-base text-purple-200/80 mt-2">
              No Pacote Completo, você recebe 5 ferramentas adicionais para acelerar seus resultados:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            
            {/* Bônus 1 */}
            <article className="glass-tech-purple border-2 border-dashed border-purple-400/40 rounded-2xl p-5 flex flex-col justify-between shadow-lg">
              <div>
                <span className="inline-block bg-[#FFC94D] text-[#5A3F00] font-black text-[11px] tracking-wider uppercase rounded-full px-3 py-0.5 mb-3">
                  BÔNUS 01
                </span>
                <h3 className="font-extrabold text-white text-base mb-2">
                  Checklist do Plano de 30 Dias
                </h3>
                <ul className="text-xs text-purple-200/80 space-y-1.5 font-body">
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#06B6D4] font-bold">✓</span> Roteiro dia a dia para organizar suas contas
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#06B6D4] font-bold">✓</span> Caixa de seleção para marcar cada etapa concluída
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#06B6D4] font-bold">✓</span> Versão em PDF interativo para celular ou folha A4
                  </li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-purple-500/20">
                <span className="inline-block bg-[#0B8F63] text-white text-[11px] font-black rounded px-2.5 py-0.5">
                  INCLUÍDO NO COMPLETO
                </span>
              </div>
            </article>

            {/* Bônus 2 */}
            <article className="glass-tech-purple border-2 border-dashed border-purple-400/40 rounded-2xl p-5 flex flex-col justify-between shadow-lg">
              <div>
                <span className="inline-block bg-[#FFC94D] text-[#5A3F00] font-black text-[11px] tracking-wider uppercase rounded-full px-3 py-0.5 mb-3">
                  BÔNUS 02
                </span>
                <h3 className="font-extrabold text-white text-base mb-2">
                  Manual dos 10 Piores Erros
                </h3>
                <ul className="text-xs text-purple-200/80 space-y-1.5 font-body">
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#06B6D4] font-bold">✓</span> Os 10 tropeços mais comuns com dinheiro
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#06B6D4] font-bold">✓</span> Como blindar seu salário de armadilhas do rotativo
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#06B6D4] font-bold">✓</span> Dicas práticas para economizar até R$ 300 por mês
                  </li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-purple-500/20">
                <span className="inline-block bg-[#0B8F63] text-white text-[11px] font-black rounded px-2.5 py-0.5">
                  INCLUÍDO NO COMPLETO
                </span>
              </div>
            </article>

            {/* Bônus 3 */}
            <article className="glass-tech-purple border-2 border-dashed border-purple-400/40 rounded-2xl p-5 flex flex-col justify-between shadow-lg">
              <div>
                <span className="inline-block bg-[#FFC94D] text-[#5A3F00] font-black text-[11px] tracking-wider uppercase rounded-full px-3 py-0.5 mb-3">
                  BÔNUS 03
                </span>
                <h3 className="font-extrabold text-white text-base mb-2">
                  Guia do IR Descomplicado
                </h3>
                <ul className="text-xs text-purple-200/80 space-y-1.5 font-body">
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#06B6D4] font-bold">✓</span> Quem precisa declarar e quem é isento
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#06B6D4] font-bold">✓</span> Como declarar renda fixa e conta corrente sem susto
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#06B6D4] font-bold">✓</span> Evite a malha fina com 3 passos simples
                  </li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-purple-500/20">
                <span className="inline-block bg-[#0B8F63] text-white text-[11px] font-black rounded px-2.5 py-0.5">
                  INCLUÍDO NO COMPLETO
                </span>
              </div>
            </article>

            {/* Bônus 4 (ChatGPT Finanças) */}
            <article className="glass-tech-purple border-2 border-dashed border-cyan-400/50 rounded-2xl p-5 flex flex-col justify-between shadow-lg md:col-span-1 lg:col-span-1">
              <div>
                <span className="inline-block bg-[#06B6D4] text-[#0A0116] font-black text-[11px] tracking-wider uppercase rounded-full px-3 py-0.5 mb-3">
                  BÔNUS 04 · INTELIGÊNCIA ARTIFICIAL
                </span>
                <h3 className="font-extrabold text-white text-base mb-2">
                  ChatGPT para Finanças
                </h3>
                <ul className="text-xs text-purple-200/80 space-y-1.5 font-body">
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#06B6D4] font-bold">✓</span> Prompts prontos para colar no celular
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#06B6D4] font-bold">✓</span> Cole seu extrato e receba o 50/30/20 calculado
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#06B6D4] font-bold">✓</span> Roteiro para negociar dívidas com bancos usando IA
                  </li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-purple-500/20">
                <span className="inline-block bg-[#0B8F63] text-white text-[11px] font-black rounded px-2.5 py-0.5">
                  INCLUÍDO NO COMPLETO
                </span>
              </div>
            </article>

            {/* Bônus 5 (Quadro de Metas 2027) */}
            <article className="glass-tech-purple border-2 border-dashed border-fuchsia-400/50 rounded-2xl p-5 flex flex-col justify-between shadow-lg md:col-span-2 lg:col-span-2">
              <div>
                <span className="inline-block bg-gradient-to-r from-[#A855F7] to-[#EC4899] text-white font-black text-[11px] tracking-wider uppercase rounded-full px-3 py-0.5 mb-3">
                  BÔNUS 05 · ALTO IMPACTO
                </span>
                <h3 className="font-extrabold text-white text-base mb-2">
                  Quadro de Metas: Um 2027 de Conquistas
                </h3>
                <ul className="text-xs text-purple-200/80 space-y-1.5 font-body">
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#EC4899] font-bold">✓</span> Painel visual para definir metas de curto, médio e longo prazo
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#EC4899] font-bold">✓</span> Termômetro de economia para colorir conforme guardar sua reserva
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#EC4899] font-bold">✓</span> Formato pronto para imprimir e colocar na sua mesa de trabalho
                  </li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-purple-500/20">
                <span className="inline-block bg-[#0B8F63] text-white text-[11px] font-black rounded px-2.5 py-0.5">
                  INCLUÍDO NO COMPLETO
                </span>
              </div>
            </article>

          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          9. PLANOS DE ACESSO (OFERTA COM GLOW NEON FLUÍDO)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-[#0A0116] via-[#1E0836] to-[#0A0116] text-white border-b border-purple-500/30" id="planos">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
              Escolha o seu plano
            </h2>
            <p className="text-base text-purple-200/90 mt-2">
              Comece a organizar suas finanças de forma visual e definitiva.
            </p>
            <p className="text-xs text-[#06B6D4] font-bold bg-cyan-950/70 border border-cyan-500/40 rounded-full px-4 py-1 inline-block mt-3 shadow-sm">
              ⚡ Acesso liberado imediatamente após a confirmação
            </p>
          </div>

          {/* Grid de Planos: Essencial vs Completo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-3xl mx-auto">
            
            {/* Plano Essencial */}
            <article className="glass-tech-purple rounded-3xl border-2 border-purple-500/30 p-6 sm:p-8 flex flex-col justify-between shadow-xl">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white text-center">
                  Mapas do Dinheiro Essencial
                </h3>
                <p className="text-xs text-purple-300 text-center mt-1 mb-6">
                  A biblioteca de mapas mentais
                </p>

                <ul className="space-y-2.5 text-xs sm:text-sm text-purple-100 mb-8 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-[#06B6D4] font-black">✓</span> 30 mapas mentais de Finanças Pessoais
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#06B6D4] font-black">✓</span> 6 módulos práticos do zero ao investimento
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#06B6D4] font-black">✓</span> Ramos coloridos com conexões visuais
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#06B6D4] font-black">✓</span> PDF digital para celular e impressão pessoal
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#06B6D4] font-black">✓</span> Pagamento único, sem mensalidade
                  </li>
                  <li className="flex items-start gap-2 text-purple-400/50 line-through">
                    <span>✕</span> Não inclui os 5 bônus de prática e ChatGPT
                  </li>
                </ul>
              </div>

              <div>
                {/* Preço */}
                <div className="text-center mb-6">
                  <div className="text-4xl sm:text-5xl font-black text-white font-mono leading-none">
                    <small className="text-lg font-bold mr-1 text-purple-300">R$</small>15,90
                  </div>
                  <div className="text-xs text-purple-300 font-bold mt-1">
                    pagamento único, sem mensalidade
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowUpgradeModal(true)}
                  className="w-full py-4 px-6 btn-tech-ghost text-sm uppercase tracking-wide"
                >
                  QUERO O PLANO ESSENCIAL
                </button>
              </div>
            </article>

            {/* Plano Completo (Com o Glow Tecnológico Fluído) */}
            <div className="relative order-first md:order-last">
              {/* Ribbon superior flutuante */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 bg-gradient-to-r from-[#9333EA] to-[#EC4899] text-white font-black text-xs tracking-wider uppercase py-2 px-5 rounded-full shadow-lg whitespace-nowrap border border-white/20">
                PACOTE COMPLETO RECOMENDADO
              </div>

              {/* Moldura com Glow animado fluído */}
              <div className="nm-purple-glow h-full">
                <article className="bg-gradient-to-b from-[#1E0836] via-[#2A0B4B] to-[#160429] rounded-[26px] p-6 sm:p-8 pt-9 sm:pt-10 flex flex-col justify-between h-full text-white border border-purple-400/40">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-cyan-200 text-center">
                      Mapas do Dinheiro Completo
                    </h3>
                    <p className="text-xs text-purple-200 text-center font-bold mt-1 mb-4">
                      Os 30 mapas + 5 bônus de estudo & ChatGPT
                    </p>

                    {/* Tag de Economia Verde */}
                    <div className="bg-gradient-to-r from-[#059669] to-[#10B981] text-white text-xs font-black text-center py-2 px-3 rounded-xl shadow-md mb-6 border border-emerald-400/40">
                      ✓ ECONOMIZE R$ 30,00 NO PACOTE COMPLETO
                    </div>

                    <ul className="space-y-2.5 text-xs sm:text-sm text-purple-100 mb-8 font-bold">
                      <li className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-[#06B6D4] text-slate-950 text-[10px] flex items-center justify-center shrink-0 mt-0.5">✓</span>
                        Tudo do Essencial: os 30 mapas e 6 módulos
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-[#06B6D4] text-slate-950 text-[10px] flex items-center justify-center shrink-0 mt-0.5">✓</span>
                        Bônus 1: Checklist do Plano de 30 Dias
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-[#06B6D4] text-slate-950 text-[10px] flex items-center justify-center shrink-0 mt-0.5">✓</span>
                        Bônus 2: Manual dos 10 Piores Erros
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-[#06B6D4] text-slate-950 text-[10px] flex items-center justify-center shrink-0 mt-0.5">✓</span>
                        Bônus 3: Guia do IR Descomplicado
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-[#06B6D4] text-slate-950 text-[10px] flex items-center justify-center shrink-0 mt-0.5">✓</span>
                        Bônus 4: Como Usar o ChatGPT para Finanças
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-[#06B6D4] text-slate-950 text-[10px] flex items-center justify-center shrink-0 mt-0.5">✓</span>
                        Bônus 5: Quadro de Metas para 2027
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-[#06B6D4] text-slate-950 text-[10px] flex items-center justify-center shrink-0 mt-0.5">✓</span>
                        6 PDFs ao todo para organizar, praticar e imprimir
                      </li>
                    </ul>
                  </div>

                  <div>
                    {/* Preço de Destaque com Gradiente */}
                    <div className="text-center mb-6">
                      <div className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-[#FFC94D] via-[#F472B6] to-[#06B6D4] bg-clip-text text-transparent font-mono leading-none">
                        <small className="text-xl font-extrabold mr-1 text-white">R$</small>19,90
                      </div>
                      <div className="text-xs text-purple-200 font-bold mt-1">
                        pagamento único, sem mensalidade
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCheckoutRedirect(CHECKOUT_COMPLETE_URL, 'Mapas do Dinheiro Completo', '19,90')}
                      className="w-full py-5 px-6 btn-tech-hot btn-tech-pulse text-base sm:text-lg uppercase tracking-wide"
                    >
                      QUERO O PACOTE COMPLETO →
                    </button>
                  </div>
                </article>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          10. SEÇÃO BRANCA: GARANTIA DE 7 DIAS
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-gradient-to-b from-white via-purple-50/40 to-white border-b border-purple-200/80 text-slate-900 bg-tech-grid-light" id="garantia">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 sm:p-8 rounded-3xl bg-white border-2 border-purple-300 shadow-xl">
            <div className="w-20 h-20 rounded-2xl bg-purple-100 border border-purple-300 flex items-center justify-center text-4xl shrink-0 shadow-inner">
              🛡️
            </div>
            <div className="text-center sm:text-left">
              <span className="text-xs font-black uppercase tracking-wider text-purple-800 bg-purple-100 px-3 py-0.5 rounded-full inline-block mb-2">
                ✓ GARANTIA INCONDICIONAL DE 7 DIAS
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#1E0836] mb-2">
                7 dias para conhecer o material
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-body">
                Depois da compra, você tem 7 dias para abrir os PDFs e conferir o conteúdo do seu plano no celular ou no computador. Se decidir que não faz sentido para a sua realidade, solicite o reembolso pelos canais de suporte informados no pedido e receba 100% de volta, sem burocracia.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          11. SEÇÃO ROXA: FAQ ACORDEÃO
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-[#0E021F] text-white border-b border-purple-500/20" id="duvidas">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Perguntas frequentes
            </h2>
            <p className="text-sm text-purple-200/80 mt-2">
              Ainda ficou alguma dúvida antes de começar?
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "Como vou receber o material?",
                a: "A entrega é 100% digital e imediata. Logo após a confirmação do pagamento (Pix ou cartão), você recebe um e-mail com os links para download direto de todos os PDFs do seu plano.",
              },
              {
                q: "O material é físico ou digital?",
                a: "É digital, em formato PDF de alta qualidade. O Essencial inclui o material com os 30 mapas mentais. O Completo inclui os 30 mapas e mais 5 PDFs de prática e bônus (incluindo ChatGPT e Quadro de Metas 2027). Não há envio de livro físico pelo correio.",
              },
              {
                q: "Posso acessar pelo celular?",
                a: "Sim! Os PDFs foram diagramados especificamente para leitura confortável na tela do celular, tablet ou computador. Você também pode imprimir as páginas em qualquer impressora comum no formato A4.",
              },
              {
                q: "Preciso ter conhecimento prévio em finanças ou matemática?",
                a: "Não. Os mapas foram desenhados exatamente para pessoas que se sentem perdidas com termos complexos. A linguagem é direta, visual e baseada em exemplos da vida real.",
              },
              {
                q: "Tem alguma mensalidade ou anuidade?",
                a: "Não. O pagamento é único (a partir de R$ 15,90). Você paga uma única vez e o acesso aos arquivos é seu para sempre.",
              },
              {
                q: "E se eu tiver dúvidas após a compra?",
                a: "Você terá o contato direto do nosso canal oficial de suporte por e-mail [suporte@mapasdodinheiro.com.br] para qualquer necessidade de ajuda com os arquivos.",
              },
            ].map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="glass-tech-purple rounded-2xl border border-purple-500/30 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-white hover:bg-purple-900/30 transition-colors text-sm sm:text-base"
                  >
                    <span>{faq.q}</span>
                    <span className="text-[#06B6D4] font-black text-lg shrink-0">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-purple-200/90 font-body leading-relaxed border-t border-purple-500/20 bg-purple-950/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          12. FECHAMENTO FINAL COM DEGRADÊ ESPACIAL
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-[#0A0116] via-[#1E0836] to-[#05000C] text-white text-center border-b border-purple-500/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4">
            Conecte seus gastos. Visualize seus limites. Organize seu futuro.
          </h2>

          <p className="text-base text-purple-200/80 max-w-xl mx-auto mb-8 font-body leading-relaxed">
            Reúna 30 mapas mentais de Finanças Pessoais em um só material e nunca mais se sinta perdido ao abrir o extrato bancário.
          </p>

          <a 
            href="#planos"
            className="inline-block w-full sm:w-auto py-5 px-8 btn-tech-hot btn-tech-pulse text-base sm:text-lg font-black uppercase tracking-wider"
          >
            QUERO ACESSAR OS MAPAS MENTAIS →
          </a>

          <p className="text-xs text-purple-300 mt-4">
            Pagamento único · PDF digital · Garantia incondicional de 7 dias
          </p>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          13. DISCLAIMER & RODAPÉ
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-6 bg-[#05000C] text-purple-300/60 text-[11px] border-t border-purple-900/40 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 leading-relaxed">
          <p>
            <b>Aviso:</b> material estritamente educacional. Não substitui consultoria financeira individualizada, não é recomendação de compra ou venda de valores mobiliários e não garante resultados patrimoniais futuros.
          </p>
        </div>
      </section>

      <footer className="py-8 bg-[#030008] text-purple-300/60 text-xs border-t border-purple-950 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-2">
          <p className="text-purple-200 font-medium">
            Mapas do Dinheiro © {new Date().getFullYear()} · 30 Mapas Mentais de Finanças Pessoais
          </p>
          <p className="text-[11px] text-purple-400/50">
            Este site não é afiliado ao Facebook, Instagram ou Meta Inc.
          </p>
          <div className="flex items-center justify-center gap-4 text-xs font-semibold text-purple-300 pt-2 flex-wrap">
            <button onClick={() => setLegalModalType('terms')} className="hover:underline">
              Termos de Uso
            </button>
            <span>·</span>
            <button onClick={() => setLegalModalType('privacy')} className="hover:underline">
              Política de Privacidade
            </button>
            <span>·</span>
            <span>Suporte: [suporte@mapasdodinheiro.com.br]</span>
            <span>·</span>
            <button 
              onClick={() => setShowImageManager(true)} 
              className="hover:underline text-cyan-300 font-bold flex items-center gap-1"
              title="Área do administrador para configurar fotos dos mapas"
            >
              <span>⚙️</span> Personalizar Fotos dos Mapas
            </button>
          </div>
        </div>
      </footer>

      {/* Botão flutuante discreto para o proprietário gerenciar fotos */}
      <button
        onClick={() => setShowImageManager(true)}
        className="fixed bottom-20 left-4 z-40 bg-[#1A0735]/90 hover:bg-[#250B4C] border border-purple-500/50 text-purple-200 hover:text-white px-3.5 py-1.5 rounded-full text-xs font-bold shadow-2xl backdrop-blur-md flex items-center gap-1.5 transition-all hover:scale-105"
        title="Clique para adicionar ou trocar as fotos dos mapas mentais e combos"
      >
        <span>⚙️</span>
        <span className="hidden sm:inline">Gerenciar Fotos</span>
        {Object.keys(customImages.maps).length > 0 && (
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
        )}
      </button>

      {/* ═══════════════════════════════════════════════════════════════════
          14. BARRA FIXA NO INFERIOR DA TELA COM OPÇÃO DE COMPRA (SOLICITADO)
          FIXA TANTO NO DESKTOP QUANTO NO MOBILE ENQUANTO A PESSOA ROLA!
      ════════════════════════════════════════════════════════════════════ */}
      <div 
        className="fixed bottom-0 left-0 right-0 z-40 backdrop-blur-xl bg-[#0E021F]/95 text-white py-3 px-4 sm:px-8 border-t-2 border-purple-500/40 shadow-[0_-10px_35px_rgba(147,51,234,0.35)] flex items-center justify-between gap-4"
        aria-label="Barra fixa de compra rápida"
      >
        {/* Info do Produto e Preço */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-400 p-0.5 shadow-md shrink-0">
            <img 
              src={customImages.comboHero || comboPrintedImg} 
              alt="Miniatura do Combo Mapas do Dinheiro" 
              className="w-full h-full object-cover rounded-[10px]"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xs sm:text-sm text-white">
                Mapas do Dinheiro
              </span>
              <span className="hidden md:inline-block text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                ✓ 30 Mapas + 5 Bônus
              </span>
            </div>
            <div className="flex items-baseline gap-1 text-xs text-purple-200">
              <span>a partir de</span>
              <strong className="text-base sm:text-lg font-black text-[#FFC94D]">
                R$ 15,90
              </strong>
              <span className="hidden sm:inline text-slate-400">ou Completo por R$ 19,90</span>
            </div>
          </div>
        </div>

        {/* Botão de Compra em Destaque */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <span className="hidden lg:flex items-center gap-1.5 text-xs text-purple-200/90 font-medium">
            <span className="text-[#06B6D4]">🛡️</span> 7 Dias de Garantia
          </span>
          <a 
            href="#planos"
            className="py-2.5 sm:py-3 px-5 sm:px-7 btn-tech-hot btn-tech-pulse text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl shadow-lg"
          >
            COMPRAR AGORA →
          </a>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          15. DIÁLOGO DE UPGRADE / CHECKOUT
      ════════════════════════════════════════════════════════════════════ */}
      <UpgradeDialog
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        onUpgrade={() => {
          setShowUpgradeModal(false);
          handleCheckoutRedirect(CHECKOUT_COMPLETE_URL, 'Mapas do Dinheiro Completo', '19,90');
        }}
        onContinueBasic={() => {
          setShowUpgradeModal(false);
          handleCheckoutRedirect(CHECKOUT_ESSENTIAL_URL, 'Mapas do Dinheiro Essencial', '15,90');
        }}
      />

      {/* ═══════════════════════════════════════════════════════════════════
          16. MODAL LIGHTBOX DE ZOOM DO MAPA
      ════════════════════════════════════════════════════════════════════ */}
      <MapLightboxModal
        boardData={selectedBoard}
        onClose={() => setSelectedBoard(null)}
        onSelectBoard={(board) => setSelectedBoard(board)}
        customImages={customImages.maps}
      />

      {/* MODAL LEGAL (TERMOS E PRIVACIDADE) */}
      <LegalModal
        isOpen={!!legalModalType}
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      {/* MODAL GERENCIADOR DE IMAGENS (ADMIN) */}
      <ImageManagerModal
        isOpen={showImageManager}
        onClose={() => setShowImageManager(false)}
        config={customImages}
        onSaveConfig={handleSaveCustomImages}
      />

    </div>
  );
}
