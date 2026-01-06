
export enum Priority {
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low'
}

export enum RiskTolerance {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export interface Constraint {
  name: string;
  weight: Priority;
}

export interface DecisionInputs {
  question: string;
  options: string[];
  constraints: Constraint[];
  riskTolerance: RiskTolerance;
}

export interface ComparisonItem {
  optionName: string;
  strengths: string[];
  weaknesses: string[];
  bestFit: string;
  hiddenRisks: string;
}

export interface Verdict {
  condition: string;
  choice: string;
}

export interface RefereeAnalysis {
  summary: string;
  comparisonTable: ComparisonItem[];
  tradeOffAnalysis: {
    gainsVsLosses: string;
    shortVsLongTerm: string;
  };
  verdicts: Verdict[];
  confidence: {
    level: RiskTolerance;
    reversalConditions: string;
  };
}
