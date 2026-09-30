import React from 'react';
import { MindMapData } from '../data/mapsData';

interface MindMapSVGProps {
  mapData: MindMapData;
  className?: string;
  isInteractive?: boolean;
  onExpand?: () => void;
  forceUnlocked?: boolean;
}

export const MindMapSVG: React.FC<MindMapSVGProps> = ({
  mapData,
  className = '',
  isInteractive = true,
  onExpand,
  forceUnlocked = false,
}) => {
  const isLocked = !mapData.isUnlockedPreview && !forceUnlocked;
  const numBranches = mapData.branches.length;

  // Branch layout slots tailored for clean spacing without overlapping
  // Coordinates based on viewBox 0 0 940 620
  const getBranchLayout = (index: number, total: number) => {
    if (total === 4) {
      const slots = [
        // 0: Top-Left
        {
          nodeX: 200, nodeY: 150, nodeW: 200, nodeH: 42,
          anchorX: 360, anchorY: 275,
          cp1X: 280, cp1Y: 260, cp2X: 220, cp2Y: 200,
          leafSide: 'left',
          leafStarts: [
            { x: 100, y: 80, textAnchor: 'start' },
            { x: 75, y: 125, textAnchor: 'start' },
            { x: 90, y: 175, textAnchor: 'start' }
          ]
        },
        // 1: Bottom-Left
        {
          nodeX: 200, nodeY: 460, nodeW: 200, nodeH: 42,
          anchorX: 360, anchorY: 345,
          cp1X: 280, cp1Y: 360, cp2X: 220, cp2Y: 420,
          leafSide: 'left',
          leafStarts: [
            { x: 80, y: 445, textAnchor: 'start' },
            { x: 70, y: 495, textAnchor: 'start' },
            { x: 95, y: 545, textAnchor: 'start' }
          ]
        },
        // 2: Top-Right
        {
          nodeX: 740, nodeY: 150, nodeW: 200, nodeH: 42,
          anchorX: 580, anchorY: 275,
          cp1X: 660, cp1Y: 260, cp2X: 720, cp2Y: 200,
          leafSide: 'right',
          leafStarts: [
            { x: 740, y: 80, textAnchor: 'start' },
            { x: 755, y: 125, textAnchor: 'start' },
            { x: 740, y: 175, textAnchor: 'start' }
          ]
        },
        // 3: Bottom-Right
        {
          nodeX: 740, nodeY: 460, nodeW: 200, nodeH: 42,
          anchorX: 580, anchorY: 345,
          cp1X: 660, cp1Y: 360, cp2X: 720, cp2Y: 420,
          leafSide: 'right',
          leafStarts: [
            { x: 745, y: 440, textAnchor: 'start' },
            { x: 755, y: 490, textAnchor: 'start' },
            { x: 735, y: 540, textAnchor: 'start' }
          ]
        }
      ];
      return slots[index];
    } else if (total === 3) {
      // 3 branches (e.g. Plano 90 dias)
      const slots = [
        {
          nodeX: 210, nodeY: 210, nodeW: 210, nodeH: 42,
          anchorX: 360, anchorY: 285,
          cp1X: 290, cp1Y: 285, cp2X: 240, cp2Y: 240,
          leafSide: 'left',
          leafStarts: [
            { x: 80, y: 150, textAnchor: 'start' },
            { x: 70, y: 200, textAnchor: 'start' },
            { x: 90, y: 250, textAnchor: 'start' }
          ]
        },
        {
          nodeX: 210, nodeY: 430, nodeW: 210, nodeH: 42,
          anchorX: 360, anchorY: 335,
          cp1X: 290, cp1Y: 335, cp2X: 240, cp2Y: 390,
          leafSide: 'left',
          leafStarts: [
            { x: 80, y: 395, textAnchor: 'start' },
            { x: 70, y: 445, textAnchor: 'start' },
            { x: 90, y: 495, textAnchor: 'start' }
          ]
        },
        {
          nodeX: 730, nodeY: 310, nodeW: 220, nodeH: 44,
          anchorX: 580, anchorY: 310,
          cp1X: 650, cp1Y: 310, cp2X: 700, cp2Y: 310,
          leafSide: 'right',
          leafStarts: [
            { x: 740, y: 235, textAnchor: 'start' },
            { x: 755, y: 295, textAnchor: 'start' },
            { x: 740, y: 355, textAnchor: 'start' }
          ]
        }
      ];
      return slots[index];
    } else {
      // 5 branches
      const slots = [
        // 0: Top-Left
        {
          nodeX: 220, nodeY: 130, nodeW: 190, nodeH: 40,
          anchorX: 370, anchorY: 280,
          cp1X: 290, cp1Y: 260, cp2X: 230, cp2Y: 180,
          leafSide: 'left',
          leafStarts: [
            { x: 95, y: 80, textAnchor: 'start' },
            { x: 80, y: 125, textAnchor: 'start' },
            { x: 90, y: 168, textAnchor: 'start' }
          ]
        },
        // 1: Bottom-Left
        {
          nodeX: 210, nodeY: 470, nodeW: 190, nodeH: 40,
          anchorX: 370, anchorY: 340,
          cp1X: 290, cp1Y: 360, cp2X: 230, cp2Y: 430,
          leafSide: 'left',
          leafStarts: [
            { x: 90, y: 450, textAnchor: 'start' },
            { x: 75, y: 495, textAnchor: 'start' },
            { x: 85, y: 540, textAnchor: 'start' }
          ]
        },
        // 2: Top-Right
        {
          nodeX: 720, nodeY: 130, nodeW: 190, nodeH: 40,
          anchorX: 570, anchorY: 280,
          cp1X: 650, cp1Y: 260, cp2X: 710, cp2Y: 180,
          leafSide: 'right',
          leafStarts: [
            { x: 735, y: 78, textAnchor: 'start' },
            { x: 745, y: 122, textAnchor: 'start' },
            { x: 730, y: 165, textAnchor: 'start' }
          ]
        },
        // 3: Bottom-Right
        {
          nodeX: 730, nodeY: 470, nodeW: 190, nodeH: 40,
          anchorX: 570, anchorY: 340,
          cp1X: 650, cp1Y: 360, cp2X: 710, cp2Y: 430,
          leafSide: 'right',
          leafStarts: [
            { x: 735, y: 450, textAnchor: 'start' },
            { x: 745, y: 495, textAnchor: 'start' },
            { x: 730, y: 540, textAnchor: 'start' }
          ]
        },
        // 4: Mid-Left or Mid-Right (Dívidas / Ação)
        {
          nodeX: 180, nodeY: 300, nodeW: 180, nodeH: 40,
          anchorX: 360, anchorY: 310,
          cp1X: 280, cp1Y: 310, cp2X: 220, cp2Y: 305,
          leafSide: 'left',
          leafStarts: [
            { x: 60, y: 265, textAnchor: 'start' },
            { x: 50, y: 310, textAnchor: 'start' },
            { x: 65, y: 355, textAnchor: 'start' }
          ]
        }
      ];
      return slots[index % slots.length];
    }
  };

  const renderIcon = (iconName: string, color: string) => {
    switch (iconName) {
      case 'wallet':
        return (
          <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        );
      case 'cart':
        return (
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4ZM3 6h18M16 10a4 4 0 0 1-8 0" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        );
      case 'piggy':
        return (
          <g stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8.7 3.3 2 4.3V19a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-1h4v1a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2.7c2-.7 3-2.3 3-4.3 0-1.5-1-3-2-3.5V5Z" />
            <path d="M16 9h.01" />
          </g>
        );
      case 'chart':
        return (
          <path d="M3 3v18h18M7 14l4-4 4 4 5-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        );
      case 'card':
        return (
          <g stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" x2="22" y1="10" y2="10" />
          </g>
        );
      case 'shield':
        return (
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        );
      case 'target':
        return (
          <g stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
          </g>
        );
      case 'calendar':
        return (
          <g stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
          </g>
        );
      case 'alert':
        return (
          <g stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 22 22 22" />
            <line x1="12" x2="12" y1="9" y2="13" />
            <line x1="12" x2="12.01" y1="17" y2="17" />
          </g>
        );
      case 'zap':
        return (
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        );
      default:
        return (
          <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" fill="none" />
        );
    }
  };

  return (
    <div className={`relative select-none bg-white rounded-2xl border-2 border-[#0F172A] brutal-shadow overflow-hidden group ${className}`}>
      {/* Top Header tab with Map number & stage */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#FAF9F5] border-b-2 border-[#0F172A]">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#0F172A] text-white font-bold text-xs font-display">
            {mapData.id}
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
            {mapData.title}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <span 
            className="text-[11px] font-bold px-2 py-0.5 rounded-full border border-slate-300"
            style={{ backgroundColor: `${mapData.stageColor}15`, color: mapData.stageColor }}
          >
            Etapa: {mapData.stage}
          </span>
          {onExpand && (
            <button
              onClick={onExpand}
              type="button"
              className="p-1 hover:bg-slate-200 rounded text-slate-600 transition-colors"
              title="Ampliar mapa em tela cheia"
              aria-label="Ampliar mapa"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" x2="14" y1="3" y2="10" />
                <line x1="3" x2="10" y1="21" y2="14" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* SVG Container */}
      <div className="relative w-full aspect-[940/610] bg-[#FAF9F5]">
        <svg
          viewBox="0 0 940 610"
          className="w-full h-full block"
          role="img"
          aria-label={`Mapa Mental ${mapData.id}: ${mapData.title}`}
        >
          <defs>
            {/* Subtle graph paper pattern */}
            <pattern id={`paper-grid-${mapData.id}`} width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="0.8" opacity="0.65" />
            </pattern>

            {/* Locked blur filter for teaser maps */}
            <filter id={`blur-${mapData.id}`} x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="3.8" />
            </filter>

            {/* Marker filter/glow */}
            <filter id="yellow-highlighter" x="-10%" y="-10%" width="120%" height="120%">
              <feFlood floodColor="#FEF08A" floodOpacity="0.9" result="flood" />
              <feComposite in="SourceGraphic" in2="flood" operator="over" />
            </filter>
          </defs>

          {/* Background grid */}
          <rect width="940" height="610" fill={`url(#paper-grid-${mapData.id})`} />

          {/* Branches connecting lines & curves */}
          <g className={isLocked ? "transition-all duration-300" : ""}>
            {mapData.branches.map((branch, index) => {
              const layout = getBranchLayout(index, numBranches);
              const nodeCenterX = layout.nodeX;
              const nodeCenterY = layout.nodeY;

              return (
                <g key={`branch-path-${index}`}>
                  {/* Organic Bézier line from center node to branch pill */}
                  <path
                    d={`M ${layout.anchorX} ${layout.anchorY} C ${layout.cp1X} ${layout.cp1Y}, ${layout.cp2X} ${layout.cp2Y}, ${nodeCenterX} ${nodeCenterY}`}
                    fill="none"
                    stroke={branch.color}
                    strokeWidth="5"
                    strokeLinecap="round"
                    opacity="0.9"
                  />

                  {/* Leaf connector lines */}
                  {branch.leaves.map((_, leafIdx) => {
                    const leafCoord = layout.leafStarts[leafIdx] || { x: nodeCenterX - 50, y: nodeCenterY + 40 };
                    const leafTargetX = layout.leafSide === 'left' ? leafCoord.x + 130 : leafCoord.x - 20;
                    return (
                      <path
                        key={`leaf-connector-${leafIdx}`}
                        d={`M ${nodeCenterX} ${nodeCenterY} Q ${(nodeCenterX + leafTargetX) / 2} ${leafCoord.y}, ${leafTargetX} ${leafCoord.y}`}
                        fill="none"
                        stroke={branch.color}
                        strokeWidth="1.8"
                        strokeDasharray="4 3"
                        opacity="0.75"
                        filter={isLocked ? `url(#blur-${mapData.id})` : undefined}
                      />
                    );
                  })}
                </g>
              );
            })}
          </g>

          {/* Branch Pill Nodes */}
          {mapData.branches.map((branch, index) => {
            const layout = getBranchLayout(index, numBranches);
            const pillX = layout.nodeX - layout.nodeW / 2;
            const pillY = layout.nodeY - layout.nodeH / 2;

            return (
              <g key={`branch-node-${index}`} className="cursor-default">
                {/* Pill Shadow */}
                <rect
                  x={pillX + 2}
                  y={pillY + 2}
                  width={layout.nodeW}
                  height={layout.nodeH}
                  rx="20"
                  fill="#0F172A"
                  opacity="0.15"
                />
                {/* Pill Body */}
                <rect
                  x={pillX}
                  y={pillY}
                  width={layout.nodeW}
                  height={layout.nodeH}
                  rx="20"
                  fill="#FFFFFF"
                  stroke={branch.color}
                  strokeWidth="2.8"
                />
                {/* Pill Background Tint */}
                <rect
                  x={pillX}
                  y={pillY}
                  width={layout.nodeW}
                  height={layout.nodeH}
                  rx="20"
                  fill={branch.color}
                  fillOpacity="0.12"
                />

                {/* Icon Circle */}
                <circle
                  cx={pillX + 22}
                  cy={layout.nodeY}
                  r="13"
                  fill="#FFFFFF"
                  stroke={branch.color}
                  strokeWidth="1.5"
                />
                <g transform={`translate(${pillX + 13}, ${layout.nodeY - 9}) scale(0.75)`}>
                  {renderIcon(branch.icon, branch.color)}
                </g>

                {/* Branch Text */}
                <text
                  x={pillX + 42}
                  y={layout.nodeY + 4}
                  fill="#0F172A"
                  fontSize="13"
                  fontWeight="700"
                  fontFamily="'Figtree', sans-serif"
                >
                  {branch.name}
                </text>
              </g>
            );
          })}

          {/* Branch Leaves (Sub-items handwritten with marker highlights) */}
          <g filter={isLocked ? `url(#blur-${mapData.id})` : undefined}>
            {mapData.branches.map((branch, index) => {
              const layout = getBranchLayout(index, numBranches);
              return branch.leaves.map((leaf, leafIdx) => {
                const coord = layout.leafStarts[leafIdx] || { x: 100, y: 100, textAnchor: 'start' };
                const isHighlighted = branch.highlightWords?.some(w => leaf.includes(w));

                return (
                  <g key={`leaf-${index}-${leafIdx}`}>
                    {/* Highlighter background for numbers / important values */}
                    {isHighlighted && (
                      <rect
                        x={coord.x - 4}
                        y={coord.y - 14}
                        width={Math.min(leaf.length * 9.5, 230)}
                        height="20"
                        rx="4"
                        fill="#FEF08A"
                        opacity="0.85"
                        transform={`rotate(-0.8 ${coord.x} ${coord.y})`}
                      />
                    )}

                    {/* Bullet dot */}
                    <circle
                      cx={coord.x - 2}
                      cy={coord.y - 3}
                      r="2.5"
                      fill={branch.color}
                    />

                    {/* Leaf Text in Caveat handwriting font */}
                    <text
                      x={coord.x + 8}
                      y={coord.y}
                      fill="#1E293B"
                      fontSize="16.5"
                      fontWeight="600"
                      fontFamily="'Caveat', cursive"
                    >
                      {leaf}
                    </text>
                  </g>
                );
              });
            })}
          </g>

          {/* Center Main Node */}
          <g>
            {/* Center Node Shadow */}
            <rect
              x="346"
              y="256"
              width="248"
              height="88"
              rx="22"
              fill="#0F172A"
              opacity="0.25"
            />
            {/* Center Node Outer Border */}
            <rect
              x="340"
              y="250"
              width="248"
              height="88"
              rx="22"
              fill="#0F172A"
              stroke="#38BDF8"
              strokeWidth="2.5"
            />
            {/* Center Accent Header Bar */}
            <path
              d="M 340 270 Q 464 274 588 270"
              stroke={mapData.stageColor}
              strokeWidth="3"
              fill="none"
              opacity="0.7"
            />
            {/* Center Node Title */}
            <text
              x="464"
              y="292"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="16"
              fontWeight="800"
              fontFamily="'Bricolage Grotesque', sans-serif"
              letterSpacing="0.2px"
            >
              {mapData.title}
            </text>
            <text
              x="464"
              y="316"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="12"
              fontWeight="600"
              fontFamily="'Figtree', sans-serif"
            >
              {mapData.centralSubtitle || 'Mapa Mental Visual'}
            </text>
          </g>

          {/* Handwritten Annotation Note (Post-it / handwritten tip) */}
          {mapData.handwrittenNote && !isLocked && (
            <g transform="translate(464, 385)">
              <rect
                x="-140"
                y="-14"
                width="280"
                height="28"
                rx="6"
                fill="#FEF08A"
                stroke="#EAB308"
                strokeWidth="1"
                transform="rotate(-1.2)"
              />
              <text
                x="0"
                y="5"
                textAnchor="middle"
                fill="#854D0E"
                fontSize="15"
                fontWeight="700"
                fontFamily="'Caveat', cursive"
              >
                {mapData.handwrittenNote}
              </text>
            </g>
          )}

          {/* Locked Badge Overlay */}
          {isLocked && (
            <g transform="translate(470, 395)">
              <rect
                x="-175"
                y="-20"
                width="350"
                height="40"
                rx="20"
                fill="#0F172A"
                stroke="#FDE047"
                strokeWidth="2"
              />
              {/* Lock icon */}
              <g transform="translate(-150, -11) scale(0.9)">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" fill="#FDE047" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#FDE047" strokeWidth="2" fill="none" />
              </g>
              <text
                x="-5"
                y="6"
                textAnchor="middle"
                fill="#F8FAFC"
                fontSize="13"
                fontWeight="700"
                fontFamily="'Figtree', sans-serif"
              >
                Desbloqueie no Acesso Completo
              </text>
            </g>
          )}
        </svg>

        {/* Hover action button if locked */}
        {isLocked && isInteractive && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[1px]">
            <a
              href="#oferta"
              className="px-4 py-2 bg-[#0F172A] text-amber-300 text-xs font-bold rounded-lg border border-amber-400 brutal-shadow-sm hover:scale-105 transition-transform"
            >
              Liberar este mapa por R$ 15,90 →
            </a>
          </div>
        )}
      </div>

      {/* Bottom one-line benefit */}
      <div className="px-4 py-2.5 bg-white border-t border-slate-200 flex items-center justify-between text-xs">
        <p className="text-slate-600 font-medium truncate">
          💡 <span className="text-slate-900 font-semibold">{mapData.oneLineBenefit}</span>
        </p>
        {mapData.isUnlockedPreview && (
          <span className="shrink-0 ml-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
            ✓ Amostra 100% aberta
          </span>
        )}
      </div>
    </div>
  );
};
