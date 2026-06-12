import React, { useState, useEffect } from 'react';

// Simple SVG icon for the Funngro hand/sparkle logo
function FunngroLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#2DDE98" fillOpacity="0.12" />
      <path d="M10 22 C10 22 8 18 11 15 C13 13 14 12 14 10 C14 8 16 7 16 7 C16 7 18 8 18 10 C18 12 19 13 21 15 C24 18 22 22 22 22" stroke="#2DDE98" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M13 22 L19 22" stroke="#2DDE98" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="16" cy="10" r="1.5" fill="#2DDE98" />
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
      <div className="announcement-bar px-4 py-2 hidden md:flex items-center justify-between">
        <div className="flex items-center gap-2 mx-auto text-slate-400">
          <span className="text-brand-green text-[11px]">✦</span>
          <span className="text-[11px]">
            As seen on <strong className="text-slate-200">Shark Tank India</strong>
            {' '}· Season 2 · Investment from Amit Jain · Funngro is now backed by SucSEED.
          </span>
          <a
            href="https://www.instagram.com/funngro/"
            target="_blank"
            rel="noreferrer"
            className="ml-4 text-[11px] font-bold tracking-widest uppercase text-brand-green hover:text-brand-green-light transition-colors"
          >
            Read the inside story ▸
          </a>
        </div>
      </div>

      {/* ── Main Navbar ───────────────────────────────────── */}
      <nav
        className={`w-full transition-all duration-300 ${
          scrolled
            ? 'bg-brand-dark-bg/95 backdrop-blur-xl border-b border-white/05 shadow-lg'
            : 'bg-brand-dark-bg/80 backdrop-blur-md border-b border-white/04'
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
              <span className="font-display text-xl font-bold text-white group-hover:text-brand-green transition-colors">
                Funngro
              </span>
            </button>

            {/* ── Center Nav Links (Desktop) ────────────── */}
            <div className="hidden lg:flex items-center gap-1" role="navigation">
              {navLinks.map(({ label, tab }) => (
                <button
                  key={label}
                  onClick={() => tab && setActiveTab(tab)}
                  className={`px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                    (tab === 'teen' && activeTab === 'teen') ||
                    (tab === 'company' && activeTab === 'company')
                      ? 'text-brand-green font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/04'
                  } ${!tab ? 'opacity-60 cursor-default' : ''}`}
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
                <button className="px-2.5 py-1 rounded-full bg-brand-green text-brand-dark-bg font-bold text-[10px]">EN</button>
                <button className="px-2.5 py-1 rounded-full text-slate-500 hover:text-slate-300 transition-colors text-[10px]">Hi-En</button>
                <button className="px-2.5 py-1 rounded-full text-slate-500 hover:text-slate-300 transition-colors text-[10px]">हिं</button>
              </div>

              {/* Download CTA */}
              <a
                href="https://play.google.com/store/apps/details?id=com.funngro.app"
                target="_blank"
                rel="noreferrer"
                className="btn-glow text-[13px] px-5 py-2.5 hidden sm:flex"
                aria-label="Download Funngro app on Google Play"
              >
                Download
                <span aria-hidden="true">→</span>
              </a>

              {/* Mobile hamburger */}
              <button
                className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-brand-green transition-colors"
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
          <div className="lg:hidden border-t border-white/05 bg-brand-dark-bg/98 px-4 pb-4 pt-2" role="navigation" aria-label="Mobile navigation">
            {navLinks.map(({ label, tab }) => (
              <button
                key={label}
                onClick={() => { tab && setActiveTab(tab); setMobileOpen(false); }}
                className={`block w-full text-left px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                  (tab === 'teen' && activeTab === 'teen') ||
                  (tab === 'company' && activeTab === 'company')
                    ? 'text-brand-green font-semibold bg-brand-green/06'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {label}
              </button>
            ))}
            <a
              href="https://play.google.com/store/apps/details?id=com.funngro.app"
              target="_blank"
              rel="noreferrer"
              className="btn-glow mt-3 w-full justify-center"
            >
              Download app →
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
