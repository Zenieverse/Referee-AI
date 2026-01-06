
import React, { useState } from 'react';
import { DecisionInputs, Priority, RiskTolerance, Constraint } from '../types';

interface Props {
  onSubmit: (data: DecisionInputs) => void;
  isLoading: boolean;
}

const DEFAULT_CONSTRAINTS = [
  { name: 'Budget', icon: <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /> },
  { name: 'Performance', icon: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /> },
  { name: 'Scalability', icon: <path d="M21 3l-6 6M21 3h-6M21 3v6M3 21l6-6M3 21h6M3 21v-6M21 21l-6-6M21 21v-6M21 21h-6M3 3l6 6M3 3v6M3 3h6" /> },
  { name: 'Compliance', icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /> },
  { name: 'Time to Market', icon: <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /> },
  { name: 'Team Expertise', icon: <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 00-3-3.87M19 8a4 4 0 010 7.75" /> }
];

export const DecisionForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<string[]>(['', '']);
  const [constraints, setConstraints] = useState<Constraint[]>(
    DEFAULT_CONSTRAINTS.map(c => ({ name: c.name, weight: Priority.MEDIUM }))
  );
  const [riskTolerance, setRiskTolerance] = useState<RiskTolerance>(RiskTolerance.MEDIUM);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    if (options.length < 5) setOptions([...options, '']);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const handleConstraintWeight = (index: number, weight: Priority) => {
    const newConstraints = [...constraints];
    newConstraints[index].weight = weight;
    setConstraints(newConstraints);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validOptions = options.filter(o => o.trim() !== '');
    if (validOptions.length < 2) {
      alert('Please provide at least 2 valid options.');
      return;
    }
    onSubmit({ question, options: validOptions, constraints, riskTolerance });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10 bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-slate-200">
      <section className="relative">
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-slate-900 text-white p-1.5 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <label className="text-sm font-black text-slate-900 uppercase tracking-widest">
            Decision Question
          </label>
        </div>
        <textarea
          required
          className="w-full p-4 text-lg border-2 border-slate-100 rounded-xl focus:border-slate-900 focus:ring-0 transition-all outline-none min-h-[120px] bg-slate-50 hover:bg-white"
          placeholder="What choice are you trying to make?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 text-white p-1.5 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>
            </div>
            <label className="text-sm font-black text-slate-900 uppercase tracking-widest">
              Available Options
            </label>
          </div>
          <button
            type="button"
            onClick={addOption}
            disabled={options.length >= 5}
            className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 hover:border-slate-900 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add Option
          </button>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {options.map((option, idx) => (
            <div key={idx} className="flex gap-3 group">
              <div className="flex-1 relative">
                <input
                  required
                  className="w-full pl-10 pr-4 py-3 border-2 border-slate-100 rounded-xl focus:border-slate-900 focus:ring-0 outline-none transition-all bg-slate-50 group-hover:bg-white"
                  placeholder={`Option ${idx + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(idx, e.target.value)}
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 font-black italic">{idx + 1}</span>
              </div>
              {options.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeOption(idx)}
                  className="text-slate-300 hover:text-red-500 transition-colors p-2"
                  title="Remove option"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-6">
          <div className="bg-slate-900 text-white p-1.5 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
          </div>
          <label className="text-sm font-black text-slate-900 uppercase tracking-widest">
            Constraint Priorities
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {constraints.map((c, idx) => (
            <div key={c.name} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col gap-3 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                  {DEFAULT_CONSTRAINTS[idx].icon}
                </svg>
                <span className="text-sm font-bold text-slate-700">{c.name}</span>
              </div>
              <div className="flex gap-1.5 p-1 bg-slate-200/50 rounded-lg">
                {(Object.values(Priority) as Priority[]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => handleConstraintWeight(idx, p)}
                    className={`flex-1 py-1.5 text-[10px] font-black rounded-md uppercase tracking-wider transition-all ${
                      c.weight === p 
                        ? 'bg-white text-slate-900 shadow-sm' 
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-6">
          <div className="bg-slate-900 text-white p-1.5 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
          <label className="text-sm font-black text-slate-900 uppercase tracking-widest">
            Risk Tolerance
          </label>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {(Object.values(RiskTolerance) as RiskTolerance[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRiskTolerance(r)}
              className={`py-3 px-2 text-xs font-black rounded-xl uppercase tracking-widest border-2 transition-all ${
                riskTolerance === r 
                  ? 'bg-slate-900 text-white border-slate-900 shadow-lg scale-[1.02]' 
                  : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </section>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-5 text-white font-black text-xl uppercase tracking-[0.2em] rounded-2xl transition-all shadow-2xl active:scale-[0.98] overflow-hidden relative group ${
          isLoading ? 'bg-slate-300 cursor-not-allowed' : 'bg-slate-900 hover:bg-black'
        }`}
      >
        <span className="relative z-10 flex items-center justify-center gap-3">
          {isLoading ? (
            <>
              <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Thinking...
            </>
          ) : (
            'Consult The Referee'
          )}
        </span>
        {!isLoading && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
        )}
      </button>
    </form>
  );
};
