import React, { useState } from 'react';
import { MODULES_CURRICULUM } from './data/mapsData';
import { ATTACHED_MAPS_LIST, NeuromapBoard, NeuromapBoardData } from './components/NeuromapBoard';
import { ContinuousMarquee } from './components/ContinuousMarquee';
import { TestimonialsMarquee } from './components/TestimonialsMarquee';
import { UpgradeDialog } from './components/UpgradeDialog';
import { MapLightboxModal } from './components/MapLightboxModal';
import { LegalModal } from './components/LegalModals';
import { ImageManagerModal } from './components/ImageManagerModal';
import { TrustBadges } from './components/TrustBadges';
import { getStoredImages, initStoredImages, saveStoredImages, CustomImagesConfig } from './data/customImagesStore';

// Fotos dos combos e vitrines visuais
import comboBundleImg from './assets/images/mind_maps_combo_bundle_1790724777833.jpg';
import comboPrintedImg from './assets/images/mind_maps_printed_combo_1790724790856.jpg';
import moneymapEcosystemImg from './assets/maps/moneymap-ecossistema-completo.png';
import learningWithoutClassesImg from './assets/images/learning_without_classes_1790768686311.jpg';
import mobileQuickLearningImg from './assets/images/mobile_quick_learning_1790768696715.jpg';
import chatgptNaveguePranchasImg from './assets/images/chatgpt-image-30-de-set-de-2026-09-21-27.png';
import bonus01ChecklistImg from './assets/images/bonus-01-checklist-30-dias.jpg';
import bonus02ManualErrosImg from './assets/images/bonus-02-manual-10-piores-erros.jpg';
import bonus03GuiaIRImg from './assets/images/bonus-03-guia-ir-descomplicado.jpg';
import bonus04ChatGPTImg from './assets/images/bonus-04-chatgpt-financas.jpg';
import bonus05QuadroMetasImg from './assets/images/bonus-05-quadro-metas.jpg';

