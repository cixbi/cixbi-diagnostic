
export interface Option {
  text: string;
  ci: number; // Creative Intuition score
  bi: number; // Business Intelligence score
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
}

export interface Answers {
  [questionIndex: number]: number; // Maps question index to option index
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
