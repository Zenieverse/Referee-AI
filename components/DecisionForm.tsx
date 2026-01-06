
import React, { useState } from 'react';
import { DecisionInputs, Priority, RiskTolerance, Constraint } from '../types';

interface Props {
  onSubmit: (data: DecisionInputs) => void;
  isLoading: boolean;
}

const DEFAULT_CONSTRAINTS = [
  { name: 'Budget', icon: 'M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' },
  { name: 'Performance', icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' },
  { name: 'Scalability', icon: 'M21 3l-6 6M21 3h-6M21 3v6M3 21l6-6M3 21h6M3 21v-6' },
  { name: 'Compliance', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
  { name: 'Time', icon: 'M12 6v6l4 2M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z' },
  { name: 'Expertise', icon: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' }
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
    <form onSubmit={handleSubmit} className="kiro-card p-8 md:p-12 space-y-12">
      <section>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[10px] font-black text-black bg-slate-100 px-2 py-1 rounded">01</span>
          <label className="text-xs font-black text-black uppercase tracking-[0.3em]">
            Primary Objective
          </label>
        </div>
        <textarea
          required
          className="kiro-input w-full p-6 text-xl font-medium rounded-2xl outline-none min-h-[140px]"
          placeholder="State the core decision you are facing..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black text-black bg-slate-100 px-2 py-1 rounded">02</span>
            <label className="text-xs font-black text-black uppercase tracking-[0.3em]">
              Proposed Options
            </label>
          </div>
          <button
            type="button"
            onClick={addOption}
            disabled={options.length >= 5}
            className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-black transition-all flex items-center gap-2 disabled:opacity-20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add Option
          </button>
        </div>
        <div className="space-y-4">
          {options.map((option, idx) => (
            <div key={idx} className="flex gap-4 group items-center">
              <div className="flex-1 relative">
                <input
                  required
                  className="kiro-input w-full pl-6 pr-12 py-4 rounded-xl outline-none text-base font-semibold"
                  placeholder={`Candidate ${idx + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(idx, e.target.value)}
                />
              </div>
              {options.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeOption(idx)}
                  className="text-slate-300 hover:text-black transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-8">
          <span className="text-[10px] font-black text-black bg-slate-100 px-2 py-1 rounded">03</span>
          <label className="text-xs font-black text-black uppercase tracking-[0.3em]">
            Constraint Priority
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {constraints.map((c, idx) => (
            <div key={c.name} className="p-4 bg-white border border-slate-100 rounded-2xl flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-slate-50 rounded-lg text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={DEFAULT_CONSTRAINTS[idx].icon} />
                  </svg>
                </div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{c.name}</span>
              </div>
              <div className="flex gap-1">
                {(Object.values(Priority) as Priority[]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => handleConstraintWeight(idx, p)}
                    className={`flex-1 py-1.5 text-[9px] font-black rounded-lg uppercase tracking-widest transition-all ${
                      c.weight === p 
                        ? 'bg-black text-white' 
                        : 'bg-slate-50 text-slate-300 hover:text-slate-500'
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
        <div className="flex items-center gap-3 mb-8">
          <span className="text-[10px] font-black text-black bg-slate-100 px-2 py-1 rounded">04</span>
          <label className="text-xs font-black text-black uppercase tracking-[0.3em]">
            Risk Tolerance
          </label>
        </div>
        <div className="flex p-1.5 bg-slate-50 rounded-2xl">
          {(Object.values(RiskTolerance) as RiskTolerance[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRiskTolerance(r)}
              className={`flex-1 py-4 text-xs font-black rounded-xl uppercase tracking-[0.2em] transition-all ${
                riskTolerance === r 
                  ? 'bg-black text-white shadow-xl translate-y-[-2px]' 
                  : 'text-slate-400 hover:text-slate-600'
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
        className="kiro-btn w-full bg-black text-white py-6 rounded-2xl font-black text-sm uppercase tracking-[0.4em] transition-all hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 relative overflow-hidden group shadow-2xl active:scale-[0.98]"
      >
        <span className="relative z-10 flex items-center justify-center gap-4">
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Thinking...
            </>
          ) : (
            'Consult The Referee'
          )}
        </span>
        {!isLoading && <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>}
      </button>
    </form>
  );
};