// =========================================================================
// CONFIGURAÇÕES DO PRODUTO & LINKS DE CHECKOUT (EDITE AQUI)
// =========================================================================
const CHECKOUT_ESSENTIAL_URL = "https://pay.hotmart.com/Q107860731W";
const CHECKOUT_COMPLETE_URL = "https://pay.hotmart.com/E107840982R?bid=1790938404280";
export const HOTMART_CHECKOUT_URL = "https://pay.hotmart.com/E107840982R?bid=1790938404280";

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
    // Carrega do IndexedDB com capacidade ilimitada para fotos de alta resolução
    initStoredImages((loaded) => {
      setCustomImages({ ...loaded });
    });

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

  // Upload rápido e direto da foto do ecossistema MoneyMap
  const handleShowcaseUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      let finalUrl = dataUrl;

      try {
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filename: `${Date.now()}_${file.name}`,
            dataUrl,
          }),
        });
        if (uploadRes.ok) {
          const json = await uploadRes.json();
          if (json.url) {
            finalUrl = json.url;
          }
        }
      } catch (err) {
        console.warn('Fallback para IndexedDB:', err);
      }

      const newConfig: CustomImagesConfig = {
        ...customImages,
        bundleShowcase: finalUrl,
      };
      setCustomImages(newConfig);
      saveStoredImages(newConfig);
      setCheckoutNotice('Foto do ecossistema MoneyMap atualizada com sucesso!');
      setTimeout(() => setCheckoutNotice(null), 3500);
    };
    reader.readAsDataURL(file);
  };

  const handlePranchasShowcaseUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      let finalUrl = dataUrl;

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename: `${Date.now()}_${file.name}`, dataUrl }),
        });
        if (res.ok) {
          const json = await res.json();
          if (json.url) finalUrl = json.url;
        }
      } catch (err) {
        console.warn('Fallback para cache local');
      }

      const newConfig: CustomImagesConfig = {
        ...customImages,
        pranchasShowcase: finalUrl,
      };
      setCustomImages(newConfig);
      saveStoredImages(newConfig);
      setCheckoutNotice('Foto da seção "Navegue pelas pranchas oficiais" atualizada com sucesso!');
      setTimeout(() => setCheckoutNotice(null), 3500);
    };
    reader.readAsDataURL(file);
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
          href={CHECKOUT_COMPLETE_URL}
          target="_blank"
          rel="noopener noreferrer"
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

          {/* ECOSSISTEMA COMPLETO MONEYMAP - NO TOPO DA PÁGINA LOGO APÓS O TÍTULO */}
          <div className="my-8 max-w-5xl mx-auto text-left">
            <div className="glass-tech-purple rounded-3xl p-3 sm:p-5 border-2 border-purple-400/40 shadow-[0_0_40px_rgba(168,85,247,0.25)] relative group overflow-hidden">
              
              {/* Badges superiores flutuantes */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 sm:p-4 mb-2 bg-[#1A0735]/90 rounded-2xl border border-purple-500/30">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs sm:text-sm font-black text-white">
                    Ecossistema Completo MoneyMap
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] sm:text-xs font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 px-2.5 py-0.5 rounded-full">
                    📱 Tablet + Celular + Folhas A4
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold text-amber-300 bg-amber-950/80 border border-amber-500/40 px-2.5 py-0.5 rounded-full">
                    ⏱️ Domine em 5 Minutos
                  </span>
                </div>
              </div>

              {/* Imagem do Showcase Multi-Dispositivo com o Anexo 1 */}
              <div className="rounded-2xl overflow-hidden relative">
                <img 
                  src={
                    (customImages.bundleShowcase && customImages.bundleShowcase.startsWith('/uploads/') && !customImages.bundleShowcase.includes('08_38_35'))
                      ? customImages.bundleShowcase 
                      : moneymapEcosystemImg
                  } 
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = moneymapEcosystemImg;
                  }}
                  alt="Ecossistema MoneyMap - 30 Mapas Mentais completos em Tablet, Smartphone e Pranchas Impressas" 
                  className="w-full h-auto object-cover rounded-2xl transform group-hover:scale-[1.01] transition-transform duration-700"
                />
              </div>

              {/* Faixa inferior de síntese neuro-visual */}
              <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-purple-950/90 via-[#19062E] to-purple-950/90 border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-400/40 flex items-center justify-center text-xl shrink-0">
                    🧠
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white">
                      Por que o cérebro absorve tão rápido?
                    </h4>
                    <p className="text-xs text-purple-200/80">
                      O cérebro humano processa elementos visuais e ícones 60.000 vezes mais rápido que blocos de texto ou planilhas.
                    </p>
                  </div>
                </div>
                <a
                  href={CHECKOUT_COMPLETE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-[#06B6D4] hover:bg-[#22D3EE] text-slate-950 text-xs font-black uppercase tracking-wider transition-all shrink-0 shadow-lg shadow-cyan-500/20"
                >
                  Garantir Meus Mapas →
                </a>
              </div>

            </div>
          </div>

          {/* Amostra Rápida Interativa de Pranchas Oficiais */}
          <div className="max-w-4xl mx-auto my-6 text-left">
            <div className="glass-tech-purple rounded-2xl p-4 border border-purple-400/30 tech-neon-glow">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-purple-500/20">
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    onClick={() => setHeroBoardId(2)}
                    className={`text-[10px] sm:text-xs font-black px-2.5 py-1.5 rounded-lg transition-all duration-200 ease-out hover:scale-105 active:scale-95 cursor-pointer ${
                      heroBoardId === 2
                        ? 'bg-[#06B6D4] text-slate-950 shadow-sm font-extrabold scale-105'
                        : 'text-purple-300 hover:text-white bg-purple-900/40 hover:bg-purple-800/60'
                    }`}
                  >
                    MAPA 002: Reserva
                  </button>
                  <button
                    onClick={() => setHeroBoardId(3)}
                    className={`text-[10px] sm:text-xs font-black px-2.5 py-1.5 rounded-lg transition-all duration-200 ease-out hover:scale-105 active:scale-95 cursor-pointer ${
                      heroBoardId === 3
                        ? 'bg-[#06B6D4] text-slate-950 shadow-sm font-extrabold scale-105'
                        : 'text-purple-300 hover:text-white bg-purple-900/40 hover:bg-purple-800/60'
                    }`}
                  >
                    MAPA 003: Orçamento
                  </button>
                  <button
                    onClick={() => setHeroBoardId(4)}
                    className={`text-[10px] sm:text-xs font-black px-2.5 py-1.5 rounded-lg transition-all duration-200 ease-out hover:scale-105 active:scale-95 cursor-pointer ${
                      heroBoardId === 4
                        ? 'bg-[#06B6D4] text-slate-950 shadow-sm font-extrabold scale-105'
                        : 'text-purple-300 hover:text-white bg-purple-900/40 hover:bg-purple-800/60'
                    }`}
                  >
                    MAPA 004: Dívidas
                  </button>
                  <button
                    onClick={() => setHeroBoardId(5)}
                    className={`text-[10px] sm:text-xs font-black px-2.5 py-1.5 rounded-lg transition-all duration-200 ease-out hover:scale-105 active:scale-95 cursor-pointer ${
                      heroBoardId === 5
                        ? 'bg-[#06B6D4] text-slate-950 shadow-sm font-extrabold scale-105'
                        : 'text-purple-300 hover:text-white bg-purple-900/40 hover:bg-purple-800/60'
                    }`}
                  >
                    MAPA 005: Patrimônio
                  </button>
                  <button
                    onClick={() => setHeroBoardId(1)}
                    className={`text-[10px] sm:text-xs font-black px-2.5 py-1.5 rounded-lg transition-all duration-200 ease-out hover:scale-105 active:scale-95 cursor-pointer ${
                      heroBoardId === 1
                        ? 'bg-[#A855F7] text-white shadow-sm font-extrabold scale-105'
                        : 'text-purple-300 hover:text-white bg-purple-900/40 hover:bg-purple-800/60'
                    }`}
                  >
                    MAPA 001
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
                  key={`hero-board-${currentHeroBoard.id}`}
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

          {/* CTA Principal de Alta Conversão */}
          <div className="pt-2 max-w-lg mx-auto">
            <a 
              href={CHECKOUT_COMPLETE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-block py-4 px-8 btn-tech-hot btn-tech-pulse text-base sm:text-lg font-black uppercase tracking-wider text-center"
            >
              QUERO OS MAPAS MENTAIS AGORA →
            </a>
            
            {/* Selos de Confiança abaixo do botão de compra do Hero */}
            <TrustBadges variant="inline" />

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
              Carrossel de Mapas Mentais
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Deslize pelas pranchas ou toque em qualquer mapa para inspecionar em tela cheia com alta resolução:
            </p>
          </header>

          {/* Carrossel Duplo em Movimento Contínuo */}
          <ContinuousMarquee 
            onSelectBoard={(board) => setSelectedBoard(board)}
            customImages={customImages.maps}
          />

          <div className="text-center mt-6">
            <a 
              href={CHECKOUT_COMPLETE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-purple-700 hover:text-purple-950 underline"
            >
              Liberar a coleção completa de 30 mapas mentais no checkout →
            </a>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          NOVA SEÇÃO: APRENDA FINANÇAS EM MINUTOS — SEM AULAS LONGAS E CANSATIVAS
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-[#090114] via-[#150426] to-[#0E021F] text-white border-b border-purple-500/20 relative overflow-hidden" id="metodologia">
        
        {/* Glows de ambiente neon */}
        <div className="absolute left-1/4 top-10 w-96 h-96 bg-purple-600/20 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute right-1/4 bottom-10 w-96 h-96 bg-cyan-600/15 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          
          {/* Cabeçalho de Alto Impacto */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-[#06B6D4] bg-cyan-950/80 border border-cyan-500/40 px-4 py-1 rounded-full inline-block mb-3 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              ⚡ O FIM DAS AULAS TEÓRICAS DE 60 HORAS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Aprenda finanças em <span className="bg-gradient-to-r from-[#FFC94D] via-[#F472B6] to-[#06B6D4] bg-clip-text text-transparent">5 minutos</span>, não em semanas de aulas cansativas
            </h2>
            <p className="text-sm sm:text-base text-purple-200/90 mt-4 leading-relaxed font-body">
              Você já tentou assistir a cursos com dezenas de horas ou preencher planilhas cheias de fórmulas que travam a mente? A neurociência explica por que 88% das pessoas desistem: o cérebro rejeita sobrecarga teórica. Com o método visual, você bate o olho e age imediatamente.
            </p>
          </div>

          {/* Destaque: Grid com 2 Fotos de Aplicação na Vida Real */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-stretch">
            
            {/* Card com Foto 1: Estudo Tranquilo sem Aulas Cansativas */}
            <div className="glass-tech-purple rounded-3xl p-6 border border-purple-400/30 flex flex-col justify-between shadow-xl">
              <div>
                <div className="rounded-2xl overflow-hidden border border-purple-400/30 mb-5 relative group">
                  <img 
                    src={learningWithoutClassesImg} 
                    alt="Pessoa estudando finanças de forma rápida com mapas impressos e café" 
                    className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#0A0116]/85 backdrop-blur-md px-3 py-1 rounded-full border border-purple-500/40 text-[11px] font-black text-[#FFC94D] flex items-center gap-1.5">
                    <span>☕</span> ESTUDO SEM ESTRESSE
                  </div>
                  <div className="absolute bottom-3 right-3 bg-purple-950/90 backdrop-blur-md px-2.5 py-0.5 rounded-md text-[10px] font-bold text-purple-200 border border-purple-500/40">
                    0 Aulas Longas · 100% Visual
                  </div>
                </div>

                <h3 className="text-xl font-black text-white mb-2">
                  1 Prancha Visual = Semanas de Vídeo-Aulas
                </h3>
                <p className="text-xs sm:text-sm text-purple-200/85 leading-relaxed font-body mb-4">
                  Cursos comuns enrolam com introduções intermináveis e fórmulas difíceis. Com os Mapas do Dinheiro, cada tema tem início, meio e fim em uma única página diagramada. Você senta com uma xícara de café e em 5 minutos domina o que levaria semanas para compreender.
                </p>

                <ul className="text-xs text-purple-100 space-y-2 mb-4 font-medium">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">✓</span> Elimina a procrastinação e o medo de mexer no dinheiro
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">✓</span> Passo a passo numerado de 1 a 8 pronto para agir hoje
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">✓</span> Perfeito para quem tem rotina corrida e pouco tempo
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-purple-500/20 flex items-center justify-between text-xs text-purple-300">
                <span className="font-semibold">Sem termos em inglês difíceis</span>
                <span className="font-black text-cyan-300">Linguagem 100% Simples</span>
              </div>
            </div>

            {/* Card com Foto 2: Consulta Imediata na Palma da Mão */}
            <div className="glass-tech-purple rounded-3xl p-6 border border-purple-400/30 flex flex-col justify-between shadow-xl">
              <div>
                <div className="rounded-2xl overflow-hidden border border-purple-400/30 mb-5 relative group">
                  <img 
                    src={mobileQuickLearningImg} 
                    alt="Uso do mapa mental no smartphone em 30 segundos no dia a dia" 
                    className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#0A0116]/85 backdrop-blur-md px-3 py-1 rounded-full border border-purple-500/40 text-[11px] font-black text-cyan-300 flex items-center gap-1.5">
                    <span>📱</span> CONSULTA EM 30 SEGUNDOS
                  </div>
                  <div className="absolute bottom-3 right-3 bg-purple-950/90 backdrop-blur-md px-2.5 py-0.5 rounded-md text-[10px] font-bold text-purple-200 border border-purple-500/40">
                    Acesso Rápido no Celular
                  </div>
                </div>

                <h3 className="text-xl font-black text-white mb-2">
                  Decisões Seguras Antes de Gastar ou Investir
                </h3>
                <p className="text-xs sm:text-sm text-purple-200/85 leading-relaxed font-body mb-4">
                  Surgiu uma dúvida no mercado, na fila do banco ou antes de fechar um parcelamento? Em vez de tentar lembrar o que um professor falou num vídeo de 50 minutos, abra o PDF no celular e confira a regra visual exata em menos de meio minuto.
                </p>

                <ul className="text-xs text-purple-100 space-y-2 mb-4 font-medium">
                  <li className="flex items-center gap-2">
                    <span className="text-cyan-400 font-bold">✓</span> Resposta imediata para decisões financeiras no dia a dia
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-cyan-400 font-bold">✓</span> Funciona offline, direto nos seus arquivos ou WhatsApp
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-cyan-400 font-bold">✓</span> Diagramação nítida com zoom em alta resolução sem perda
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-purple-500/20 flex items-center justify-between text-xs text-purple-300">
                <span className="font-semibold">Sempre no seu bolso</span>
                <span className="font-black text-emerald-300">Proteção Anti-Impulso</span>
              </div>
            </div>

          </div>

          {/* Destaque 3: Tabela Comparativa Visual (Cursos Longos vs. Mapas do Dinheiro) */}
          <div className="glass-tech-purple rounded-3xl p-6 sm:p-8 border-2 border-purple-400/30 shadow-2xl">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs font-black uppercase tracking-wider text-purple-300 bg-purple-900/60 border border-purple-500/30 px-3 py-0.5 rounded-full">
                COMPARAÇÃO DIRETA
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-2">
                Cursos Longos Tradicionais vs. Método MoneyMap
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Lado Esquerdo: O jeito antigo e exaustivo */}
              <div className="rounded-2xl p-5 bg-rose-950/30 border border-rose-500/30 space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-rose-500/30">
                  <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 font-black text-xs flex items-center justify-center">✕</span>
                  <h4 className="text-sm font-black text-rose-200">Cursos Tradicionais de Finanças</h4>
                </div>
                <ul className="text-xs text-rose-100/90 space-y-2.5">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold shrink-0">✕</span>
                    <span><strong>40 a 80 horas de vídeo</strong> difíceis de encaixar na rotina de quem trabalha.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold shrink-0">✕</span>
                    <span><strong>Planilhas gigantescas de Excel</strong> que travam e ninguém atualiza.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold shrink-0">✕</span>
                    <span><strong>Jargões do mercado financeiro</strong> que dão sensação de incapacidade.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold shrink-0">✕</span>
                    <span><strong>Preço alto</strong>: costumam custar entre R$ 297,00 e R$ 997,00.</span>
                  </li>
                </ul>
              </div>

              {/* Lado Direito: A revolução neuro-visual */}
              <div className="rounded-2xl p-5 bg-emerald-950/40 border-2 border-emerald-400/50 space-y-3 shadow-[0_0_25px_rgba(16,185,129,0.15)]">
                <div className="flex items-center gap-2 pb-2 border-b border-emerald-500/30">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 font-black text-xs flex items-center justify-center">✓</span>
                  <h4 className="text-sm font-black text-emerald-200">Método Visual Mapas do Dinheiro</h4>
                </div>
                <ul className="text-xs text-emerald-100 space-y-2.5 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold shrink-0">✓</span>
                    <span><strong>5 minutos por mapa</strong>: síntese visual de alto impacto direto ao ponto.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold shrink-0">✓</span>
                    <span><strong>Na palma da mão ou impresso</strong>: consulte sem precisar ligar o computador.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold shrink-0">✓</span>
                    <span><strong>Passo a passo 1, 2, 3...</strong> com ícones claros para você agir na hora.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold shrink-0">✓</span>
                    <span><strong>Preço acessível a todos</strong>: por apenas R$ 15,90 (pagamento único).</span>
                  </li>
                </ul>
              </div>

            </div>

            <div className="mt-6 pt-6 border-t border-purple-500/20 text-center">
              <a
                href={CHECKOUT_COMPLETE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 py-4 px-8 btn-tech-hot text-xs sm:text-sm font-black uppercase tracking-wider rounded-2xl shadow-xl"
              >
                QUERO APRENDER FINANÇAS DE FORMA RÁPIDA E VISUAL →
              </a>
            </div>

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

          {/* ═════════════════════════════════════════════════════════════════
              PARTE ESTÁTICA: NAVEGUE PELAS PRANCHAS OFICIAIS POR DENTRO
          ══════════════════════════════════════════════════════════════════ */}
          <div className="mt-16 pt-12 border-t border-purple-500/30" id="amostras-estaticas">
            <header className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs font-black uppercase tracking-wider text-[#06B6D4] bg-cyan-950/70 border border-cyan-500/40 px-3.5 py-1 rounded-full inline-block mb-2 shadow-sm">
                TECNOLOGIA VISUAL DE APRENDIZADO
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                Navegue pelas pranchas oficiais por dentro
              </h2>
              <p className="text-sm sm:text-base text-purple-200/80 mt-2">
                Veja o impacto do método neuro-visual na prática: compare o método tradicional com o MoneyMap.
              </p>
            </header>

            {/* Imagem Original Anexada em Destaque */}
            <div className="max-w-5xl mx-auto mb-8">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-purple-500/20">
                <span className="text-xs text-purple-200 font-bold flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#06B6D4] animate-ping" />
                  <span>Por que o cérebro absorve tão rápido? — Sem Mapa Mental vs Com o MoneyMap</span>
                </span>
              </div>

              <div className="rounded-2xl border-2 border-purple-400/40 shadow-[0_0_35px_rgba(168,85,247,0.3)] overflow-hidden bg-[#0A0116]">
                <img
                  src={customImages.pranchasShowcase || chatgptNaveguePranchasImg}
                  alt="Navegue pelas pranchas oficiais por dentro - Por que o cérebro absorve tão rápido? Sem Mapa Mental vs Com o MoneyMap"
                  className="w-full h-auto object-contain cursor-pointer hover:scale-[1.01] transition-transform duration-500 rounded-2xl mx-auto"
                />
              </div>
            </div>

            {/* Seletor Interativo das 5 Pranchas Oficiais para Consulta Detalhada */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8 max-w-4xl mx-auto">
              {ATTACHED_MAPS_LIST.map((board) => (
                <button
                  key={board.id}
                  onClick={() => setActiveBoardTab(board.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all duration-200 ease-out hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 border select-none ${
                    activeBoardTab === board.id
                      ? 'bg-[#06B6D4] text-slate-950 border-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-105 font-black'
                      : 'bg-[#180630] text-purple-200 border-purple-500/40 hover:border-purple-300 hover:text-white hover:bg-purple-900/40'
                  }`}
                >
                  <span className="font-mono bg-purple-500/30 text-purple-300 px-1.5 py-0.5 rounded text-[10px]">
                    {board.code}
                  </span>
                  <span>{board.title}</span>
                </button>
              ))}
            </div>

            <div className="text-center mt-6">
              <a 
                href={CHECKOUT_COMPLETE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 py-3 px-6 btn-tech-hot text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl shadow-lg"
              >
                Liberar a coleção completa de 30 mapas mentais no checkout →
              </a>
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
                
                {/* Imagem do Bônus 1 */}
                <div className="rounded-xl overflow-hidden border border-purple-400/30 mb-4 bg-[#0A0116] shadow-md group">
                  <img
                    src={bonus01ChecklistImg}
                    alt="Bônus 01: Checklist do Plano de 30 Dias"
                    className="w-full h-52 sm:h-56 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>

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

                {/* Imagem do Bônus 2 */}
                <div className="rounded-xl overflow-hidden border border-purple-400/30 mb-4 bg-[#0A0116] shadow-md group">
                  <img
                    src={bonus02ManualErrosImg}
                    alt="Bônus 02: Manual dos 10 Piores Erros"
                    className="w-full h-52 sm:h-56 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>

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

                {/* Imagem do Bônus 3 */}
                <div className="rounded-xl overflow-hidden border border-purple-400/30 mb-4 bg-[#0A0116] shadow-md group">
                  <img
                    src={bonus03GuiaIRImg}
                    alt="Bônus 03: Guia do IR Descomplicado"
                    className="w-full h-52 sm:h-56 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>

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

                {/* Imagem do Bônus 4 */}
                <div className="rounded-xl overflow-hidden border border-cyan-400/40 mb-4 bg-[#0A0116] shadow-md group">
                  <img
                    src={bonus04ChatGPTImg}
                    alt="Bônus 04: ChatGPT para Finanças"
                    className="w-full h-52 sm:h-56 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>

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

                {/* Imagem do Bônus 5 */}
                <div className="rounded-xl overflow-hidden border border-fuchsia-400/40 mb-4 bg-[#0A0116] shadow-md group">
                  <img
                    src={bonus05QuadroMetasImg}
                    alt="Bônus 05: Quadro de Metas: Um 2027 de Conquistas"
                    className="w-full h-52 sm:h-56 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>

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

                <a
                  href={CHECKOUT_ESSENTIAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-block text-center py-4 px-6 btn-tech-ghost text-sm uppercase tracking-wide cursor-pointer"
                >
                  QUERO O PLANO ESSENCIAL
                </a>

                {/* Selos de Confiança abaixo do botão Essencial */}
                <div className="flex flex-wrap items-center justify-center gap-2.5 text-[10px] text-purple-300 font-bold mt-3.5 pt-2 border-t border-purple-500/20">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Compra Segura
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-cyan-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    Pagamento Criptografado
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-purple-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    Privacidade Garantida
                  </span>
                </div>
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

                    <a
                      href={CHECKOUT_COMPLETE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-block text-center py-5 px-6 btn-tech-hot btn-tech-pulse text-base sm:text-lg uppercase tracking-wide cursor-pointer"
                    >
                      QUERO O PACOTE COMPLETO →
                    </a>

                    {/* Selos de Confiança abaixo do botão do Pacote Completo */}
                    <div className="flex flex-wrap items-center justify-center gap-2.5 text-[10px] text-purple-200 font-bold mt-3.5 pt-2 border-t border-purple-500/30">
                      <span className="flex items-center gap-1 text-emerald-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Compra Segura
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-cyan-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        Pagamento Criptografado
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-purple-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                        Privacidade Garantida
                      </span>
                    </div>
                  </div>
                </article>
              </div>
            </div>

          </div>

          {/* ═══════════════════════════════════════════════════════════════════
              SEÇÃO COM SELOS DE CONFIANÇA ABAIXO DOS BOTÕES DE COMPRA
          ════════════════════════════════════════════════════════════════════ */}
          <TrustBadges variant="cards" />

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
            href={CHECKOUT_COMPLETE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full sm:w-auto py-5 px-8 btn-tech-hot btn-tech-pulse text-base sm:text-lg font-black uppercase tracking-wider"
          >
            QUERO ACESSAR OS MAPAS MENTAIS →
          </a>

          {/* Selos de Confiança abaixo do botão de compra final */}
          <TrustBadges variant="inline" className="max-w-lg mx-auto" />

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
          </div>
        </div>
      </footer>

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
            href={CHECKOUT_COMPLETE_URL}
            target="_blank"
            rel="noopener noreferrer"
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
