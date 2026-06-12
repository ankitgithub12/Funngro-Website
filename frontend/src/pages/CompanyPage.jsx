import React, { useState, useEffect } from 'react';
import BrandMarquee from '../components/BrandMarquee';
import ApplicationCard from '../components/ApplicationCard';
import PostGigModal from '../components/PostGigModal';
import GlassCard from '../components/GlassCard';
import { CheckCircle2, Plus, ChevronDown, ChevronUp } from 'lucide-react';

/* ─── Data ─────────────────────────────────────── */
const STATS = [
  { value: '70 Lakh+', label: 'Young Indians',    sub: 'Age 14–25' },
  { value: '5,000+',   label: 'Brands',           sub: 'Active partners' },
  { value: '1,000+',   label: 'Live Projects',    sub: 'Right now' },
  { value: '12+',      label: 'Work Categories',  sub: 'Pick what fits' },
];

const CAMPAIGN_TYPES = [
  {
    num: '01', title: 'Promotion',
    desc: 'Brand awareness, recall, and social posts. Your audience becomes a brand audience.',
    tags: ['Social media', 'Awareness', 'Recall'],
  },
  {
    num: '02', title: 'Sampling',
    desc: 'FMCG, beauty, food & beverage product trials. Real feedback from real users.',
    tags: ['FMCG', 'Beauty', 'Food & Bev'],
  },
  {
    num: '03', title: 'Referrals',
    desc: 'Peer growth with Clan multipliers. Ideal for fintech, edtech, and gaming.',
    tags: ['Fintech', 'Edtech', 'Gaming'],
  },
  {
    num: '04', title: 'Influencer',
    desc: 'Micro and nano creator campaigns. Authentic voices with verified audiences.',
    tags: ['Micro', 'Nano', 'Creator'],
  },
  {
    num: '05', title: 'Content',
    desc: 'UGC reels, posts, blogs, and photos. Full asset rights with every brief.',
    tags: ['Reels', 'UGC', 'Blog'],
  },
  {
    num: '06', title: 'Insights',
    desc: 'Targeted brand surveys, NPS, and feedback from your exact Gen-Z cohort.',
    tags: ['Surveys', 'NPS', 'Research'],
  },
  {
    num: '07', title: 'App Testing',
    desc: 'QA, bug reports, and usability testing from real teen users at scale.',
    tags: ['QA', 'Bug reports', 'UX'],
  },
  {
    num: '08', title: 'Ideation',
    desc: 'Cohort product and concept testing. Gen-Z insights before you build.',
    tags: ['Concept test', 'Focus group', 'Product'],
  },
  {
    num: '09', title: 'Sales',
    desc: 'Affiliate-style conversions with performance tracking and verified action data.',
    tags: ['Affiliate', 'CPA', 'Sales'],
  },
];

const VERTICALS = [
  'Fintech', 'D2C', 'Beauty', 'FMCG', 'Gaming', 'Edtech',
  'Food & Bev', 'Commerce', 'Travel', 'Entertainment', 'Wellness', 'Lifestyle',
];

const CASE_STUDY = [
  { metric: 'CPA',               funngro: '₹38',  industry: '₹95–150',  highlight: true  },
  { metric: 'Completion Rate',   funngro: '68%',  industry: '8–12%',    highlight: true  },
  { metric: 'Verified Actions',  funngro: '100%', industry: 'No data',  highlight: true  },
  { metric: 'Repeat Campaigns',  funngro: '3×',   industry: '—',        highlight: false },
];

const ENGAGEMENT = [
  { title: 'Always-on engagement loops',     desc: 'Retention-focused campaigns running year-round to keep your brand top-of-mind.' },
  { title: 'On-ground college presence',     desc: 'Posters, events, and peer outreach across campuses. Physical + digital combined.' },
  { title: 'Always-on creator deals',        desc: 'Monthly retainers with Funngro\'s top-earning creators for consistent brand content.' },
];

