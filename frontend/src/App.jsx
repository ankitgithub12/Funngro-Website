import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TeenPage from './pages/TeenPage';
import CompanyPage from './pages/CompanyPage';
import CookieConsent from './components/CookieConsent';

/**
 * App — Funngro 2-page website
 * activeTab: 'teen'    → Teen/Earn page  (/earn on funngro.com)
 * activeTab: 'company' → Company/Brands page  (/for-brands on funngro.com)
 */
export default function App() {
  const [activeTab, setActiveTab] = useState('teen');

  // Update <title> and meta description dynamically per tab (SPA SEO)
  useEffect(() => {
    if (activeTab === 'teen') {
      document.title = 'Funngro — Earn Money Online | Gigs & Brand Campaigns for Young India';
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute(
          'content',
          "India's largest youth earning platform. 70 lakh+ teens earn with India's biggest brands — brand promotion, content creation, referrals & product sampling. Paid instantly via UPI. Free forever. As seen on Shark Tank India."
        );
    } else {
      document.title = 'Funngro for Brands — Reach 70 Lakh Young Indians | Campaign Platform India';
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute(
          'content',
          'Run brand campaigns with 70 lakh verified young Indians on Funngro. Promotion, sampling, influencer briefs, content, surveys, app testing & more. ₹38 CPA · 68% completion · Zero bots.'
        );
    }
  }, [activeTab]);

  // Scroll to top whenever the page changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#071210] text-[#f3f4f6] font-sans">
      {/* Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* Page content */}
      <main className="flex-grow" id="main-content" role="main">
        {activeTab === 'teen' ? (
          <TeenPage />
        ) : (
          <CompanyPage />
        )}
      </main>

      {/* Footer */}
      <Footer setActiveTab={handleTabChange} />

      {/* Cookie Consent Banner — rendered last so it floats above everything */}
      <CookieConsent />
    </div>
  );
}
