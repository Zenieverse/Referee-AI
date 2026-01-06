
import React, { useState } from 'react';
import { RefereeAnalysis } from '../types';

interface Props {
  analysis: RefereeAnalysis;
  onReset: () => void;
}

type Tab = 'verdict' | 'comparison' | 'analysis';

export const DecisionResult: React.FC<Props> = ({ analysis, onReset }) => {
  const [activeTab, setActiveTab] = useState<Tab>('verdict');

  const tabs = [
    { id: 'verdict', label: 'The Verdict', icon: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/> },
    { id: 'comparison', label: 'Option View', icon: <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M8 2h8v4H8z"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/> },
    { id: 'analysis', label: 'Deep Analysis', icon: <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/> }
  ];

  return (
    <div className="space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {/* Dynamic Summary Bubble */}
      <section className="bg-slate-900 text-white p-6 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden group">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
          <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md shrink-0">
             <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mb-3">Neutral Summary</h2>
            <p className="text-xl md:text-2xl font-medium leading-relaxed italic text-slate-100 font-serif">
              "{analysis.summary}"
            </p>
          </div>
        </div>
      </section>

      {/* Tabs Controller */}
      <div className="flex p-1.5 bg-slate-200/50 rounded-2xl backdrop-blur-sm sticky top-4 z-50 border border-white/20 shadow-lg max-w-xl mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === tab.id 
                ? 'bg-white text-slate-900 shadow-md scale-[1.02]' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              {tab.icon}
            </svg>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'verdict' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
            <section className="bg-white border-2 border-slate-900 p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 transform translate-x-4 -translate-y-4 rotate-12 opacity-[0.03]">
                <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 mb-10 flex items-center gap-4">
                Referee Verdict
                <span className="h-1 flex-1 bg-slate-100 hidden md:block"></span>
                <span className="text-xs font-medium text-slate-400 normal-case italic">The Steered Choice</span>
              </h2>
              <div className="grid gap-6">
                {analysis.verdicts.map((v, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row items-stretch md:items-center gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-slate-900 transition-all">
                    <div className="bg-white px-5 py-3 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center min-w-[240px]">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Scenario</span>
                      <p className="text-sm font-bold text-slate-700">{v.condition}</p>
                    </div>
                    <div className="hidden md:block">
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300 group-hover:text-slate-900 transition-colors"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Recommendation</span>
                      <p className="text-2xl font-black text-slate-900 tracking-tight">{v.choice}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 flex flex-col items-center justify-center text-center shadow-sm">
                <h4 className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-[0.3em]">Decision Confidence</h4>
                <div className={`text-5xl font-black mb-2 ${
                  analysis.confidence.level === 'High' ? 'text-emerald-500' : 
                  analysis.confidence.level === 'Medium' ? 'text-amber-500' : 'text-rose-500'
                }`}>
                  {analysis.confidence.level}
                </div>
                <div className="flex gap-1 h-1 w-32 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${
                    analysis.confidence.level === 'High' ? 'w-full bg-emerald-500' : 
                    analysis.confidence.level === 'Medium' ? 'w-2/3 bg-amber-500' : 'w-1/3 bg-rose-500'
                  }`}></div>
                </div>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-inner">
                <h4 className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-[0.3em]">Decision Reversal Conditions</h4>
                <p className="text-slate-600 leading-relaxed font-medium italic">
                  "{analysis.confidence.reversalConditions}"
                </p>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'comparison' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {analysis.comparisonTable.map((item, idx) => (
                <div key={idx} className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col hover:border-slate-300 transition-all">
                  <div className="bg-slate-900 px-8 py-6">
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">{item.optionName}</h3>
                  </div>
                  <div className="p-8 space-y-6 flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                          <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Key Strengths</h4>
                        </div>
                        <ul className="space-y-2">
                          {item.strengths.map((s, i) => (
                            <li key={i} className="text-sm text-slate-700 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-100 font-medium">
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
                          <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Weaknesses</h4>
                        </div>
                        <ul className="space-y-2">
                          {item.weaknesses.map((w, i) => (
                            <li key={i} className="text-sm text-slate-700 bg-rose-50 px-3 py-2 rounded-lg border border-rose-100 font-medium">
                              {w}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t border-slate-50">
                      <h4 className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Ideal Scenario (Best Fit)</h4>
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-sm font-bold text-slate-800">
                        {item.bestFit}
                      </div>
                    </div>
                  </div>
                  <div className="bg-amber-50 p-6 md:px-8 border-t border-amber-100 flex items-start gap-4">
                    <div className="bg-amber-100 p-2 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-700"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest">Hidden Risks & Costs</span>
                      <p className="text-xs text-amber-900 leading-relaxed font-medium mt-1">{item.hiddenRisks}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 space-y-6">
                <div className="bg-slate-900 text-white w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
                </div>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Gains vs Losses</h3>
                <p className="text-slate-600 leading-relaxed text-lg italic font-serif">
                  "{analysis.tradeOffAnalysis.gainsVsLosses}"
                </p>
              </div>
              <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 space-y-6">
                <div className="bg-slate-900 text-white w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Temporal Impact</h3>
                <p className="text-slate-600 leading-relaxed text-lg italic font-serif">
                  "{analysis.tradeOffAnalysis.shortVsLongTerm}"
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center pt-12">
        <button
          onClick={onReset}
          className="group relative px-10 py-4 bg-white border-4 border-slate-900 text-slate-900 font-black uppercase tracking-widest rounded-2xl hover:bg-slate-900 hover:text-white transition-all shadow-xl active:scale-95"
        >
          <span className="relative z-10 flex items-center gap-2">
             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-rotate-45 transition-transform"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
             Start New Analysis
          </span>
        </button>
      </div>
    </div>
  );
};
