import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSearch = (destination: string) => {
    navigate(`/packages?destination=${encodeURIComponent(destination)}`);
  };

  const popularDestinations = [
    { name: 'Bali', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=300' },
    { name: 'Paris', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&h=300' },
    { name: 'Tokyo', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=400&h=300' },
    { name: 'New York', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=400&h=300' },
    { name: 'Dubai', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=400&h=300' },
    { name: 'Rome', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=400&h=300' },
    { name: 'London', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=400&h=300' },
    { name: 'Sydney', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=400&h=300' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-[#02314c] mb-8">{t('Discover Your Next Adventure')}</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-12">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder={t('Where do you want to go?')}
            className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#02314c] text-lg"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch((e.target as HTMLInputElement).value);
              }
            }}
          />
        </div>
        <button 
          onClick={() => handleSearch((document.querySelector('input') as HTMLInputElement).value)}
          className="bg-[#02314c] text-white py-3 px-6 rounded-md hover:bg-[#02314c]/80 transition duration-300 flex items-center justify-center mt-4 w-full text-lg font-semibold"
        >
          <Search size={24} className="mr-2" />
          {t('Search Destinations')}
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-6">{t('Popular Destinations')}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {popularDestinations.map((destination) => (
          <div 
            key={destination.name} 
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition duration-300"
            onClick={() => handleSearch(destination.name)}
          >
            <img 
              src={destination.image}
              alt={destination.name} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg text-center">{destination.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;