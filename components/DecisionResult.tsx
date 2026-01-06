
import React, { useState } from 'react';
import { RefereeAnalysis } from '../types';

interface Props {
  analysis: RefereeAnalysis;
  onReset: () => void;
}

type Tab = 'verdict' | 'view' | 'deep';

export const DecisionResult: React.FC<Props> = ({ analysis, onReset }) => {
  const [activeTab, setActiveTab] = useState<Tab>('verdict');

  return (
    <div className="space-y-12 pb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {/* Kiro Summary Card */}
      <section className="bg-black text-white p-10 md:p-16 rounded-[40px] relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-[0.03] translate-x-1/2 -translate-y-1/2 rounded-full"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-[2px] bg-white opacity-20"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white opacity-40">Initial Deliberation</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-semibold leading-tight font-serif italic mb-2 text-slate-100">
            "{analysis.summary}"
          </h2>
        </div>
      </section>

      {/* Navigation - Ultra Minimalist Tabs */}
      <div className="flex border-b border-slate-100">
        {[
          { id: 'verdict', label: 'The Verdict' },
          { id: 'view', label: 'Comparison' },
          { id: 'deep', label: 'Trade-Offs' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={`px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] transition-all relative ${
              activeTab === tab.id 
                ? 'text-black' 
                : 'text-slate-300 hover:text-slate-500'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-black animate-in fade-in zoom-in-y"></div>
            )}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="min-h-[400px]">
        {activeTab === 'verdict' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-12">
            <div className="kiro-card p-10 md:p-16 border-black/10">
              <h3 className="text-4xl font-black text-black tracking-tighter mb-12 uppercase leading-none">
                Steered Recommendations<span className="text-slate-200">.</span>
              </h3>
              <div className="space-y-12">
                {analysis.verdicts.map((v, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row items-start md:items-center gap-8 group">
                    <div className="w-full md:w-1/3">
                      <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-2 block">If Priorities are</span>
                      <p className="text-sm font-bold text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100 group-hover:border-slate-300 transition-colors">
                        {v.condition}
                      </p>
                    </div>
                    <div className="hidden md:block text-slate-200">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </div>
                    <div className="flex-1">
                      <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-2 block">The Referee Suggests</span>
                      <p className="text-3xl font-black text-black tracking-tight">{v.choice}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="kiro-card p-10 flex flex-col items-center justify-center text-center">
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6">Certainty Index</span>
                <div className={`text-6xl font-black mb-4 ${
                  analysis.confidence.level === 'High' ? 'text-black' : 
                  analysis.confidence.level === 'Medium' ? 'text-slate-600' : 'text-slate-400'
                }`}>
                  {analysis.confidence.level}
                </div>
                <div className="w-32 h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full bg-black transition-all duration-1000 ${
                    analysis.confidence.level === 'High' ? 'w-full' : 
                    analysis.confidence.level === 'Medium' ? 'w-2/3' : 'w-1/3'
                  }`}></div>
                </div>
              </div>
              <div className="kiro-card p-10 bg-slate-50">
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 block">Reversal Logic</span>
                <p className="text-base text-slate-600 font-medium italic leading-relaxed">
                  "{analysis.confidence.reversalConditions}"
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'view' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {analysis.comparisonTable.map((item, idx) => (
                <div key={idx} className="kiro-card overflow-hidden flex flex-col hover:border-black/20 transition-all group">
                  <div className="bg-black p-8">
                    <h3 className="text-2xl font-black text-white tracking-tighter uppercase">{item.optionName}</h3>
                  </div>
                  <div className="p-8 space-y-10 flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">Merits</span>
                        <ul className="space-y-3">
                          {item.strengths.map((s, i) => (
                            <li key={i} className="text-sm text-black font-semibold flex gap-2">
                              <span className="text-slate-300">/</span> {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">Drawbacks</span>
                        <ul className="space-y-3">
                          {item.weaknesses.map((w, i) => (
                            <li key={i} className="text-sm text-slate-500 font-medium flex gap-2">
                              <span className="text-slate-200">-</span> {w}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="pt-8 border-t border-slate-50">
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-300 block mb-2">Ideal Context</span>
                      <p className="text-sm text-black font-bold leading-relaxed">{item.bestFit}</p>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-6 px-8 flex items-center gap-4">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Residual Risks</div>
                    <div className="h-[1px] flex-1 bg-slate-200"></div>
                    <p className="text-[10px] font-bold text-slate-500">{item.hiddenRisks}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'deep' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 grid md:grid-cols-2 gap-8">
            <div className="kiro-card p-12 space-y-6 bg-white border-black/5">
              <span className="text-[10px] font-black text-black uppercase tracking-[0.4em] mb-4 block">Deliberation on Returns</span>
              <h4 className="text-2xl font-black text-black tracking-tighter uppercase">Net Gains vs Net Losses</h4>
              <p className="text-slate-500 leading-relaxed text-lg italic font-serif">
                "{analysis.tradeOffAnalysis.gainsVsLosses}"
              </p>
            </div>
            <div className="kiro-card p-12 space-y-6 bg-white border-black/5">
              <span className="text-[10px] font-black text-black uppercase tracking-[0.4em] mb-4 block">Temporal Outlook</span>
              <h4 className="text-2xl font-black text-black tracking-tighter uppercase">Immediate vs End-State</h4>
              <p className="text-slate-500 leading-relaxed text-lg italic font-serif">
                "{analysis.tradeOffAnalysis.shortVsLongTerm}"
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center pt-16">
        <button
          onClick={onReset}
          className="px-12 py-5 bg-black text-white font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-slate-800 transition-all shadow-2xl active:scale-95 text-xs"
        >
          Reset Environment
        </button>
      </div>
    </div>
  );
};
