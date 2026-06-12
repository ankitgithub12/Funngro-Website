import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp, ShieldCheck, Milestone, Award, Users, Linkedin, Briefcase, Network } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const FAQS = [
  {
    q: "What is Funngro and how does it work?",
    a: "Funngro is a dedicated workspace platform for teenagers (ages 14-25) to find micro-gigs posted by real companies. Teens register, choose campaigns like designing social media graphics, writing articles, trying out new products, or filling out feedback surveys, do the work, and get paid directly to their UPI account."
  },
  {
    q: "Is Funngro safe for teenagers? Do parents need to approve?",
    a: "Safety is our number one priority. Funngro is fully DPDP-compliant. We only display validated campaigns from trusted corporate partners. Teens under 18 must verify parent details during OTP registration. All funds are secured and paid directly via UPI or verified bank details. We never sell student data."
  },
  {
    q: "How much pocket money can I earn?",
    a: "Earnings depend on your skill levels and the campaigns you select. Beginners typically start with surveys and app referrals earning ₹100–₹500. Consistent contributors doing graphic designs, content writing, or video editing can earn ₹1,500–₹5,000 per task. Top earners who lead clans earn over ₹18,000/month."
  },
  {
    q: "Are there any joining fees or hidden charges?",
    a: "Funngro is 100% free for teenagers. There are zero registration fees, zero course fees, and zero commissions deducted from your payouts. What you see is what you earn."
  },
  {
    q: "Do I need a bank account or PAN card?",
    a: "Teens do not need a personal bank account or PAN card. You can add your parents' UPI ID, or use any student pocket-money wallet (like FamPay, OmniCard, or standard UPI) to receive payments instantly."
  }
];

const FOUNDERS = [
  {
    name: "Payal Jain",
    role: "Founder & CEO",
    bio: "An IIM Calcutta alumna with over two decades of corporate leadership experience. Payal successfully pitched Funngro on Shark Tank India Season 2, securing investment from Amit Jain (CarDekho) and Namita Thapar. She drives the product vision, brand design, and community operations.",
    linkedin: "https://www.linkedin.com/in/payaljain-funngro"
  },
  {
    name: "Anik Jain",
    role: "Co-Founder & CFO",
    bio: "An IIM Calcutta PGDCM alumnus with extensive experience across the BFSI (Banking, Financial Services, and Insurance) and Insurtech industries. Anik manages Funngro's compliance, brand partner acquisitions, financial operations, and unit economics.",
    linkedin: "https://www.linkedin.com/in/anikjain-funngro"
  }
];

const TIMELINE = [
  {
    date: "Dec 2022",
    title: "Shark Tank Investment",
    desc: "Funngro secured funding on Shark Tank India Season 2. Following the national broadcast, our user registration doubled within 30 days."
  },
  {
    date: "2023",
    title: "1 Million Earners",
    desc: "Reached the milestone of 1 million registered student earners in India, growing entirely organically with zero marketing spend."
  },
  {
    date: "Q4 FY25",
    title: "Profitable Growth",
    desc: "Funngro recorded its first profitable quarter while scaling to 3 million users and ranking among the Top 10 education/learning apps."
  },
  {
    date: "FY26",
    title: "70 Lakh Active Users",
    desc: "Connecting over 70 lakh young Indians with 5,000+ verified corporate brands. Profitable, scalable, and secure operations."
  }
];

const MOATS = [
  {
    num: "01",
    title: "Support & Onboarding",
    desc: "Teenagers guide other teens, answering queries and verifying KYC credentials asynchronously."
  },
  {
    num: "02",
    title: "Bug Bashes & QA",
    desc: "Active user testing clans log thousands of UI audits, functionality reviews, and QA tests."
  },
  {
    num: "03",
    title: "Content & Design",
    desc: "All social graphics, email banners, Reels, and blog illustrations are made by our student creators."
  },
  {
    num: "04",
    title: "Community & Clans",
    desc: "Clans coordinate peer reviews, guide campaign submissions, and manage local meetups."
  }
];

