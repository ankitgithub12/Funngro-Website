import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, User, Clock, ArrowRight, X, Sparkles } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const ARTICLES = [
  {
    id: 1,
    category: "Youth Economy",
    title: "State of Gen Z Earning in India — 2026 Benchmark",
    desc: "A comprehensive breakdown of how India's teenagers are utilizing micro-gigs, content curation, and design tasks to establish early income streams.",
    date: "April 21, 2026",
    author: "Funngro Research",
    readTime: "9 mins read",
    isFeatured: true,
    content: "The Gen Z earning landscape in India has witnessed a structural shift in 2026. Rather than traditional offline tutoring or sales jobs, students aged 14–22 are gravitating toward digital micro-freelancing. Over 70% of active earners use their payouts for skill courses, device upgrades, or personal savings. Graphic design, short-form video editing, and UGC content creation lead as the highest-paying gig categories. Payout speeds and digital UPI integrations have enabled instant settlements, removing the historical friction of student payments. This benchmark demonstrates that early work experience builds financial maturity years before entering the formal corporate workforce."
  },
  {
    id: 2,
    category: "Inside Funngro",
    title: "Pitching Funngro on Shark Tank India — The Inside Story",
    desc: "Founder Payal Jain shares the behind-the-scenes preparation, pressure, and strategic debates that led to our successful Shark Tank S2 deal.",
    date: "March 28, 2026",
    author: "Payal Jain",
    readTime: "10 mins read",
    content: "Walking down the corridors of Shark Tank India is both exhilarating and nerve-wracking. The focus wasn't just on securing funding, but on explaining our core mission—enabling financial independence for India's youth. Answering questions on unit economics, user retention, and parent validation rules required precise numbers. The strategic alignment with Amit Jain and SucSEED Indovation has allowed us to double our platform capabilities and expand brand campaigns to over 5,000 corporate clients."
  },
  {
    id: 3,
    category: "Earn Online",
    title: "How ₹10,000 a Month is Actually Built on Funngro",
    desc: "A realistic roadmap for students detailing campaign combinations, trust ratings, and Clan moderation targets to reach ₹10,000/month.",
    date: "April 18, 2026",
    author: "Funngro Desk",
    readTime: "7 mins read",
    content: "Earning ₹10,000/month on Funngro requires a structured approach. Start by building your trust rating with basic surveys and product review tasks. Avoid spamming and ensure high accuracy. Once your rating crosses 4.5, apply for graphic design, article writing, or social promotion campaigns which pay ₹1,000–₹3,000 per gig. The final boost comes from joining or leading a local Clan—coordinating task completions for peers unlocks management bonuses that consistently push earnings past the ₹10k mark."
  },
  {
    id: 4,
    category: "Inside Funngro",
    title: "The 6 Pillars Behind Your Growth, in Plain English",
    desc: "Understanding how Funngro structures tasks to help you build portfolios, learn communication, and master commercial project guidelines.",
    date: "April 03, 2026",
    author: "Payal Jain",
    readTime: "8 mins read",
    content: "The 6 growth pillars on Funngro focus on turning micro-gigs into career stepping stones. These include: (1) Portfolio Building—creating Behance/GitHub proof-of-work; (2) Time Management—adhering to corporate brief deadlines; (3) Budgeting—handling your first digital UPI savings; (4) Feedback Literacy—improving designs based on manager revisions; (5) Peer Collaboration—working in Clan teams; and (6) Brand Communication—learning how to pitch your freelance skills professionally."
  },
  {
    id: 5,
    category: "Profile",
    title: "Six Teenagers, ₹18 Lakh, One App: Meet the Superstars of 2026",
    desc: "Spotlight interviews with Funngro's top Gen-Z earners who built micro-agencies and funded their own college degrees.",
    date: "April 10, 2026",
    author: "Payal Jain",
    readTime: "12 mins read",
    content: "We sit down with six remarkable students who have collectively earned over ₹18 lakhs on the platform. From designing social assets for global apparel brands to auditing user interfaces for tech startups, these superstars share how they balanced academics, handled parent skepticism, and used their earnings to fund their own design tools, laptops, and college tuition fees."
  },
  {
    id: 6,
    category: "Financial Literacy",
    title: "First Salary, First UPI: How to Handle Your First Paycheck",
    desc: "Bite-sized guide on separating your earnings into spending wallets, skill investments, and compound interest savings.",
    date: "April 07, 2026",
    author: "Funngro Desk",
    readTime: "6 mins read",
    content: "Receiving your first paycheck is a major milestone. But how you divide that money sets your future habits. We advocate the 50/30/20 rule: 50% for immediate student needs (books, subscriptions, transit); 30% for skill reinvestments (courses, templates, tools); and 20% moved directly into a compound savings wallet or parents' investment accounts. Early compound interest is your financial superpower."
  },
  {
    id: 7,
    category: "Earn Online",
    title: "Brand Promotion 101: Getting Paid for Posts You'd Make Anyway",
    desc: "How to safely participate in brand campaigns and create genuine social media clips that earn cash without spamming your friends.",
    date: "April 29, 2026",
    author: "Funngro Desk",
    readTime: "6 mins read",
    content: "Brands are looking for authentic user reviews, not fake advertisements. When promoting a product, share how you actually use it in your daily student routine. Keep video frames high-quality, use clear natural lighting, and outline the actual benefits. Genuine recommendations get approved faster by corporate review boards and earn higher payouts."
  },
  {
    id: 8,
    category: "For Brands",
    title: "CPA vs CPI vs CPM: Performance Pricing for Youth Campaigns",
    desc: "An educational guide for business partners and students on how performance pricing metrics shape corporate task budgets.",
    date: "April 30, 2026",
    author: "Funngro Desk",
    readTime: "10 mins read",
    content: "Understanding pricing models helps you pick the right gigs. CPM (Cost Per Mille) pays per thousand impressions—great for broad awareness. CPI (Cost Per Install) pays per app download. CPA (Cost Per Action/Acquisition) is the gold standard, paying when a user performs a verified action like completing a survey or posting a video. Since CPA requires the highest verification, it offers the biggest payouts to active freelancers."
  },
  {
    id: 9,
    category: "Earn Online",
    title: "Content That Earns: What Brands Actually Pay for in 2026",
    desc: "The visual formats, hook strategies, and editing standards that brands demand for vertical reels and tiktok campaigns.",
    date: "May 05, 2026",
    author: "Funngro Desk",
    readTime: "7 mins read",
    content: "In 2026, raw user-generated content (UGC) outperforms highly polished studio ads. Brands look for content that stops the scroll within the first 3 seconds using an engaging hook. Clear captions, fast transitions, and crisp audio narration are absolute must-haves. Submitting clean raw video files with separate audio tracks makes your content highly reusable and raises your brand rating."
  }
];

