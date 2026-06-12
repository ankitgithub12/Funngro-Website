import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  InstagramIcon, LinkedInIcon, YouTubeIcon,
  FacebookIcon, XTwitterIcon, WhatsAppIcon, RedditIcon,
  GooglePlayIcon, AppleIcon,
} from './BrandIcons.jsx';

/* ─── Social links with real URLs ─────────────────────── */
const SOCIAL_LINKS = [
  { label: 'Instagram',   href: 'https://www.instagram.com/fun.n.gro',                         Icon: InstagramIcon  },
  { label: 'LinkedIn',    href: 'https://www.linkedin.com/company/funngro/',                    Icon: LinkedInIcon   },
  { label: 'YouTube',     href: 'https://www.youtube.com/@funngro_India',                       Icon: YouTubeIcon    },
  { label: 'Facebook',    href: 'https://www.facebook.com/funngro/',                            Icon: FacebookIcon   },
  { label: 'X (Twitter)', href: 'https://x.com/funngroofficial',                               Icon: XTwitterIcon   },
  { label: 'WhatsApp',    href: 'https://www.whatsapp.com/channel/0029VaC43g0DTkK1Q83jMy2N',   Icon: WhatsAppIcon   },
  { label: 'Reddit',      href: 'https://www.reddit.com/r/funngro/',                            Icon: RedditIcon     },
];

/* ─── Footer link structure ────────────────────────────── */
const FOOTER_LINKS = {
  Earn: [
    { label: 'How it works',      href: '#',  tab: 'teen'    },
    { label: 'Brand Campaigns',   href: '#'                  },
    { label: 'Sampling',          href: '#'                  },
    { label: 'Referrals',         href: '#'                  },
    { label: 'Influencer Briefs', href: '#'                  },
    { label: 'Content Work',      href: '#'                  },
    { label: 'App Testing',       href: '#'                  },
    { label: 'Surveys',           href: '#'                  },
    { label: 'SheLancer',         href: '#'                  },
    { label: 'Arcade',            href: '#'                  },
  ],
  Brands: [
    { label: 'Work with us',     href: '#',  tab: 'company' },
    { label: 'Campaign Types',   href: '#'                  },
    { label: 'Fintech Campaigns',href: '#'                  },
    { label: 'D2C & FMCG',      href: '#'                  },
    { label: 'Case Studies',     href: '#'                  },
    { label: 'Pricing',          href: '#'                  },
    { label: 'Contact',          href: '#'                  },
  ],
  Company: [
    { label: 'About Funngro',    href: '#'  },
    { label: 'Stories',          href: '#'  },
    { label: 'Blog',             href: '#'  },
    { label: 'Careers',          href: '#'  },
    { label: 'Press',            href: '#'  },
    { label: 'Shark Tank India', href: '#'  },
    { label: 'Instagram',        href: 'https://www.instagram.com/fun.n.gro' },
  ],
  Legal: [
    { label: 'Terms of Service', href: '#' },
    { label: 'Privacy Policy',   href: '#' },
    { label: 'Cookie Policy',    href: '#' },
    { label: 'DPDP Compliance',  href: '#' },
    { label: 'Grievance Officer',href: '#' },
    { label: 'Refund Policy',    href: '#' },
  ],
};

/* ─── Column heading i18n key map ──────────────────────── */
const HEADING_KEYS = {
  Earn:    'footer.columns.earn',
  Brands:  'footer.columns.brands',
  Company: 'footer.columns.company',
  Legal:   'footer.columns.legal',
};

/* ─── Funngro Logo (small) ─────────────────────────────── */
function FunngroLogoSmall() {
  return (
    <svg width="30" height="30" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <rect width="34" height="34" rx="9" fill="#2DDE98" fillOpacity="0.15"/>
      <rect width="34" height="34" rx="9" stroke="#2DDE98" strokeOpacity="0.2" strokeWidth="1"/>
      <text x="7" y="25" fontFamily="'Playfair Display', Georgia, serif" fontSize="20" fontWeight="900" fill="#2DDE98">F</text>
      <circle cx="27" cy="8" r="3" fill="#2DDE98" opacity="0.85"/>
    </svg>
  );
}

