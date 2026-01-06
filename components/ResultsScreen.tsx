import type { FC } from 'react';
import { useState } from 'react';
import { Scores, ProfileContent } from '../types';
import { Printer, RotateCcw, Check, Send } from 'lucide-react';
import { GOOGLE_SHEET_WEBHOOK_URL } from '../constants';

interface ResultsScreenProps {
  scores: Scores;
  profile: ProfileContent;
  onRestart: () => void;
  onPrint: () => void;
}

export const ResultsScreen: FC<ResultsScreenProps> = ({ scores, profile, onRestart, onPrint }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [newsletter, setNewsletter] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const submitResults = async () => {
    if (!GOOGLE_SHEET_WEBHOOK_URL) {
      setSubmitStatus('error');
      return;
    }
    setIsSubmitting(true);
    try {
      const payload = {
        name,
        email,
        newsletter,
        scores,
        profileTitle: profile.title,
        timestamp: Date.now(),
      };
      const res = await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    } catch (e) {
      console.error(e);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 920, margin: '0 auto' }}>
      <main style={{ background: '#fff', padding: 20, borderRadius: 12 }}>
        <h2 style={{ marginTop: 0 }}>{profile.title}</h2>
        <p style={{ color: '#4b5563' }}>{profile.headline}</p>

        <section style={{ marginTop: 16 }}>
          <div style={{ fontWeight: 700 }}>Scores</div>
          <div style={{ marginTop: 8 }}>
            <div>Creative Intuition: {scores.ci}</div>
            <div>Business Intelligence: {scores.bi}</div>
          </div>
        </section>

        <section style={{ marginTop: 12 }}>
          <div style={{ fontWeight: 700 }}>What’s Working</div>
          <div style={{ marginTop: 8 }}>{profile.working}</div>
        </section>

        <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
          <button onClick={onRestart} style={{ padding: '8px 12px', borderRadius: 8, background: '#f3f4f6', border: 'none' }}>
            <RotateCcw size={16} style={{ marginRight: 8 }} /> Restart
          </button>

          <button onClick={onPrint} style={{ padding: '8px 12px', borderRadius: 8, background: '#0f6ef0', color: '#fff', border: 'none', display: 'flex', alignItems: 'center' }}>
            <Printer size={16} style={{ marginRight: 8 }} /> Print / Save PDF
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); submitResults(); }} style={{ marginTop: 18 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} style={{ flex: 1, padding: 8, borderRadius: 8, border: '1px solid #e5e7eb' }} />
            <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ flex: 1, padding: 8, borderRadius: 8, border: '1px solid #e5e7eb' }} />
          </div>

          <div style={{ marginTop: 8 }}>
            <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input type="checkbox" checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)} />
              <span>Subscribe to newsletter</span>
            </label>
          </div>

          <div style={{ marginTop: 10 }}>
            <button type="submit" disabled={isSubmitting} style={{ padding: '8px 12px', borderRadius: 8, background: '#059669', color: '#fff', border: 'none' }}>
              <Send size={14} style={{ marginRight: 8 }} /> {isSubmitting ? 'Sending…' : 'Send results'}
            </button>

            {submitStatus === 'success' && <span style={{ marginLeft: 8, color: '#059669' }}>Sent!</span>}
            {submitStatus === 'error' && <span style={{ marginLeft: 8, color: '#ef4444' }}>Failed to send</span>}
          </div>
        </form>
      </main>
    </div>
  );
};
