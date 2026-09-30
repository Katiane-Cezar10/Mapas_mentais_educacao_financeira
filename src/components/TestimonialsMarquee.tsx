import React from 'react';
import { TESTIMONIALS_DATA, CustomerProof } from '../data/mapsData';

interface TestimonialsMarqueeProps {
  onSelectProof?: (proof: CustomerProof) => void;
}

export const TestimonialsMarquee: React.FC<TestimonialsMarqueeProps> = () => {
  // Duplicate for seamless loop
  const loopProof = [...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA];

  return (
    <div className="overflow-hidden py-4 select-none marquee-pause-hover">
      <div 
        className="relative overflow-hidden w-full"
        aria-label="Depoimentos em movimento contínuo"
      >
        <div className="animate-marquee-left flex gap-5">
          {loopProof.map((proof, idx) => (
            <figure
              key={`proof-${proof.id}-${idx}`}
              className="w-[300px] sm:w-[350px] shrink-0 bg-white rounded-2xl border-2 border-slate-200 p-5 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header: Stars & Tag */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex text-amber-400 text-sm">
                    {"★".repeat(proof.rating)}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {proof.tag}
                  </span>
                </div>

                {/* Highlight quote */}
                <h4 className="font-extrabold text-slate-900 text-sm mb-2 leading-snug">
                  &ldquo;{proof.highlight}&rdquo;
                </h4>

                {/* Message */}
                <p className="text-xs text-slate-600 leading-relaxed font-body italic mb-4">
                  {proof.message}
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <div className={`w-9 h-9 rounded-full ${proof.avatarBg} text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-inner`}>
                  {proof.avatarInitials}
                </div>
                <div>
                  <h5 className="font-bold text-xs text-slate-900 leading-tight">
                    {proof.name}
                  </h5>
                  <p className="text-[11px] text-slate-500">
                    {proof.role} · {proof.location}
                  </p>
                </div>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
};
