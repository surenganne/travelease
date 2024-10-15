import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DollarSign, MapPin, Calendar, Users, Star } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface Package {
  id: number;
  name: string;
  destination: string;
  image: string;
  price: number;
  description: string;
  duration: number;
  groupSize: number;
  rating: number;
}

const PackageListingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = () => {
      // Mock data for packages
      const mockPackages: Package[] = [
        {
          id: 1,
          name: "Tropical Paradise Getaway",
          destination: "Bali, Indonesia",
          image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250",
          price: 1299,
          description: "Experience the ultimate relaxation on pristine beaches and lush landscapes.",
          duration: 7,
          groupSize: 12,
          rating: 4.8
        },
        {
          id: 2,
          name: "European Cultural Tour",
          destination: "Paris, France",
          image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&h=250",
          price: 1899,
          description: "Immerse yourself in the rich history and culture of iconic European cities.",
          duration: 10,
          groupSize: 15,
          rating: 4.6
        },
        {
          id: 3,
          name: "Mountain Adventure Expedition",
          destination: "Banff, Canada",
          image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=400&h=250",
          price: 1599,
          description: "Embark on an exhilarating journey through breathtaking mountain landscapes.",
          duration: 8,
          groupSize: 10,
          rating: 4.9
        }
      ];

      setPackages(mockPackages);
      setLoading(false);
    };

    fetchPackages();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading packages...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Available Packages</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={pkg.image} alt={pkg.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{pkg.name}</h2>
              <p className="text-gray-600 mb-2 flex items-center">
                <MapPin size={16} className="mr-1" />
                {pkg.destination}
              </p>
              <p className="text-sm text-gray-500 mb-2">{pkg.description}</p>
              <div className="flex justify-between items-center mb-2">
                <span className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  {pkg.duration} days
                </span>
                <span className="flex items-center">
                  <Users size={16} className="mr-1" />
                  Max {pkg.groupSize}
                </span>
              </div>
              <div className="flex items-center mb-4">
                <Star size={16} className="text-yellow-400 mr-1" />
                <span>{pkg.rating.toFixed(1)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#02314c] font-bold text-xl flex items-center">
                  <DollarSign size={20} />
                  {pkg.price}
                </span>
                <button
                  onClick={() => navigate(`/package/${pkg.id}`)}
                  className="bg-[#02314c] text-white py-2 px-4 rounded-md hover:bg-[#02314c]/80 transition duration-300"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageListingPage;