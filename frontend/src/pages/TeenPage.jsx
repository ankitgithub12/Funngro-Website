import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, CheckCircle2 } from 'lucide-react';
import LivePayoutTicker from '../components/LivePayoutTicker';
import BrandMarquee from '../components/BrandMarquee';
import StepCard from '../components/StepCard';
import GigCard from '../components/GigCard';
import ApplyModal from '../components/ApplyModal';
import GlassCard from '../components/GlassCard';

/* ─── Static data (numbers don't need translation) ─── */
const STATS_DATA = [
  { value: '70 Lakh+', labelKey: 'teen.stats.youngIndians',  subKey: 'teen.stats.ageRange'    },
  { value: '★ 4.2',    labelKey: 'teen.stats.playRating',    subKey: 'teen.stats.reviews'     },
  { value: '6,015',    labelKey: 'teen.stats.earningToday',  subKey: 'teen.stats.liveNow'     },
  { value: '< 24h',    labelKey: 'teen.stats.firstPayout',   subKey: 'teen.stats.upiZeroFees' },
];

const STEP_KEYS = ['step1','step2','step3','step4','step5'];
const STEP_NUMS = ['01','02','03','04','05'];

const STEP_TAGS = {
  step1: [],
  step2: [
    { label: 'Brand Promotion',   range: '₹200–₹1,500' },
    { label: 'Sampling',          range: '₹100–₹800'   },
    { label: 'Referrals',         range: '₹300–₹2,000' },
    { label: 'Influencer Briefs', range: '₹500–₹3,000' },
  ],
  step3: [],
  step4: [
    { label: 'UPI Payout',    range: 'Instant' },
    { label: 'Bank Transfer', range: '< 24h'   },
    { label: 'Fees',          range: 'Zero'    },
    { label: 'Minimum',       range: '₹0'      },
  ],
  step5: [
    { label: 'Starter avg', range: '₹1,200/mo'  },
    { label: 'Builder avg', range: '₹4,100/mo'  },
    { label: 'Top 5%',      range: '₹18,000+/mo'},
    { label: 'Clan Leader', range: 'Unlimited'  },
  ],
};

export default function TeenPage() {
  const { t } = useTranslation();
  const [gigs, setGigs]                         = useState([]);
  const [loading, setLoading]                   = useState(true);
  const [searchQuery, setSearchQuery]           = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGigForApply, setSelectedGigForApply] = useState(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => { fetchGigs(); }, []);

  const fetchGigs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/gigs');
      if (res.ok) setGigs(await res.json());
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

  // Category filters come from locale so reset to first item
  const filterLabels = t('teen.gigs.filters', { returnObjects: true });
  const categoryMap  = Array.isArray(filterLabels) ? filterLabels : ['All','Design','Writing','Tech','Video','Marketing'];
  // Canonical (English) filter values for API matching
  const EN_CATS = ['All','Design','Writing','Tech','Video','Marketing'];

  const filteredGigs = gigs.filter(g => {
    const catIdx  = categoryMap.indexOf(selectedCategory);
    const enCat   = catIdx >= 0 ? EN_CATS[catIdx] : selectedCategory;
    const mc = enCat === 'All' || g.category === enCat;
    const ms = g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
               g.company.toLowerCase().includes(searchQuery.toLowerCase());
    return mc && ms;
  });

  const principles = t('teen.principles.items', { returnObjects: true });

  return (
    <div>
      {/* ── Success Toast ──────────────────────────── */}
      {showSuccessToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#2DDE98] text-[#071210] px-5 py-3.5 rounded-2xl shadow-[0_0_30px_rgba(45,222,152,0.4)] animate-bounce-slow"
        >
          <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
          <div>
            <span className="font-bold block text-sm">{t('teen.toast.title')}</span>
            <span className="text-[11px] opacity-70">{t('teen.toast.sub')}</span>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          HERO
         ══════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden" aria-labelledby="teen-hero-heading">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#071210] via-[#0e2218] to-[#071210]" />
          <div className="glow-orb glow-orb-primary" />
          <div className="glow-orb glow-orb-secondary" />
          <div className="absolute inset-0 grid-bg opacity-30" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left — Text */}
            <div>
              <nav className="breadcrumb mb-6" aria-label="Breadcrumb">
                <a href="#" className="hover:text-slate-400 transition-colors">{t('teen.breadcrumb.home')}</a>
                <span aria-hidden="true">·</span>
                <span>{t('teen.breadcrumb.howItWorks')}</span>
              </nav>

              <p className="section-pill mb-4">{t('teen.hero.pill')}</p>

              <h1 id="teen-hero-heading" className="font-display text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6">
                {t('teen.hero.heading1')}<br />
                {t('teen.hero.heading2')}{' '}
                <span className="headline-accent">{t('teen.hero.headingAccent')}</span>
              </h1>

              <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-xl">
                {t('teen.hero.subtext')}
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://play.google.com/store/apps/details?id=com.wishbanc.funngro"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-glow"
                  aria-label="Download Funngro app to start earning"
                >
                  {t('teen.hero.ctaDownload')}
                </a>
                <button
                  onClick={() => document.getElementById('gigs-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-outline-green"
                >
                  {t('teen.hero.ctaBrowse')}
                </button>
              </div>
            </div>

            {/* Right — Ticker */}
            <div className="flex justify-center lg:justify-end animate-float">
              <LivePayoutTicker />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          STATS STRIP
         ══════════════════════════════════════════════ */}
      <section className="border-y border-white/[0.06] py-8 bg-[#0d2018]/30" aria-label="Funngro statistics">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS_DATA.map(({ value, labelKey, subKey }) => (
              <div key={labelKey} className="stat-card">
                <p className="font-display text-3xl font-black text-[#2DDE98] mb-1">{value}</p>
                <p className="text-sm font-semibold text-white mb-0.5">{t(labelKey)}</p>
                <p className="text-[11px] text-slate-500">{t(subKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          BRAND MARQUEE
         ══════════════════════════════════════════════ */}
      <BrandMarquee />

      {/* ══════════════════════════════════════════════
          5-STEP PROGRESSION
         ══════════════════════════════════════════════ */}
      <section className="py-20" aria-labelledby="five-steps-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">

            {/* Steps column */}
            <div>
              <p className="section-pill mb-4">{t('teen.steps.pill')}</p>
              <h2 id="five-steps-heading" className="font-display text-4xl font-black text-white mb-12 leading-tight">
                {t('teen.steps.heading')} <span className="headline-accent">{t('teen.steps.headingAccent')}</span>
              </h2>
              {STEP_KEYS.map((key, i) => (
                <StepCard
                  key={key}
                  number={STEP_NUMS[i]}
                  title={t(`teen.steps.${key}.title`)}
                  highlight={t(`teen.steps.${key}.highlight`)}
                  description={t(`teen.steps.${key}.description`)}
                  tags={STEP_TAGS[key]}
                  isLast={i === STEP_KEYS.length - 1}
                />
              ))}
            </div>

            {/* 7-step progression */}
            <div className="lg:pt-16">
              <div className="glass-card p-8 sticky top-24">
                <p className="section-pill mb-4">{t('teen.journey.pill')}</p>
                <h3 className="font-display text-2xl font-bold text-white mb-6">
                  {t('teen.journey.heading')}
                </h3>
                <ol className="space-y-3" aria-label="Teen earning progression steps">
                  {(t('teen.journey.steps', { returnObjects: true }) || []).map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#2DDE98]/10 border border-[#2DDE98]/30 flex items-center justify-center text-[10px] font-bold text-[#2DDE98] mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-sm text-slate-300 leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-8 p-4 rounded-xl bg-[#2DDE98]/[0.06] border border-[#2DDE98]/15">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-[#2DDE98]/70 mb-2">
                    {t('teen.journey.callout.label')}
                  </p>
                  <p className="text-2xl font-display font-black text-white">
                    ₹4,100<span className="text-base font-medium text-slate-400">{t('teen.journey.callout.avg')}</span>
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{t('teen.journey.callout.top5')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          6 PRINCIPLES
         ══════════════════════════════════════════════ */}
      <section className="py-20 bg-[#0d2018]/20 border-y border-white/[0.05]" aria-labelledby="principles-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-pill justify-center mb-4">{t('teen.principles.pill')}</p>
            <h2 id="principles-heading" className="font-display text-4xl font-black text-white">
              {t('teen.principles.heading')} <span className="headline-accent">{t('teen.principles.headingAccent')}</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(principles) && principles.map((item, i) => (
              <article key={i} className="campaign-card shine-card" aria-label={`Principle ${i + 1}: ${item.title}`}>
                <span className="text-[11px] font-bold text-[#2DDE98]/60 font-mono mb-3 block">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          TESTIMONIALS / SUCCESS STORIES
         ══════════════════════════════════════════════ */}
      <section className="py-20" aria-labelledby="stories-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="section-pill mb-3">{t('teen.stories.pill')}</p>
              <h2 id="stories-heading" className="font-display text-4xl font-black text-white">
                {t('teen.stories.heading1')}<br />
                {t('teen.stories.heading2')}{' '}
                <span className="headline-accent">{t('teen.stories.headingAccent')}</span>
              </h2>
            </div>
            <a href="#" className="hidden md:block btn-outline-green text-sm">{t('teen.stories.seeAll')}</a>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(t('teen.stories.earners', { returnObjects: true }) || []).map((earner, i) => (
              <article key={i} className="glass-card p-6 shine-card" aria-label={`${earner.name}'s earning story`}>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2DDE98]/30 to-[#2DDE98]/10 border border-[#2DDE98]/20 flex items-center justify-center mb-4">
                  <span className="font-display font-bold text-lg text-[#2DDE98]">{earner.name[0]}</span>
                </div>
                <h3 className="font-semibold text-white text-sm mb-0.5">{earner.name}</h3>
                <p className="text-[11px] text-slate-500 mb-3">{t('teen.stories.age')} {earner.age} · {earner.city}</p>
                <p className="font-display text-2xl font-black text-[#2DDE98] mb-1">{earner.earned}</p>
                <p className="text-[11px] text-slate-500">{earner.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          GIGS BOARD (live backend data)
         ══════════════════════════════════════════════ */}
      <section id="gigs-section" className="py-20 bg-[#0d2018]/20 border-t border-white/[0.05]" aria-labelledby="gigs-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <p className="section-pill mb-3">{t('teen.gigs.pill')}</p>
              <h2 id="gigs-heading" className="font-display text-3xl font-bold text-white">
                {t('teen.gigs.heading')} <span className="headline-accent">{t('teen.gigs.headingAccent')}</span>
              </h2>
            </div>
            <div className="relative w-full md:max-w-xs">
              <input
                type="search"
                placeholder={t('teen.gigs.searchPlaceholder')}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="glass-input w-full pl-10 text-sm"
                aria-label={t('teen.gigs.searchLabel')}
              />
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" aria-hidden="true" />
            </div>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter campaigns by category">
            {categoryMap.map((cat, i) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                  selectedCategory === cat
                    ? 'bg-[#2DDE98] text-[#071210] border-[#2DDE98] shadow-[0_0_12px_rgba(45,222,152,0.3)]'
                    : 'border-white/[0.08] text-slate-400 hover:border-[#2DDE98]/30 hover:text-slate-200'
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
              {[1,2,3].map(n => (
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
            <div className="text-center py-16 rounded-2xl border border-dashed border-white/[0.08] bg-[#0d2018]/20">
              <p className="text-slate-400 text-sm mb-3">{t('teen.gigs.noResults')}</p>
              <button
                onClick={() => { setSelectedCategory(categoryMap[0]); setSearchQuery(''); }}
                className="text-xs font-bold text-[#2DDE98] hover:underline"
              >
                {t('teen.gigs.resetFilters')}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CTA BANNER
         ══════════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-b from-[#0d2018]/40 to-[#071210]" aria-labelledby="teen-cta-heading">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="section-pill justify-center mb-6">{t('teen.cta.pill')}</p>
          <h2 id="teen-cta-heading" className="font-display text-5xl font-black text-white mb-6 leading-tight">
            {t('teen.cta.heading')} <span className="headline-accent">{t('teen.cta.headingAccent')}</span>
          </h2>
          <p className="text-slate-400 text-lg mb-10">{t('teen.cta.subtext')}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://play.google.com/store/apps/details?id=com.wishbanc.funngro"
              target="_blank"
              rel="noreferrer"
              className="btn-glow text-base px-8 py-4"
              aria-label="Download Funngro app to start earning now"
            >
              {t('teen.cta.ctaDownload')}
            </a>
            <a
              href="https://www.instagram.com/fun.n.gro"
              target="_blank"
              rel="noreferrer"
              className="btn-outline-green text-base px-8 py-4"
              aria-label="Follow Funngro on Instagram"
            >
              {t('teen.cta.ctaFollow')}
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
