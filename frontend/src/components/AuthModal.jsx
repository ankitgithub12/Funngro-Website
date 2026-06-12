import React, { useState } from 'react';
import { X, User, Mail, Lock, Shield, Award, Briefcase, Info } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AuthModal({ onClose, onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('teen'); // 'teen' | 'company'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    companyName: '',
    skills: '',
    portfolioLink: '',
    pitch: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { name, email, password, age, companyName } = formData;

    // Basic Validation
    if (!email || !password || (!isLogin && !name)) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    // Password strength check on signup
    if (!isLogin) {
      if (password.length < 8) {
        setError('Password must be at least 8 characters long.');
        setLoading(false);
        return;
      }
      const hasUppercase = /[A-Z]/.test(password);
      const hasLowercase = /[a-z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const hasSpecial = /[^A-Za-z0-9]/.test(password);
      if (!hasUppercase || !hasLowercase || !hasNumber || !hasSpecial) {
        setError('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
        setLoading(false);
        return;
      }
    }

    if (!isLogin) {
      if (role === 'teen' && (!age || isNaN(Number(age)) || Number(age) < 13 || Number(age) > 25)) {
        setError('Applicants must be between 13 and 25 years old.');
        setLoading(false);
        return;
      }
      if (role === 'company' && !companyName) {
        setError('Please enter your company brand name.');
        setLoading(false);
        return;
      }
    }

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const payload = isLogin 
      ? { email, password } 
      : { 
          name, 
          email, 
          password, 
          role,
          age: role === 'teen' ? Number(age) : undefined,
          companyName: role === 'company' ? companyName : undefined,
          skills: formData.skills,
          portfolioLink: formData.portfolioLink,
          pitch: formData.pitch
        };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      // Save token and user details
      localStorage.setItem('funngro_token', data.token);
      localStorage.setItem('funngro_user', JSON.stringify(data.user));

      // Celebration
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: role === 'teen' ? ['#2DDE98', '#8b5cf6'] : ['#f59e0b', '#3b82f6']
      });

      onAuthSuccess(data.user, data.token);
      onClose();
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark-bg/85 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl border border-brand-green/20 bg-brand-dark-card p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white rounded-lg p-1 hover:bg-brand-dark-surface transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-white font-display">
            {isLogin ? 'Welcome Back!' : 'Create an Account'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {isLogin ? 'Sign in to access your dashboard' : 'Join Funngro and explore projects'}
          </p>
        </div>

        {/* Role Select (Only on Register) */}
        {!isLogin && (
          <div className="flex p-1 rounded-xl bg-brand-dark-bg border border-white/5 text-xs font-bold mb-5">
            <button
              type="button"
              onClick={() => setRole('teen')}
              className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                role === 'teen' ? 'bg-brand-green text-brand-dark-bg' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Award className="h-3.5 w-3.5" />
              Teen / Contributor
            </button>
            <button
              type="button"
              onClick={() => setRole('company')}
              className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                role === 'company' ? 'bg-brand-green text-brand-dark-bg' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Briefcase className="h-3.5 w-3.5" />
              Company / Brand
            </button>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 text-xs bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name (Only on Signup) */}
          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
                <User className="h-3.5 w-3.5 text-brand-green" />
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="E.g. Kabir Mehta"
                className="w-full px-4 py-2.5 rounded-xl text-xs glass-input"
              />
            </div>
          )}

          {/* Email Address */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
              <Mail className="h-3.5 w-3.5 text-brand-green" />
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="E.g. kabir@example.com"
              className="w-full px-4 py-2.5 rounded-xl text-xs glass-input"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
              <Lock className="h-3.5 w-3.5 text-brand-green" />
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl text-xs glass-input"
            />
            {!isLogin && (
              <p className="text-[10px] text-slate-500 mt-1.5 leading-relaxed">
                Password must be at least 8 characters, containing 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.
              </p>
            )}
          </div>

          {/* Teen specific details */}
          {!isLogin && role === 'teen' && (
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
                  <Info className="h-3.5 w-3.5 text-brand-green" />
                  Age (13-25) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="age"
                  required
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="16"
                  className="w-full px-4 py-2.5 rounded-xl text-xs glass-input"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
                  <Shield className="h-3.5 w-3.5 text-brand-green" />
                  Key Skills
                </label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="Photoshop, Canva, SEO"
                  className="w-full px-4 py-2.5 rounded-xl text-xs glass-input"
                />
              </div>
            </div>
          )}

          {/* Company specific details */}
          {!isLogin && role === 'company' && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
                <Briefcase className="h-3.5 w-3.5 text-brand-green" />
                Company Brand Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="companyName"
                required
                value={formData.companyName}
                onChange={handleChange}
                placeholder="E.g. Gizmo Tech Solutions"
                className="w-full px-4 py-2.5 rounded-xl text-xs glass-input"
              />
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-brand-green hover:bg-brand-green-light text-brand-dark-bg font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-md shadow-brand-green/20 disabled:opacity-50 mt-4"
          >
            {loading ? (
              <>
                <span className="h-4 w-4 border-2 border-brand-dark-bg/20 border-t-brand-dark-bg rounded-full animate-spin"></span>
                <span>Please wait...</span>
              </>
            ) : (
              <span>{isLogin ? 'Sign In' : 'Sign Up'}</span>
            )}
          </button>
        </form>

        {/* Toggle link */}
        <div className="text-center mt-6 text-xs text-slate-500">
          <span>{isLogin ? "Don't have an account? " : "Already have an account? "}</span>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-brand-green font-bold hover:underline"
          >
            {isLogin ? 'Create Account' : 'Sign In'}
          </button>
        </div>

      </div>
    </div>
  );
}
