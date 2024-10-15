import React, { useState, useEffect } from 'react';
import { Lightbulb, Globe, Umbrella, Utensils, Camera } from 'lucide-react';

interface Tip {
  id: number;
  category: string;
  content: string;
  icon: React.ReactNode;
}

const TravelTipsRecommendations: React.FC<{ destination?: string }> = ({ destination }) => {
  const [tips, setTips] = useState<Tip[]>([]);

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    const fetchTips = () => {
      const allTips: Tip[] = [
        { id: 1, category: 'General', content: 'Always carry a copy of your passport and important documents.', icon: <Globe size={20} /> },
        { id: 2, category: 'Weather', content: 'Check the local weather forecast before packing.', icon: <Umbrella size={20} /> },
        { id: 3, category: 'Food', content: 'Try local cuisine to fully experience the culture.', icon: <Utensils size={20} /> },
        { id: 4, category: 'Photography', content: 'Respect local customs when taking photos of people or places.', icon: <Camera size={20} /> },
        { id: 5, category: 'General', content: 'Learn a few basic phrases in the local language.', icon: <Globe size={20} /> },
      ];

      if (destination) {
        // Add destination-specific tips
        switch (destination.toLowerCase()) {
          case 'paris':
            allTips.push({ id: 6, category: 'Local Tip', content: 'Visit the Eiffel Tower early in the morning to avoid crowds.', icon: <Lightbulb size={20} /> });
            break;
          case 'tokyo':
            allTips.push({ id: 7, category: 'Local Tip', content: 'Get a JR Pass for unlimited travel on Japan Railways.', icon: <Lightbulb size={20} /> });
            break;
          // Add more destination-specific tips as needed
        }
      }

      setTips(allTips);
    };

    fetchTips();
  }, [destination]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Travel Tips & Recommendations</h2>
      {destination && (
        <p className="text-lg mb-4">Tips for your trip to <span className="font-semibold">{destination}</span>:</p>
      )}
      <ul className="space-y-4">
        {tips.map((tip) => (
          <li key={tip.id} className="flex items-start">
            <div className="bg-[#02314c] p-2 rounded-full text-white mr-3">
              {tip.icon}
            </div>
            <div>
              <h3 className="font-semibold">{tip.category}</h3>
              <p>{tip.content}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TravelTipsRecommendations;