import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ZoomIn, X, Users, Sparkles, Award } from 'lucide-react';
import GlassCard from './GlassCard';

const SHOWCASE_ITEMS = [
  {
    id: 1,
    img: "/assets/unnamed.webp",
    title: "Pitching on Shark Tank India",
    subtitle: "Funngro Founders & Amit Jain",
    desc: "Successfully pitched on Shark Tank India Season 2, receiving backing from Amit Jain (CarDekho) and SucSEED to accelerate youth financial independence.",
    gridClass: "lg:col-span-2 lg:row-span-2 md:col-span-2",
    payout: "Amit Jain Backed",
    category: "Funding"
  },
  {
    id: 2,
    img: "/assets/unnamed (1).webp",
    title: "Graphic Design Campaigns",
    subtitle: "Siddharth Verma · Age 16 · Bangalore",
    desc: "Designed 12+ modern, futuristic Instagram cover templates for Gizmo Tech Solutions, boosting their post CTR by 38%.",
    gridClass: "lg:col-span-1 lg:row-span-1 md:col-span-1",
    payout: "Earned ₹1,500",
    category: "Design"
  },
  {
    id: 3,
    img: "/assets/unnamed (2).webp",
    title: "Teen Influencer Briefs",
    subtitle: "Aanya Sen · Age 17 · Delhi",
    desc: "Launched peer-to-peer influencer reels promoting student wallet app CampusHub, driving 800+ downloads within one week.",
    gridClass: "lg:col-span-1 lg:row-span-1 md:col-span-1",
    payout: "Earned ₹2,200",
    category: "Marketing"
  },
  {
    id: 4,
    img: "/assets/unnamed (3).webp",
    title: "Product Sampling Trials",
    subtitle: "Aditi Roy · Age 15 · Pune",
    desc: "Sampled skincare products, providing extensive feedback on packaging, fragrance, and skin feel, directly informing brand reformulations.",
    gridClass: "lg:col-span-1 lg:row-span-1 md:col-span-1",
    payout: "Sample + ₹800",
    category: "Sampling"
  },
  {
    id: 5,
    img: "/assets/unnamed (4).webp",
    title: "App Usability Testing",
    subtitle: "Kabir Mehta · Age 16 · Mumbai",
    desc: "Performed beta app testing, checking onboarding load speeds and form validation logic, submitting 5 actionable bug logs.",
    gridClass: "lg:col-span-1 lg:row-span-1 md:col-span-1",
    payout: "Earned ₹1,200",
    category: "Tech"
  },
  {
    id: 6,
    img: "/assets/unnamed (5).webp",
    title: "Web Coding & Tech Gigs",
    subtitle: "Ashwani S. · Age 17 · Chandigarh",
    desc: "Constructed responsive HTML/CSS landing pages for local micro-business client, launching their online catalog.",
    gridClass: "lg:col-span-1 lg:row-span-1 md:col-span-1",
    payout: "Earned ₹4,500",
    category: "Tech"
  },
  {
    id: 7,
    img: "/assets/unnamed (6).webp",
    title: "Clan Referral Multipliers",
    subtitle: "Sayyam M. · Age 18 · Jaipur",
    desc: "Led a clan of 15 members to promote edtech coupons, achieving record referrals and pocket money bonuses.",
    gridClass: "lg:col-span-1 lg:row-span-1 md:col-span-1",
    payout: "Earned ₹18,000+",
    category: "Marketing"
  }
];

export default function ShowcaseSection() {
  const { t } = useTranslation();
  const [activeItem, setActiveItem] = useState(null);

  return (
    <section className="py-20 bg-[#0d2018]/10 border-t border-white/[0.05]" aria-labelledby="showcase-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <p className="section-pill justify-center mb-4">Funngro in Action</p>
          <h2 id="showcase-heading" className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            Our vibrant <span className="headline-accent">earning gallery.</span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
            Teens from across India are executing campaigns, design projects, and earning real UPI payouts. Click any card to view their project details and success stats.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[250px]">
          {SHOWCASE_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className={`group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-brand-dark-card/40 cursor-pointer shadow-md transition-all duration-500 hover:border-brand-green/30 hover:shadow-glow-green-sm ${item.gridClass}`}
            >
              {/* Image */}
              <img
                src={item.img}
                alt={item.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:rotate-1"
              />

              {/* Dark Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-bg via-brand-dark-bg/40 to-transparent opacity-85 transition-opacity group-hover:opacity-95" />

              {/* Content Panel */}
              <div className="absolute inset-0 p-5 flex flex-col justify-end">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-brand-green bg-brand-green/10 border border-brand-green/20 px-2 py-0.5 rounded-md">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-bold text-white flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ZoomIn className="h-3 w-3" /> View Project
                  </span>
                </div>
                <h3 className="font-display text-base font-bold text-white leading-snug">
                  {item.title}
                </h3>
                <p className="text-[10px] text-slate-400 font-medium truncate mt-0.5">
                  {item.subtitle}
                </p>
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/5 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <span className="text-[10px] text-slate-500">Reward</span>
                  <span className="text-xs font-bold text-brand-green">{item.payout}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Lightbox Modal */}
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark-bg/85 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-2xl rounded-3xl border border-brand-green/20 bg-brand-dark-card/98 p-6 md:p-8 shadow-2xl overflow-hidden">
              
              {/* Close Button */}
              <button 
                onClick={() => setActiveItem(null)}
                className="absolute right-4 top-4 text-slate-400 hover:text-white rounded-lg p-1 hover:bg-brand-dark-surface transition-colors z-10"
                aria-label="Close details"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Left - Image */}
                <div className="relative rounded-2xl overflow-hidden border border-white/5 aspect-square">
                  <img
                    src={activeItem.img}
                    alt={activeItem.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-brand-green text-brand-dark-bg text-[9px] font-black uppercase tracking-wider">
                    {activeItem.category}
                  </div>
                </div>

                {/* Right - Text Details */}
                <div>
                  <span className="section-pill mb-2">Verified Impact</span>
                  <h3 className="font-display text-2xl font-black text-white leading-snug mb-2">
                    {activeItem.title}
                  </h3>
                  <p className="text-xs font-semibold text-brand-green mb-4">
                    {activeItem.subtitle}
                  </p>

                  <p className="text-slate-400 text-xs leading-relaxed mb-6">
                    {activeItem.desc}
                  </p>

                  <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
                    <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-xl text-center">
                      <span className="block text-[9px] text-slate-500 uppercase tracking-widest font-bold mb-1">Campaign Payout</span>
                      <span className="text-sm font-display font-black text-brand-green">{activeItem.payout}</span>
                    </div>
                    <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-xl text-center flex flex-col justify-center items-center">
                      <Sparkles className="h-4 w-4 text-brand-green mb-1" />
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Verified 100%</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
