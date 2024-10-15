import React, { useState } from 'react';
import { DollarSign, Send, Check, RefreshCw, Users } from 'lucide-react';

interface BargainingInterfaceProps {
  initialPrice: number;
  onAccept: (price: number, travelers: number) => void;
}

interface BargainingHistory {
  offer: number;
  counterOffer: number | null;
}

const BargainingInterface: React.FC<BargainingInterfaceProps> = ({ initialPrice, onAccept }) => {
  const [currentPrice, setCurrentPrice] = useState(initialPrice);
  const [userOffer, setUserOffer] = useState('');
  const [message, setMessage] = useState('');
  const [showOfferInput, setShowOfferInput] = useState(true);
  const [counterOffer, setCounterOffer] = useState<number | null>(null);
  const [bargainingHistory, setBargainingHistory] = useState<BargainingHistory[]>([]);
  const [travelers, setTravelers] = useState(1);

  const handleSubmitOffer = () => {
    const offerAmount = parseFloat(userOffer);
    if (isNaN(offerAmount) || offerAmount <= 0) {
      setMessage('Please enter a valid offer amount.');
      return;
    }

    if (offerAmount >= currentPrice) {
      setMessage('Your offer has been accepted!');
      onAccept(offerAmount, travelers);
    } else {
      let newCounterOffer: number;
      
      if (bargainingHistory.length === 0) {
        // First offer: counter with 90% of the initial price
        newCounterOffer = Math.round(initialPrice * 0.9);
      } else {
        // Subsequent offers: decrease by 2% of the initial price, but not below the user's offer
        const decrease = Math.round(initialPrice * 0.02);
        newCounterOffer = Math.max(currentPrice - decrease, offerAmount);
      }

      setCounterOffer(newCounterOffer);
      setCurrentPrice(newCounterOffer);
      setMessage(`We can offer you a price of $${newCounterOffer}.`);
      setShowOfferInput(false);
      setBargainingHistory([...bargainingHistory, { offer: offerAmount, counterOffer: newCounterOffer }]);
    }
    setUserOffer('');
  };

  const handleAcceptOffer = () => {
    if (counterOffer) {
      onAccept(counterOffer, travelers);
    }
  };

  const handleMakeAnotherOffer = () => {
    setShowOfferInput(true);
    setMessage('');
  };

  const calculateSavings = (price: number) => {
    const savingsAmount = initialPrice - price;
    const savingsPercentage = (savingsAmount / initialPrice) * 100;
    return {
      amount: savingsAmount,
      percentage: savingsPercentage.toFixed(2)
    };
  };

  const getUpsellPrice = (price: number, numTravelers: number) => {
    const discount = numTravelers === 2 ? 0.05 : numTravelers >= 3 ? 0.1 : 0;
    return price * (1 - discount);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-4">Negotiate Price</h2>
      <div className="flex items-center mb-4">
        <DollarSign className="text-[#02314c] mr-2" size={24} />
        <span className="text-2xl font-bold text-[#02314c]">${currentPrice}</span>
      </div>
      {bargainingHistory.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Bargaining History</h3>
          <ul className="space-y-2">
            {bargainingHistory.map((history, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>Your offer: ${history.offer}</span>
                <span>Counter offer: ${history.counterOffer}</span>
                <span className="text-green-600">
                  Savings: ${calculateSavings(history.counterOffer || 0).amount} 
                  ({calculateSavings(history.counterOffer || 0).percentage}%)
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {message && (
        <p className="mt-4 mb-4 text-gray-700 font-semibold">{message}</p>
      )}
      {showOfferInput ? (
        <>
          <div className="mb-4">
            <input
              type="text"
              value={userOffer}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*\.?\d*$/.test(value)) {
                  setUserOffer(value);
                }
              }}
              placeholder="Enter your offer"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#02314c]"
            />
          </div>
          <button
            onClick={handleSubmitOffer}
            className="bg-[#02314c] text-white py-2 px-4 rounded-md hover:bg-[#02314c]/80 transition duration-300 flex items-center justify-center w-full"
          >
            <Send size={20} className="mr-2" />
            Submit Offer
          </button>
        </>
      ) : (
        <>
          <div className="flex space-x-4 mb-4">
            <button
              onClick={handleAcceptOffer}
              className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300 flex items-center justify-center flex-1"
            >
              <Check size={20} className="mr-2" />
              Accept Offer
            </button>
            <button
              onClick={handleMakeAnotherOffer}
              className="bg-[#02314c] text-white py-2 px-4 rounded-md hover:bg-[#02314c]/80 transition duration-300 flex items-center justify-center flex-1"
            >
              <RefreshCw size={20} className="mr-2" />
              Make Another Offer
            </button>
          </div>
          <div className="mt-4 p-4 bg-gray-100 rounded-md">
            <h3 className="text-lg font-semibold mb-2">Special Group Offer</h3>
            <div className="flex items-center mb-2">
              <Users size={20} className="mr-2 text-[#02314c]" />
              <span>Number of travelers:</span>
              <select
                value={travelers}
                onChange={(e) => setTravelers(Number(e.target.value))}
                className="ml-2 p-1 border rounded"
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
            {travelers > 1 && (
              <p className="text-green-600">
                Group price: ${getUpsellPrice(counterOffer || currentPrice, travelers).toFixed(2)} per person
                ({travelers === 2 ? '5%' : '10%'} discount applied)
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BargainingInterface;