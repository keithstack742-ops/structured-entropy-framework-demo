import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center text-brand-text-secondary space-y-4">
      <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="text-lg font-semibold">Running Simulation...</p>
    </div>
  );
};

export default Loader;