export default function BlogPage() {
  const { t } = useTranslation();
  const [selectedArticle, setSelectedArticle] = useState(null);

  const featuredArticle = ARTICLES.find(a => a.isFeatured);
  const gridArticles = ARTICLES.filter(a => !a.isFeatured);

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
            Dispatches from the <span className="headline-accent">youth economy.</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-lg mx-auto leading-relaxed">
            Honest guides. Not hype. Learn tips, tutorials, and financial safety guides written specifically for student creators and developers.
          </p>
        </div>

        {/* Featured Article Card */}
        {featuredArticle && (
          <div className="mb-12 animate-fade-up">
            <GlassCard className="p-8 border-brand-green/20 hover:border-brand-green/35 relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-brand-green/10 border-b border-l border-brand-green/20 px-4 py-1.5 rounded-bl-xl text-[9px] font-bold uppercase tracking-widest text-brand-green flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> Featured Post
              </div>

              <div className="max-w-3xl">
                <span className="text-[10px] font-bold text-brand-green bg-brand-green/10 px-2.5 py-1 rounded-full uppercase tracking-wider block w-fit mb-4">
                  {featuredArticle.category}
                </span>
                
                <h2 
                  onClick={() => setSelectedArticle(featuredArticle)}
                  className="font-display text-2xl sm:text-3xl font-bold text-white mb-4 hover:text-brand-green transition-colors cursor-pointer leading-tight"
                >
                  {featuredArticle.title}
                </h2>

                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                  {featuredArticle.desc}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/5">
                  <div className="flex items-center gap-6 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {featuredArticle.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {featuredArticle.readTime}</span>
                    <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" /> By {featuredArticle.author}</span>
                  </div>

                  <button 
                    onClick={() => setSelectedArticle(featuredArticle)}
                    className="text-xs font-bold text-brand-green flex items-center gap-1 group hover:underline"
                  >
                    Read Article 
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </GlassCard>
          </div>
        )}

        {/* Articles List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-up">
          {gridArticles.map((art) => (
            <GlassCard key={art.id} className="flex flex-col justify-between shine-card">
              <div>
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block mb-3">
                  {art.category}
                </span>

                {/* Title */}
                <h3 
                  className="font-display text-base font-bold text-white mb-3 hover:text-brand-green transition-colors cursor-pointer leading-snug" 
                  onClick={() => setSelectedArticle(art)}
                >
                  {art.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-[11px] leading-relaxed mb-6">
                  {art.desc}
                </p>
              </div>

              {/* Footer and Read button */}
              <div className="border-t border-white/5 pt-4 flex items-center justify-between mt-auto">
                <span className="text-[9px] text-slate-500 flex items-center gap-1 font-semibold">
                  <User className="h-3 w-3" /> {art.author}
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
                <span className="text-brand-green px-2 py-0.5 rounded bg-brand-green/5">{selectedArticle.category}</span>
                <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {selectedArticle.date}</span>
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {selectedArticle.readTime}</span>
                <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" /> By {selectedArticle.author}</span>
              </div>

              {/* Title */}
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-6 leading-snug">
                {selectedArticle.title}
              </h2>

              {/* Article Content */}
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line mb-8">
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
