import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LANG_LABELS } from '../i18n/index.js';
import { GooglePlayIcon } from './BrandIcons.jsx';

/* ── Funngro "F" logo SVG ─────────────────────────────── */
function FunngroLogo({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="34" height="34" rx="10" fill="#2DDE98" fillOpacity="0.15"/>
      <rect width="34" height="34" rx="10" stroke="#2DDE98" strokeOpacity="0.25" strokeWidth="1"/>
      <text x="7" y="25" fontFamily="'Playfair Display', Georgia, serif" fontSize="20" fontWeight="900" fill="#2DDE98">F</text>
      <circle cx="27" cy="8" r="3" fill="#2DDE98" opacity="0.9"/>
    </svg>
  );
}

/* ── Language Switcher ────────────────────────────────── */
function LangSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language;

  const langs = [
    { code: 'en',    display: 'EN'  },
    { code: 'hi-en', display: 'Hi-En' },
    { code: 'hi',    display: 'हिं'  },
  ];

  const switchLang = (code) => {
    i18n.changeLanguage(code);
    // Update html lang attribute for SEO
    document.documentElement.lang = code === 'hi' ? 'hi' : code === 'hi-en' ? 'hi-IN' : 'en-IN';
  };

  return (
    <div
      className="hidden md:flex items-center gap-0.5 p-1 rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.07)]"
      role="group"
      aria-label="Language selector"
    >
      {langs.map(({ code, display }) => (
        <button
          key={code}
          onClick={() => switchLang(code)}
          className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all duration-200 ${
            current === code || (code === 'en' && !['hi', 'hi-en'].includes(current))
              ? 'bg-[#2DDE98] text-[#071210] shadow-sm'
              : 'text-slate-500 hover:text-slate-300'
          }`}
          aria-pressed={current === code}
          aria-label={`Switch to ${LANG_LABELS[code]?.full ?? code}`}
        >
          {display}
        </button>
      ))}
    </div>
  );
}

/* ── Main Navbar ──────────────────────────────────────── */
export default function Navbar({ activeTab, setActiveTab }) {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { labelKey: 'nav.earn',       tab: 'teen'    },
    { labelKey: 'nav.stories',    tab: null      },
    { labelKey: 'nav.forBrands',  tab: 'company' },
    { labelKey: 'nav.arcade',     tab: null      },
    { labelKey: 'nav.sheLancer',  tab: null      },
    { labelKey: 'nav.about',      tab: null      },
    { labelKey: 'nav.blog',       tab: null      },
  ];

  // Mobile lang switcher
  const langs = [
    { code: 'en',    display: 'EN'    },
    { code: 'hi-en', display: 'Hi-En' },
    { code: 'hi',    display: 'हिं'   },
  ];

  return (
    <header className="sticky top-0 z-50" role="banner">

      {/* ── Announcement Bar ─────────────────────────── */}
      <div className="announcement-bar px-4 py-2 hidden md:flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-400">
          {/* Star icon */}
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M5 0L6.12 3.38H9.51L6.88 5.47L7.94 8.82L5 6.67L2.06 8.82L3.12 5.47L0.49 3.38H3.88L5 0Z" fill="#2DDE98"/>
          </svg>
          {/* Use dangerouslySetInnerHTML for <strong> tag in announcements */}
          <span
            className="text-[11px]"
            dangerouslySetInnerHTML={{ __html: t('nav.announcement') }}
          />
          <a
            href="https://www.instagram.com/fun.n.gro"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-[11px] font-bold tracking-widest uppercase text-[#2DDE98] hover:text-white transition-colors"
          >
            {t('nav.readStory')}
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </a>
        </div>
      </div>

      {/* ── Main Nav bar ─────────────────────────────── */}
      <nav
        className={`w-full transition-all duration-300 ${
          scrolled
            ? 'nav-scrolled'
            : 'bg-[#071210]/85 backdrop-blur-md border-b border-white/[0.04]'
        }`}
        aria-label="Main navigation"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">

            {/* Logo */}
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

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center" role="navigation">
              {navLinks.map(({ labelKey, tab }) => (
                <button
                  key={labelKey}
                  onClick={() => tab && setActiveTab(tab)}
                  className={`px-3.5 py-2 rounded-xl text-[13px] font-medium transition-all duration-200 ${
                    (tab === 'teen'    && activeTab === 'teen') ||
                    (tab === 'company' && activeTab === 'company')
                      ? 'text-[#2DDE98] font-semibold bg-[#2DDE98]/[0.08]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                  } ${!tab ? 'opacity-50 cursor-default' : ''}`}
                  aria-current={
                    (tab === 'teen'    && activeTab === 'teen') ||
                    (tab === 'company' && activeTab === 'company')
                      ? 'page' : undefined
                  }
                  aria-disabled={!tab}
                >
                  {t(labelKey)}
                </button>
              ))}
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Language switcher */}
              <LangSwitcher />

              {/* Download CTA */}
              <a
                href="https://play.google.com/store/apps/details?id=com.wishbanc.funngro"
                target="_blank"
                rel="noreferrer"
                className="btn-glow text-[12px] px-4 py-2 hidden sm:flex items-center gap-2"
                aria-label="Download Funngro app on Google Play"
              >
                <GooglePlayIcon size={16} />
                <span>{t('nav.download')}</span>
              </a>

              {/* Mobile hamburger */}
              <button
                className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-[#2DDE98] hover:bg-[#2DDE98]/[0.08] transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-expanded={mobileOpen}
                aria-label="Toggle navigation menu"
              >
                {mobileOpen ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="15" y2="18"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Menu ──────────────────────────── */}
        {mobileOpen && (
          <div
            className="lg:hidden border-t border-white/[0.05] bg-[#071210]/98 backdrop-blur-xl px-4 pb-5 pt-3"
            role="navigation"
            aria-label="Mobile navigation"
          >
            {/* Mobile lang switcher */}
            <div
              className="flex items-center gap-1 mb-4 p-1 rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.07)] w-fit"
              role="group"
              aria-label="Language selector"
            >
              {langs.map(({ code, display }) => (
                <button
                  key={code}
                  onClick={() => { i18n.changeLanguage(code); document.documentElement.lang = code === 'hi' ? 'hi' : 'en-IN'; }}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all ${
                    i18n.language === code
                      ? 'bg-[#2DDE98] text-[#071210]'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                  aria-pressed={i18n.language === code}
                >
                  {display}
                </button>
              ))}
            </div>

            {navLinks.map(({ labelKey, tab }) => (
              <button
                key={labelKey}
                onClick={() => { tab && setActiveTab(tab); setMobileOpen(false); }}
                className={`flex w-full items-center text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors mb-1 ${
                  (tab === 'teen'    && activeTab === 'teen') ||
                  (tab === 'company' && activeTab === 'company')
                    ? 'text-[#2DDE98] font-semibold bg-[#2DDE98]/[0.08] border border-[#2DDE98]/15'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
                } ${!tab ? 'opacity-50 cursor-default' : ''}`}
                aria-disabled={!tab}
              >
                {t(labelKey)}
              </button>
            ))}

            <a
              href="https://play.google.com/store/apps/details?id=com.wishbanc.funngro"
              target="_blank"
              rel="noreferrer"
              className="btn-glow mt-4 w-full justify-center"
            >
              <GooglePlayIcon size={16} />
              {t('nav.download')}
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
