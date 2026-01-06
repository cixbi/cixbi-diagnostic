import React, { useState } from 'react';
import { Scores, ProfileContent } from '../types';
import { Printer, RotateCcw, Check, Send } from 'lucide-react';
import { getReportHTML } from '../utils/pdfGenerator';
import { GOOGLE_SHEET_WEBHOOK_URL } from '../constants';

interface ResultsScreenProps {
  scores: Scores;
  profile: ProfileContent;
  onRestart: () => void;
  onPrint: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({ scores, profile, onRestart, onPrint }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [newsletter, setNewsletter] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const ciPercent = (scores.ci / 36) * 100;
  const biPercent = (scores.bi / 36) * 100;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    const htmlContent = getReportHTML(scores, profile);
    
    const payload = {
      Timestamp: new Date().toISOString(),
      Name: name,
      Email: email,
      Profile: profile.title,
      Intuition: scores.ci,
      Intelligence: scores.bi,
      Newsletter: newsletter ? "Yes" : "No",
      Headline: profile.headline,
      "Reality Statement": profile.imbalance,
      Synthesis: profile.help,
      "Report HTML": htmlContent
    };

    try {
      if (GOOGLE_SHEET_WEBHOOK_URL) {
        await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
          method: 'POST',
          mode: 'no-cors', // Necessary for Google Apps Script Web App
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        setSubmitStatus('success');
      } else {
        console.warn("Google Sheet Webhook URL is not set. Data was not sent:", payload);
        // Simulate success for demo purposes if no URL is provided
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSubmitStatus('success');
      }
    } catch (error) {
      console.error("Submission failed", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-gray-900 px-6 py-12 animate-in fade-in duration-700">
      <div className="max-w-3xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-12 text-center md:text-left">
          <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-bold tracking-widest text-gray-500 uppercase mb-4">
            Your Diagnostic Result
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{profile.title}</h1>
          <p className="text-xl text-gray-600 leading-relaxed font-light">{profile.headline}</p>
        </div>

        {/* Scores Visualization */}
        <div className="mb-12 p-8 bg-white rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-6">Your Capacity Balance</h3>
          
          <div className="space-y-8">
            <div>
              <div className="flex justify-between mb-2 items-end">
                <span className="text-base font-medium text-emerald-700 italic">Creative Intuition</span>
                <span className="text-sm font-mono text-gray-500">{scores.ci}/36 ({Math.round(ciPercent)}%)</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${ciPercent}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2 items-end">
                <span className="text-base font-medium text-gray-900 italic">Business Intelligence</span>
                <span className="text-sm font-mono text-gray-500">{scores.bi}/36 ({Math.round(biPercent)}%)</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gray-800 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${biPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Analysis */}
        <div className="space-y-12 mb-16">
          <section className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-600 mb-4 pb-2 border-b border-emerald-100">What's Working</h3>
            <p className="text-gray-800 leading-relaxed text-lg">{profile.working}</p>
          </section>

          <section className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-600 mb-4 pb-2 border-b border-amber-100">Where Imbalance Shows Up</h3>
            <p className="text-gray-800 leading-relaxed text-lg">{profile.imbalance}</p>
          </section>

          <section className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-red-600 mb-4 pb-2 border-b border-red-100">If Nothing Changes</h3>
            <p className="text-gray-800 leading-relaxed text-lg">{profile.cost}</p>
          </section>

          <section className="bg-blue-50 p-6 md:p-8 rounded-xl border border-blue-100">
            <h3 className="text-sm font-bold uppercase tracking-wider text-blue-800 mb-4 pb-2 border-b border-blue-200">Next Steps</h3>
            <p className="text-blue-900 leading-relaxed text-lg whitespace-pre-wrap">{profile.help}</p>
          </section>
        </div>

        {/* Save Results Form */}
        <div className="mb-12 bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold mb-4">Save Your Results</h3>
          <p className="text-gray-600 mb-6 text-sm">Enter your details to save this analysis to our records and receive updates. Your full results will be sent to you within 24 hours.</p>
          
          {submitStatus === 'success' ? (
             <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded flex items-center gap-2">
                <Check size={18} />
                <span>Your results have been saved successfully.</span>
             </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input 
                    type="text" 
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="newsletter"
                  checked={newsletter}
                  onChange={(e) => setNewsletter(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                />
                <label htmlFor="newsletter" className="text-sm text-gray-700">Subscribe to newsletter for creative business insights</label>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors w-full md:w-auto ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Saving...' : (
                  <>
                    <Send size={16} />
                    Save Result
                  </>
                )}
              </button>
              {submitStatus === 'error' && (
                <p className="text-red-600 text-sm mt-2">There was an error saving your results. Please try again.</p>
              )}
            </form>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pb-8 border-t border-gray-200 pt-12">
           <button
            onClick={onPrint}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-white border border-gray-200 text-gray-900 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Printer size={18} />
            Download PDF Report
          </button>
          
          <button
            onClick={onRestart}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-white border border-gray-200 text-gray-600 font-medium rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <RotateCcw size={18} />
            Start Over
          </button>
        </div>

        <div className="text-xs text-gray-400 text-center pb-8">
          (c) 2025 | <a href="https://www.innervoicecreative.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 transition-colors">Inner Voice Creative</a>
        </div>
      </div>
    </div>
  );
};
