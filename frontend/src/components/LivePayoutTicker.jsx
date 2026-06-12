import React, { useState, useEffect } from 'react';

const PAYOUTS = [
  { name: 'S••• Mumbai',     amount: '+₹1,240', tier: 'Silver' },
  { name: 'A••• Chandigarh', amount: '+₹1,680', tier: 'Gold'   },
  { name: 'R••• Delhi',      amount: '+₹920',   tier: 'Bronze' },
  { name: 'P••• Pune',       amount: '+₹2,100', tier: 'Gold'   },
  { name: 'M••• Jaipur',     amount: '+₹470',   tier: 'Bronze' },
  { name: 'K••• Hyderabad',  amount: '+₹1,560', tier: 'Silver' },
  { name: 'T••• Bangalore',  amount: '+₹3,200', tier: 'Gold'   },
  { name: 'N••• Kolkata',    amount: '+₹800',   tier: 'Bronze' },
  { name: 'V••• Surat',      amount: '+₹1,100', tier: 'Silver' },
  { name: 'D••• Noida',      amount: '+₹640',   tier: 'Bronze' },
];

const TIER_COLORS = {
  Bronze: 'text-amber-600',
  Silver: 'text-slate-400',
  Gold:   'text-yellow-400',
};

export default function LivePayoutTicker() {
  const [visiblePayouts, setVisiblePayouts] = useState(PAYOUTS.slice(0, 4));
  const [weeklyTotal] = useState('₹16,16,861');
  const [currentIdx, setCurrentIdx] = useState(4);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 600);

      setVisiblePayouts(prev => {
        const next = PAYOUTS[currentIdx % PAYOUTS.length];
        return [next, ...prev.slice(0, 3)];
      });
      setCurrentIdx(i => i + 1);
    }, 2800);
    return () => clearInterval(interval);
  }, [currentIdx]);

  return (
    <div className="ticker-card w-full max-w-xs">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full bg-brand-green ${pulse ? 'animate-ping' : 'animate-pulse'}`} />
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-green/80">
            Live
          </span>
        </div>
        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">IST</span>
      </div>

      {/* Weekly Total */}
      <div className="px-4 py-3 border-b border-white/5">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-1">
          Paid This Week
        </p>
        <p className="font-display text-2xl font-bold text-brand-green italic">
          {weeklyTotal}
        </p>
      </div>

      {/* Scrolling Payout Rows */}
      <div className="divide-y divide-white/5 overflow-hidden">
        {visiblePayouts.map((p, i) => (
          <div
            key={`${p.name}-${i}`}
            className="ticker-row"
            style={{ opacity: 1 - i * 0.2 }}
          >
            <div className="flex items-center gap-2">
              <span className={`text-[9px] font-bold ${TIER_COLORS[p.tier]}`}>
                ★ {p.tier}
              </span>
              <span className="text-[11px] text-slate-400 font-medium">{p.name}</span>
            </div>
            <span className="text-[12px] font-bold text-brand-green">{p.amount}</span>
          </div>
        ))}
      </div>

      {/* Footer bar */}
      <div className="px-4 py-2 bg-brand-green/5">
        <p className="text-[9px] text-center text-brand-green/60 font-semibold uppercase tracking-widest">
          UPI · Instant · Zero Fees
        </p>
      </div>
    </div>
  );
}
