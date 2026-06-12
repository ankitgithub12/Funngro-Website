import React from 'react';

const BRANDS = [
  'mPokket', 'ICICI Bank', 'Paytm', 'Toluna', 'CarDekho',
  'LXME', 'Lifelong', 'Kotak', 'HDFC', 'Novio',
  'Slice', 'Fi Money', 'Groww', 'Navi', 'Cred',
  'boAt', 'Mamaearth', 'Wow Skin', 'Plum', 'Sugar',
  'Zomato', 'Swiggy', 'Blinkit', 'Urban Company', 'Licious',
];

// Duplicate for seamless infinite loop
const BRANDS_DOUBLED = [...BRANDS, ...BRANDS];

export default function BrandMarquee() {
  return (
    <section className="py-14 border-y border-white/5" aria-label="Partner brands on Funngro">
      {/* Section label */}
      <div className="text-center mb-8 px-4">
        <p className="section-pill justify-center mb-2">The Brand Wall</p>
        <h2 className="font-display text-xl font-bold text-white">
          Real brands. Real rupees. Every day.
        </h2>
      </div>

      {/* Marquee strip */}
      <div className="marquee-container py-4">
        <div className="marquee-track">
          {BRANDS_DOUBLED.map((brand, i) => (
            <div
              key={`${brand}-${i}`}
              className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/08 bg-brand-dark-card/60 hover:border-brand-green/30 transition-colors cursor-default"
              aria-label={`${brand} — partner brand on Funngro`}
            >
              <div className="w-2 h-2 rounded-full bg-brand-green/50 flex-shrink-0" />
              <span className="text-sm font-semibold text-slate-300 whitespace-nowrap">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Second row moving opposite direction */}
      <div className="marquee-container py-4">
        <div className="marquee-track" style={{ animationDirection: 'reverse', animationDuration: '35s' }}>
          {[...BRANDS_DOUBLED].reverse().map((brand, i) => (
            <div
              key={`r-${brand}-${i}`}
              className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border border-white/05 bg-brand-dark-surface/40 cursor-default"
            >
              <span className="text-xs font-medium text-slate-500 whitespace-nowrap">{brand}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
