import React from 'react';

interface IntroScreenProps {
  onStart: () => void;
  onContinue: () => void;
  hasSavedProgress: boolean;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onStart, onContinue, hasSavedProgress }) => {
  return (
    <div className="min-h-screen bg-neutral-50 text-gray-900 px-6 py-12 md:py-20 flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full animate-in fade-in duration-700">
        
        {/* Hero Section */}
        <div className="text-center mb-16 md:mb-24">
           <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight tracking-tight">
            Where <span className="text-emerald-600 italic">Creative Intuition</span> meets <span className="italic">Business Intelligence</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
            A short diagnostic to show how your creative business actually operates and where imbalance is costing you.
          </p>
        </div>

        {/* Primary CTA */}
        <div className="flex flex-col items-center gap-4 mb-24 md:mb-32">
          <button
            onClick={onStart}
            className="px-10 py-4 bg-gray-900 text-white text-lg font-medium rounded-full hover:bg-emerald-600 transition-all hover:shadow-xl transform hover:-translate-y-1"
          >
            Begin diagnostic
          </button>
           {hasSavedProgress && (
            <button
              onClick={onContinue}
              className="text-sm text-gray-500 hover:text-gray-900 underline underline-offset-4 transition-colors"
            >
              Continue saved progress
            </button>
          )}
        </div>

        {/* Context Text */}
        <div className="mb-24 md:mb-32 text-center max-w-2xl mx-auto space-y-8">
          <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
            Most creative businesses don’t struggle because of a lack of talent.
          </p>
          <p className="text-lg md:text-xl text-gray-900 leading-relaxed font-semibold">
            They struggle because intuition and operations aren’t working together.
          </p>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            This diagnostic helps you see which side is carrying too much weight — and what that means for your decisions, energy, and results.
          </p>
        </div>

        {/* What's Being Measured */}
        <div className="mb-24 md:mb-32">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-gray-900">What’s being measured</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-3xl mx-auto">
            {/* Creative Intuition Column */}
            <div className="bg-emerald-50/50 p-8 rounded-3xl border border-emerald-100 hover:shadow-sm transition-shadow">
              <h3 className="text-xl font-bold text-emerald-800 mb-6 italic flex items-center gap-3">
                Creative Intuition
              </h3>
              <ul className="space-y-4">
                {['Pattern recognition', 'Judgement calls', 'Navigating ambiguity', 'Trusting experience'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-emerald-900/80 font-medium text-lg">
                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"/> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Business Intelligence Column */}
            <div className="bg-white p-8 rounded-3xl border border-gray-200 hover:shadow-sm transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-6 italic flex items-center gap-3">
                Business Intelligence
              </h3>
              <ul className="space-y-4">
                {['Systems and structure', 'Financial awareness', 'Strategic planning', 'Operational decisions'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-600 font-medium text-lg">
                     <span className="w-1.5 h-1.5 rounded-full bg-gray-900 flex-shrink-0"/> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Methodology & Tone */}
        <div className="mb-24 md:mb-32 max-w-2xl mx-auto text-center space-y-8">
          <div>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              You’ll answer 12 short questions about how you actually operate.
            </p>
            <p className="text-lg md:text-xl text-gray-900 font-medium mt-2">
              There are no right answers — only clearer ones.
            </p>
          </div>
          
          <div className="py-10 border-y border-gray-100">
            <p className="text-2xl md:text-3xl font-serif italic text-gray-800 leading-snug">
              This is not a personality test.
              <br/>
              <span className="text-emerald-600">It’s a structural diagnostic.</span>
            </p>
          </div>
        </div>

        {/* Outcome Expectations */}
        <div className="mb-24 md:mb-32 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-gray-900 mb-16">At the end, you’ll see</h2>
          <div className="grid md:grid-cols-3 gap-8 text-lg font-medium text-gray-800">
            <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <span className="text-emerald-500 text-3xl">→</span> 
              <span>Where imbalance exists</span>
            </div>
            <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <span className="text-emerald-500 text-3xl">→</span> 
              <span>What it’s costing you</span>
            </div>
            <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
               <span className="text-emerald-500 text-3xl">→</span> 
               <span>Which side needs support, not suppression</span>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mb-16">
          <button
            onClick={onStart}
            className="px-10 py-4 bg-gray-900 text-white text-lg font-medium rounded-full hover:bg-emerald-600 transition-all hover:shadow-xl transform hover:-translate-y-1 mb-4"
          >
            Begin diagnostic
          </button>
          <p className="text-sm text-gray-500 font-medium tracking-wide">Takes under 5 minutes</p>
        </div>

        <div className="pt-8 border-t border-gray-200 text-xs text-gray-400 text-center w-full">
          Design by <a href="https://www.linkedin.com/in/robynkeet/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors">Robyn Keet</a>
        </div>
      </div>
    </div>
  );
};