import React, { useState, useEffect } from 'react';
import { DollarSign, RefreshCw } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface ExchangeRates {
  [key: string]: number;
}

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const { t } = useLanguage();

  const popularCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR', 'AED'];

  useEffect(() => {
    // In a real application, you would fetch live exchange rates from an API
    // For this example, we'll use static rates
    const mockExchangeRates: ExchangeRates = {
      USD: 1,
      EUR: 0.84,
      GBP: 0.72,
      JPY: 109.64,
      AUD: 1.31,
      CAD: 1.25,
      CHF: 0.92,
      CNY: 6.47,
      INR: 74.26,
      AED: 3.67,
    };
    setExchangeRates(mockExchangeRates);
  }, []);

  useEffect(() => {
    if (amount && fromCurrency && toCurrency) {
      const fromRate = exchangeRates[fromCurrency];
      const toRate = exchangeRates[toCurrency];
      const converted = (parseFloat(amount) / fromRate) * toRate;
      setConvertedAmount(Number(converted.toFixed(2)));
    } else {
      setConvertedAmount(null);
    }
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4">{t('Currency Converter')}</h2>
      <div className="flex flex-col md:flex-row md:items-center mb-4">
        <div className="flex-1 mb-4 md:mb-0 md:mr-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            {t('Amount')}
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="number"
              name="amount"
              id="amount"
              className="focus:ring-[#02314c] focus:border-[#02314c] block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-1 mb-4 md:mb-0 md:mr-4">
          <label htmlFor="fromCurrency" className="block text-sm font-medium text-gray-700 mb-1">
            {t('From')}
          </label>
          <select
            id="fromCurrency"
            name="fromCurrency"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#02314c] focus:border-[#02314c] sm:text-sm rounded-md"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {popularCurrencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleSwapCurrencies}
          className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors duration-200 mb-4 md:mb-0"
        >
          <RefreshCw className="h-5 w-5 text-gray-600" />
        </button>
        <div className="flex-1 md:ml-4">
          <label htmlFor="toCurrency" className="block text-sm font-medium text-gray-700 mb-1">
            {t('To')}
          </label>
          <select
            id="toCurrency"
            name="toCurrency"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#02314c] focus:border-[#02314c] sm:text-sm rounded-md"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {popularCurrencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </div>
      {convertedAmount !== null && (
        <div className="mt-4 text-center">
          <p className="text-lg font-semibold">
            {amount} {fromCurrency} =
          </p>
          <p className="text-2xl font-bold text-[#02314c]">
            {convertedAmount} {toCurrency}
          </p>
        </div>
      )}
      <div className="mt-4 text-sm text-gray-500">
        <p>{t('Exchange rates are for informational purposes only.')}</p>
        <p>{t('Actual rates may vary at the time of transaction.')}</p>
      </div>
    </div>
  );
};

export default CurrencyConverter;