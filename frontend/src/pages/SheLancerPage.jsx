import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Heart, Users, Star, ArrowUpRight, Award, Compass, Sparkles } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const SHELANCERS = [
  { name: "Kavya R.", age: 17, city: "Bangalore", skill: "UI/UX Designer", rating: "4.9", projects: 14, tags: ["Figma", "Web Design"] },
  { name: "Pooja Sharma", age: 19, city: "Mumbai", skill: "Video Editor", rating: "4.8", projects: 22, tags: ["CapCut", "Reels", "Premiere"] },
  { name: "Simran K.", age: 18, city: "Delhi", skill: "UGC Content Creator", rating: "5.0", projects: 19, tags: ["Social", "Product Review"] },
  { name: "Nandini J.", age: 16, city: "Jaipur", skill: "Copywriter", rating: "4.7", projects: 8, tags: ["Social posts", "Taglines"] },
];

const SHE_STATS = [
  { value: "42%", label: "Female Earners", desc: "Out of 70 Lakh+ active users" },
  { value: "₹2,200", label: "Avg Task Payout", desc: "For verified design and content gigs" },
  { value: "100%", label: "Safe & Secured", desc: "Verifiable direct payouts to UPI" }
];

const SHE_STORIES = [
  {
    name: "Sneha",
    city: "Hyderabad",
    income: "₹8,400/month",
    quote: "Creating vertical video briefs on SheLancer has allowed me to fund my own design course. The women's clan groups helped me check my video editing drafts."
  },
  {
    name: "Meera",
    city: "Lucknow",
    income: "₹6,200/month",
    quote: "Working on writing projects for cosmetics and apparel brands has given me immense self-confidence. I choose when and where to write."
  },
  {
    name: "Lakshmi",
    city: "Chennai",
    income: "₹12,500/month",
    quote: "By leading a local clan group, I coordinate and check tasks for 15 other students. The campaign management experience has been amazing."
  }
];

const INCOME_LADDER = [
  {
    stage: "Stage 01 · Start",
    title: "Your First Income",
    payout: "₹500 – ₹3,000 / month",
    desc: "Complete simple surveys, product feedback reviews, and app testing campaigns to unlock credentials and get your first digital paycheck."
  },
  {
    stage: "Stage 02 · Grow",
    title: "Multiply & Influence",
    payout: "₹3,000 – ₹7,000 / month",
    desc: "Work on design concepts, apparel modeling, social promotions, and niche beauty or wellness UGC videos. Higher trust ratings unlock premium brand budgets."
  },
  {
    stage: "Stage 03 · Build",
    title: "Your Own Business",
    payout: "₹7,000 – ₹15,000+ / month",
    desc: "Step up to Clan Leadership and campaign moderation. Lead student teams, oversee task completions, and earn management incentives directly."
  }
];

