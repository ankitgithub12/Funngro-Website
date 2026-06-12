import React, { useState } from 'react';
import { X, Plus, Calendar, Coins, Settings, Briefcase, AlignLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PostGigModal({ onClose, onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    category: 'Design',
    budget: '',
    duration: '',
    skills: '',
    description: ''
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

    // Basic validation
    if (!formData.title || !formData.company || !formData.category || !formData.budget || !formData.duration || !formData.description) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    const budgetNum = Number(formData.budget);
    if (isNaN(budgetNum) || budgetNum <= 0) {
      setError('Budget must be a valid positive number.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/gigs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to post gig');
      }

      setLoading(false);

      // Gold/Purple mixed confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#8b5cf6', '#3b82f6']
      });

      onSubmitSuccess();
    } catch (err) {
      setError(err.message || 'An error occurred while posting. Try again.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark-bg/85 backdrop-blur-sm">
      <div className="relative w-full max-w-xl rounded-2xl border border-brand-gold/20 bg-[#120f24]/95 p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        
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
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gold bg-brand-gold/10 px-2.5 py-1 rounded-md border border-brand-gold/20">
            Employer Workspace
          </span>
          <h3 className="text-xl font-bold text-white mt-3 leading-snug">
            Create a New Gig Campaign
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Fill in the details to publish a new project gig and find talented teenager contributors.
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
            {/* Gig Title */}
            <div>
              <label htmlFor="title" className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
                <Briefcase className="h-3.5 w-3.5 text-brand-gold" />
                Gig Campaign Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="E.g. Logo Design for Fintech App"
                className="w-full px-4 py-2.5 rounded-xl text-sm glass-input"
              />
            </div>

            {/* Company Name */}
            <div>
              <label htmlFor="company" className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
                <Plus className="h-3.5 w-3.5 text-brand-gold" />
                Company Brand Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="company"
                name="company"
                required
                value={formData.company}
                onChange={handleChange}
                placeholder="E.g. Acme Innovations"
                className="w-full px-4 py-2.5 rounded-xl text-sm glass-input"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category Select */}
            <div>
              <label htmlFor="category" className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
                <Settings className="h-3.5 w-3.5 text-brand-gold" />
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl text-sm glass-input text-slate-300 bg-brand-dark-card"
              >
                <option value="Design">Design</option>
                <option value="Writing">Writing</option>
                <option value="Tech">Tech</option>
                <option value="Video">Video</option>
                <option value="Marketing">Marketing</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Budget */}
            <div>
              <label htmlFor="budget" className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
                <Coins className="h-3.5 w-3.5 text-brand-gold" />
                Budget (₹ INR) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="budget"
                name="budget"
                required
                value={formData.budget}
                onChange={handleChange}
                placeholder="1500"
                className="w-full px-4 py-2.5 rounded-xl text-sm glass-input"
              />
            </div>

            {/* Duration */}
            <div>
              <label htmlFor="duration" className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-brand-gold" />
                Duration Period <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="duration"
                name="duration"
                required
                value={formData.duration}
                onChange={handleChange}
                placeholder="5 days"
                className="w-full px-4 py-2.5 rounded-xl text-sm glass-input"
              />
            </div>
          </div>

          {/* Required Skills */}
          <div>
            <label htmlFor="skills" className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
              <Plus className="h-3.5 w-3.5 text-brand-gold" />
              Required Skills (comma separated)
            </label>
            <input
              type="text"
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="Figma, Canva, Vector Design (optional)"
              className="w-full px-4 py-2.5 rounded-xl text-sm glass-input"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
              <AlignLeft className="h-3.5 w-3.5 text-brand-gold" />
              Campaign Scope & Guidelines <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Clearly state what the freelancer is expected to deliver, resources provided, and output format guidelines."
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
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-brand-gold to-yellow-600 text-brand-dark-bg rounded-xl text-xs font-bold transition-all shadow-md shadow-brand-gold/15 hover:opacity-95 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 border-2 border-brand-dark-bg/20 border-t-brand-dark-bg rounded-full animate-spin"></span>
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  <span>Publish Campaign</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
