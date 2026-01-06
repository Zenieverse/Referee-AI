
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
      setError('The Referee encountered an error. Please verify your connection or API configuration.');
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
    <div className="min-h-screen selection:bg-black selection:text-white">
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">
        {/* Kiro Style Header */}
        <header className="mb-20 animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="flex justify-between items-start mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-6 w-1 bg-black rounded-full"></div>
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">
                  Decision Intelligence
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-black tracking-tighter mb-4 leading-none">
                Referee AI<span className="text-slate-200">/</span>
              </h1>
              <p className="text-slate-500 max-w-lg text-lg font-medium leading-relaxed">
                Analyze trade-offs. Navigate complexity. <br/>
                Built with <span className="text-black font-bold">Kiro</span> design principles.
              </p>
            </div>
            <div className="hidden md:block">
              <a 
                href="https://kiro.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex flex-col items-end"
              >
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 group-hover:text-black transition-colors">Powered by</span>
                <span className="text-xl font-black tracking-tighter text-slate-200 group-hover:text-black transition-colors">kiro.dev</span>
              </a>
            </div>
          </div>
        </header>

        {error && (
          <div className="mb-12 p-6 bg-red-50 border border-red-100 text-red-800 rounded-3xl flex items-center gap-4 animate-in zoom-in-95">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <p className="font-semibold text-sm">{error}</p>
          </div>
        )}

        <main className="relative">
          {!analysis ? (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <DecisionForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            </div>
          ) : (
            <DecisionResult analysis={analysis} onReset={handleReset} />
          )}
        </main>

        <footer className="mt-32 pt-16 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Impartiality</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Precision</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Minimalism</span>
          </div>
          <p className="text-slate-300 text-[10px] font-black uppercase tracking-[0.4em]">
            &copy; {new Date().getFullYear()} Referee &bull; Kiro UI
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
