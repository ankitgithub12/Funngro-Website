import React, { useState, useEffect } from 'react';

/* ── Real Funngro Logo SVG ──────────────────────────────── */
function FunngroLogo({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="34" height="34" rx="10" fill="#2DDE98" fillOpacity="0.15" />
      <rect width="34" height="34" rx="10" stroke="#2DDE98" strokeOpacity="0.2" strokeWidth="1" />
      {/* F letterform stylized */}
      <text x="7" y="25" fontFamily="'Playfair Display', serif" fontSize="20" fontWeight="900" fill="#2DDE98">F</text>
      {/* Green dot accent */}
      <circle cx="27" cy="8" r="3" fill="#2DDE98" opacity="0.9" />
    </svg>
  );
}

/* ── Google Play Icon SVG (real, not emoji) ─────────────── */
function GooglePlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3.18 1C2.5 1.38 2 2.07 2 2.91V21.1c0 .84.5 1.53 1.18 1.91L13 12 3.18 1z" fill="currentColor" opacity="0.8"/>
      <path d="M16.25 8.75L5.5 2.5 14.5 12l1.75-3.25z" fill="currentColor"/>
      <path d="M16.25 15.25L14.5 12l-9 9.5 10.75-6.25z" fill="currentColor" opacity="0.7"/>
      <path d="M22 12c0-.7-.38-1.3-.95-1.65L17.5 8.5 15.5 12l2 3.5 3.55-1.85C21.62 13.3 22 12.7 22 12z" fill="currentColor" opacity="0.6"/>
    </svg>
  );
}

export default function Navbar({ activeTab, setActiveTab }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Earn',        tab: 'teen'    },
    { label: 'Stories',     tab: null      },
    { label: 'For Brands',  tab: 'company' },
    { label: 'Arcade',      tab: null      },
    { label: 'SheLancer',   tab: null      },
    { label: 'About',       tab: null      },
    { label: 'Blog',        tab: null      },
  ];

  return (
    <header className="sticky top-0 z-50" role="banner">
      {/* ── Announcement Bar ─────────────────────────────── */}
      <div className="announcement-bar px-4 py-2 hidden md:flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-400">
          <span className="flex items-center gap-1.5">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M5 0L6.12 3.38H9.51L6.88 5.47L7.94 8.82L5 6.67L2.06 8.82L3.12 5.47L0.49 3.38H3.88L5 0Z" fill="#2DDE98"/>
            </svg>
            <span className="text-[11px]">
              As seen on <strong className="text-slate-200">Shark Tank India</strong>
              {' '}· Season 2 · Backed by Amit Jain & SucSEED
            </span>
          </span>
          <a
            href="https://www.instagram.com/funngro/"
            target="_blank"
            rel="noreferrer"
            className="text-[11px] font-bold tracking-widest uppercase text-[#2DDE98] hover:text-white transition-colors flex items-center gap-1"
          >
            Read story
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </a>
        </div>
      </div>

      {/* ── Main Navbar ───────────────────────────────────── */}
      <nav
        className={`w-full transition-all duration-300 ${
          scrolled
            ? 'nav-scrolled'
            : 'bg-[#071210]/85 backdrop-blur-md border-b border-white/[0.04]'
        }`}
        aria-label="Main navigation"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-6">

            {/* ── Logo ───────────────────────────────────── */}
            <button
              onClick={() => setActiveTab('teen')}
              className="flex items-center gap-2.5 flex-shrink-0 group"
              aria-label="Funngro home"
            >
              <FunngroLogo />
              <span className="font-display text-xl font-bold text-white group-hover:text-[#2DDE98] transition-colors duration-200">
                Funngro
              </span>
            </button>

            {/* ── Center Nav Links (Desktop) ────────────── */}
            <div className="hidden lg:flex items-center gap-1" role="navigation">
              {navLinks.map(({ label, tab }) => (
                <button
                  key={label}
                  onClick={() => tab && setActiveTab(tab)}
                  className={`px-3.5 py-2 rounded-xl text-[13px] font-medium transition-all duration-200 ${
                    (tab === 'teen' && activeTab === 'teen') ||
                    (tab === 'company' && activeTab === 'company')
                      ? 'text-[#2DDE98] font-semibold bg-[#2DDE98]/08'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                  } ${!tab ? 'opacity-50 cursor-default' : ''}`}
                  aria-current={
                    (tab === 'teen' && activeTab === 'teen') ||
                    (tab === 'company' && activeTab === 'company')
                      ? 'page' : undefined
                  }
                >
                  {label}
                </button>
              ))}
            </div>

            {/* ── Right Controls ────────────────────────── */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {/* Language pills */}
              <div className="hidden md:flex items-center gap-1 text-[11px] font-semibold">
                <button className="px-2.5 py-1 rounded-full bg-[#2DDE98] text-[#071210] font-bold text-[10px]">EN</button>
                <button className="px-2.5 py-1 rounded-full text-slate-500 hover:text-slate-300 transition-colors text-[10px]">Hi-En</button>
                <button className="px-2.5 py-1 rounded-full text-slate-500 hover:text-slate-300 transition-colors text-[10px]">हिं</button>
              </div>

              {/* Download CTA — Google Play badge style */}
              <a
                href="https://play.google.com/store/apps/details?id=com.wishbanc.funngro"
                target="_blank"
                rel="noreferrer"
                className="btn-glow text-[12px] px-4 py-2 hidden sm:flex items-center gap-2"
                aria-label="Download Funngro app on Google Play"
              >
                <GooglePlayIcon />
                <span>Download</span>
              </a>

              {/* Mobile hamburger */}
              <button
                className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-[#2DDE98] hover:bg-[#2DDE98]/08 transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-expanded={mobileOpen}
                aria-label="Toggle navigation menu"
              >
                {mobileOpen ? (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Menu ───────────────────────────────── */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-white/[0.05] bg-[#071210]/98 backdrop-blur-xl px-4 pb-5 pt-3" role="navigation" aria-label="Mobile navigation">
            {navLinks.map(({ label, tab }) => (
              <button
                key={label}
                onClick={() => { tab && setActiveTab(tab); setMobileOpen(false); }}
                className={`flex w-full items-center text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors mb-1 ${
                  (tab === 'teen' && activeTab === 'teen') ||
                  (tab === 'company' && activeTab === 'company')
                    ? 'text-[#2DDE98] font-semibold bg-[#2DDE98]/08 border border-[#2DDE98]/15'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
                }`}
              >
                {label}
              </button>
            ))}
            <a
              href="https://play.google.com/store/apps/details?id=com.wishbanc.funngro"
              target="_blank"
              rel="noreferrer"
              className="btn-glow mt-4 w-full justify-center"
            >
              <GooglePlayIcon />
              Download App
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
