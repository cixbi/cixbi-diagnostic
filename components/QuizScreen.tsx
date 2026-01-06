import type { FC } from 'react';
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

export const QuizScreen: FC<QuizScreenProps> = ({
  question,
  currentQuestionIndex,
  totalQuestions,
  selectedOptionIndex,
  onAnswer,
  onNext,
  onBack,
}) => {
  return (
    <div style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h3 style={{ margin: 0 }}>Question {currentQuestionIndex + 1} / {totalQuestions}</h3>
        </div>
      </header>

      <main style={{ background: '#fff', padding: 20, borderRadius: 12 }}>
        <div style={{ marginBottom: 18 }}>
          <p style={{ fontSize: 18, color: '#111827', margin: 0 }}>{question.text}</p>
        </div>

        <div style={{ display: 'grid', gap: 10 }}>
          {question.options.map((opt, i) => {
            const selected = selectedOptionIndex === i;
            return (
              <button
                key={i}
                onClick={() => onAnswer(i)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 14px',
                  borderRadius: 10,
                  border: selected ? '2px solid #0f6ef0' : '1px solid #e5e7eb',
                  background: selected ? '#eff6ff' : '#fff',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600 }}>{opt.text}</div>
                </div>
                <div>
                  {selected ? <Check size={18} color="#0f6ef0" /> : <div style={{ width: 18 }} />}
                </div>
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 18 }}>
          <button onClick={onBack} style={{ padding: '8px 12px', borderRadius: 8, background: '#f3f4f6', border: 'none', display: 'flex', alignItems: 'center' }}>
            <ArrowLeft size={16} style={{ marginRight: 8 }} /> Back
          </button>

          <div>
            <button onClick={onNext} style={{ padding: '8px 12px', borderRadius: 8, background: '#0f6ef0', color: '#fff', border: 'none', display: 'flex', alignItems: 'center' }}>
              Next <ArrowRight size={16} style={{ marginLeft: 8 }} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
