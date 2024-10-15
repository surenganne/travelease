import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, MessageCircle, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface AITravelAssistantProps {
  packageDetails?: {
    id: string;
    name: string;
    price: number;
  };
}

const AITravelAssistant: React.FC<AITravelAssistantProps> = ({ packageDetails }) => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant' | 'system'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isBargaining, setIsBargaining] = useState(false);
  const [currentOffer, setCurrentOffer] = useState(packageDetails?.price || 0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (packageDetails && !isBargaining) {
      setIsBargaining(true);
      setIsOpen(true);
      setMessages([
        { role: 'system', content: t('The user wants to bargain for the "{packageName}" package. The initial price is ${price}.', { packageName: packageDetails.name, price: packageDetails.price }) },
        { role: 'assistant', content: t('Hello! I see you\'re interested in the "{packageName}" package. The current price is ${price}. Would you like to make an offer?', { packageName: packageDetails.name, price: packageDetails.price }) }
      ]);
    }
  }, [packageDetails, t]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input }]);
      setInput('');
      
      // Simulate AI response
      setTimeout(() => {
        let aiResponse = '';
        if (isBargaining) {
          const offer = parseFloat(input);
          if (!isNaN(offer)) {
            if (offer >= currentOffer * 0.9) {
              aiResponse = t('Great! I can accept your offer of ${offer}. Would you like to proceed with the booking?', { offer });
              setCurrentOffer(offer);
            } else {
              const counterOffer = Math.round(currentOffer * 0.95);
              aiResponse = t('I\'m sorry, but I can\'t go that low. How about ${counterOffer}? That\'s the best I can do.', { counterOffer });
              setCurrentOffer(counterOffer);
            }
          } else {
            aiResponse = t('I\'m sorry, I didn\'t understand that as an offer. Can you please provide a number?');
          }
        } else {
          aiResponse = t('Thank you for your message. How can I assist you with your travel plans?');
        }
        setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`fixed bottom-4 right-4 z-40 ${isOpen ? 'w-80' : 'w-auto'}`}>
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-lg flex flex-col h-[400px]">
          <div className="bg-[#02314c] text-white p-4 rounded-t-lg flex justify-between items-center">
            <h2 className="text-lg font-semibold">{t('AI Travel Assistant')}</h2>
            <button onClick={toggleChat} className="text-white hover:text-gray-300">
              <X size={20} />
            </button>
          </div>
          <div className="flex-grow overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div key={index} className={`mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  {message.role === 'user' ? <User size={16} className="inline mr-1" /> : <Bot size={16} className="inline mr-1" />}
                  {message.content}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t">
            <div className="flex mb-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isBargaining ? t('Enter your offer...') : t('Ask me anything...')}
                className="flex-grow mr-2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#02314c]"
              />
              <button
                onClick={handleSend}
                className="bg-[#02314c] text-white px-4 py-2 rounded-md hover:bg-[#02314c]/80 transition duration-300"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={toggleChat}
          className="bg-[#02314c] text-white p-3 rounded-full hover:bg-[#02314c]/80 transition duration-300"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
};

export default AITravelAssistant;