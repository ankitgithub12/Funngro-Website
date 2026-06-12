import React, { useState } from 'react';
import { Sparkles, DollarSign, Clock, CheckCircle } from 'lucide-react';
import GlassCard from './GlassCard';

const SKILLS_RATE = [
  { name: 'Social Media Management', rate: 250, desc: 'Create posts, write captions, manage engagement.' },
  { name: 'Content Writing', rate: 300, desc: 'Write blogs, newsletters, and creative briefs.' },
  { name: 'Graphic Design', rate: 350, desc: 'Design logo, banners, Instagram templates.' },
  { name: 'Video Editing', rate: 420, desc: 'Edit Reels, TikToks, shorts, and intro clips.' },
  { name: 'Web Development', rate: 500, desc: 'Build responsive landing pages or custom widgets.' },
];

export default function EarningCalculator() {
  const [selectedSkill, setSelectedSkill] = useState(SKILLS_RATE[0]);
  const [hoursPerWeek, setHoursPerWeek] = useState(15);

  const monthlyEarnings = selectedSkill.rate * hoursPerWeek * 4;

  return (
    <GlassCard hover={false} className="relative overflow-hidden border border-brand-purple/20">
      {/* Background glow element */}
      <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-brand-purple/10 blur-3xl pointer-events-none"></div>

      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="h-5 w-5 text-brand-gold" />
        <h3 className="text-xl font-bold text-white tracking-tight">Earning Calculator</h3>
      </div>
      
      <p className="text-xs text-slate-400 mb-6">
        Select a skill category and estimate how many hours you can commit weekly to calculate your potential monthly earnings.
      </p>

      {/* Skills Select buttons */}
      <div className="mb-6">
        <label className="block text-xs font-semibold uppercase tracking-wider text-brand-purple-light mb-3">
          Select Your Skillset
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {SKILLS_RATE.map((skill) => (
            <button
              key={skill.name}
              onClick={() => setSelectedSkill(skill)}
              className={`flex flex-col text-left p-3 rounded-xl border text-sm transition-all ${
                selectedSkill.name === skill.name
                  ? 'border-brand-purple bg-brand-purple/15 text-white'
                  : 'border-brand-dark-border bg-brand-dark-bg/40 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <span className="font-semibold">{skill.name}</span>
              <span className="text-[10px] opacity-75 mt-0.5">₹{skill.rate}/hr average</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-8 pt-6 border-t border-brand-dark-border/40">
        
        {/* Hours Selector Slider */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-slate-300 flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-brand-purple-light" />
              Hours Per Week
            </span>
            <span className="text-lg font-bold text-white bg-brand-dark-border px-2.5 py-1 rounded-lg">
              {hoursPerWeek} hrs
            </span>
          </div>
          
          <input
            type="range"
            min="5"
            max="40"
            step="5"
            value={hoursPerWeek}
            onChange={(e) => setHoursPerWeek(Number(e.target.value))}
            className="w-full h-2 bg-[#1a1633] rounded-lg appearance-none cursor-pointer accent-brand-purple"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-medium">
            <span>5 hrs (casual)</span>
            <span>20 hrs (part-time)</span>
            <span>40 hrs (full intensity)</span>
          </div>
          
          <div className="mt-4 p-3 bg-brand-dark-bg/50 border border-brand-dark-border rounded-xl">
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200">Activity Note:</strong> {selectedSkill.desc}
            </p>
          </div>
        </div>

        {/* Earning Showcase Display */}
        <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-[#1b1539] to-brand-dark-bg border border-brand-purple/20 text-center relative overflow-hidden">
          <div className="absolute -left-10 -bottom-10 h-24 w-24 rounded-full bg-brand-gold/5 blur-xl pointer-events-none"></div>
          
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Estimated Monthly Earnings
          </span>
          <span className="text-4xl font-extrabold text-white mt-3 bg-gradient-to-r from-brand-gold via-yellow-400 to-amber-500 bg-clip-text text-transparent flex items-center gap-1">
            ₹{monthlyEarnings.toLocaleString('en-IN')}
          </span>
          <span className="text-[10px] text-slate-500 mt-1">
            *Based on standard Gen-Z freelancing averages
          </span>
          
          <div className="mt-6 flex flex-col gap-2 w-full text-left text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
              <span>Earn certificates for your resume</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
              <span>UPI / Bank Payouts on task verification</span>
            </div>
          </div>
        </div>

      </div>
    </GlassCard>
  );
}
