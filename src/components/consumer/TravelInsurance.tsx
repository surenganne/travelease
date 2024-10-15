import React, { useState } from 'react';
import { Shield, Check } from 'lucide-react';

interface TravelInsuranceProps {
  packagePrice: number;
  onInsuranceSelect: (price: number) => void;
}

const TravelInsurance: React.FC<TravelInsuranceProps> = ({ packagePrice, onInsuranceSelect }) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const insurancePlans = [
    { id: 'basic', name: 'Basic Cover', price: packagePrice * 0.05, coverage: ['Trip cancellation', 'Lost baggage'] },
    { id: 'standard', name: 'Standard Cover', price: packagePrice * 0.07, coverage: ['Trip cancellation', 'Lost baggage', 'Medical expenses'] },
    { id: 'premium', name: 'Premium Cover', price: packagePrice * 0.1, coverage: ['Trip cancellation', 'Lost baggage', 'Medical expenses', 'Adventure activities'] },
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    const selectedInsurance = insurancePlans.find(plan => plan.id === planId);
    if (selectedInsurance) {
      onInsuranceSelect(selectedInsurance.price);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <Shield className="mr-2 text-[#02314c]" />
        Travel Insurance
      </h2>
      <p className="mb-4 text-gray-600">Protect your trip with our travel insurance plans:</p>
      <div className="space-y-4">
        {insurancePlans.map((plan) => (
          <div
            key={plan.id}
            className={`border rounded-lg p-4 cursor-pointer transition-colors duration-200 ${
              selectedPlan === plan.id ? 'border-[#02314c] bg-[#02314c]/10' : 'border-gray-200 hover:border-[#02314c]'
            }`}
            onClick={() => handleSelectPlan(plan.id)}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <span className="text-[#02314c] font-bold">${plan.price.toFixed(2)}</span>
            </div>
            <ul className="text-sm text-gray-600">
              {plan.coverage.map((item, index) => (
                <li key={index} className="flex items-center">
                  <Check size={16} className="mr-2 text-green-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelInsurance;