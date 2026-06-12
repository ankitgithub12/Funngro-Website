import React, { useState } from 'react';
import { X, Send, Award, Mail, User, Info, Link as LinkIcon, Edit3 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ApplyModal({ gig, onClose, onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    teenName: '',
    teenEmail: '',
    age: '',
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

    // Basic Validation
    if (!formData.teenName || !formData.teenEmail || !formData.age || !formData.skills || !formData.pitch) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    const ageNum = Number(formData.age);
    if (isNaN(ageNum) || ageNum < 13 || ageNum > 25) {
      setError('Applicants must be between 13 and 25 years old.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          gigId: gig._id,
          gigTitle: gig.title,
          ...formData
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit application');
      }

      // Success
      setLoading(false);
      
      // Fun Confetti effect
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#8b5cf6', '#ec4899', '#f59e0b']
      });

      onSubmitSuccess();
    } catch (err) {
      setError(err.message || 'An error occurred while submitting. Try again.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark-bg/80 backdrop-blur-sm">
      <div className="relative w-full max-w-xl rounded-2xl border border-brand-purple/20 bg-[#120f24]/95 p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white rounded-lg p-1 hover:bg-brand-dark-border transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-purple-light bg-brand-purple/10 px-2.5 py-1 rounded-md border border-brand-purple/20">
            Applying for Gig
          </span>
          <h3 className="text-xl font-bold text-white mt-3 leading-snug">
            {gig.title}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            with <strong className="text-slate-300">{gig.company}</strong> • Budget ₹{gig.budget}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-5 p-3 text-xs bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label htmlFor="teenName" className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
                <User className="h-3.5 w-3.5 text-brand-purple-light" />
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="teenName"
                name="teenName"
                required
                value={formData.teenName}
                onChange={handleChange}
                placeholder="E.g. Kabir Mehta"
                className="w-full px-4 py-2.5 rounded-xl text-sm glass-input"
              />
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="teenEmail" className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
                <Mail className="h-3.5 w-3.5 text-brand-purple-light" />
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="teenEmail"
                name="teenEmail"
                required
                value={formData.teenEmail}
                onChange={handleChange}
                placeholder="kabir@example.com"
                className="w-full px-4 py-2.5 rounded-xl text-sm glass-input"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Age */}
            <div>
              <label htmlFor="age" className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
                <Info className="h-3.5 w-3.5 text-brand-purple-light" />
                Age (13-25) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="age"
                name="age"
                required
                value={formData.age}
                onChange={handleChange}
                placeholder="16"
                className="w-full px-4 py-2.5 rounded-xl text-sm glass-input"
              />
            </div>

            {/* Skills */}
            <div className="md:col-span-2">
              <label htmlFor="skills" className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
                <Award className="h-3.5 w-3.5 text-brand-purple-light" />
                Key Skills <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="skills"
                name="skills"
                required
                value={formData.skills}
                onChange={handleChange}
                placeholder="E.g. Photoshop, Canva, Typing"
                className="w-full px-4 py-2.5 rounded-xl text-sm glass-input"
              />
            </div>
          </div>

          {/* Portfolio Link */}
          <div>
            <label htmlFor="portfolioLink" className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
              <LinkIcon className="h-3.5 w-3.5 text-brand-purple-light" />
              Portfolio / Social Profile Link
            </label>
            <input
              type="url"
              id="portfolioLink"
              name="portfolioLink"
              value={formData.portfolioLink}
              onChange={handleChange}
              placeholder="https://behance.net/your-profile"
              className="w-full px-4 py-2.5 rounded-xl text-sm glass-input"
            />
          </div>

          {/* Application Pitch */}
          <div>
            <label htmlFor="pitch" className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
              <Edit3 className="h-3.5 w-3.5 text-brand-purple-light" />
              Why should this company hire you? <span className="text-red-500">*</span>
            </label>
            <textarea
              id="pitch"
              name="pitch"
              required
              rows="4"
              value={formData.pitch}
              onChange={handleChange}
              placeholder="Pitch yourself! Write a paragraph about your interest, experience, and why you are the perfect fit for this task."
              className="w-full px-4 py-2.5 rounded-xl text-sm glass-input resize-none"
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-brand-dark-border/40">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-brand-purple to-brand-purple-dark text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-brand-purple/20 hover:opacity-95 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="h-3.5 w-3.5" />
                  <span>Submit Application</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
