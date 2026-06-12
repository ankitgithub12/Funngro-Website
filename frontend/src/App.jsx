import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TeenPage from './pages/TeenPage';
import CompanyPage from './pages/CompanyPage';
import StoriesPage from './pages/StoriesPage';
import ArcadePage from './pages/ArcadePage';
import SheLancerPage from './pages/SheLancerPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import AuthModal from './components/AuthModal';
import CookieConsent from './components/CookieConsent';

/**
 * App — Funngro multi-page SPA site
 */
export default function App() {
  const [activeTab, setActiveTab] = useState('teen');
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Read saved session
  useEffect(() => {
    const savedToken = localStorage.getItem('funngro_token');
    const savedUser = localStorage.getItem('funngro_user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Error parsing saved user session:", e);
      }
    }
  }, []);

  // Sync session details
  const handleAuthSuccess = (user, jwtToken) => {
    setCurrentUser(user);
    setToken(jwtToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('funngro_token');
    localStorage.removeItem('funngro_user');
    setToken(null);
    setCurrentUser(null);
    setActiveTab('teen');
  };

  // Update <title> and meta description dynamically per tab (SPA SEO)
  useEffect(() => {
    const metas = {
      teen: {
        title: 'Funngro — Earn Money Online | Gigs & Brand Campaigns for Young India',
        desc: "India's largest youth earning platform. 70 lakh+ teens earn with India's biggest brands — brand promotion, content creation, referrals & product sampling. Paid instantly via UPI. Free forever. As seen on Shark Tank India."
      },
      company: {
        title: 'Funngro for Brands — Reach 70 Lakh Young Indians | Campaign Platform India',
        desc: 'Run brand campaigns with 70 lakh verified young Indians on Funngro. Promotion, sampling, influencer briefs, content, surveys, app testing & more. ₹38 CPA · 68% completion · Zero bots.'
      },
      stories: {
        title: 'Funngro Success Stories — Young Earners Testimonials',
        desc: "Read inspiring success stories from real teenagers who earn pocket money and build portfolios on Funngro working with India's biggest brands."
      },
      arcade: {
        title: 'Funngro Arcade — Learn-to-Earn Financial Literacy Quizzes',
        desc: 'Test your financial knowledge and brand trivia in the Funngro Arcade! Complete quizzes, learn about savings, and build pocket-money habits.'
      },
      sheLancer: {
        title: 'Funngro SheLancer — Empowering Young Women Freelancers',
        desc: 'Dedicated platform and safe campaigns for female teen freelancers in India. Safe UPI payouts, verified brands, and career-starting gigs.'
      },
      about: {
        title: 'About Funngro — Trusted Teen Earning Platform | Shark Tank Backed',
        desc: 'Learn about Funngro, our mission, founders, and backing by Amit Jain on Shark Tank India. Explore child data safety (DPDP) and trust audits.'
      },
      blog: {
        title: 'Funngro Student Blog — Pocket Money & Financial Guidance',
        desc: 'Articles and guides for Gen-Z on money management, building graphic design portfolios, and understanding digital privacy compliance.'
      }
    };

    const target = metas[activeTab] || metas.teen;
    document.title = target.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', target.desc);
  }, [activeTab]);

  // Scroll to top whenever the page changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#071210] text-[#f3f4f6] font-sans">
      {/* Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={handleTabChange} 
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenAuth={() => setShowAuthModal(true)}
      />

      {/* Page content */}
      <main className="flex-grow" id="main-content" role="main">
        {activeTab === 'teen' && (
          <TeenPage 
            currentUser={currentUser}
            onOpenAuth={() => setShowAuthModal(true)}
          />
        )}
        {activeTab === 'company' && (
          <CompanyPage 
            currentUser={currentUser}
            onOpenAuth={() => setShowAuthModal(true)}
          />
        )}
        {activeTab === 'stories' && <StoriesPage />}
        {activeTab === 'arcade' && <ArcadePage />}
        {activeTab === 'sheLancer' && <SheLancerPage />}
        {activeTab === 'about' && <AboutPage />}
        {activeTab === 'blog' && <BlogPage />}
      </main>

      {/* Footer */}
      <Footer setActiveTab={handleTabChange} />

      {/* Cookie Consent Banner — rendered last so it floats above everything */}
      <CookieConsent />

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      )}
    </div>
  );
}
