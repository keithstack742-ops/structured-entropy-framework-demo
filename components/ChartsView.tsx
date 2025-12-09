import React, { useEffect, useRef } from 'react';
import type { ChartData } from '../types';
import type { Chart } from 'chart.js';
import 'chart.js/auto'; // import-based Chart.js so we don't rely on a global window.Chart

interface ChartsViewProps {
  chartData: ChartData;
}

const ChartsView: React.FC<ChartsViewProps> = ({ chartData }) => {
    const timeCanvasRef = useRef<HTMLCanvasElement>(null);
    const ratioCanvasRef = useRef<HTMLCanvasElement>(null);
    const timeChartRef = useRef<Chart | null>(null);
    const ratioChartRef = useRef<Chart | null>(null);

    useEffect(() => {
        // Access the global Chart constructor injected by chart.js/auto import
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ChartJS = (globalThis as any).Chart as typeof Chart | undefined;
        if (!ChartJS || !timeCanvasRef.current || !ratioCanvasRef.current) return;
        
        // Destroy previous chart instances on re-render
        if (timeChartRef.current) timeChartRef.current.destroy();
        if (ratioChartRef.current) ratioChartRef.current.destroy();
        
        const commonOptions = {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
              mode: 'index' as const,
              intersect: false,
            },
            plugins: {
                legend: {
                    position: 'top' as const,
                    labels: { color: '#E0E0E0', font: { size: 12 } }
                },
                tooltip: {
                    boxPadding: 4,
                    titleFont: { size: 14 },
                    bodyFont: { size: 12 },
                    callbacks: {} // To be populated by specific charts
                }
            },
            scales: {
                x: {
                    ticks: { color: '#A0A0A0' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' }
                },
                y: {
                    ticks: { color: '#A0A0A0' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' }
                }
            }
        };

        // Execution Time Chart (Bar)
        const timeCtx = timeCanvasRef.current.getContext('2d');
        if (timeCtx) {
            timeChartRef.current = new ChartJS(timeCtx, {
                type: 'bar',
                data: {
                    labels: chartData.labels,
                    datasets: [
                        { label: 'Structured Entropy', data: chartData.structuredEntropy.executionTimes, backgroundColor: '#00F5D4', hoverBackgroundColor: '#00A896' },
                        { label: 'Goemans-Williamson', data: chartData.goemansWilliamson.executionTimes, backgroundColor: '#F7B801', hoverBackgroundColor: '#D5A000' },
                        { label: 'Quantum Annealer', data: chartData.quantumAnnealer.executionTimes, backgroundColor: '#F15BB5', hoverBackgroundColor: '#C84B94' }
                    ]
                },
                options: { ...commonOptions, 
                  plugins: { ...commonOptions.plugins, tooltip: {...commonOptions.plugins.tooltip, callbacks: {
                    label: (context: any) => `${context.dataset.label}: ${context.parsed.y.toFixed(4)}s`
                  }}},
                  scales: { ...commonOptions.scales, y: { ...commonOptions.scales.y, type: 'logarithmic', title: { display: true, text: 'Execution Time (s)', color: '#A0A0A0' } } } 
                }
            });
        }

        // Approximation Ratio Chart (Line)
        const ratioCtx = ratioCanvasRef.current.getContext('2d');
        if (ratioCtx) {
            ratioChartRef.current = new ChartJS(ratioCtx, {
                type: 'line',
                data: {
                    labels: chartData.labels,
                    datasets: [
                        { label: 'Structured Entropy', data: chartData.structuredEntropy.approximationRatios, borderColor: '#00F5D4', tension: 0.1, pointBackgroundColor: '#00F5D4', pointHoverRadius: 7 },
                        { label: 'Goemans-Williamson', data: chartData.goemansWilliamson.approximationRatios, borderColor: '#F7B801', borderDash: [5, 5], pointBackgroundColor: '#F7B801', pointHoverRadius: 7 },
                        { label: 'Quantum Annealer', data: chartData.quantumAnnealer.approximationRatios, borderColor: '#F15BB5', tension: 0.2, pointBackgroundColor: '#F15BB5', pointHoverRadius: 7 }
                    ]
                },
                options: { ...commonOptions, 
                  plugins: { ...commonOptions.plugins, tooltip: {...commonOptions.plugins.tooltip, callbacks: {
                    label: (context: any) => `${context.dataset.label}: ${context.parsed.y.toFixed(3)}`
                  }}},
                  scales: { ...commonOptions.scales, y: { ...commonOptions.scales.y, min: 0.85, max: 0.9, title: { display: true, text: 'Approximation Ratio', color: '#A0A0A0' } } } 
                }
            });
        }

        // Cleanup on component unmount
        return () => {
            if (timeChartRef.current) timeChartRef.current.destroy();
            if (ratioChartRef.current) ratioChartRef.current.destroy();
        };

    }, [chartData]);


    return (
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-black/20 p-4 rounded-lg">
                <h3 className="text-center font-bold text-brand-primary mb-4">Execution Time Comparison</h3>
                <div className="relative h-64">
                    <canvas ref={timeCanvasRef}></canvas>
                </div>
            </div>
            <div className="bg-black/20 p-4 rounded-lg">
                 <h3 className="text-center font-bold text-brand-primary mb-4">Approximation Ratio Comparison</h3>
                <div className="relative h-64">
                    <canvas ref={ratioCanvasRef}></canvas>
                </div>
            </div>
        </div>
    );
};

export default ChartsView;
