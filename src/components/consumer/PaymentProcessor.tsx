import React, { useState } from 'react';
import { CreditCard, Calendar, Lock } from 'lucide-react';

interface PaymentProcessorProps {
  amount: number;
  packageName: string;
  onPaymentComplete: (transactionId: string, packageName: string) => void;
}

const PaymentProcessor: React.FC<PaymentProcessorProps> = ({ amount, packageName, onPaymentComplete }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate a mock transaction ID
    const transactionId = 'TRX' + Math.random().toString(36).substr(2, 9).toUpperCase();

    setProcessing(false);
    onPaymentComplete(transactionId, packageName);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="cardNumber" className="block text-gray-700 text-sm font-bold mb-2">
            Card Number
          </label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
              className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#02314c]"
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>
        </div>
        <div className="flex mb-4 space-x-4">
          <div className="w-1/2">
            <label htmlFor="expiryDate" className="block text-gray-700 text-sm font-bold mb-2">
              Expiry Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                id="expiryDate"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value.replace(/\D/g, '').slice(0, 4))}
                className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#02314c]"
                placeholder="MM/YY"
                required
              />
            </div>
          </div>
          <div className="w-1/2">
            <label htmlFor="cvv" className="block text-gray-700 text-sm font-bold mb-2">
              CVV
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                id="cvv"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#02314c]"
                placeholder="123"
                required
              />
            </div>
          </div>
        </div>
        <div className="mb-6">
          <p className="text-xl font-semibold">Total Amount: ${amount.toFixed(2)}</p>
        </div>
        <button
          type="submit"
          className={`w-full bg-[#02314c] text-white py-2 px-4 rounded-md hover:bg-[#02314c]/80 transition duration-300 ${
            processing ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={processing}
        >
          {processing ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
};

export default PaymentProcessor;