import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-primary tracking-tight">
        Structured Entropy Framework
      </h1>
      <p className="mt-3 text-lg sm:text-xl text-brand-text-secondary max-w-2xl mx-auto">
        A demonstration of a high-performance MaxCut solver, showcasing superior approximation ratios and fast convergence.
      </p>
    </header>
  );
};

export default Header;
