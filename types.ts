export interface Option {
  text: string;
  ci: number;
  bi: number;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
}

export interface Answers {
  [questionIndex: number]: number;
}

export interface Scores {
  ci: number;
  bi: number;
}

export type ProfileType = 'intuition-led' | 'intelligence-led' | 'underdeveloped' | 'integrated';

export interface ProfileContent {
  title: string;
  headline: string;
  working: string;
  imbalance: string;
  cost: string;
  help: string;
}

export interface SavedProgress {
  currentQuestion: number;
  answers: Answers;
  timestamp: number;
}
