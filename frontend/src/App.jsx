import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TeenPage from './pages/TeenPage';
import CompanyPage from './pages/CompanyPage';

/**
 * App — Funngro 2-page website
 * activeTab: 'teen'    → Teen/Earn page  (/earn on funngro.com)
 * activeTab: 'company' → Company/Brands page  (/for-brands on funngro.com)
 */
export default function App() {
  const [activeTab, setActiveTab] = useState('teen');

  // Scroll to top whenever the page changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-dark-bg text-brand-dark-text font-sans">
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
    </div>
  );
}
