import type { ProfileContent } from './types';

/**
 * Example questions. Adjust text and scoring to match your real content.
 * Each option must have `ci` and `bi` numeric values.
 */
export const QUESTIONS = [
  { id: 1, text: 'I prefer exploring new ideas even if they are uncertain.', options: [{ text: 'Strongly disagree', ci: 0, bi: 2 }, { text: 'Disagree', ci: 1, bi: 1 }, { text: 'Agree', ci: 2, bi: 0 }] },
  { id: 2, text: 'I rely on data when making business decisions.', options: [{ text: 'Strongly disagree', ci: 2, bi: 0 }, { text: 'Disagree', ci: 1, bi: 1 }, { text: 'Agree', ci: 0, bi: 2 }] },
  { id: 3, text: 'I can quickly adapt my creative approach when needed.', options: [{ text: 'Not at all', ci: 0, bi: 2 }, { text: 'Somewhat', ci: 1, bi: 1 }, { text: 'Very much', ci: 2, bi: 0 }] },
  { id: 4, text: 'I track metrics to understand how my work performs commercially.', options: [{ text: 'Not at all', ci: 2, bi: 0 }, { text: 'Somewhat', ci: 1, bi: 1 }, { text: 'Very much', ci: 0, bi: 2 }] },
  { id: 5, text: 'I trust my instincts when planning new projects.', options: [{ text: 'Never', ci: 0, bi: 2 }, { text: 'Sometimes', ci: 1, bi: 1 }, { text: 'Always', ci: 2, bi: 0 }] },
  { id: 6, text: 'I put systems in place to repeat what works.', options: [{ text: 'Never', ci: 2, bi: 0 }, { text: 'Sometimes', ci: 1, bi: 1 }, { text: 'Always', ci: 0, bi: 2 }] },
];

/**
 * Example profile content for each profile type. Replace with your real copy.
 */
export const PROFILES: Record<string, ProfileContent> = {
  'intuition-led': {
    title: 'Intuition-led',
    headline: 'You lead with creative intuition.',
    working: 'You have strong idea-generation and creative instincts.',
    imbalance: 'May under-invest in processes and measurement.',
    cost: 'Inconsistent business outcomes and missed scale opportunities.',
    help: 'Consider blending lightweight metrics with experimentation—track 1–2 KPIs and iterate.'
  },
  'intelligence-led': {
    title: 'Intelligence-led',
    headline: 'You lead with business intelligence.',
    working: 'You make data-driven decisions and build repeatable systems.',
    imbalance: 'May under-invest in exploratory creativity.',
    cost: 'Creative opportunities may be missed or under-used.',
    help: 'Set aside time for exploratory projects and small experiments to spark new ideas.'
  },
  'underdeveloped': {
    title: 'Underdeveloped',
    headline: 'Both creative and business systems need attention.',
    working: 'You may have some strengths but inconsistent approaches.',
    imbalance: 'Lack of clear processes or creative direction.',
    cost: 'Slower growth and unclear value delivery.',
    help: 'Start with a short quarterly plan: one creative experiment and one operational improvement.'
  },
  'integrated': {
    title: 'Integrated',
    headline: 'Creative intuition and business intelligence are balanced.',
    working: 'You build creative experiments that are also measurable.',
    imbalance: 'You are balancing both effectively — keep refining.',
    cost: 'Small risks — maintain focus on clarity and measurement.',
    help: 'Continue combining experimentation with clear metrics and repeatable systems.'
  }
};

/**
 * Optional webhook URL for saving results (replace with real endpoint or leave blank)
 */
export const GOOGLE_SHEET_WEBHOOK_URL = '';
