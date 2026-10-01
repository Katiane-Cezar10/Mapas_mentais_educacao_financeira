import React, { useRef, useState } from 'react';
import { ATTACHED_MAPS_LIST } from './NeuromapBoard';
import { CustomImagesConfig } from '../data/customImagesStore';

interface ImageManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: CustomImagesConfig;
  onSaveConfig: (newConfig: CustomImagesConfig) => void;
}

export const ImageManagerModal: React.FC<ImageManagerModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
}) => {
  const [activeTab, setActiveTab] = useState<'combos' | 'maps' | 'export'>('maps');
  const [localConfig, setLocalConfig] = useState<CustomImagesConfig>(() => ({
    comboHero: config.comboHero || '',
    comboPrinted: config.comboPrinted || '',
    comboDigital: config.comboDigital || '',
    maps: { ...config.maps },
  }));
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync if opened
  React.useEffect(() => {
    if (isOpen) {
      setLocalConfig({
        comboHero: config.comboHero || '',
        comboPrinted: config.comboPrinted || '',
        comboDigital: config.comboDigital || '',
        maps: { ...config.maps },
      });
    }
  }, [isOpen, config]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  if (!isOpen) return null;

  const compressImage = (dataUrl: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const MAX_WIDTH = 2000;
        const MAX_HEIGHT = 2000;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          if (width > height) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          } else {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.92));
        } else {
          resolve(dataUrl);
        }
      };
      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    });
  };

  const handleFileUpload = (
    file: File,
    onSuccess: (url: string) => void
  ) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione um arquivo de imagem válido (JPG, PNG ou WEBP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = async (e) => {
      const rawResult = e.target?.result as string;
      if (rawResult) {
        // Otimiza a resolução mantendo nitidez máxima
        const result = await compressImage(rawResult);

        // Tentar salvar no servidor de arquivos para manter leve e permanente
        try {
          const res = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              filename: `${Date.now()}_${file.name}`,
              dataUrl: result,
            }),
          });
          if (res.ok) {
            const data = await res.json();
            if (data.url) {
              onSuccess(data.url);
              showToast('✨ Foto salva e fixada com sucesso!');
              return;
            }
          }
        } catch (uploadErr) {
          console.warn('Fallback para DataURL local:', uploadErr);
        }
        // Fallback para IndexedDB / DataURL local
        onSuccess(result);
        showToast('Foto carregada e fixada com sucesso!');
      }
    };
    reader.readAsDataURL(file);
  };

  const setMapImage = (mapId: number, url: string | undefined) => {
    setLocalConfig((prev) => {
      const nextMaps = { ...prev.maps };
      if (url) {
        nextMaps[mapId] = url;
      } else {
        delete nextMaps[mapId];
      }
      return { ...prev, maps: nextMaps };
    });
  };

  const handleSaveAndPublish = () => {
    onSaveConfig(localConfig);
    showToast('✨ Fotos salvas com sucesso! A landing page agora exibe suas imagens.');
    setTimeout(() => {
      onClose();
    }, 600);
  };

  const handleCopyJson = () => {
    const jsonStr = JSON.stringify(localConfig, null, 2);
    navigator.clipboard.writeText(jsonStr);
    showToast('📋 Configuração copiada para a área de transferência!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#110323] border-2 border-purple-500/50 rounded-3xl shadow-[0_0_50px_rgba(168,85,247,0.35)] text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Toast Notificação Interna */}
        {toastMessage && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-[#1E0836] border-2 border-emerald-400 text-emerald-300 font-bold px-4 py-2 rounded-xl text-xs sm:text-sm shadow-xl flex items-center gap-2 animate-bounce">
            <span>✓</span> {toastMessage}
          </div>
        )}

        {/* Cabeçalho */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#1A0735] border-b border-purple-500/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#9333EA] to-[#06B6D4] flex items-center justify-center text-xl shadow-lg shrink-0">
              🖼️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-xl font-black text-white leading-tight">
                  Gerenciador de Imagens da Landing Page
                </h2>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-500/40 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <span>🔒</span> Fotos Fixadas & Protegidas
                </span>
              </div>
              <p className="text-xs text-purple-300">
                Suas fotos anexadas estão gravadas e fixadas na landing page de forma permanente.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-purple-900/60 hover:bg-purple-800 text-purple-200 flex items-center justify-center font-bold text-sm transition-colors"
            title="Fechar"
          >
            ✕
          </button>
        </div>

        {/* Abas de Navegação */}
        <div className="flex border-b border-purple-500/30 bg-[#140428] px-6 gap-2 pt-2">
          <button
            onClick={() => setActiveTab('maps')}
            className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-extrabold transition-all border-b-2 ${
              activeTab === 'maps'
                ? 'bg-[#1F083F] text-cyan-300 border-cyan-400 shadow-sm'
                : 'text-purple-300 hover:text-white border-transparent'
            }`}
          >
            🗺️ Fotos dos Mapas Mentais ({Object.keys(localConfig.maps).length} ativas)
          </button>
          <button
            onClick={() => setActiveTab('combos')}
            className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-extrabold transition-all border-b-2 ${
              activeTab === 'combos'
                ? 'bg-[#1F083F] text-cyan-300 border-cyan-400 shadow-sm'
                : 'text-purple-300 hover:text-white border-transparent'
            }`}
          >
            📸 Fotos dos Combos (Hero & Cards)
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-extrabold transition-all border-b-2 ${
              activeTab === 'export'
                ? 'bg-[#1F083F] text-cyan-300 border-cyan-400 shadow-sm'
                : 'text-purple-300 hover:text-white border-transparent'
            }`}
          >
            ⚙️ Exportar / Backup
          </button>
        </div>

        {/* Conteúdo com Scroll */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* ══════════════════════════════════════════════════════════════════
              ABA 1: MAPAS MENTAIS INDIVIDUAIS
          ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'maps' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-purple-950/60 border border-purple-500/30 text-xs text-purple-200">
                <strong className="text-white block mb-1">Como funciona a inserção das fotos nos mapas:</strong>
                Para cada mapa abaixo, você pode enviar o arquivo da sua foto (ou colar o link direto). Quando inserida, a foto substituirá o layout padrão e será exibida no Hero, na vitrine de amostras, no carrossel contínuo e no zoom de alta resolução!
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ATTACHED_MAPS_LIST.map((board) => {
                  const currentImg = localConfig.maps[board.id];
                  return (
                    <MapImageCard
                      key={board.id}
                      board={board}
                      currentImage={currentImg}
                      onImageChange={(img) => setMapImage(board.id, img)}
                      onFileUpload={handleFileUpload}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              ABA 2: FOTOS DOS COMBOS (HERO & CARDS)
          ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'combos' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-purple-950/60 border border-purple-500/30 text-xs text-purple-200">
                <strong className="text-white block mb-1">Fotos Oficiais do Combo:</strong>
                Personalize as imagens comerciais que aparecem no topo da página (Hero) e nos cards de apresentação dos formatos.
              </div>

              {/* 1. Combo Principal do Hero */}
              <div className="p-5 rounded-2xl bg-[#1A0735] border border-purple-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-black text-white">
                      Foto Principal do Combo (Hero / Capa Superior)
                    </h3>
                    <p className="text-xs text-purple-300">
                      Substitui a imagem que fica ao lado do título principal no topo da página.
                    </p>
                  </div>
                  {localConfig.comboHero ? (
                    <span className="text-[10px] font-black bg-emerald-950 border border-emerald-500/40 text-emerald-300 px-2.5 py-1 rounded-full">
                      ✓ Foto Personalizada Ativa
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold bg-purple-900/60 text-purple-300 px-2.5 py-1 rounded-full">
                      Padrão Oficial
                    </span>
                  )}
                </div>

                <ImageUploadRow
                  currentImage={localConfig.comboHero}
                  onImageChange={(url) => setLocalConfig((p) => ({ ...p, comboHero: url }))}
                  onFileUpload={handleFileUpload}
                  label="Foto Principal do Combo"
                />
              </div>

              {/* 2. Formato Impresso (Card 1) */}
              <div className="p-5 rounded-2xl bg-[#1A0735] border border-purple-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-black text-white">
                      Foto do Card "Formato Impresso & Caderno de Estudos"
                    </h3>
                    <p className="text-xs text-purple-300">
                      Foto exibida no card da seção #combos para quem prefere folhas A4 impressas.
                    </p>
                  </div>
                  {localConfig.comboPrinted ? (
                    <span className="text-[10px] font-black bg-emerald-950 border border-emerald-500/40 text-emerald-300 px-2.5 py-1 rounded-full">
                      ✓ Foto Personalizada Ativa
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold bg-purple-900/60 text-purple-300 px-2.5 py-1 rounded-full">
                      Padrão Oficial
                    </span>
                  )}
                </div>

                <ImageUploadRow
                  currentImage={localConfig.comboPrinted}
                  onImageChange={(url) => setLocalConfig((p) => ({ ...p, comboPrinted: url }))}
                  onFileUpload={handleFileUpload}
                  label="Foto Versão Impressa"
                />
              </div>

              {/* 3. Formato Digital (Card 2) */}
              <div className="p-5 rounded-2xl bg-[#1A0735] border border-purple-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-black text-white">
                      Foto do Card "Formato Digital Instantâneo"
                    </h3>
                    <p className="text-xs text-purple-300">
                      Foto exibida no card digital para dispositivos (celular e tablet).
                    </p>
                  </div>
                  {localConfig.comboDigital ? (
                    <span className="text-[10px] font-black bg-emerald-950 border border-emerald-500/40 text-emerald-300 px-2.5 py-1 rounded-full">
                      ✓ Foto Personalizada Ativa
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold bg-purple-900/60 text-purple-300 px-2.5 py-1 rounded-full">
                      Padrão Oficial
                    </span>
                  )}
                </div>

                <ImageUploadRow
                  currentImage={localConfig.comboDigital}
                  onImageChange={(url) => setLocalConfig((p) => ({ ...p, comboDigital: url }))}
                  onFileUpload={handleFileUpload}
                  label="Foto Versão Digital"
                />
              </div>

              {/* 4. Ecossistema Completo / Showcase Multi-Dispositivos */}
              <div className="p-5 rounded-2xl bg-[#1A0735] border border-cyan-500/40 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-black text-white flex items-center gap-2">
                      <span>⚡</span> Foto do Ecossistema Multi-Dispositivos (MoneyMap Showcase)
                    </h3>
                    <p className="text-xs text-purple-300">
                      Foto de destaque com Tablet, Smartphone e Pranchas completas, demonstrando o aprendizado rápido sem aulas longas.
                    </p>
                  </div>
                  {localConfig.bundleShowcase ? (
                    <span className="text-[10px] font-black bg-emerald-950 border border-emerald-500/40 text-emerald-300 px-2.5 py-1 rounded-full">
                      ✓ Foto Personalizada Ativa
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 px-2.5 py-1 rounded-full">
                      Padrão 3D Oficial
                    </span>
                  )}
                </div>

                <ImageUploadRow
                  currentImage={localConfig.bundleShowcase}
                  onImageChange={(url) => setLocalConfig((p) => ({ ...p, bundleShowcase: url }))}
                  onFileUpload={handleFileUpload}
                  label="Foto Ecossistema Multi-Dispositivos"
                />
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              ABA 3: EXPORTAR / BACKUP
          ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'export' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-purple-950/60 border border-purple-500/30 text-xs text-purple-200">
                <strong className="text-white block mb-1">Backup e Persistência das Imagens:</strong>
                As imagens são salvas automaticamente no armazenamento local do navegador para que estejam sempre prontas. Se desejar salvar um backup das URLs ou transferir para outro local, você pode copiar os dados abaixo.
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyJson}
                  className="px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2"
                >
                  <span>📋</span> Copiar Dados das Imagens (JSON)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Deseja realmente restaurar todas as imagens para o padrão original da página?')) {
                      setLocalConfig({ maps: {} });
                      showToast('Todas as imagens foram restauradas para o padrão.');
                    }
                  }}
                  className="px-4 py-2 bg-rose-950 border border-rose-500/40 hover:bg-rose-900 text-rose-300 rounded-xl text-xs font-bold transition-all"
                >
                  Restaurar Todas para o Padrão
                </button>
              </div>

              <textarea
                readOnly
                rows={8}
                value={JSON.stringify(localConfig, null, 2)}
                className="w-full bg-[#0B0117] border border-purple-500/30 rounded-xl p-3 font-mono text-xs text-purple-200 select-all"
              />
            </div>
          )}

        </div>

        {/* Barra Inferior com Ação de Salvar e Publicar */}
        <div className="px-6 py-4 bg-[#1A0735] border-t border-purple-500/30 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-purple-300">
            {Object.keys(localConfig.maps).length} mapa(s) com fotos configuradas.
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-purple-500/30 text-purple-300 hover:text-white text-xs font-bold transition-colors"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSaveAndPublish}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wide shadow-lg transition-all flex items-center gap-2"
            >
              <span>💾</span> Salvar e Publicar na Landing Page
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

// Componente individual para cada Mapa Mental
interface MapImageCardProps {
  board: { id: number; code: string; title: string; subtitle: string };
  currentImage?: string;
  onImageChange: (url: string | undefined) => void;
  onFileUpload: (file: File, onSuccess: (url: string) => void) => void;
}

const MapImageCard: React.FC<MapImageCardProps> = ({
  board,
  currentImage,
  onImageChange,
  onFileUpload,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [urlInput, setUrlInput] = useState('');

  return (
    <div className="p-4 rounded-2xl bg-[#180531] border border-purple-500/30 flex flex-col justify-between space-y-3">
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-mono text-[10px] font-black bg-purple-600/40 text-purple-300 border border-purple-400/30 px-2 py-0.5 rounded">
            {board.code}
          </span>
          {currentImage ? (
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-500/40 px-2 py-0.5 rounded-full flex items-center gap-1">
              <span>●</span> Foto Própria Ativa
            </span>
          ) : (
            <span className="text-[10px] font-bold text-purple-400 bg-purple-950/70 px-2 py-0.5 rounded-full">
              Layout Vetorial Padrão
            </span>
          )}
        </div>
        <h4 className="text-xs sm:text-sm font-black text-white leading-tight">
          {board.title}
        </h4>
        <p className="text-[11px] text-purple-300/80 line-clamp-1">
          {board.subtitle}
        </p>
      </div>

      {/* Miniatura de Prévia */}
      {currentImage && (
        <div className="relative w-full h-32 bg-white rounded-xl overflow-hidden border border-purple-200/60 flex items-center justify-center">
          <img
            src={currentImage}
            alt={board.title}
            className="w-full h-full object-contain"
          />
          <button
            type="button"
            onClick={() => onImageChange(undefined)}
            className="absolute top-2 right-2 bg-rose-600/80 hover:bg-rose-600 text-white rounded-md text-[10px] font-bold px-2 py-0.5 transition-colors"
          >
            Remover Foto
          </button>
        </div>
      )}

      {/* Ações de Upload / Link */}
      <div className="space-y-2 pt-1">
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              onFileUpload(file, (dataUrl) => onImageChange(dataUrl));
            }
          }}
        />

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 py-1.5 px-3 bg-purple-800/60 hover:bg-purple-700 border border-purple-500/30 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
          >
            <span>📁</span> Escolher Foto
          </button>

          {currentImage && (
            <button
              type="button"
              onClick={() => onImageChange(undefined)}
              className="py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium transition-colors"
            >
              Restaurar
            </button>
          )}
        </div>

        {/* Inserir link da imagem */}
        <div className="flex gap-1.5">
          <input
            type="text"
            placeholder="Ou cole o link da foto (URL)..."
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="flex-1 bg-[#0E021F] border border-purple-500/30 rounded-lg px-2.5 py-1 text-xs text-white placeholder-purple-400/50"
          />
          <button
            type="button"
            onClick={() => {
              if (urlInput.trim()) {
                onImageChange(urlInput.trim());
                setUrlInput('');
              }
            }}
            className="px-2.5 py-1 bg-cyan-700 hover:bg-cyan-600 text-white rounded-lg text-xs font-bold transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente para linha de upload de imagens gerais (Combos)
interface ImageUploadRowProps {
  currentImage?: string;
  onImageChange: (url: string | undefined) => void;
  onFileUpload: (file: File, onSuccess: (url: string) => void) => void;
  label: string;
}

const ImageUploadRow: React.FC<ImageUploadRowProps> = ({
  currentImage,
  onImageChange,
  onFileUpload,
  label,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [urlInput, setUrlInput] = useState('');

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      {/* Miniatura */}
      <div className="w-24 h-24 rounded-xl bg-white border border-purple-200/60 overflow-hidden flex items-center justify-center shrink-0">
        {currentImage ? (
          <img src={currentImage} alt={label} className="w-full h-full object-cover" />
        ) : (
          <span className="text-[10px] text-purple-400 text-center px-1">Padrão do Sistema</span>
        )}
      </div>

      <div className="flex-1 space-y-2 w-full">
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              onFileUpload(file, (dataUrl) => onImageChange(dataUrl));
            }
          }}
        />

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="py-1.5 px-3 bg-purple-700 hover:bg-purple-600 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <span>📁</span> Escolher do Dispositivo
          </button>

          {currentImage && (
            <button
              type="button"
              onClick={() => onImageChange(undefined)}
              className="py-1.5 px-3 bg-rose-950/70 hover:bg-rose-900 border border-rose-500/40 text-rose-300 rounded-lg text-xs font-bold transition-colors"
            >
              Restaurar Padrão
            </button>
          )}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ou cole a URL direta da imagem..."
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="flex-1 bg-[#0E021F] border border-purple-500/30 rounded-lg px-3 py-1.5 text-xs text-white placeholder-purple-400/50"
          />
          <button
            type="button"
            onClick={() => {
              if (urlInput.trim()) {
                onImageChange(urlInput.trim());
                setUrlInput('');
              }
            }}
            className="px-3 py-1.5 bg-cyan-700 hover:bg-cyan-600 text-white rounded-lg text-xs font-bold transition-colors"
          >
            Aplicar URL
          </button>
        </div>
      </div>
    </div>
  );
};
