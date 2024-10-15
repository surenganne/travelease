import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, X, Check, RefreshCw } from 'lucide-react';

interface Package {
  id: string;
  name: string;
  price: number;
}

interface BargainingChatProps {
  packageDetails: Package;
  onClose: () => void;
  onAccept: (price: number) => void;
  onUpdate: (userOffer: number, counterOffer: number | null) => void;
}

const BargainingChat: React.FC<BargainingChatProps> = ({ packageDetails, onClose, onAccept, onUpdate }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [currentOffer, setCurrentOffer] = useState(packageDetails.price);
  const [showOfferInput, setShowOfferInput] = useState(true);
  const [lastUserOffer, setLastUserOffer] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    setMessages([
      { role: 'assistant', content: `Welcome! I see you're interested in the "${packageDetails.name}" package. The current price is $${packageDetails.price}. Would you like to make an offer?` }
    ]);
  }, [packageDetails]);

  const handleSend = () => {
    if (input.trim()) {
      const userOffer = parseFloat(input);
      setMessages([...messages, { role: 'user', content: `My offer: $${userOffer}` }]);
      setInput('');
      setLastUserOffer(userOffer);
      
      setTimeout(() => {
        let aiResponse = '';
        let counterOffer: number | null = null;
        if (!isNaN(userOffer)) {
          if (userOffer >= currentOffer * 0.9) {
            aiResponse = `Great! I can accept your offer of $${userOffer}. Would you like to proceed with the booking?`;
            setCurrentOffer(userOffer);
            setShowOfferInput(false);
            counterOffer = userOffer;
          } else {
            counterOffer = Math.round(currentOffer * 0.95);
            aiResponse = `I'm sorry, but I can't go that low. How about $${counterOffer}? That's the best I can do.`;
            setCurrentOffer(counterOffer);
            setShowOfferInput(false);
          }
        } else {
          aiResponse = "I'm sorry, I didn't understand that as an offer. Can you please provide a number?";
        }
        setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
        onUpdate(userOffer, counterOffer);
      }, 1000);
    }
  };

  const handleAcceptOffer = () => {
    onAccept(currentOffer);
    onClose();
  };

  const handleMakeNewOffer = () => {
    setShowOfferInput(true);
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-20 right-4 w-80 bg-white shadow-lg z-50 flex flex-col rounded-lg overflow-hidden" style={{ maxHeight: 'calc(100vh - 120px)' }}>
      <div className="bg-[#02314c] text-white p-3 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Bargaining Assistant</h2>
        <button onClick={onClose} className="text-white hover:text-gray-300">
          <X size={20} />
        </button>
      </div>
      <div className="flex-grow overflow-y-auto p-3" style={{ maxHeight: '400px' }}>
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
      <div className="p-3 border-t">
        {showOfferInput ? (
          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your offer..."
              className="flex-grow mr-2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#02314c]"
            />
            <button
              onClick={handleSend}
              className="bg-[#02314c] text-white px-4 py-2 rounded-md hover:bg-[#02314c]/80 transition duration-300"
            >
              <Send size={20} />
            </button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleAcceptOffer}
              className="flex-1 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 flex items-center justify-center"
            >
              <Check size={20} className="mr-2" />
              Accept Offer
            </button>
            <button
              onClick={handleMakeNewOffer}
              className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center justify-center"
            >
              <RefreshCw size={20} className="mr-2" />
              New Offer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BargainingChat;