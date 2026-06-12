import React from 'react';

/**
 * StepCard — numbered step component matching funngro.com's step flow
 * Props:
 *   number    {string}  — "01", "02" etc.
 *   title     {string}  — Step headline
 *   description {string} — Step body text
 *   tags      {Array}   — Optional array of {label, range} objects for pay ranges
 *   isLast    {boolean} — If true, hides the connector line
 *   highlight {string}  — Optional highlighted sub-label (e.g., "2 min setup")
 */
export default function StepCard({ number, title, description, tags = [], isLast = false, highlight }) {
  return (
    <div className={`flex gap-5 ${isLast ? '' : 'step-connector'} pb-10`}>
      {/* Number badge */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div className="step-number">{number}</div>
      </div>

      {/* Content */}
      <div className="flex-1 pt-1 pb-4">
        <h3 className="font-display text-xl font-bold text-white mb-2 leading-snug">
          {title}
        </h3>

        {highlight && (
          <span className="inline-block mb-2 text-[11px] font-bold uppercase tracking-widest text-brand-green/70 bg-brand-green/8 px-3 py-1 rounded-full border border-brand-green/15">
            {highlight}
          </span>
        )}

        <p className="text-slate-400 text-sm leading-relaxed mb-4">{description}</p>

        {/* Pay range tags */}
        {tags.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mt-3">
            {tags.map((tag) => (
              <div
                key={tag.label}
                className="flex justify-between items-center px-3 py-2 rounded-lg bg-brand-dark-surface/60 border border-white/05"
              >
                <span className="text-[11px] font-semibold text-slate-400">{tag.label}</span>
                <span className="text-[11px] font-bold text-brand-green">{tag.range}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
