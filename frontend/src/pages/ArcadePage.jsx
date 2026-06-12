import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Gamepad2, Award, RefreshCw, CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import GlassCard from '../components/GlassCard';

const QUIZ_QUESTIONS = [
  {
    q: "If you save ₹1,000 every month at a 10% annual interest rate, what makes your money grow faster over 10 years?",
    options: [
      "Simple Interest",
      "Compound Interest",
      "Keeping it in a checking account",
      "Gold certificates"
    ],
    ans: 1,
    hint: "Einstein called it the 8th wonder of the world."
  },
  {
    q: "What does CPA stand for in brand marketing campaigns?",
    options: [
      "Cost Per Acquisition / Action",
      "Cost Per Audience",
      "Cost Per Advertisement",
      "Company Product Advertisement"
    ],
    ans: 0,
    hint: "It means the brand only pays when a real action is verified."
  },
  {
    q: "Under India's DPDP Act, what is required before a platform collects a teen's personal data?",
    options: [
      "Nothing, teens can share anything",
      "A valid school identification card",
      "Verifiable parental consent",
      "An offline physical registration form"
    ],
    ans: 2,
    hint: "DPDP stands for Digital Personal Data Protection."
  },
  {
    q: "What is the best way to build your trust rating on the Funngro app to unlock higher-paying campaigns?",
    options: [
      "Spamming brand links on groups",
      "Completing tasks accurately and on schedule",
      "Making multiple fake profiles",
      "Waiting for campaigns to expire"
    ],
    ans: 1,
    hint: "Quality and speed are metrics recorded by brand teams."
  }
];