export default function AboutPage() {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="relative min-h-[90vh] bg-[#071210] pt-28 pb-20 overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-20 right-1/4 w-[350px] h-[350px] rounded-full bg-brand-green/02 blur-[100px]" />
        <div className="absolute bottom-20 left-1/4 w-[400px] h-[400px] rounded-full bg-brand-green/02 blur-[100px]" />
        <div className="absolute inset-0 grid-bg opacity-15" />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="text-center mb-20 animate-fade-up">
          <span className="section-pill justify-center mb-4">About Funngro</span>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">
            Built so young Indians can <span className="headline-accent">earn for real.</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
            Seen on Shark Tank India Season 2, backed by CarDekho's Amit Jain and SucSEED Indovation, Funngro is India’s largest pocket-money earning and skill acquisition platform.
          </p>
        </div>

        {/* Founding Team Section */}
        <div className="mb-24 animate-fade-up">
          <div className="text-center mb-12">
            <span className="section-pill justify-center mb-3">Leadership</span>
            <h2 className="font-display text-3xl font-bold text-white">Founding Team</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {FOUNDERS.map((founder, i) => (
              <GlassCard key={i} className="p-8 border-brand-green/10 hover:border-brand-green/20 relative group transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-display text-xl font-bold text-white group-hover:text-brand-green transition-colors">{founder.name}</h3>
                    <span className="text-[10px] text-brand-green font-bold uppercase tracking-wider">{founder.role}</span>
                  </div>
                  <a 
                    href={founder.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-white/5 hover:bg-brand-green hover:text-brand-dark-bg text-slate-400 transition-all"
                    aria-label={`${founder.name} LinkedIn`}
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-white/5">
                  {founder.bio}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Milestones / Timeline Section */}
        <div className="mb-24 animate-fade-up">
          <div className="text-center mb-12">
            <span className="section-pill justify-center mb-3">Our Journey</span>
            <h2 className="font-display text-3xl font-bold text-white">Timeline & Milestones</h2>
          </div>

          <div className="relative border-l border-white/10 pl-8 ml-4 space-y-12">
            {TIMELINE.map((item, i) => (
              <div key={i} className="relative">
                {/* Timeline Dot */}
                <div className="absolute -left-[41px] top-1.5 w-4.5 h-4.5 rounded-full bg-brand-dark-bg border border-brand-green flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                </div>
                <span className="text-[10px] font-bold text-brand-green uppercase tracking-wider block mb-1">{item.date}</span>
                <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Operations Moat ("Run by users") */}
        <div className="mb-24 animate-fade-up">
          <div className="text-center mb-12">
            <span className="section-pill justify-center mb-3">Operational Moat</span>
            <h2 className="font-display text-3xl font-bold text-white mb-3">Run by Young India</h2>
            <p className="text-slate-400 text-xs max-w-md mx-auto leading-relaxed">
              We practice what we preach. Over 100 teenager users run critical operations inside the Funngro company directly.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {MOATS.map((moat, i) => (
              <GlassCard key={i} className="p-6 border-brand-green/5 hover:border-brand-green/15 flex items-start gap-4">
                <span className="font-display text-2xl font-black text-brand-green bg-brand-green/5 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                  {moat.num}
                </span>
                <div>
                  <h3 className="font-display text-sm font-bold text-white mb-1.5">{moat.title}</h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{moat.desc}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* FAQ Accordion (Premium preservation) */}
        <div className="animate-fade-up">
          <div className="text-center mb-10">
            <span className="section-pill justify-center mb-2">Got Questions?</span>
            <h2 className="font-display text-3xl font-bold text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4 max-w-2xl mx-auto">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div 
                  key={i} 
                  className="rounded-2xl border transition-all duration-300 overflow-hidden"
                  style={{
                    borderColor: isOpen ? 'rgba(45, 222, 152, 0.35)' : 'rgba(255, 255, 255, 0.06)',
                    background: isOpen ? 'rgba(13, 28, 20, 0.95)' : 'rgba(13, 28, 20, 0.5)'
                  }}
                >
                  <button
                    onClick={() => toggleFaq(i)}
                    className="w-full flex items-center justify-between p-5 text-left text-xs font-bold text-white transition-colors hover:text-brand-green"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 text-brand-green flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-slate-500 flex-shrink-0" />
                    )}
                  </button>

                  <div 
                    className="transition-all duration-300"
                    style={{
                      maxHeight: isOpen ? '300px' : '0px',
                      opacity: isOpen ? 1 : 0
                    }}
                  >
                    <p className="px-5 pb-5 pt-1 text-xs text-slate-400 leading-relaxed border-t border-white/5">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
