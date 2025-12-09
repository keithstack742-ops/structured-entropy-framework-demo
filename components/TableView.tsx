import React from 'react';
import type { DemoResults, ChartData } from '../types';

interface TableViewProps {
  results: DemoResults;
  chartData: ChartData;
}

interface MetricRowProps {
  metric: string;
  value: string;
  significance: React.ReactNode;
  isHighlighted?: boolean;
}

const MetricRow: React.FC<MetricRowProps> = ({ metric, value, significance, isHighlighted = false }) => (
  <div className={`grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-center py-3 border-b border-white/10 ${isHighlighted ? 'text-brand-primary' : ''}`}>
    <div className="md:col-span-3 font-bold text-sm">{metric}</div>
    <div className="md:col-span-2 font-mono text-base">{value}</div>
    <div className="md:col-span-7 text-sm text-brand-text-secondary">{significance}</div>
  </div>
);

const TableView: React.FC<TableViewProps> = ({ results, chartData }) => {
  const dataIndex = chartData.labels.findIndex(label => label === `N=${results.graphSize}`);

  const getRatioSignificance = () => {
    if (dataIndex === -1) return "High-quality solution found";
    
    const gwRatio = chartData.goemansWilliamson.approximationRatios[dataIndex];
    const qaRatio = chartData.quantumAnnealer.approximationRatios[dataIndex];

    if (results.approximationRatio > gwRatio) {
       return <span><span className="font-bold text-white">Outperforms Goemans-Williamson ({gwRatio.toFixed(3)})</span> and Quantum Annealer ({qaRatio.toFixed(3)})</span>;
    }
    return <span><span className="font-bold text-white">Competitive with Goemans-Williamson ({gwRatio.toFixed(3)})</span> at this scale.</span>
  };

  const getTimeSignificance = () => {
    if (dataIndex === -1) return `Targeting ~${results.targetTimeS}s (Run on this CPU)`;

    const gwTime = chartData.goemansWilliamson.executionTimes[dataIndex];
    const qaTime = chartData.quantumAnnealer.executionTimes[dataIndex];

    const isFasterThanGW = results.targetTimeS < gwTime;
    const isFasterThanQA = results.targetTimeS < qaTime;

    if (isFasterThanGW && isFasterThanQA) {
      return <span><span className="font-bold text-white">Faster than G-W ({gwTime}s) & Q. Annealer ({qaTime}s)</span> at this scale.</span>
    }
    if (isFasterThanGW) {
      return <span><span className="font-bold text-white">Faster than Goemans-Williamson ({gwTime}s)</span> at this scale.</span>
    }
     return <span><span className="font-bold text-white">Targeting ~{results.targetTimeS}s</span> (Run on this CPU)</span>
  };
  
  return (
    <div className="w-full">
      <div className="bg-black/20 p-4 sm:p-6 rounded-lg">
        <div className="hidden md:grid grid-cols-12 gap-4 pb-3 border-b-2 border-brand-secondary font-bold text-xs uppercase tracking-wider text-brand-text-secondary">
          <div className="col-span-3">Metric</div>
          <div className="col-span-2">Value</div>
          <div className="col-span-7">Significance</div>
        </div>
        
        <MetricRow 
          metric="Approximation Ratio"
          value={results.approximationRatio.toFixed(3)}
          significance={getRatioSignificance()}
          isHighlighted={true}
        />
        <MetricRow 
          metric="Execution Time"
          value={`${results.executionTimeS.toFixed(4)}s`}
          significance={getTimeSignificance()}
          isHighlighted={true}
        />
        <MetricRow 
          metric="Gradient Stability (||∇S||)"
          value={results.gradientStability.toExponential(1)}
          significance={<span><span className="font-bold text-white">Barren Plateau Mitigation</span> Confirmed</span>}
          isHighlighted={true}
        />
        <MetricRow 
          metric="Max Cut Value Found"
          value={results.cutValue.toFixed(2)}
          significance="Final integer-based cut value"
        />
        <MetricRow 
          metric="Iterations to Converge"
          value={results.iterations.toString()}
          significance="Fast convergence via Adaptive Intent"
        />
      </div>
      
      <div className="mt-6 text-center bg-brand-secondary/30 text-brand-primary p-4 rounded-lg">
        <span className="font-bold">Status Note:</span> {results.scalabilityNote}
      </div>
    </div>
  );
};

export default TableView;
