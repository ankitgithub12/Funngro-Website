import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp, ShieldCheck, Milestone, CheckCircle2 } from 'lucide-react';
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
        <div className="text-center mb-16 animate-fade-up">
          <span className="section-pill justify-center mb-4">About Funngro</span>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">
            Connecting young talents with <span className="headline-accent">real brands.</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
            Seen on Shark Tank India Season 2, backed by Amit Jain & SucSEED, Funngro is India’s largest pocket-money earning and skill acquisition platform for teenagers.
          </p>
        </div>

        {/* Corporate Trust section */}
        <div className="grid md:grid-cols-2 gap-6 mb-20 animate-fade-up">
          <GlassCard className="p-8">
            <ShieldCheck className="h-10 w-10 text-brand-green mb-4" />
            <h3 className="font-display text-xl font-bold text-white mb-3">Our Mission</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We aim to enable early financial literacy and independence for young India. By participating in project-based tasks, students develop soft skills, understand commercial expectations, and start building financial savings responsibly.
            </p>
          </GlassCard>

          <GlassCard className="p-8">
            <Milestone className="h-10 w-10 text-brand-green mb-4" />
            <h3 className="font-display text-xl font-bold text-white mb-3">Verified Operations</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Funngro has worked with over 5,000 corporate brands across India. We strictly audit company campaigns to ensure tasks are age-appropriate, ethical, and offer transparent timelines and payout amounts.
            </p>
          </GlassCard>
        </div>

        {/* Interactive FAQ Accordion */}
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
