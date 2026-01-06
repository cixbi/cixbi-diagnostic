import { useState, useEffect } from 'react';
import { QUESTIONS, PROFILES } from './constants';
import { Answers, Scores, SavedProgress, ProfileType } from './types';
import { IntroScreen } from './components/IntroScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { generatePDF } from './utils/pdfGenerator';

export default function App() {
  const [screen, setScreen] = useState<'intro' | 'quiz' | 'results'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [savedResults, setSavedResults] = useState<SavedProgress | null>(null);

  // Load saved progress on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('diagnostic_progress');
      if (saved) {
        setSavedResults(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to parse saved progress', e);
    }
  }, []);

  const handleStart = () => {
    setScreen('quiz');
  };

  const handleContinue = () => {
    if (savedResults) {
      setAnswers(savedResults.answers);
      setCurrentQuestion(savedResults.currentQuestion);
      setScreen('quiz');
    }
  };

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = { ...answers, [currentQuestion]: optionIndex };
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    // Save progress to local storage
    const nextQ = currentQuestion + 1;
    localStorage.setItem('diagnostic_progress', JSON.stringify({
      currentQuestion: nextQ,
      answers: answers,
      timestamp: Date.now()
    }));

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(nextQ);
    } else {
      setScreen('results');
      localStorage.removeItem('diagnostic_progress'); // Clear progress when done
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    localStorage.removeItem('diagnostic_progress');
    setSavedResults(null);
    setAnswers({});
    setCurrentQuestion(0);
    setScreen('intro');
  };

  const calculateScores = (): Scores => {
    let ciTotal = 0;
    let biTotal = 0;
    
    Object.entries(answers).forEach(([qIndex, optIndex]) => {
      const question = QUESTIONS[Number(qIndex)];
      // Safety check in case answers are stale for changed questions
      const index = optIndex as number;
      if (question && question.options[index]) {
        const option = question.options[index];
        ciTotal += option.ci;
        biTotal += option.bi;
      }
    });

    return { ci: ciTotal, bi: biTotal };
  };

  const getProfileType = (ci: number, bi: number): ProfileType => {
    const ciPercent = (ci / 36) * 100;
    const biPercent = (bi / 36) * 100;

    if (ciPercent >= 60 && biPercent >= 60) return 'integrated';
    if (ciPercent < 40 && biPercent < 40) return 'underdeveloped';
    if (ciPercent > biPercent) return 'intuition-led';
    return 'intelligence-led';
  };

  const handlePrint = () => {
    const scores = calculateScores();
    const profileType = getProfileType(scores.ci, scores.bi);
    const profile = PROFILES[profileType];
    generatePDF(scores, profile);
  };

  // Render logic based on screen state
  if (screen === 'intro') {
    return (
      <IntroScreen 
        onStart={handleStart} 
        onContinue={handleContinue} 
        hasSavedProgress={!!savedResults} 
      />
    );
  }

  if (screen === 'quiz') {
    const question = QUESTIONS[currentQuestion];
    const selectedOption = answers[currentQuestion] ?? null;

    return (
      <QuizScreen
        question={question}
        currentQuestionIndex={currentQuestion}
        totalQuestions={QUESTIONS.length}
        selectedOptionIndex={selectedOption}
        onAnswer={handleAnswer}
        onNext={handleNext}
        onBack={handleBack}
      />
    );
  }

  if (screen === 'results') {
    const scores = calculateScores();
    const profileType = getProfileType(scores.ci, scores.bi);
    const profile = PROFILES[profileType];

    return (
      <ResultsScreen
        scores={scores}
        profile={profile}
        onRestart={handleRestart}
        onPrint={handlePrint}
      />
    );
  }

  return null;
}
