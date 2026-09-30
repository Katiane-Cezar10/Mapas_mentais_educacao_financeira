import React from 'react';
import { ATTACHED_MAPS_LIST, NeuromapBoard, NeuromapBoardData } from './NeuromapBoard';

interface ContinuousMarqueeProps {
  onSelectBoard: (board: NeuromapBoardData) => void;
  customImages?: Record<number, string>;
}

export const ContinuousMarquee: React.FC<ContinuousMarqueeProps> = ({
  onSelectBoard,
  customImages = {},
}) => {
  // Duplicar para loop contínuo e infinito
  const loopTrack1 = [...ATTACHED_MAPS_LIST, ...ATTACHED_MAPS_LIST];
  const loopTrack2 = [...ATTACHED_MAPS_LIST.slice().reverse(), ...ATTACHED_MAPS_LIST.slice().reverse()];

  return (
    <div className="space-y-6 overflow-hidden py-4 select-none marquee-pause-hover">
      
      {/* Faixa 1: Movimento Contínuo para a Esquerda */}
      <div 
        className="relative overflow-hidden w-full"
        aria-label="Primeira faixa com pranchas oficiais em movimento contínuo para a esquerda"
      >
        <div className="animate-marquee-left flex gap-5">
          {loopTrack1.map((board, index) => (
            <figure
              key={`track1-${board.id}-${index}`}
              className="w-[320px] sm:w-[420px] shrink-0 group cursor-pointer transition-transform hover:-translate-y-1.5"
              onClick={() => onSelectBoard(board)}
            >
              <div className="rounded-2xl border border-purple-200/70 shadow-lg group-hover:border-cyan-400 group-hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] transition-all overflow-hidden bg-white">
                <NeuromapBoard
                  boardId={board.id}
                  showZoomHint={false}
                  customImage={customImages[board.id]}
                />
              </div>
              <figcaption className="mt-2 text-center text-xs font-black text-purple-900 group-hover:text-purple-600 transition-colors flex items-center justify-center gap-1.5">
                <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded text-[10px] uppercase font-bold">{board.code}</span>
                <span>{board.title} · Toque para ampliar</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Faixa 2: Movimento Contínuo para a Direita */}
      <div 
        className="relative overflow-hidden w-full"
        aria-label="Segunda faixa com pranchas oficiais em movimento contínuo para a direita"
      >
        <div className="animate-marquee-right flex gap-5">
          {loopTrack2.map((board, index) => (
            <figure
              key={`track2-${board.id}-${index}`}
              className="w-[320px] sm:w-[420px] shrink-0 group cursor-pointer transition-transform hover:-translate-y-1.5"
              onClick={() => onSelectBoard(board)}
            >
              <div className="rounded-2xl border border-purple-200/70 shadow-lg group-hover:border-purple-400 group-hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition-all overflow-hidden bg-white">
                <NeuromapBoard
                  boardId={board.id}
                  showZoomHint={false}
                  customImage={customImages[board.id]}
                />
              </div>
              <figcaption className="mt-2 text-center text-xs font-black text-purple-900 group-hover:text-purple-600 transition-colors flex items-center justify-center gap-1.5">
                <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded text-[10px] uppercase font-bold">{board.code}</span>
                <span>{board.title} · Toque para ampliar</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

    </div>
  );
};