/* ─── Main Footer ──────────────────────────────────────── */
export default function Footer({ setActiveTab }) {
  const { t } = useTranslation();

  return (
    <footer
      className="border-t border-white/[0.06] bg-[#071210] pt-16 pb-8"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Main Grid ────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">

          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <FunngroLogoSmall />
              <span className="font-display text-xl font-bold text-white">Funngro</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed mb-6 max-w-xs">
              {t('footer.tagline')}
            </p>

            {/* ── Social Icons (real SVGs) ───────────────── */}
            <div className="flex flex-wrap gap-2" aria-label="Funngro social media links">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="social-btn"
                  aria-label={`Follow Funngro on ${label}`}
                  title={label}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>

            {/* ── App Store Badges ──────────────────────── */}
            <div className="flex flex-wrap gap-3 mt-6">
              {/* Google Play */}
              <a
                href="https://play.google.com/store/apps/details?id=com.wishbanc.funngro"
                target="_blank"
                rel="noreferrer"
                className="app-badge"
                aria-label="Download Funngro on Google Play"
              >
                <GooglePlayIcon size={22} />
                <div>
                  <p className="text-[9px] text-slate-500 leading-none uppercase tracking-wide">{t('footer.getItOn')}</p>
                  <p className="text-[12px] font-bold text-slate-200 leading-none mt-0.5">{t('footer.googlePlay')}</p>
                </div>
              </a>

              {/* App Store */}
              <a
                href="https://apps.apple.com/in/app/funngro/id1579361075"
                className="app-badge opacity-60 cursor-not-allowed"
                aria-label="Funngro on App Store — coming soon"
                title="Coming soon"
                onClick={e => e.preventDefault()}
              >
                <AppleIcon size={20} className="text-slate-300" />
                <div>
                  <p className="text-[9px] text-slate-500 leading-none uppercase tracking-wide">{t('footer.downloadOn')}</p>
                  <p className="text-[12px] font-bold text-slate-200 leading-none mt-0.5">{t('footer.appStore')}</p>
                </div>
              </a>
            </div>
          </div>

          {/* ── Link Columns ─────────────────────────── */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h3
                className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-4"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {t(HEADING_KEYS[heading])}
              </h3>
              <nav aria-label={`${heading} links`}>
                {links.map(({ label, href, tab }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noreferrer noopener' : undefined}
                    className="footer-link"
                    onClick={tab ? (e) => {
                      e.preventDefault();
                      setActiveTab(tab);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } : undefined}
                  >
                    {label}
                  </a>
                ))}
              </nav>
            </div>
          ))}
        </div>

        {/* ── Bottom Bar ───────────────────────────────── */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600 font-medium">
            <span className="flex items-center gap-1.5">
              {/* India flag SVG — not emoji for consistency */}
              <svg width="16" height="11" viewBox="0 0 16 11" aria-hidden="true">
                <rect width="16" height="3.67" fill="#FF9933"/>
                <rect y="3.67" width="16" height="3.67" fill="#FFFFFF"/>
                <rect y="7.33" width="16" height="3.67" fill="#138808"/>
                <circle cx="8" cy="5.5" r="1.4" fill="none" stroke="#000080" strokeWidth="0.5"/>
                <circle cx="8" cy="5.5" r="0.3" fill="#000080"/>
              </svg>
              {t('footer.madeInIndia')}
            </span>
            <span className="w-px h-3 bg-white/10" />
            <span>{t('footer.dpdpCompliant')}</span>
            <span className="w-px h-3 bg-white/10" />
            <span>{t('footer.copyright')}</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-600">
            <a href="#" className="hover:text-slate-400 transition-colors">{t('footer.terms')}</a>
            <a href="#" className="hover:text-slate-400 transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-slate-400 transition-colors">{t('footer.cookies')}</a>
            <a
              href="mailto:hello@funngro.com"
              className="hover:text-[#2DDE98] transition-colors font-semibold"
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
