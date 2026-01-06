import type { FC } from 'react';

interface IntroScreenProps {
  onStart: () => void;
  onContinue: () => void;
  hasSavedProgress: boolean;
}

export const IntroScreen: FC<IntroScreenProps> = ({ onStart, onContinue, hasSavedProgress }) => {
  return (
    <div style={{ padding: 24, maxWidth: 860, margin: '0 auto' }}>
      <header style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 24 }}>
        <div style={{ width: 56, height: 56, borderRadius: 10, background: 'linear-gradient(135deg,#0f6ef0,#7c3aed)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
          CD
        </div>
        <div>
          <h1 style={{ margin: 0 }}>Cixbi Diagnostic</h1>
          <p style={{ margin: '6px 0', color: '#6b7280' }}>A short diagnostic to show how your creative business actually operates and where imbalance is costing you.</p>
        </div>
      </header>

      <main style={{ background: '#fff', padding: 20, borderRadius: 12, boxShadow: '0 6px 18px rgba(15,30,50,0.06)' }}>
        <h2>Welcome</h2>
        <p style={{ color: '#374151' }}>This short diagnostic will take a few minutes. Answer honestly for the best results.</p>

        <div style={{ marginTop: 18 }}>
          <button onClick={onStart} style={{ marginRight: 10, padding: '10px 14px', borderRadius: 8, background: '#0f6ef0', color: '#fff', border: 'none' }}>
            Start diagnostic
          </button>

          {hasSavedProgress && (
            <button onClick={onContinue} style={{ padding: '10px 14px', borderRadius: 8, background: '#f3f4f6', border: 'none' }}>
              Continue saved progress
            </button>
          )}
        </div>
      </main>
    </div>
  );
};
