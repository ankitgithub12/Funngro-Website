import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Heart, Users, Star, ArrowUpRight } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const SHELANCERS = [
  { name: "Kavya R.", age: 17, city: "Bangalore", skill: "UI/UX Designer", rating: "4.9", projects: 14, tags: ["Figma", "Web Design"] },
  { name: "Pooja Sharma", age: 19, city: "Mumbai", skill: "Video Editor", rating: "4.8", projects: 22, tags: ["CapCut", "Reels", "Premiere"] },
  { name: "Simran K.", age: 18, city: "Delhi", skill: "UGC Content Creator", rating: "5.0", projects: 19, tags: ["Social", "Product Review"] },
  { name: "Nandini J.", age: 16, city: "Jaipur", skill: "Copywriter", rating: "4.7", projects: 8, tags: ["Social posts", "Taglines"] },
];

const SHE_STATS = [
  { value: "42%", label: "Female Earners", desc: "Out of 70 Lakh+ active users" },
  { value: "₹1,800", label: "Avg Task Payout", desc: "For verified design and content gigs" },
  { value: "100%", label: "Safe & Secured", desc: "Direct-to-UPI with zero hidden charges" }
];

export default function SheLancerPage() {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-[90vh] bg-[#071210] pt-28 pb-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-20 left-1/4 w-[400px] h-[400px] rounded-full bg-brand-green/02 blur-[100px]" />
        <div className="absolute bottom-20 right-1/4 w-[350px] h-[350px] rounded-full bg-brand-green/02 blur-[90px]" />
        <div className="absolute inset-0 grid-bg opacity-15" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20 animate-fade-up">
          <div>
            <span className="section-pill mb-4">Empowering Youth</span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              SheLancer <br />
              <span className="headline-accent">Program.</span>
            </h1>
            <p className="text-slate-400 text-base leading-relaxed mb-8 max-w-lg">
              A specialized initiative by Funngro dedicated to fostering safe, high-paying micro-freelancing opportunities for young women and girls across India. 
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://play.google.com/store/apps/details?id=com.wishbanc.funngro"
                target="_blank"
                rel="noreferrer"
                className="btn-glow px-8 py-3.5"
              >
                Join as SheLancer
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-5">
            {SHE_STATS.map((stat, i) => (
              <GlassCard key={i} className="text-center lg:text-left p-6">
                <span className="block font-display text-3xl font-black text-brand-green mb-1">{stat.value}</span>
                <span className="block text-xs font-bold text-white mb-0.5">{stat.label}</span>
                <span className="text-[10px] text-slate-500">{stat.desc}</span>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mb-20 animate-fade-up">
          <div className="text-center mb-12">
            <span className="section-pill justify-center mb-3">Core Pillars</span>
            <h2 className="font-display text-3xl font-bold text-white">Why young women choose Funngro</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { Icon: ShieldCheck, title: "100% Safe & Verifiable", desc: "Every brand partner is audited. There are zero unverified link shares, anonymous chat rooms, or data leaks. All payments are verified via direct UPI transactions." },
              { Icon: Heart, title: "Mentorship & Training", desc: "Access dedicated student community guides. Receive reviews on your designs, articles, or clips before sending them to brand managers." },
              { Icon: Users, title: "Supportive Network", desc: "Connect with thousands of student designers, writers, and marketers. Share template resources and build micro-freelance groups." }
            ].map((pillar, i) => (
              <article key={i} className="campaign-card">
                <pillar.Icon className="h-10 w-10 text-brand-green mb-4" />
                <h3 className="font-display text-lg font-bold text-white mb-2">{pillar.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{pillar.desc}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Directory Showcase */}
        <div className="animate-fade-up">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="section-pill mb-2">Talent Showcase</span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">Featured SheLancers</h2>
            </div>
            <a href="mailto:hello@funngro.com" className="text-xs font-bold text-brand-green flex items-center gap-1 hover:underline">
              Hire our SheLancers <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SHELANCERS.map((girl, i) => (
              <article key={i} className="glass-card p-6 shine-card">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-green/20 to-brand-green/5 border border-brand-green/10 flex items-center justify-center font-display font-black text-[#2DDE98] mb-4 text-lg">
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
                    <span key={t} className="tag-pill text-[9px] px-2 py-0.5">{t}</span>
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
