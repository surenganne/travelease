import React from 'react';
import CurrencyConverter from './CurrencyConverter';
import SearchPage from './SearchPage';

const ConsumerDashboard: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <SearchPage />
      <div className="mt-8">
        <CurrencyConverter />
      </div>
    </div>
  );
};

export default ConsumerDashboard;