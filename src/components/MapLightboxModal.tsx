import React, { useEffect } from 'react';
import { ATTACHED_MAPS_LIST, NeuromapBoard, NeuromapBoardData } from './NeuromapBoard';

interface MapLightboxModalProps {
  boardData: NeuromapBoardData | null;
  onClose: () => void;
  onSelectBoard: (board: NeuromapBoardData) => void;
  customImages?: Record<number, string>;
}

export const MapLightboxModal: React.FC<MapLightboxModalProps> = ({
  boardData,
  onClose,
  onSelectBoard,
  customImages = {},
}) => {
  useEffect(() => {
    if (!boardData) return;

    if (typeof window !== 'undefined') {
      console.log('[Analytics Event: ViewContent]', {
        content_name: boardData.title,
        content_category: boardData.category,
        content_id: boardData.code,
      });
      window.dispatchEvent(
        new CustomEvent('analytics_view_content', {
          detail: { boardCode: boardData.code, title: boardData.title },
        })
      );
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [boardData, onClose]);

  if (!boardData) return null;

  const currentIndex = ATTACHED_MAPS_LIST.findIndex((m) => m.id === boardData.id);
  const prevBoard = currentIndex > 0 ? ATTACHED_MAPS_LIST[currentIndex - 1] : null;
  const nextBoard = currentIndex < ATTACHED_MAPS_LIST.length - 1 ? ATTACHED_MAPS_LIST[currentIndex + 1] : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-4xl max-h-[94vh] flex flex-col bg-[#0E021F] rounded-3xl border-2 border-purple-500/40 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#180630] border-b border-purple-500/30">
          <div className="flex items-center gap-3">
            <span className="bg-purple-600 text-white font-mono font-black px-2.5 py-1 rounded-lg text-xs shadow-sm">
              {boardData.code}
            </span>
            <div>
              <h3 className="font-black text-white text-sm sm:text-base leading-tight">
                {boardData.title}
              </h3>
              <p className="text-xs text-purple-300 font-medium">
                {boardData.category} · Visualização em Alta Resolução
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-purple-900/60 hover:bg-purple-800 text-purple-200 hover:text-white font-black transition-colors"
            aria-label="Fechar visualização"
          >
            ✕
          </button>
        </div>

        {/* Modal Body with Neuromap Board */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#070112] flex flex-col items-center">
          <div className="w-full max-w-3xl rounded-2xl overflow-hidden bg-white shadow-2xl">
            <NeuromapBoard
              boardId={boardData.id}
              showZoomHint={false}
              customImage={customImages[boardData.id]}
            />
          </div>

          <div className="mt-4 max-w-2xl w-full bg-purple-950/70 border border-purple-500/30 rounded-2xl p-3.5 text-xs text-purple-200 flex items-start gap-2.5 shadow-md">
            <span className="text-base shrink-0">💡</span>
            <div>
              <strong className="text-white">Como aplicar este mapa:</strong> {boardData.tagline} No combo completo, você recebe o PDF em alta definição para celular e o arquivo pronto para impressão em folha A4 com alta nitidez vetorial.
            </div>
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-[#180630] border-t border-purple-500/30">
          <div className="flex items-center gap-2">
            {prevBoard && (
              <button
                onClick={() => onSelectBoard(prevBoard)}
                className="px-3 py-1.5 text-xs font-bold rounded-lg border border-purple-500/40 text-purple-200 hover:bg-purple-900/50 hover:text-white transition-all duration-200 ease-out hover:scale-105 active:scale-95 cursor-pointer"
              >
                ← {prevBoard.code}
              </button>
            )}
            {nextBoard && (
              <button
                onClick={() => onSelectBoard(nextBoard)}
                className="px-3 py-1.5 text-xs font-bold rounded-lg border border-purple-500/40 text-purple-200 hover:bg-purple-900/50 hover:text-white transition-all duration-200 ease-out hover:scale-105 active:scale-95 cursor-pointer"
              >
                {nextBoard.code} →
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="text-xs text-purple-400 hover:text-white font-medium"
            >
              Voltar à página
            </button>
            <a
              href="https://pay.hotmart.com/E107840982R?bid=1790938404280"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="px-5 py-2.5 btn-tech-hot text-xs sm:text-sm font-black uppercase rounded-xl tracking-wider"
            >
              Quero todos os 30 mapas no Pacote Completo →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
