import React from 'react';

const FOOTER_LINKS = {
  Earn: [
    { label: 'How it works',     href: '#' },
    { label: 'Brand Campaigns',  href: '#' },
    { label: 'Sampling',         href: '#' },
    { label: 'Referrals',        href: '#' },
    { label: 'Influencer Briefs',href: '#' },
    { label: 'Content Work',     href: '#' },
    { label: 'App Testing',      href: '#' },
    { label: 'Surveys',          href: '#' },
    { label: 'SheLancer',        href: '#' },
    { label: 'Arcade',           href: '#' },
  ],
  Brands: [
    { label: 'Work with us',        href: '#' },
    { label: 'Campaign Types',      href: '#' },
    { label: 'Fintech Campaigns',   href: '#' },
    { label: 'D2C & FMCG',         href: '#' },
    { label: 'Case Studies',        href: '#' },
    { label: 'Pricing',             href: '#' },
    { label: 'Contact',             href: '#' },
  ],
  Company: [
    { label: 'About Funngro',   href: '#' },
    { label: 'Stories',         href: '#' },
    { label: 'Blog',            href: '#' },
    { label: 'Careers',         href: '#' },
    { label: 'Press',           href: '#' },
    { label: 'Shark Tank India',href: '#' },
    { label: 'Instagram',       href: 'https://www.instagram.com/funngro/' },
  ],
  Legal: [
    { label: 'Terms of Service',    href: '#' },
    { label: 'Privacy Policy',      href: '#' },
    { label: 'Cookie Policy',       href: '#' },
    { label: 'DPDP Compliance',     href: '#' },
    { label: 'Grievance Officer',   href: '#' },
    { label: 'Refund Policy',       href: '#' },
  ],
};

const SOCIAL_LINKS = [
  { label: 'Instagram',  href: 'https://www.instagram.com/funngro/', icon: '📸' },
  { label: 'LinkedIn',   href: 'https://www.linkedin.com/company/funngro', icon: '💼' },
  { label: 'YouTube',    href: 'https://www.youtube.com/@funngro', icon: '▶' },
  { label: 'Facebook',   href: '#', icon: 'f' },
  { label: 'X (Twitter)',href: '#', icon: '𝕏' },
  { label: 'WhatsApp',   href: '#', icon: '💬' },
  { label: 'Reddit',     href: '#', icon: 'r/' },
];

function FunngroLogoSmall() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#2DDE98" fillOpacity="0.12" />
      <path d="M10 22 C10 22 8 18 11 15 C13 13 14 12 14 10 C14 8 16 7 16 7 C16 7 18 8 18 10 C18 12 19 13 21 15 C24 18 22 22 22 22" stroke="#2DDE98" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M13 22 L19 22" stroke="#2DDE98" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="16" cy="10" r="1.5" fill="#2DDE98" />
    </svg>
  );
}

export default function Footer({ setActiveTab }) {
  return (
    <footer className="border-t border-white/06 bg-brand-dark-bg pt-16 pb-8" role="contentinfo" aria-label="Site footer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Main Grid ───────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">

          {/* Brand column */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <FunngroLogoSmall />
              <span className="font-display text-xl font-bold text-white">Funngro</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed mb-6 max-w-xs">
              India's largest youth earning platform. 70 lakh+ young Indians work with India's biggest brands. Free, forever.
            </p>

            {/* Social links */}
            <div className="flex flex-wrap gap-2" aria-label="Funngro social media links">
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="social-btn"
                  aria-label={`Follow Funngro on ${label}`}
                  title={label}
                >
                  <span aria-hidden="true" className="text-[13px]">{icon}</span>
                </a>
              ))}
            </div>

            {/* App Store badges */}
            <div className="flex gap-3 mt-6">
              <a
                href="https://play.google.com/store/apps/details?id=com.wishbanc.funngro"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/10 hover:border-brand-green/30 transition-colors"
                aria-label="Download Funngro on Google Play"
              >
                <span className="text-base" aria-hidden="true">▶</span>
                <div>
                  <p className="text-[9px] text-slate-500 leading-none">GET IT ON</p>
                  <p className="text-[11px] font-bold text-slate-200 leading-none mt-0.5">Google Play</p>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/10 hover:border-brand-green/30 transition-colors"
                aria-label="Download Funngro on App Store"
              >
                <span className="text-base" aria-hidden="true">🍎</span>
                <div>
                  <p className="text-[9px] text-slate-500 leading-none">DOWNLOAD ON</p>
                  <p className="text-[11px] font-bold text-slate-200 leading-none mt-0.5">App Store</p>
                </div>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-4"
                  style={{ fontFamily: 'Inter, sans-serif' }}>
                {heading}
              </h3>
              <nav aria-label={`${heading} links`}>
                {links.map(({ label, href }) => {
                  const isTabLink = label === 'How it works' || label === 'Work with us';
                  return (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noreferrer noopener' : undefined}
                      className="footer-link"
                      onClick={isTabLink ? (e) => {
                        if (heading === 'Earn') { e.preventDefault(); setActiveTab('teen'); }
                        if (heading === 'Brands') { e.preventDefault(); setActiveTab('company'); }
                      } : undefined}
                    >
                      {label}
                    </a>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ──────────────────────────────────── */}
        <div className="pt-8 border-t border-white/06 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-[11px] text-slate-600 font-medium">
            <span>🇮🇳 Made in India</span>
            <span className="w-px h-3 bg-white/10" />
            <span>DPDP-compliant</span>
            <span className="w-px h-3 bg-white/10" />
            <span>© 2026 Funngro Technologies Pvt. Ltd.</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-600">
            <a href="#" className="hover:text-slate-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Cookies</a>
            <a
              href="mailto:hello@funngro.com"
              className="hover:text-brand-green transition-colors font-semibold"
              aria-label="Email Funngro support"
            >
              hello@funngro.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
