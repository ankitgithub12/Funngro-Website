import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, User, Clock, ArrowRight, X } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const ARTICLES = [
  {
    id: 1,
    title: "Why Compound Interest is a Teenager's Superpower",
    desc: "Starting to invest small amounts early can yield massive wealth in your 30s. Learn how compound interest turns pocket money into lakhs.",
    date: "June 10, 2026",
    author: "Nikhil Kamath",
    readTime: "4 mins read",
    content: "When you are young, time is your greatest asset. If you save ₹500 every month starting at age 15, and invest it at a modest 12% compound return, by the time you turn 30 you will have accumulated over ₹2.5 Lakhs. By age 45, that same minor contribution grows to over ₹16 Lakhs! Compound interest is the interest you earn on interest. Over decades, this effect multiplies exponentially. Getting started with your first UPI payouts and saving even 20% of your earnings on Funngro builds habits that will support your financial freedom early."
  },
  {
    id: 2,
    title: "How to Build a Graphic Design Portfolio with Zero Experience",
    desc: "A step-by-step guide on creating high-converting design mockups, compiling them on Behance, and landing your first corporate logo client.",
    date: "June 08, 2026",
    author: "Rohan Verma",
    readTime: "5 mins read",
    content: "Brands do not care about your degree; they care about your portfolio. If you don't have past clients, create imaginary briefs! Design a modern interface for a futuristic fintech app, or create a set of Instagram reels templates for an apparel brand. Compile these into a neat Behance project. Write a short explanation of your color choices and layouts. When applying for Gigs on Funngro, paste your Behance link. This gives brand managers instant proof that you can execute high-quality design work."
  },
  {
    id: 3,
    title: "Understanding DPDP Compliance: What Teens and Parents Must Know",
    desc: "What is India's Digital Personal Data Protection Act? Understand your rights as a data principal and how Funngro keeps your information secure.",
    date: "June 02, 2026",
    author: "Shreya Sen",
    readTime: "3 mins read",
    content: "The DPDP Act (2023) is India's landmark legislation securing your digital identity. Under this law, platforms must explicitly explain what data they collect and request permission. For teens under 18, verifiable parental consent is mandatory. You have the right to withdraw consent at any time and request that your profile and applications be deleted. Funngro strictly adheres to DPDP guidelines. We never collect excess details, we enforce OTP verification, and our brand managers never see your private contacts or device storage."
  }
];

export default function BlogPage() {
  const { t } = useTranslation();
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <div className="relative min-h-[90vh] bg-[#071210] pt-28 pb-20 overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-20 right-1/4 w-[350px] h-[350px] rounded-full bg-brand-green/02 blur-[100px]" />
        <div className="absolute bottom-20 left-1/4 w-[400px] h-[400px] rounded-full bg-brand-green/02 blur-[100px]" />
        <div className="absolute inset-0 grid-bg opacity-15" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <span className="section-pill justify-center mb-4">Funngro Blog</span>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">
            Knowledge leads to <span className="headline-accent">earning power.</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-lg mx-auto leading-relaxed">
            Tips, tutorials, and financial safety guides written specifically for student creators and developers.
          </p>
        </div>

        {/* Articles List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-up">
          {ARTICLES.map((art) => (
            <GlassCard key={art.id} className="flex flex-col justify-between shine-card">
              <div>
                {/* Meta details */}
                <div className="flex items-center gap-4 text-[10px] text-slate-500 mb-4 font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {art.date}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {art.readTime}</span>
                </div>

                {/* Title */}
                <h3 className="font-display text-lg font-bold text-white mb-3 hover:text-brand-green transition-colors cursor-pointer" onClick={() => setSelectedArticle(art)}>
                  {art.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-xs leading-relaxed mb-6">
                  {art.desc}
                </p>
              </div>

              {/* Footer and Read button */}
              <div className="border-t border-white/5 pt-4 flex items-center justify-between mt-auto">
                <span className="text-[10px] text-slate-500 flex items-center gap-1">
                  <User className="h-3 w-3" /> By {art.author}
                </span>
                <button 
                  onClick={() => setSelectedArticle(art)}
                  className="text-xs font-bold text-brand-green flex items-center gap-1 group hover:underline"
                >
                  Read Article 
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Dynamic Full Article Reading Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark-bg/85 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-2xl rounded-2xl border border-brand-green/20 bg-brand-dark-card/95 p-8 shadow-2xl overflow-y-auto max-h-[85vh]">
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedArticle(null)}
                className="absolute right-4 top-4 text-slate-400 hover:text-white rounded-lg p-1 hover:bg-brand-dark-surface transition-colors"
                aria-label="Close reader"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Meta details */}
              <div className="flex items-center gap-4 text-[10px] text-slate-500 mb-4 font-bold uppercase tracking-wider">
                <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {selectedArticle.date}</span>
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {selectedArticle.readTime}</span>
                <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" /> By {selectedArticle.author}</span>
              </div>

              {/* Title */}
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-6 leading-snug">
                {selectedArticle.title}
              </h2>

              {/* Article Content */}
              <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line mb-8">
                {selectedArticle.content}
              </p>

              {/* Footer CTA */}
              <div className="border-t border-white/5 pt-6 flex justify-end">
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="btn-outline-green text-xs px-6 py-2"
                >
                  Close Reader
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
