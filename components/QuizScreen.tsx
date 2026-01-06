import React from 'react';
import { Question } from '../types';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

interface QuizScreenProps {
  question: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  selectedOptionIndex: number | null;
  onAnswer: (index: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  question,
  currentQuestionIndex,
  totalQuestions,
  selectedOptionIndex,
  onAnswer,
  onNext,
  onBack,
}) => {
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-emerald-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question Counter */}
        <div className="mb-4 text-xs font-semibold tracking-wider text-gray-400 uppercase">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </div>

        {/* Question Text */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 leading-snug animate-in slide-in-from-right-4 duration-500">
          {question.text}
        </h2>

        {/* Options */}
        <div className="space-y-4 mb-10">
          {question.options.map((option, index) => {
            const isSelected = selectedOptionIndex === index;
            return (
              <button
                key={index}
                onClick={() => onAnswer(index)}
                className={`w-full text-left p-6 rounded-lg border-2 transition-all duration-200 group relative flex items-start gap-4
                  ${isSelected 
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-sm' 
                    : 'border-white bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50 shadow-sm'
                  }`}
              >
                <div className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors
                   ${isSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-gray-300'}`}>
                    {isSelected && <Check size={12} strokeWidth={3} />}
                </div>
                <span className="text-lg leading-relaxed">{option.text}</span>
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
          <button
            onClick={onBack}
            disabled={currentQuestionIndex === 0}
            className={`flex items-center gap-2 text-sm font-medium transition-colors
              ${currentQuestionIndex === 0 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-gray-500 hover:text-gray-900'}`}
          >
            <ArrowLeft size={16} />
            Previous
          </button>

          <button
            onClick={onNext}
            disabled={selectedOptionIndex === null}
            className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium text-white transition-all
              ${selectedOptionIndex === null
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gray-900 hover:bg-emerald-600 shadow-md transform active:scale-95'}`}
          >
            {currentQuestionIndex === totalQuestions - 1 ? 'See Results' : 'Next'}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