/* ─── Component ────────────────────────────────── */
export default function CompanyPage() {
  const [applications, setApplications] = useState([]);
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showPostModal, setShowPostModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [gigsRes, appsRes] = await Promise.all([fetch('/api/gigs'), fetch('/api/applications')]);
      if (gigsRes.ok && appsRes.ok) {
        setGigs(await gigsRes.json());
        setApplications(await appsRes.json());
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePostSuccess = () => {
    setShowPostModal(false);
    setShowSuccessToast(true);
    fetchData();
    setTimeout(() => setShowSuccessToast(false), 4000);
  };

  const handleApplicationStatusUpdate = updated =>
    setApplications(prev => prev.map(a => a._id === updated._id ? updated : a));

  const filteredApps = applications.filter(a => activeFilter === 'all' || a.status === activeFilter);
  const totalGigs = gigs.length;
  const pendingApps = applications.filter(a => a.status === 'pending').length;
  const approvedApps = applications.filter(a => a.status === 'approved').length;

  return (
    <div>
      {/* ── Toast ─────────────────────────────────────── */}
      {showSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-brand-green text-brand-dark-bg px-5 py-3.5 rounded-2xl shadow-glow-green animate-bounce-slow">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <div>
            <span className="font-bold block text-sm">Campaign Published!</span>
            <span className="text-[11px] opacity-70">Young Indians will see your campaign now.</span>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════
          HERO
         ════════════════════════════════════════════════ */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden" aria-labelledby="brands-hero-heading">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-dark-bg via-[#0a1c12] to-brand-dark-bg" />
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-brand-green/03 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-brand-green/02 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 w-full">
          {/* Breadcrumb */}
          <nav className="breadcrumb mb-8" aria-label="Breadcrumb">
            <a href="#" className="hover:text-slate-400 transition-colors">Home</a>
            <span>·</span>
            <span>For Brands</span>
          </nav>

          <p className="section-pill mb-6">For marketing leaders · Work with young India</p>

          <h1 id="brands-hero-heading" className="font-display text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-8 max-w-5xl">
            Work with 70 lakh young Indians
            on the things{' '}
            <span className="headline-accent">brands actually need.</span>
          </h1>

          <p className="text-xl text-slate-400 leading-relaxed mb-12 max-w-3xl">
            Promotion, sampling, content, surveys, influencer briefs, app testing,
            ideation, sales support — from a verified pool of seventy lakh young
            Indians who already use, follow, and care about brands like yours.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setShowPostModal(true)}
              className="btn-glow text-base px-8 py-4"
              aria-label="Get in touch with Funngro to start a brand campaign"
            >
              Get in touch →
            </button>
            <a
              href="mailto:hello@funngro.com"
              className="btn-outline-green text-base px-8 py-4"
              aria-label="Email Funngro at hello@funngro.com"
            >
              hello@funngro.com ▸
            </a>
          </div>
          <p className="mt-4 text-[11px] text-slate-600 font-medium">
            Real human reads every email · DPDP-compliant
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          STATS STRIP
         ════════════════════════════════════════════════ */}
      <section className="border-y border-white/06 py-8 bg-brand-dark-card/30" aria-label="Funngro platform statistics for brands">
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
          VALUE PROPOSITION
         ════════════════════════════════════════════════ */}
      <section className="py-20" aria-labelledby="value-prop-heading">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-pill justify-center mb-6">Why Funngro</p>
          <h2 id="value-prop-heading" className="font-display text-4xl lg:text-5xl font-black text-white mb-8 leading-tight">
            Reach is plentiful.<br />
            <span className="headline-accent">Real action is scarce.</span>
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed max-w-3xl mx-auto">
            Impressions and reach are cheap. What actually moves brands is verified action —
            authentic promotion, someone genuinely trying your product, a referral from a trusted peer.
            That is precisely what Funngro sells. No bots. No inflated metrics. Only real, verified action
            from seventy lakh young Indians who genuinely engage.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          BRAND MARQUEE
         ════════════════════════════════════════════════ */}
      <BrandMarquee />

      {/* ════════════════════════════════════════════════
          9 CAMPAIGN TYPES
         ════════════════════════════════════════════════ */}
      <section className="py-20 bg-brand-dark-card/20 border-y border-white/05" aria-labelledby="campaigns-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-pill justify-center mb-4">What you can run</p>
            <h2 id="campaigns-heading" className="font-display text-4xl font-black text-white">
              Pick what you <span className="headline-accent">need.</span>
            </h2>
            <p className="mt-4 text-slate-400 max-w-xl mx-auto">
              Nine campaign types, one platform. Mix and match or run them all.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CAMPAIGN_TYPES.map(({ num, title, desc, tags }) => (
              <article key={num} className="campaign-card" aria-label={`Campaign type ${num}: ${title}`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[11px] font-black text-brand-green/60 font-mono">{num}</span>
                  <h3 className="font-display text-lg font-bold text-white">{title}</h3>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">{desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map(t => (
                    <span key={t} className="tag-pill">{t}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          {/* Additional engagement loops */}
          <div className="mt-8 grid sm:grid-cols-3 gap-5">
            {ENGAGEMENT.map(({ title, desc }) => (
              <article key={title} className="p-6 rounded-xl border border-brand-green/15 bg-brand-green/04">
                <h3 className="font-semibold text-brand-green text-sm mb-2">{title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          VERTICALS SERVED
         ════════════════════════════════════════════════ */}
      <section className="py-16" aria-labelledby="verticals-heading">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-pill justify-center mb-4">Industries we serve</p>
          <h2 id="verticals-heading" className="font-display text-3xl font-black text-white mb-8">
            Twelve <span className="headline-accent">verticals covered.</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-3" role="list" aria-label="Industries served by Funngro">
            {VERTICALS.map(v => (
              <span key={v} className="tag-pill text-sm px-4 py-2" role="listitem">{v}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          CASE STUDY — FINTECH
         ════════════════════════════════════════════════ */}
      <section className="py-20 bg-brand-dark-card/20 border-y border-white/05" aria-labelledby="case-study-heading">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Text side */}
            <div>
              <div className="inline-block px-3 py-1 rounded-full border border-brand-green/25 bg-brand-green/08 text-[11px] font-bold text-brand-green uppercase tracking-widest mb-6">
                Case Study · Fintech
              </div>
              <h2 id="case-study-heading" className="font-display text-4xl font-black text-white mb-6 leading-tight">
                ₹38 CPA.<br />
                68% completion.<br />
                <span className="headline-accent">Zero bots.</span>
              </h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                A top-10 Indian fintech ran a referral campaign across Funngro's verified pool.
                The results outperformed every prior digital channel — at a fraction of the cost.
              </p>
              <button
                onClick={() => setShowPostModal(true)}
                className="btn-outline-green"
                aria-label="Start a campaign similar to this fintech case study"
              >
                Start your campaign →
              </button>
            </div>

            {/* Table side */}
            <div className="overflow-hidden rounded-2xl border border-white/08">
              <table className="cs-table" aria-label="Fintech case study results comparison">
                <thead>
                  <tr>
                    <th className="text-left">Metric</th>
                    <th className="text-center text-brand-green">Funngro</th>
                    <th className="text-center">Industry Avg</th>
                  </tr>
                </thead>
                <tbody>
                  {CASE_STUDY.map(({ metric, funngro, industry, highlight }) => (
                    <tr key={metric} className={highlight ? 'bg-brand-green/02' : ''}>
                      <td className="text-slate-400">{metric}</td>
                      <td className={`text-center font-display font-black text-lg ${highlight ? 'text-brand-green' : 'text-white'}`}>
                        {funngro}
                      </td>
                      <td className="text-center text-slate-500">{industry}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-5 py-3 bg-brand-dark-surface/60 border-t border-white/05">
                <p className="text-[10px] text-slate-600 text-center">
                  Data from 6-month fintech campaign · 2025 · All actions verified
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          CTA SECTION
         ════════════════════════════════════════════════ */}
      <section className="py-24" aria-labelledby="brands-cta-heading">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="section-pill justify-center mb-6">Ready to start?</p>
          <h2 id="brands-cta-heading" className="font-display text-5xl font-black text-white mb-6 leading-tight">
            Tell us what you're <span className="headline-accent">trying to do.</span>
          </h2>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed">
            Drop us a message or post a campaign directly. A real human reads every email within one business day.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-6">
            <button
              onClick={() => setShowPostModal(true)}
              className="btn-glow text-base px-8 py-4"
              aria-label="Get in touch with Funngro for brand campaigns"
            >
              Get in touch →
            </button>
            <a
              href="mailto:hello@funngro.com"
              className="btn-outline-green text-base px-8 py-4"
              aria-label="Email Funngro at hello@funngro.com"
            >
              hello@funngro.com ▸
            </a>
          </div>
          <p className="text-[11px] text-slate-600 font-medium">
            Real human reads every email · DPDP-compliant · Made in India 🇮🇳
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          DASHBOARD (collapsible — existing functionality)
         ════════════════════════════════════════════════ */}
      <section className="border-t border-white/06 bg-brand-dark-card/30" aria-label="Campaign management dashboard">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setShowDashboard(!showDashboard)}
            className="w-full flex items-center justify-between py-5 text-left"
            aria-expanded={showDashboard}
            aria-controls="dashboard-panel"
          >
            <div>
              <span className="text-sm font-bold text-slate-300">Campaign Dashboard</span>
              <span className="ml-3 text-[11px] text-slate-500">
                {totalGigs} campaigns · {pendingApps} pending · {approvedApps} approved
              </span>
            </div>
            {showDashboard ? (
              <ChevronUp className="h-5 w-5 text-slate-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-slate-500" />
            )}
          </button>

          {showDashboard && (
            <div id="dashboard-panel" className="pb-12">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-10">
                {[
                  { label: 'Campaigns',      value: totalGigs,   color: 'text-brand-green' },
                  { label: 'Pending Apps',   value: pendingApps, color: 'text-yellow-400'  },
                  { label: 'Hired',          value: approvedApps,color: 'text-emerald-400' },
                ].map(({ label, value, color }) => (
                  <div key={label} className="glass-card p-5 text-center">
                    <span className={`block text-3xl font-display font-black ${color} mb-1`}>{value}</span>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">{label}</span>
                  </div>
                ))}
              </div>

              {/* Post button */}
              <div className="mb-8">
                <button
                  onClick={() => setShowPostModal(true)}
                  className="btn-glow"
                  aria-label="Post a new brand campaign"
                >
                  <Plus className="h-4 w-4" />
                  Post a Campaign
                </button>
              </div>

              {/* Applications inbox */}
              <div className="mb-6">
                <h3 className="font-display text-xl font-bold text-white mb-4">Application Inbox</h3>
                <div className="flex bg-brand-dark-card p-1 rounded-xl border border-white/06 text-xs mb-6 w-fit">
                  {['all', 'pending', 'approved', 'rejected'].map(f => (
                    <button
                      key={f}
                      onClick={() => setActiveFilter(f)}
                      className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-all ${
                        activeFilter === f
                          ? 'bg-brand-green text-brand-dark-bg'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                      aria-pressed={activeFilter === f}
                    >
                      {f}
                    </button>
                  ))}
                </div>

                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {[1, 2].map(n => (
                      <GlassCard key={n} hover={false} className="h-48">
                        <div className="h-4 w-1/2 shimmer rounded mb-2" />
                        <div className="h-3 w-1/3 shimmer rounded mb-4" />
                        <div className="h-8 shimmer rounded mt-auto" />
                      </GlassCard>
                    ))}
                  </div>
                ) : filteredApps.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredApps.map(app => (
                      <ApplicationCard
                        key={app._id}
                        application={app}
                        onStatusUpdate={handleApplicationStatusUpdate}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 rounded-2xl border border-dashed border-white/08">
                    <p className="text-slate-500 text-sm">No applications in this status.</p>
                  </div>
                )}
              </div>

              {/* Gigs table */}
              {gigs.length > 0 && (
                <div>
                  <h3 className="font-display text-xl font-bold text-white mb-4">Published Campaigns</h3>
                  <div className="overflow-x-auto rounded-xl border border-white/06">
                    <table className="w-full text-left text-xs border-collapse bg-brand-dark-card/40" aria-label="Published brand campaigns">
                      <thead>
                        <tr className="border-b border-white/06 text-slate-500 font-bold uppercase">
                          <th className="p-4">Campaign</th>
                          <th className="p-4">Category</th>
                          <th className="p-4">Budget</th>
                          <th className="p-4">Timeline</th>
                          <th className="p-4">Skills</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/04 text-slate-300">
                        {gigs.map(g => (
                          <tr key={g._id} className="hover:bg-brand-green/02 transition-colors">
                            <td className="p-4 font-semibold text-white">{g.title}</td>
                            <td className="p-4">{g.category}</td>
                            <td className="p-4 font-bold text-brand-green">₹{g.budget}</td>
                            <td className="p-4">{g.duration}</td>
                            <td className="p-4">
                              <div className="flex gap-1 flex-wrap">
                                {g.skills.slice(0, 3).map(s => (
                                  <span key={s} className="tag-pill">{s}</span>
                                ))}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Post Campaign Modal */}
      {showPostModal && (
        <PostGigModal
          onClose={() => setShowPostModal(false)}
          onSubmitSuccess={handlePostSuccess}
        />
      )}
    </div>
  );
}
