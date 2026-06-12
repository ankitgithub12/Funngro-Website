import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageSquare, Quote, Sparkles, Star } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const STORIES = [
  { name: "Sarthak K.", age: 16, city: "Pune", category: "Marketing", earned: "₹3,90,000+", quote: "I started doing simple social media promotion tasks. Over 18 months, I built trust and now handle full influencer marketing campaigns for tech companies.", tag: "Star Earner" },
  { name: "Anshika R.", age: 19, city: "Delhi", category: "Writing", earned: "₹2,25,000+", quote: "Writing blogs and content briefs on Funngro allowed me to pay my own college tuition. The UPI payments are instant and direct.", tag: "Tuition Covered" },
  { name: "Ashwani S.", age: 17, city: "Chandigarh", category: "Tech", earned: "₹66,000+", quote: "I did app testing and bug reports. It was amazing getting paid to find glitches in popular products. Highly recommend it to anyone who likes gaming or tech.", tag: "Tech Reviewer" },
  { name: "Sayyam M.", age: 18, city: "Mumbai", category: "Marketing", earned: "₹63,000+", quote: "Referrals and affiliate campaigns are super easy to run in your student network. I shared gaming platforms and fintech app links to earn pocket money.", tag: "Clan Leader" },
  { name: "Tanmay B.", age: 15, city: "Bangalore", category: "Design", earned: "₹1,20,000+", quote: "I designed Instagram templates and brand logos on Canva. Getting feedback directly from brand managers helped me refine my portfolio.", tag: "Design Lead" },
  { name: "Diya P.", age: 16, city: "Ahmedabad", category: "Design", earned: "₹95,000+", quote: "I love drawing! I converted my hobby into a real income stream by doing sticker design briefs and graphic creatives on Funngro.", tag: "Creative Artist" },
];

export default function StoriesPage() {
  const { t } = useTranslation();
  const [activeCat, setActiveCat] = useState('All');

  const filtered = activeCat === 'All' ? STORIES : STORIES.filter(s => s.category === activeCat);

  return (
    <div className="relative min-h-[90vh] bg-[#071210] pt-28 pb-20 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-20 right-1/4 w-[400px] h-[400px] rounded-full bg-brand-green/02 blur-[100px]" />
        <div className="absolute bottom-20 left-1/4 w-[400px] h-[400px] rounded-full bg-brand-green/02 blur-[100px]" />
        <div className="absolute inset-0 grid-bg opacity-20" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <span className="section-pill justify-center mb-4">Teen Stories</span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            Real stories from <span className="headline-accent">real earners.</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Teens all over India are taking control of their pocket money, learning marketable skills, and building resumes before even entering college.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 animate-fade-up">
          {['All', 'Design', 'Writing', 'Tech', 'Marketing'].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all border ${
                activeCat === cat
                  ? 'bg-brand-green text-brand-dark-bg border-brand-green shadow-glow-green-sm'
                  : 'border-white/10 text-slate-400 hover:border-brand-green/30 hover:text-slate-200 bg-brand-dark-card/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 animate-fade-up">
          {filtered.map((story, i) => (
            <GlassCard key={i} className="flex flex-col justify-between shine-card">
              <div>
                {/* Header Profile */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-green/10 border border-brand-green/20 flex items-center justify-center font-display font-bold text-brand-green">
                      {story.name[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm">{story.name}</h3>
                      <p className="text-[10px] text-slate-500">{story.city} · Age {story.age}</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold tracking-wider uppercase text-brand-green bg-brand-green/10 border border-brand-green/20 px-2 py-0.5 rounded-full">
                    {story.tag}
                  </span>
                </div>

                {/* Earnings */}
                <div className="mb-4">
                  <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-widest block">Total Pocket Money</span>
                  <span className="font-display text-3xl font-black text-brand-green">{story.earned}</span>
                </div>

                {/* Testimonial Quote */}
                <div className="relative">
                  <Quote className="absolute -left-2 -top-2 h-8 w-8 text-brand-green/5 -scale-y-100" />
                  <p className="text-slate-400 text-xs leading-relaxed relative pl-4 italic">
                    "{story.quote}"
                  </p>
                </div>
              </div>

              {/* Tag Category */}
              <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center text-[10px] text-slate-500">
                <span>Category: <strong className="text-slate-300 font-semibold">{story.category}</strong></span>
                <span className="flex items-center gap-0.5 text-yellow-500">
                  {[1, 2, 3, 4, 5].map(n => <Star key={n} className="h-3 w-3 fill-current" />)}
                </span>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Call To Action Box */}
        <div className="rounded-3xl border border-brand-green/20 bg-gradient-to-br from-brand-dark-card to-[#0d2c1c]/40 p-8 md:p-12 text-center max-w-4xl mx-auto shadow-glow-green-sm animate-fade-up">
          <Sparkles className="h-10 w-10 text-brand-green mx-auto mb-4 animate-pulse" />
          <h2 className="font-display text-3xl font-bold text-white mb-3">
            Ready to earn your first pocket money?
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto mb-8 leading-relaxed">
            Verify with OTP, browse campaigns, select what fits your interests, and get paid instantly via UPI. Free setup.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://play.google.com/store/apps/details?id=com.wishbanc.funngro"
              target="_blank"
              rel="noreferrer"
              className="btn-glow px-8 py-3.5"
            >
              Get Started Now →
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
