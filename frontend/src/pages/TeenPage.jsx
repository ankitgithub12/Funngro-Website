import React, { useState, useEffect } from 'react';
import LivePayoutTicker from '../components/LivePayoutTicker';
import BrandMarquee from '../components/BrandMarquee';
import StepCard from '../components/StepCard';
import GigCard from '../components/GigCard';
import ApplyModal from '../components/ApplyModal';
import GlassCard from '../components/GlassCard';
import { Search, CheckCircle2 } from 'lucide-react';

/* ─── Data ─────────────────────────────────────── */
const FIVE_STEPS = [
  {
    number: '01',
    title: 'Download & sign up',
    highlight: '2 min setup',
    description: 'Download the Funngro app on Android. Verify with OTP and add your UPI ID. That is all you need to start earning from real brand campaigns. Free forever.',
    tags: [],
  },
  {
    number: '02',
    title: 'Pick a brand campaign',
    highlight: 'Real brands, real briefs',
    description: 'Browse campaigns from India\'s biggest brands. Pick what excites you — influencer briefs, product sampling, referrals, or surveys. Every campaign shows the exact pay before you start.',
    tags: [
      { label: 'Brand Promotion',   range: '₹200–₹1,500' },
      { label: 'Sampling',          range: '₹100–₹800'   },
      { label: 'Referrals',         range: '₹300–₹2,000' },
      { label: 'Influencer Briefs', range: '₹500–₹3,000' },
    ],
  },
  {
    number: '03',
    title: 'Do the work',
    highlight: 'Flexible hours',
    description: 'Complete the campaign on your schedule. Post on social media, share with friends, try the product, or fill the survey. Funngro validates your submission before crediting.',
    tags: [],
  },
  {
    number: '04',
    title: 'Get paid in UPI',
    highlight: 'First payout < 24h',
    description: 'Once approved, money hits your UPI in seconds. Zero fees. No minimum balance. First-time users typically see their first rupee within twenty-four hours.',
    tags: [
      { label: 'UPI Payout',   range: 'Instant'  },
      { label: 'Bank Transfer',range: '< 24h'    },
      { label: 'Fees',         range: 'Zero'     },
      { label: 'Minimum',      range: '₹0'       },
    ],
  },
  {
    number: '05',
    title: 'Grow your ladder',
    highlight: 'Starter → Builder',
    description: 'Each campaign unlocks higher-paying opportunities. Level up from Starter to Grower to Builder. Top earners lead their own Clan and earn from their team\'s work too.',
    tags: [
      { label: 'Starter avg',    range: '₹1,200/mo' },
      { label: 'Builder avg',    range: '₹4,100/mo' },
      { label: 'Top 5%',         range: '₹18,000+/mo' },
      { label: 'Clan Leader',    range: 'Unlimited' },
    ],
  },
];

const PRINCIPLES = [
  {
    num: '01',
    title: 'Participation-to-Execution',
    desc: 'Start simple with surveys and referrals. Progress to executing real brand projects independently.',
  },
  {
    num: '02',
    title: 'Progressive Earning Model',
    desc: 'Level up from task-based pay to referrals, then to business revenue as you build trust.',
  },
  {
    num: '03',
    title: 'Trust Before Influence',
    desc: 'Earn your reputation with consistent work. Trust unlocks access to premium brand campaigns.',
  },
  {
    num: '04',
    title: 'Movement Up Value Chain',
    desc: 'Each stage moves you higher in the value chain — from consumer to promoter to creator to leader.',
  },
  {
    num: '05',
    title: 'Capability-Linked Income',
    desc: 'Your earning ceiling rises with your skills. Funngro tracks every task to match higher-value work.',
  },
  {
    num: '06',
    title: 'Own Your Micro-Business',
    desc: 'The final stage: build and lead your own team. Earn from your Clan\'s work while brands pay you directly.',
  },
];

const PROGRESSION = [
  'Explore brands & products',
  'Share feedback & insights',
  'Influence your peers',
  'Complete brand campaigns',
  'Unlock higher-earning tasks',
  'Support referrals & sales',
  'Build your own micro-business',
];

const STATS = [
  { value: '70 Lakh+',  label: 'Young Indians',       sub: 'Age 14–25' },
  { value: '★ 4.2',     label: 'Play Store Rating',   sub: '70,000+ reviews' },
  { value: '6,015',     label: 'Earning Today',        sub: 'Live right now' },
  { value: '< 24h',     label: 'First Payout',         sub: 'UPI · Zero fees' },
];

