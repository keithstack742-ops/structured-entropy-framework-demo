import React, { useState } from 'react';
import type { DemoResults, ChartData } from '../types';
import TableView from './TableView';
import ChartsView from './ChartsView';

interface ResultsDisplayProps {
  results: DemoResults;
  chartData: ChartData;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, chartData }) => {
  const [view, setView] = useState<'table' | 'charts'>('table');

  const getButtonClass = (buttonView: 'table' | 'charts') => {
    const baseClass = "px-6 py-2 text-sm font-bold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-card focus:ring-brand-primary";
    if (view === buttonView) {
      return `${baseClass} bg-brand-primary text-brand-bg`;
    }
    return `${baseClass} bg-transparent text-brand-text-secondary hover:bg-white/10`;
  };

  return (
    <div className="w-full animate-fade-in">
      <div className="flex justify-center mb-6">
        <div className="flex space-x-2 bg-black/20 p-1 rounded-lg">
          <button onClick={() => setView('table')} className={getButtonClass('table')}>
            Table
          </button>
          <button onClick={() => setView('charts')} className={getButtonClass('charts')}>
            Charts
          </button>
        </div>
      </div>

      {view === 'table' ? (
        <TableView results={results} chartData={chartData} />
      ) : (
        <ChartsView chartData={chartData} />
      )}
    </div>
  );
};

export default ResultsDisplay;
