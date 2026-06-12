import React, { useState, useEffect } from 'react';

/* ─── Cookie preference keys ───────────────────────────── */
const STORAGE_KEY = 'funngro_cookie_consent';
const VERSION     = '1.0'; // bump this to re-prompt if policy changes

/* ─── SVG Icons ─────────────────────────────────────────── */
function ShieldIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );
}

function ChevronDownIcon({ open }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease' }}
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}

/* ─── Toggle component ──────────────────────────────────── */
function Toggle({ checked, onChange, disabled = false, id }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      id={id}
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#2DDE98]/40 focus:ring-offset-2 focus:ring-offset-[#071210] ${
        checked
          ? 'bg-[#2DDE98] border-[#2DDE98]'
          : 'bg-[#1a2e22] border-[rgba(255,255,255,0.1)]'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      aria-label={disabled ? 'Always active — cannot be disabled' : undefined}
    >
      <span
        className={`pointer-events-none inline-block h-4 w-4 mt-0.5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
          checked ? 'translate-x-5' : 'translate-x-0.5'
        }`}
      />
    </button>
  );
}

/* ─── Category row ──────────────────────────────────────── */
function CookieCategory({ id, name, description, required = false, checked, onChange, details }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-[rgba(255,255,255,0.07)] rounded-xl overflow-hidden">
      <div className="flex items-center justify-between p-4 bg-[rgba(13,28,20,0.8)]">
        <div className="flex-1 min-w-0 mr-3">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-sm font-semibold text-white">{name}</span>
            {required && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#2DDE98]/12 text-[#2DDE98] border border-[#2DDE98]/20">
                Always Active
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <Toggle
            id={`cookie-${id}`}
            checked={required || checked}
            onChange={onChange}
            disabled={required}
          />
          {details && (
            <button
              onClick={() => setOpen(!open)}
              className="text-slate-500 hover:text-[#2DDE98] transition-colors"
              aria-expanded={open}
              aria-label={`${open ? 'Collapse' : 'Expand'} ${name} details`}
            >
              <ChevronDownIcon open={open} />
            </button>
          )}
        </div>
      </div>
      {open && details && (
        <div className="px-4 pb-4 pt-2 bg-[rgba(7,18,12,0.6)] border-t border-[rgba(255,255,255,0.05)]">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-slate-600 font-bold uppercase tracking-wider">
                <th className="text-left pb-2 pr-4">Cookie Name</th>
                <th className="text-left pb-2 pr-4">Provider</th>
                <th className="text-left pb-2 pr-4">Duration</th>
                <th className="text-left pb-2">Purpose</th>
              </tr>
            </thead>
            <tbody className="text-slate-400">
              {details.map((d, i) => (
                <tr key={i} className="border-t border-[rgba(255,255,255,0.04)]">
                  <td className="py-2 pr-4 font-mono text-[#2DDE98]/70">{d.name}</td>
                  <td className="py-2 pr-4">{d.provider}</td>
                  <td className="py-2 pr-4">{d.duration}</td>
                  <td className="py-2">{d.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ─── Main CookieConsent Component ─────────────────────── */
export default function CookieConsent() {
  const [visible, setVisible]       = useState(false);
  const [expanded, setExpanded]     = useState(false); // show detailed panel
  const [analytics, setAnalytics]   = useState(false);
  const [marketing, setMarketing]   = useState(false);
  const [functional, setFunctional] = useState(true);

  /* Check stored consent on mount */
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Slight delay so the site renders first
        const t = setTimeout(() => setVisible(true), 800);
        return () => clearTimeout(t);
      }
      const parsed = JSON.parse(stored);
      // Re-prompt if version changed
      if (parsed.version !== VERSION) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  function saveConsent(prefs) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        version:    VERSION,
        timestamp:  new Date().toISOString(),
        necessary:  true,
        functional: prefs.functional,
        analytics:  prefs.analytics,
        marketing:  prefs.marketing,
      }));
    } catch { /* localStorage blocked */ }
    setVisible(false);
  }

  function acceptAll() {
    setAnalytics(true);
    setMarketing(true);
    setFunctional(true);
    saveConsent({ functional: true, analytics: true, marketing: true });
  }

  function rejectAll() {
    setAnalytics(false);
    setMarketing(false);
    setFunctional(true);
    saveConsent({ functional: true, analytics: false, marketing: false });
  }

  function saveCustom() {
    saveConsent({ functional, analytics, marketing });
  }

  if (!visible) return null;

  /* ── Cookie category definitions ── */
  const categories = [
    {
      id: 'necessary',
      name: 'Strictly Necessary',
      description: 'Essential for the website to function. Cannot be disabled.',
      required: true,
      checked: true,
      onChange: () => {},
      details: [
        { name: 'funngro_session', provider: 'Funngro', duration: 'Session', purpose: 'Maintains user session state' },
        { name: 'funngro_cookie_consent', provider: 'Funngro', duration: '1 year', purpose: 'Stores your cookie preferences' },
        { name: 'XSRF-TOKEN', provider: 'Funngro', duration: 'Session', purpose: 'Security — prevents cross-site request forgery' },
      ]
    },
    {
      id: 'functional',
      name: 'Functional',
      description: 'Enables enhanced functionality like language preferences and remembering your choices.',
      required: false,
      checked: functional,
      onChange: setFunctional,
      details: [
        { name: 'fg_lang', provider: 'Funngro', duration: '1 year', purpose: 'Saves language preference (EN / Hi-En / हिं)' },
        { name: 'fg_theme', provider: 'Funngro', duration: '1 year', purpose: 'UI theme / display preferences' },
      ]
    },
    {
      id: 'analytics',
      name: 'Analytics & Performance',
      description: 'Helps us understand how visitors use the site so we can improve it. Data is aggregated and anonymised.',
      required: false,
      checked: analytics,
      onChange: setAnalytics,
      details: [
        { name: '_ga', provider: 'Google Analytics', duration: '2 years', purpose: 'Distinguishes unique users' },
        { name: '_ga_*', provider: 'Google Analytics', duration: '2 years', purpose: 'Maintains session state for GA4' },
        { name: '_gid', provider: 'Google Analytics', duration: '24 hours', purpose: 'Distinguishes users within a day' },
        { name: 'gtm_debug', provider: 'Google Tag Manager', duration: 'Session', purpose: 'Debug Tag Manager events' },
      ]
    },
    {
      id: 'marketing',
      name: 'Marketing & Targeting',
      description: 'Used to deliver relevant ads and campaigns. May track you across other sites.',
      required: false,
      checked: marketing,
      onChange: setMarketing,
      details: [
        { name: '_fbp', provider: 'Meta (Facebook)', duration: '3 months', purpose: 'Facebook pixel — ad targeting' },
        { name: 'fr', provider: 'Meta (Facebook)', duration: '3 months', purpose: 'Delivers and measures Facebook ads' },
        { name: 'NID', provider: 'Google', duration: '6 months', purpose: 'Personalised Google ads' },
      ]
    },
  ];

  return (
    <>
      {/* ── Backdrop (expanded view only) ─────────────── */}
      {expanded && (
        <div
          className="fixed inset-0 z-[9990] bg-black/60 backdrop-blur-sm"
          onClick={() => setExpanded(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Banner / Panel ─────────────────────────────── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Cookie consent settings"
        className={`fixed z-[9999] transition-all duration-500 ${
          expanded
            ? 'inset-0 flex items-end sm:items-center justify-center p-4'
            : 'bottom-0 left-0 right-0 sm:bottom-5 sm:left-5 sm:right-auto sm:max-w-md'
        }`}
      >
        <div
          className={`w-full relative rounded-2xl sm:rounded-3xl overflow-hidden ${
            expanded ? 'max-w-2xl max-h-[90vh] flex flex-col' : ''
          }`}
          style={{
            background: 'rgba(6, 16, 11, 0.97)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(45, 222, 152, 0.2)',
            boxShadow: '0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(45,222,152,0.08), 0 0 60px rgba(45,222,152,0.05)',
          }}
        >
          {/* Top accent line */}
          <div className="h-[2px] bg-gradient-to-r from-transparent via-[#2DDE98] to-transparent opacity-60" />

          {/* ── Simple banner view ────────────── */}
          {!expanded && (
            <div className="p-5">
              <div className="flex items-start gap-3 mb-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-[#2DDE98]/12 border border-[#2DDE98]/20 flex items-center justify-center text-[#2DDE98]">
                  <ShieldIcon />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white mb-1">We value your privacy 🍪</h2>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    We use cookies to improve your experience, analyse traffic, and show relevant content.
                    By clicking <strong className="text-slate-300">"Accept All"</strong> you agree to our{' '}
                    <a href="#" className="text-[#2DDE98] hover:underline">Cookie Policy</a>{' '}
                    and{' '}
                    <a href="#" className="text-[#2DDE98] hover:underline">Privacy Policy</a>.
                  </p>
                </div>
              </div>

              {/* Quick stats */}
              <div className="flex items-center gap-4 mb-4 px-2 py-2 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)]">
                <div className="text-center">
                  <p className="text-[10px] font-bold text-[#2DDE98]">DPDP</p>
                  <p className="text-[9px] text-slate-600">Compliant</p>
                </div>
                <div className="w-px h-6 bg-[rgba(255,255,255,0.08)]" />
                <div className="text-center">
                  <p className="text-[10px] font-bold text-[#2DDE98]">GDPR</p>
                  <p className="text-[9px] text-slate-600">Ready</p>
                </div>
                <div className="w-px h-6 bg-[rgba(255,255,255,0.08)]" />
                <div className="flex-1 text-[9px] text-slate-500 leading-tight">
                  Made in India 🇮🇳 · Data stored securely
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <button
                    onClick={acceptAll}
                    className="flex-1 btn-glow py-2.5 text-[13px] font-bold justify-center"
                    aria-label="Accept all cookies"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={rejectAll}
                    className="flex-1 btn-outline-green py-2.5 text-[13px] font-semibold justify-center"
                    aria-label="Reject all optional cookies"
                  >
                    Reject All
                  </button>
                </div>
                <button
                  onClick={() => setExpanded(true)}
                  className="w-full py-2 text-[12px] font-semibold text-slate-500 hover:text-[#2DDE98] transition-colors text-center"
                  aria-label="Customise cookie preferences"
                >
                  Customise preferences ›
                </button>
              </div>
            </div>
          )}

          {/* ── Expanded settings panel ──────── */}
          {expanded && (
            <>
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[rgba(255,255,255,0.07)] flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#2DDE98]/12 border border-[#2DDE98]/20 flex items-center justify-center text-[#2DDE98]">
                    <ShieldIcon />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">Cookie Preferences</h2>
                    <p className="text-[11px] text-slate-500">Funngro · DPDP &amp; GDPR compliant</p>
                  </div>
                </div>
                <button
                  onClick={() => setExpanded(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-white hover:bg-[rgba(255,255,255,0.06)] transition-colors"
                  aria-label="Close preferences panel"
                >
                  <XIcon />
                </button>
              </div>

              {/* Scrollable body */}
              <div className="flex-1 overflow-y-auto px-6 py-5">
                <p className="text-xs text-slate-400 leading-relaxed mb-5">
                  When you visit Funngro, we may store or retrieve information on your device as cookies.
                  This helps us deliver a better experience. You can choose which categories to allow below.
                  Your choices are saved for <strong className="text-slate-300">12 months</strong> and can be changed at any time.
                  {' '}
                  <a href="#" className="text-[#2DDE98] hover:underline">Learn more in our Privacy Policy →</a>
                </p>

                <div className="space-y-3">
                  {categories.map(cat => (
                    <CookieCategory key={cat.id} {...cat} />
                  ))}
                </div>

                <p className="text-[10px] text-slate-600 mt-5 leading-relaxed">
                  <strong className="text-slate-500">India DPDP Act 2023:</strong> Under the Digital Personal Data Protection Act,
                  you have the right to know what data we collect, withdraw consent at any time, and request deletion of your data.
                  Contact <a href="mailto:privacy@funngro.com" className="text-[#2DDE98] hover:underline">privacy@funngro.com</a> for data requests.
                </p>
              </div>

              {/* Footer actions */}
              <div className="flex items-center gap-3 px-6 py-4 border-t border-[rgba(255,255,255,0.07)] bg-[rgba(0,0,0,0.2)] flex-shrink-0">
                <button
                  onClick={rejectAll}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-300 transition-colors"
                  aria-label="Reject all optional cookies"
                >
                  Reject All
                </button>
                <div className="flex-1" />
                <button
                  onClick={saveCustom}
                  className="btn-outline-green py-2.5 px-5 text-xs font-semibold"
                  aria-label="Save your custom cookie preferences"
                >
                  Save Preferences
                </button>
                <button
                  onClick={acceptAll}
                  className="btn-glow py-2.5 px-5 text-xs font-bold"
                  aria-label="Accept all cookies"
                >
                  <CheckIcon />
                  Accept All
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