export default function ArcadePage() {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);

  const startQuiz = () => {
    setIsPlaying(true);
    setCurrentQ(0);
    setSelectedOpt(null);
    setScore(0);
    setIsAnswered(false);
  };

  const selectOption = (idx) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);
    
    const isCorrect = idx === QUIZ_QUESTIONS[currentQ].ans;
    if (isCorrect) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQ < QUIZ_QUESTIONS.length - 1) {
      setCurrentQ(q => q + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      // Completed! Show celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2DDE98', '#8b5cf6', '#f59e0b']
      });
      setCurrentQ(QUIZ_QUESTIONS.length);
    }
  };

  return (
    <div className="relative min-h-[90vh] bg-[#071210] pt-28 pb-20 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/3 w-[350px] h-[350px] rounded-full bg-brand-green/03 blur-[90px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-brand-green/02 blur-[90px]" />
        <div className="absolute inset-0 grid-bg opacity-15" />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-12 animate-fade-up">
          <span className="section-pill justify-center mb-4">Funngro Arcade</span>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Learn-to-Earn <span className="headline-accent">Arcade.</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            Test your brand awareness and financial literacy! Score 100% to unlock the digital "Smart Saver" profile badge in your account.
          </p>
        </div>

        {/* Game Area */}
        <div className="animate-fade-up">
          {!isPlaying ? (
            <GlassCard className="text-center p-12 max-w-xl mx-auto border-brand-green/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-green/05 rounded-bl-full pointer-events-none" />
              <Gamepad2 className="h-16 w-16 text-brand-green mx-auto mb-6 animate-float" />
              <h2 className="text-2xl font-bold text-white mb-3 font-display">Funngro Financial Quiz</h2>
              <p className="text-xs text-slate-400 mb-8 max-w-md mx-auto">
                Includes 4 real-world scenario questions on budgeting, brand marketing metrics, and child digital safety.
              </p>
              <button onClick={startQuiz} className="btn-glow px-10 py-3.5 text-xs">
                Start Game
              </button>
            </GlassCard>
          ) : currentQ < QUIZ_QUESTIONS.length ? (
            <GlassCard className="max-w-xl mx-auto border-brand-green/10">
              {/* Quiz Progress */}
              <div className="flex justify-between items-center mb-6 text-xs text-slate-500 font-bold uppercase tracking-wider">
                <span>Question {currentQ + 1} of {QUIZ_QUESTIONS.length}</span>
                <span className="text-brand-green">Score: {score}</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-white/5 h-1.5 rounded-full mb-8 overflow-hidden">
                <div 
                  className="bg-brand-green h-full transition-all duration-300"
                  style={{ width: `${((currentQ + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <h3 className="text-base font-semibold text-white mb-6 leading-relaxed">
                {QUIZ_QUESTIONS[currentQ].q}
              </h3>

              {/* Options */}
              <div className="space-y-3 mb-8">
                {QUIZ_QUESTIONS[currentQ].options.map((opt, i) => {
                  let optStyle = "border-white/10 hover:border-brand-green/30 bg-brand-dark-card/30 hover:bg-brand-green/02 text-slate-300";
                  
                  if (isAnswered) {
                    if (i === QUIZ_QUESTIONS[currentQ].ans) {
                      optStyle = "border-[#2DDE98]/50 bg-[#2DDE98]/10 text-[#2DDE98] font-bold";
                    } else if (i === selectedOpt) {
                      optStyle = "border-red-500/50 bg-red-500/10 text-red-400";
                    } else {
                      optStyle = "border-white/5 opacity-55 text-slate-500";
                    }
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => selectOption(i)}
                      disabled={isAnswered}
                      className={`w-full text-left px-5 py-4 rounded-xl text-xs transition-all border flex items-center justify-between ${optStyle}`}
                    >
                      <span>{opt}</span>
                      {isAnswered && i === QUIZ_QUESTIONS[currentQ].ans && (
                        <CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0" />
                      )}
                      {isAnswered && i === selectedOpt && i !== QUIZ_QUESTIONS[currentQ].ans && (
                        <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Hint Context */}
              {!isAnswered ? (
                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl flex items-start gap-2.5 text-[11px] text-slate-500">
                  <HelpCircle className="h-4 w-4 text-brand-green/60 mt-0.5 shrink-0" />
                  <p><strong>Hint:</strong> {QUIZ_QUESTIONS[currentQ].hint}</p>
                </div>
              ) : (
                <div className="flex justify-end">
                  <button onClick={nextQuestion} className="btn-glow px-6 py-2.5 text-[11px]">
                    {currentQ === QUIZ_QUESTIONS.length - 1 ? 'Finish' : 'Next Question'}
                  </button>
                </div>
              )}
            </GlassCard>
          ) : (
            <GlassCard className="text-center p-12 max-w-xl mx-auto border-brand-green/30 relative">
              <Award className="h-20 w-20 text-yellow-400 mx-auto mb-6 animate-bounce" />
              <h2 className="text-2xl font-black text-white mb-2 font-display">Congratulations! 🎉</h2>
              <p className="text-xs text-slate-400 mb-6">
                You completed the Financial Literacy Quiz!
              </p>
              
              <div className="p-4 bg-brand-green/5 border border-brand-green/10 rounded-2xl max-w-sm mx-auto mb-8">
                <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Your Final Score</span>
                <span className="text-4xl font-display font-black text-brand-green">{score} / {QUIZ_QUESTIONS.length}</span>
                <p className="text-[10px] text-slate-400 mt-2">
                  {score === QUIZ_QUESTIONS.length 
                    ? "Perfect score! You are officially ready to pick campaigns." 
                    : "Good job! Read our student blog guides to score a perfect 4/4 next time."}
                </p>
              </div>

              <div className="flex gap-4 justify-center">
                <button onClick={startQuiz} className="btn-outline-green px-6 py-2.5 text-[11px]">
                  <RefreshCw className="h-3.5 w-3.5" />
                  Play Again
                </button>
                <a 
                  href="https://play.google.com/store/apps/details?id=com.wishbanc.funngro"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-glow px-6 py-2.5 text-[11px]"
                >
                  Download App to Earn
                </a>
              </div>
            </GlassCard>
          )}
        </div>

      </div>
    </div>
  );
}
