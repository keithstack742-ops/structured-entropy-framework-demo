export interface DemoResults {
  graphSize: number;
  cutValue: number;
  approximationRatio: number;
  iterations: number;
  targetTimeS: number;
  gradientStability: number;
  scalabilityNote: string;
  executionTimeS: number;
}


export interface ChartData {
  labels: string[];
  structuredEntropy: {
    approximationRatios: number[];
    executionTimes: number[];
  };
  goemansWilliamson: {
    approximationRatios: number[];
    executionTimes: number[];
  };
  quantumAnnealer: {
    approximationRatios: number[];
    executionTimes: number[];
  };
}