export default function SheLancerPage() {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-[90vh] bg-[#071210] pt-28 pb-20 overflow-hidden">
      {/* Background purple/indigo tints for SheLancer theme */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-20 left-1/4 w-[400px] h-[400px] rounded-full bg-purple-900/10 blur-[100px]" />
        <div className="absolute bottom-20 right-1/4 w-[350px] h-[350px] rounded-full bg-indigo-900/10 blur-[90px]" />
        <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full bg-brand-green/01 blur-[90px]" />
        <div className="absolute inset-0 grid-bg opacity-15" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24 animate-fade-up">
          <div>
            <span className="section-pill mb-4 border-purple-500/20 text-purple-400 bg-purple-500/05">Empowering Women</span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              SheLancer <br />
              <span className="headline-accent text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-[#2DDE98]">Program.</span>
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-lg">
              A specialized vertical by Funngro dedicated to fostering safe, flexible, and high-paying micro-freelancing opportunities for young women and girls across India. 
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://play.google.com/store/apps/details?id=com.wishbanc.funngro"
                target="_blank"
                rel="noreferrer"
                className="btn-glow px-8 py-3.5 bg-gradient-to-r from-purple-500 to-[#2DDE98] hover:from-purple-600 hover:to-[#22bc7f]"
              >
                Join SheLancer
              </a>
              <button 
                onClick={() => {
                  document.getElementById('stories-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-xl border border-white/10 hover:border-purple-500/30 hover:bg-white/[0.02] text-xs font-semibold text-slate-300 transition-all"
              >
                Read SheLancer stories
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-5">
            {SHE_STATS.map((stat, i) => (
              <GlassCard key={i} className="text-center lg:text-left p-6 border-purple-500/10">
                <span className="block font-display text-3xl font-black text-[#2DDE98] mb-1">{stat.value}</span>
                <span className="block text-xs font-bold text-white mb-0.5">{stat.label}</span>
                <span className="text-[10px] text-slate-500">{stat.desc}</span>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Why SheLancer (4 Pillars) */}
        <div className="mb-24 animate-fade-up">
          <div className="text-center mb-16">
            <span className="section-pill justify-center mb-3 border-purple-500/20 text-purple-400 bg-purple-500/05">Core Pillars</span>
            <h2 className="font-display text-3xl font-bold text-white">Why young women choose Funngro</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { id: "01", title: "Safe & verified", desc: "Identity protection with direct-to-UPI checks. Verified brand accounts with no anonymous rooms or data exposure." },
              { id: "02", title: "Grow at your pace", desc: "No minimum quotas or shifts. Work whenever you find time between studies and exams." },
              { id: "03", title: "Supportive community", desc: "Join women-only Clans to receive project feedback, brief walkthroughs, and design assistance." },
              { id: "04", title: "Flexible hours", desc: "Gigs are fully asynchronous. Deliver designs, copy, or video files anytime before campaign deadlines." }
            ].map((pillar, i) => (
              <article key={i} className="p-6 rounded-2xl border border-purple-500/10 bg-purple-950/02 hover:border-purple-500/30 transition-all duration-300">
                <span className="block text-xl font-display font-black text-purple-400 mb-4">{pillar.id}</span>
                <h3 className="font-display text-base font-bold text-white mb-2">{pillar.title}</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">{pillar.desc}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Income & Influence Ladder */}
        <div className="mb-24 animate-fade-up">
          <div className="text-center mb-16">
            <span className="section-pill justify-center mb-3 border-purple-500/20 text-purple-400 bg-purple-500/05">Career Map</span>
            <h2 className="font-display text-3xl font-bold text-white mb-3">Income & Influence Ladder</h2>
            <p className="text-slate-400 text-xs max-w-md mx-auto">
              Build your trust rating, unlock premium task categories, and step up to earn management bonuses.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {INCOME_LADDER.map((item, i) => (
              <GlassCard key={i} className="p-8 border-purple-500/10 hover:border-purple-500/25 relative group">
                <div className="absolute -top-4 right-6 bg-purple-500/10 border border-purple-500/20 rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-purple-300">
                  {item.stage}
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-1 mt-2">{item.title}</h3>
                <span className="block text-sm font-black text-[#2DDE98] mb-4">{item.payout}</span>
                <p className="text-xs text-slate-400 leading-relaxed border-t border-white/5 pt-4">
                  {item.desc}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Stories Section */}
        <div id="stories-section" className="mb-24 animate-fade-up">
          <div className="text-center mb-16">
            <span className="section-pill justify-center mb-3 border-purple-500/20 text-purple-400 bg-purple-500/05">Success Stories</span>
            <h2 className="font-display text-3xl font-bold text-white">SheLancer Stories</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {SHE_STORIES.map((story, i) => (
              <GlassCard key={i} className="p-6 border-purple-500/5 relative">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center font-display font-black text-purple-300 mb-4 text-sm">
                  {story.name[0]}
                </div>
                <h3 className="font-bold text-white text-sm">{story.name}</h3>
                <p className="text-[10px] text-[#2DDE98] font-bold mb-3">{story.city} · {story.income}</p>
                <p className="text-xs text-slate-400 leading-relaxed italic border-t border-white/5 pt-3">
                  "{story.quote}"
                </p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Local Featured Talents Directory (Premium preservation) */}
        <div className="animate-fade-up">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="section-pill mb-2">Talent Showcase</span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">Featured SheLancers</h2>
            </div>
            <a href="mailto:hello@funngro.com" className="text-xs font-bold text-[#2DDE98] flex items-center gap-1 hover:underline">
              Hire our SheLancers <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SHELANCERS.map((girl, i) => (
              <article key={i} className="glass-card p-6 shine-card border-purple-500/5 hover:border-purple-500/20">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/10 flex items-center justify-center font-display font-black text-purple-300 mb-4 text-lg">
                  {girl.name[0]}
                </div>
                <h3 className="font-bold text-white text-sm mb-0.5">{girl.name}</h3>
                <p className="text-[10px] text-slate-500 mb-3">{girl.city} · Age {girl.age}</p>
                <div className="border-t border-white/5 pt-3 mb-3">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Key Skill</span>
                  <span className="text-xs font-semibold text-slate-200">{girl.skill}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500 mb-4">
                  <span className="flex items-center gap-0.5 text-yellow-500 font-bold">
                    <Star className="h-3 w-3 fill-current" /> {girl.rating}
                  </span>
                  <span>{girl.projects} gigs done</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {girl.tags.map(t => (
                    <span key={t} className="tag-pill text-[9px] px-2 py-0.5 border-purple-500/10 text-purple-300 bg-purple-500/05">{t}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
