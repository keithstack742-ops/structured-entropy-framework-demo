import React, { useState, useCallback } from 'react';
import { solveMaxcutSdk } from './services/maxcutService';
import type { DemoResults, ChartData } from './types';
import Header from './components/Header';
import Controls from './components/Controls';
import ResultsDisplay from './components/ResultsDisplay';
import Loader from './components/Loader';

const App: React.FC = () => {
  // Narrow the type to the exact supported sizes so calls to solveMaxcutSdk are type-safe
  const [graphSize, setGraphSize] = useState<5 | 20 | 50>(5);
  const [results, setResults] = useState<DemoResults | null>(null);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleRunDemo = useCallback(async () => {
    setIsLoading(true);
    setResults(null);
    setChartData(null);
    setError(null);
    try {
      const { specificResults, chartData } = await solveMaxcutSdk(graphSize);
      setResults(specificResults);
      setChartData(chartData);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [graphSize]);

  return (
    <div className="bg-brand-bg min-h-screen text-brand-text font-sans flex flex-col items-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <Header />

        <main className="mt-8">
          <div className="bg-brand-card rounded-xl shadow-2xl p-6 sm:p-8">
            <Controls
              graphSize={graphSize}
              setGraphSize={setGraphSize}
              onRunDemo={handleRunDemo}
              isLoading={isLoading}
            />
            
            <div className="mt-8 min-h-[450px] flex items-center justify-center">
              {isLoading ? (
                <Loader />
              ) : error ? (
                <div className="text-center text-red-400">
                  <h3 className="text-xl font-bold">An Error Occurred</h3>
                  <p className="mt-2">{error}</p>
                </div>
              ) : results && chartData ? (
                <ResultsDisplay results={results} chartData={chartData} />
              ) : (
                <div className="text-center text-brand-text-secondary">
                  <p className="text-lg">Select a graph size and run the demo to see the results.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