/* ─── Component ────────────────────────────────── */
export default function TeenPage() {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGigForApply, setSelectedGigForApply] = useState(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => { fetchGigs(); }, []);

  const fetchGigs = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/gigs');
      if (response.ok) setGigs(await response.json());
    } catch (err) {
      console.error('Error fetching gigs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApplySuccess = () => {
    setSelectedGigForApply(null);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 4000);
  };

  const filteredGigs = gigs.filter(g => {
    const mc = selectedCategory === 'All' || g.category === selectedCategory;
    const ms = g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
               g.company.toLowerCase().includes(searchQuery.toLowerCase());
    return mc && ms;
  });

  return (
    <div>
      {/* ── Toast ─────────────────────────────────────── */}
      {showSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-brand-green text-brand-dark-bg px-5 py-3.5 rounded-2xl shadow-glow-green animate-bounce-slow">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <div>
            <span className="font-bold block text-sm">Application Submitted!</span>
            <span className="text-[11px] opacity-70">The brand team will review your application.</span>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════
          HERO SECTION
         ════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden" aria-labelledby="teen-hero-heading">
        {/* Background radial gradient */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-dark-bg via-[#0e2218] to-brand-dark-bg" />
          <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full bg-brand-green/04 blur-3xl" />
          <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-brand-green/03 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left — Text */}
            <div>
              {/* Breadcrumb */}
              <nav className="breadcrumb mb-6" aria-label="Breadcrumb">
                <a href="#" className="hover:text-slate-400 transition-colors">Home</a>
                <span>·</span>
                <span>How it works</span>
              </nav>

              <p className="section-pill mb-4">Chapter one · Five steps</p>

              <h1 id="teen-hero-heading" className="font-display text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6">
                Five steps from<br />
                first tap to{' '}
                <span className="headline-accent">first payout.</span>
              </h1>

              <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-xl">
                Most users earn their first rupee within twenty-four hours. Here is precisely how it happens, step by step.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://play.google.com/store/apps/details?id=com.funngro.app"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-glow"
                  aria-label="Download Funngro app to start earning"
                >
                  Download app →
                </a>
                <button
                  onClick={() => document.getElementById('gigs-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-outline-green"
                >
                  See real brand work ▸
                </button>
              </div>
            </div>

            {/* Right — Live Payout Ticker */}
            <div className="flex justify-center lg:justify-end animate-float">
              <LivePayoutTicker />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          STATS STRIP
         ════════════════════════════════════════════════ */}
      <section className="border-y border-white/06 py-8 bg-brand-dark-card/30" aria-label="Funngro statistics">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map(({ value, label, sub }) => (
              <div key={label} className="stat-card">
                <p className="font-display text-3xl font-black text-brand-green mb-1">{value}</p>
                <p className="text-sm font-semibold text-white mb-0.5">{label}</p>
                <p className="text-[11px] text-slate-500">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          BRAND MARQUEE
         ════════════════════════════════════════════════ */}
      <BrandMarquee />

      {/* ════════════════════════════════════════════════
          5-STEP PROGRESSION
         ════════════════════════════════════════════════ */}
      <section className="py-20" aria-labelledby="five-steps-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">

            {/* Steps */}
            <div>
              <p className="section-pill mb-4">How it works</p>
              <h2 id="five-steps-heading" className="font-display text-4xl font-black text-white mb-12 leading-tight">
                From first tap to <span className="headline-accent">full income.</span>
              </h2>

              {FIVE_STEPS.map((step, i) => (
                <StepCard
                  key={step.number}
                  {...step}
                  isLast={i === FIVE_STEPS.length - 1}
                />
              ))}
            </div>

            {/* 7-step progression */}
            <div className="lg:pt-16">
              <div className="glass-card p-8 sticky top-24">
                <p className="section-pill mb-4">Your journey</p>
                <h3 className="font-display text-2xl font-bold text-white mb-6">
                  7-step progression sequence
                </h3>
                <ol className="space-y-3" aria-label="Teen earning progression steps">
                  {PROGRESSION.map((step, i) => (
                    <li key={step} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-green/10 border border-brand-green/30 flex items-center justify-center text-[10px] font-bold text-brand-green mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-sm text-slate-300 leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>

                {/* Average earnings callout */}
                <div className="mt-8 p-4 rounded-xl bg-brand-green/06 border border-brand-green/15">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-brand-green/70 mb-2">
                    Stage 03 · Build Your Own Business
                  </p>
                  <p className="text-2xl font-display font-black text-white">₹4,100<span className="text-base font-medium text-slate-400">/mo avg</span></p>
                  <p className="text-xs text-slate-500 mt-1">Top 5% earns ₹18,000+/month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          6 PRINCIPLES GRID
         ════════════════════════════════════════════════ */}
      <section className="py-20 bg-brand-dark-card/20 border-y border-white/05" aria-labelledby="principles-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-pill justify-center mb-4">Funngro philosophy</p>
            <h2 id="principles-heading" className="font-display text-4xl font-black text-white">
              Six principles of <span className="headline-accent">growth.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRINCIPLES.map(({ num, title, desc }) => (
              <article key={num} className="campaign-card" aria-label={`Principle ${num}: ${title}`}>
                <span className="text-[11px] font-bold text-brand-green/60 font-mono mb-3 block">{num}</span>
                <h3 className="font-display text-lg font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          TESTIMONIALS / SUCCESS STORIES
         ════════════════════════════════════════════════ */}
      <section className="py-20" aria-labelledby="stories-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="section-pill mb-3">Real earners</p>
              <h2 id="stories-heading" className="font-display text-4xl font-black text-white">
                People you'll want<br />to <span className="headline-accent">become.</span>
              </h2>
            </div>
            <a href="#" className="hidden md:block btn-outline-green text-sm">See all stories ▸</a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Sarthak K.',  age: 16, city: 'Pune',      earned: '₹3.9L+',  desc: 'Brand promotion & influencer campaigns' },
              { name: 'Anshika R.', age: 19, city: 'Delhi',     earned: '₹2.25L+', desc: 'Content creation & referral campaigns' },
              { name: 'Ashwani S.', age: 17, city: 'Chandigarh',earned: '₹66K+',   desc: 'Product sampling & surveys' },
              { name: 'Sayyam M.', age: 18, city: 'Mumbai',     earned: '₹63K+',   desc: 'Fintech & edtech referrals' },
            ].map(({ name, age, city, earned, desc }) => (
              <article key={name} className="glass-card p-6" aria-label={`${name}'s earning story`}>
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-green/30 to-brand-green/10 border border-brand-green/20 flex items-center justify-center mb-4">
                  <span className="font-display font-bold text-lg text-brand-green">{name[0]}</span>
                </div>
                <h3 className="font-semibold text-white text-sm mb-0.5">{name}</h3>
                <p className="text-[11px] text-slate-500 mb-3">Age {age} · {city}</p>
                <p className="font-display text-2xl font-black text-brand-green mb-1">{earned}</p>
                <p className="text-[11px] text-slate-500">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          GIGS BOARD (live backend data)
         ════════════════════════════════════════════════ */}
      <section
        id="gigs-section"
        className="py-20 bg-brand-dark-card/20 border-t border-white/05"
        aria-labelledby="gigs-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <p className="section-pill mb-3">Live on Funngro</p>
              <h2 id="gigs-heading" className="font-display text-3xl font-bold text-white">
                Active brand <span className="headline-accent">campaigns</span>
              </h2>
            </div>
            <div className="relative w-full md:max-w-xs">
              <input
                type="search"
                placeholder="Search campaigns or brands..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="glass-input w-full pl-10 text-sm"
                aria-label="Search brand campaigns"
              />
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" aria-hidden="true" />
            </div>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter campaigns by category">
            {['All', 'Design', 'Writing', 'Tech', 'Video', 'Marketing'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                  selectedCategory === cat
                    ? 'bg-brand-green text-brand-dark-bg border-brand-green shadow-glow-green-sm'
                    : 'border-white/08 text-slate-400 hover:border-brand-green/30 hover:text-slate-200'
                }`}
                aria-pressed={selectedCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gig grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(n => (
                <GlassCard key={n} hover={false} className="h-64 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <div className="h-3 w-16 shimmer rounded" />
                      <div className="h-4 w-12 shimmer rounded-full" />
                    </div>
                    <div className="h-5 w-3/4 shimmer rounded mb-3" />
                    <div className="space-y-2 mb-5">
                      <div className="h-3 w-full shimmer rounded" />
                      <div className="h-3 w-5/6 shimmer rounded" />
                    </div>
                  </div>
                  <div className="h-10 w-full shimmer rounded-xl" />
                </GlassCard>
              ))}
            </div>
          ) : filteredGigs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGigs.map(gig => (
                <GigCard key={gig._id} gig={gig} onApply={g => setSelectedGigForApply(g)} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 rounded-2xl border border-dashed border-white/08 bg-brand-dark-card/20">
              <p className="text-slate-400 text-sm mb-3">No campaigns match your filter.</p>
              <button
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="text-xs font-bold text-brand-green hover:underline"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          CTA BANNER
         ════════════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-b from-brand-dark-surface/40 to-brand-dark-bg" aria-labelledby="teen-cta-heading">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="section-pill justify-center mb-6">Get started free</p>
          <h2 id="teen-cta-heading" className="font-display text-5xl font-black text-white mb-6 leading-tight">
            Your first rupee is <span className="headline-accent">three taps away.</span>
          </h2>
          <p className="text-slate-400 text-lg mb-10">
            Download. Sign up. Pick a campaign. That's it. First payout in under 24 hours — guaranteed.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://play.google.com/store/apps/details?id=com.funngro.app"
              target="_blank"
              rel="noreferrer"
              className="btn-glow text-base px-8 py-4"
              aria-label="Download Funngro app to start earning now"
            >
              Download app →
            </a>
            <a
              href="https://www.instagram.com/funngro/"
              target="_blank"
              rel="noreferrer"
              className="btn-outline-green text-base px-8 py-4"
              aria-label="Follow Funngro on Instagram for latest updates"
            >
              Follow @funngro ▸
            </a>
          </div>
        </div>
      </section>

      {/* Apply Modal */}
      {selectedGigForApply && (
        <ApplyModal
          gig={selectedGigForApply}
          onClose={() => setSelectedGigForApply(null)}
          onSubmitSuccess={handleApplySuccess}
        />
      )}
    </div>
  );
}
