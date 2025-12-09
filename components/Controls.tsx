import React from 'react';

interface ControlsProps {
  graphSize: 5 | 20 | 50;
  setGraphSize: (size: 5 | 20 | 50) => void;
  onRunDemo: () => void;
  isLoading: boolean;
}

// Keep the literal sizes as a const tuple so TypeScript infers the exact literal union
const N_OPTIONS = [5, 20, 50] as const;

const Controls: React.FC<ControlsProps> = ({ graphSize, setGraphSize, onRunDemo, isLoading }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="w-full md:w-auto">
        <label className="block text-sm font-medium text-brand-text-secondary mb-2 text-center md:text-left">
          Select MaxCut Problem Size (N)
        </label>
        <div className="flex justify-center md:justify-start space-x-2 bg-black/20 p-1 rounded-lg">
          {N_OPTIONS.map((n) => (
            <button
              key={n}
              onClick={() => setGraphSize(n)}
              disabled={isLoading}
              className={`px-4 sm:px-6 py-2 text-sm sm:text-base font-bold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-card focus:ring-brand-primary ${
                graphSize === n
                  ? 'bg-brand-primary text-brand-bg'
                  : 'bg-transparent text-brand-text-secondary hover:bg-white/10'
              } ${isLoading ? 'cursor-not-allowed opacity-60' : ''}`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onRunDemo}
        disabled={isLoading}
        className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3 text-lg font-bold bg-brand-secondary text-brand-text rounded-lg shadow-lg hover:bg-brand-primary hover:text-brand-bg transform hover:-translate-y-1 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-wait disabled:transform-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{isLoading ? 'Running...' : 'Run Demo'}</span>
      </button>
    </div>
  );
};

export default Controls;
