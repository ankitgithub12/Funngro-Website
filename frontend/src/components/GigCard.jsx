import React from 'react';
import { Calendar, DollarSign, Tag, Clock, ArrowUpRight } from 'lucide-react';
import GlassCard from './GlassCard';

const CATEGORY_COLORS = {
  Design: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  Writing: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Tech: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  Video: 'bg-red-500/10 text-red-400 border-red-500/20',
  Marketing: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Other: 'bg-slate-500/10 text-slate-400 border-slate-500/20'
};

export default function GigCard({ gig, onApply }) {
  const categoryColor = CATEGORY_COLORS[gig.category] || CATEGORY_COLORS.Other;

  return (
    <GlassCard className="flex flex-col justify-between h-full border border-brand-dark-border relative overflow-hidden group">
      {/* Background soft lighting effects */}
      <div className="absolute right-0 top-0 h-24 w-24 bg-brand-purple/5 blur-2xl rounded-full group-hover:bg-brand-purple/10 transition-colors pointer-events-none"></div>

      <div>
        {/* Header: Company & Category Tag */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-bold text-slate-400 tracking-wide uppercase">
            {gig.company}
          </span>
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${categoryColor}`}>
            {gig.category}
          </span>
        </div>

        {/* Title */}
        <h4 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-brand-purple-light transition-colors">
          {gig.title}
        </h4>

        {/* Description */}
        <p className="text-xs text-slate-400 leading-relaxed mb-5 line-clamp-3">
          {gig.description}
        </p>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5 p-3 rounded-xl bg-brand-dark-bg/40 border border-brand-dark-border/40 text-xs">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Tag className="h-3.5 w-3.5 text-brand-gold" />
            <span>
              Budget: <strong className="text-white">₹{gig.budget}</strong>
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Clock className="h-3.5 w-3.5 text-brand-purple-light" />
            <span>
              Duration: <strong className="text-white">{gig.duration}</strong>
            </span>
          </div>
        </div>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {gig.skills && gig.skills.map((skill) => (
            <span 
              key={skill} 
              className="text-[10px] bg-brand-dark-border text-slate-300 px-2 py-0.5 rounded-md border border-slate-700/50"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Action Area */}
      <div className="pt-4 border-t border-brand-dark-border/40 flex items-center justify-between">
        <span className="text-[10px] text-slate-500 flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          Posted {new Date(gig.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
        </span>
        
        <button
          onClick={() => onApply(gig)}
          className="flex items-center gap-1 px-4.5 py-1.5 bg-brand-purple hover:bg-brand-purple-dark text-white rounded-lg text-xs font-bold transition-all shadow-md hover:shadow-brand-purple/20"
        >
          <span>Apply Now</span>
          <ArrowUpRight className="h-3 w-3" />
        </button>
      </div>
    </GlassCard>
  );
}
