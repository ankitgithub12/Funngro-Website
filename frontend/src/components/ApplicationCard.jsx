import React, { useState } from 'react';
import { Mail, Check, X, ExternalLink, Calendar, Award, User, Quote } from 'lucide-react';
import GlassCard from './GlassCard';

export default function ApplicationCard({ application, onStatusUpdate }) {
  const [loadingAction, setLoadingAction] = useState(null); // 'approved' or 'rejected'

  const handleStatusChange = async (newStatus) => {
    setLoadingAction(newStatus);
    try {
      const response = await fetch(`/api/applications/${application._id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      const updatedApp = await response.json();
      onStatusUpdate(updatedApp);
    } catch (error) {
      alert(`Error updating application: ${error.message}`);
    } finally {
      setLoadingAction(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">Approved</span>;
      case 'rejected':
        return <span className="text-[10px] font-bold uppercase tracking-wider bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-full">Rejected</span>;
      default:
        return <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full">Pending Review</span>;
    }
  };

  return (
    <GlassCard className="border border-brand-dark-border relative overflow-hidden flex flex-col justify-between h-full">
      {/* Background glow when approved */}
      {application.status === 'approved' && (
        <div className="absolute right-0 top-0 h-16 w-16 bg-emerald-500/5 blur-xl pointer-events-none"></div>
      )}

      <div>
        {/* Header: Gig applied & Date */}
        <div className="flex justify-between items-start gap-4 mb-4">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
              Application for
            </span>
            <h4 className="text-sm font-bold text-white leading-tight mt-0.5 hover:text-brand-purple-light transition-colors">
              {application.gigTitle}
            </h4>
          </div>
          <div className="shrink-0">
            {getStatusBadge(application.status)}
          </div>
        </div>

        {/* Applicant Details */}
        <div className="space-y-2.5 p-3 rounded-xl bg-brand-dark-bg/40 border border-brand-dark-border/40 text-xs mb-4">
          <div className="flex items-center gap-2 text-slate-300">
            <User className="h-3.5 w-3.5 text-brand-purple-light shrink-0" />
            <span>
              <strong className="text-white">{application.teenName}</strong> (Age {application.age})
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-300">
            <Mail className="h-3.5 w-3.5 text-brand-purple-light shrink-0" />
            <a href={`mailto:${application.teenEmail}`} className="hover:text-brand-purple-light transition-colors underline break-all">
              {application.teenEmail}
            </a>
          </div>

          <div className="flex items-center gap-2 text-slate-300">
            <Award className="h-3.5 w-3.5 text-brand-gold shrink-0" />
            <span className="truncate">
              Skills: <span className="text-slate-200">{application.skills}</span>
            </span>
          </div>

          {application.portfolioLink && (
            <div className="flex items-center gap-2 text-slate-300">
              <ExternalLink className="h-3.5 w-3.5 text-blue-400 shrink-0" />
              <a 
                href={application.portfolioLink} 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-blue-300 transition-colors flex items-center gap-0.5 font-medium underline"
              >
                View Portfolio <ExternalLink className="h-2.5 w-2.5 inline" />
              </a>
            </div>
          )}
        </div>

        {/* Applicant Pitch */}
        <div className="mb-6 relative pl-7 pr-3 py-1 text-xs text-slate-400 italic leading-relaxed">
          <Quote className="h-4 w-4 text-brand-purple/30 absolute left-1 top-0 shrink-0 rotate-180" />
          <p className="line-clamp-4">{application.pitch}</p>
        </div>
      </div>

      {/* Footer & Actions */}
      <div className="pt-4 border-t border-brand-dark-border/40 flex items-center justify-between gap-4">
        <span className="text-[9px] text-slate-500 flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          Applied {new Date(application.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
        </span>

        {application.status === 'pending' && (
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => handleStatusChange('rejected')}
              disabled={loadingAction !== null}
              className="p-1.5 rounded-lg border border-red-500/20 bg-red-500/5 hover:bg-red-500/15 text-red-400 transition-colors disabled:opacity-50"
              title="Reject Application"
            >
              {loadingAction === 'rejected' ? (
                <span className="h-4.5 w-4.5 block border-2 border-red-400/20 border-t-red-400 rounded-full animate-spin"></span>
              ) : (
                <X className="h-4.5 w-4.5" />
              )}
            </button>

            <button
              onClick={() => handleStatusChange('approved')}
              disabled={loadingAction !== null}
              className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-md hover:shadow-emerald-600/10 disabled:opacity-50"
              title="Approve Application"
            >
              {loadingAction === 'approved' ? (
                <span className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
              ) : (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Hire</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </GlassCard>
  );
}
