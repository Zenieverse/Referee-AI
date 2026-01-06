
import React, { useState } from 'react';
import { DecisionForm } from './components/DecisionForm';
import { DecisionResult } from './components/DecisionResult';
import { DecisionInputs, RefereeAnalysis } from './types';
import { getDecisionAnalysis } from './services/geminiService';

const App: React.FC = () => {
  const [analysis, setAnalysis] = useState<RefereeAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (inputs: DecisionInputs) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getDecisionAnalysis(inputs);
      setAnalysis(result);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error(err);
      setError('The Referee encountered an error during deliberation. Please ensure your API key is valid.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysis(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-slate-900 selection:text-white">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-24">
        {/* Header */}
        <header className="text-center mb-16 md:mb-24 animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="inline-flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full mb-8 border border-slate-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-900"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
              Impartial Decision Engine v1.0
            </span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tight uppercase mb-6 leading-none">
            Referee<span className="text-slate-300">.</span>AI
          </h1>
          
          <p className="text-slate-500 max-w-xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
            Stop seeking the <span className="text-slate-900 font-bold italic">best</span> answer. <br className="hidden md:block"/>
            Start understanding your <span className="text-slate-900 font-bold underline decoration-slate-300 decoration-4 underline-offset-4">trade-offs</span>.
          </p>
        </header>

        {error && (
          <div className="max-w-2xl mx-auto mb-12 p-6 bg-rose-50 border-2 border-rose-200 text-rose-800 rounded-3xl flex items-center gap-4 animate-in zoom-in-95 duration-300">
            <div className="bg-rose-200 p-2 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            <p className="font-bold">{error}</p>
          </div>
        )}

        <main className="relative">
          {!analysis ? (
            <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
              <DecisionForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            </div>
          ) : (
            <DecisionResult analysis={analysis} onReset={handleReset} />
          )}
        </main>

        {/* Footer */}
        <footer className="mt-32 pt-16 border-t border-slate-200 text-center space-y-4">
          <div className="flex justify-center gap-8">
             <div className="h-10 w-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-help" title="Impartial Deliberation">⚖️</div>
             <div className="h-10 w-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-help" title="Logic First">🧠</div>
             <div className="h-10 w-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-help" title="Verified Trade-offs">✅</div>
          </div>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.5em]">
            &copy; {new Date().getFullYear()} Referee Intelligence Systems
          </p>
        </footer>
      </div>
      
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
