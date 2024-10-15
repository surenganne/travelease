import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Users, Star, DollarSign, MapPin, Clock, Check } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import ReviewSystem from './ReviewSystem';
import TravelTipsRecommendations from './TravelTipsRecommendations';
import WeatherForecast from './WeatherForecast';
import BargainingChat from './BargainingChat';
import PaymentProcessor from './PaymentProcessor';
import TravelInsurance from './TravelInsurance';

interface Package {
  id: string;
  name: string;
  destination: string;
  price: number;
  duration: number;
  groupSize: number;
  rating: number;
  image: string;
  description: string;
  amenities: string[];
}

interface BargainingHistory {
  timestamp: string;
  userOffer: number;
  counterOffer: number | null;
  savings: number;
  savingsPercentage: string;
}

const PackageDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [package_, setPackage] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBargainingChat, setShowBargainingChat] = useState(false);
  const [finalPrice, setFinalPrice] = useState<number | null>(null);
  const [showPaymentProcessor, setShowPaymentProcessor] = useState(false);
  const [insurancePrice, setInsurancePrice] = useState(0);
  const [bargainingHistory, setBargainingHistory] = useState<BargainingHistory[]>([]);

  useEffect(() => {
    const fetchPackageDetails = async () => {
      // In a real application, you would fetch this data from an API
      // For this example, we'll use mock data
      const mockPackage: Package = {
        id: id || '1',
        name: 'Tropical Paradise Getaway',
        destination: 'Bali, Indonesia',
        price: 1299,
        duration: 7,
        groupSize: 12,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&h=600',
        description: 'Experience the ultimate relaxation on pristine beaches and lush landscapes. Immerse yourself in Balinese culture and tranquility.',
        amenities: ['All-inclusive', 'Spa access', 'Guided tours', 'Beachfront resort'],
      };
      setPackage(mockPackage);
      setLoading(false);
    };

    fetchPackageDetails();
  }, [id]);

  const handleStartBargaining = () => {
    if (user) {
      setShowBargainingChat(true);
    } else {
      navigate('/auth', { state: { from: `/package/${id}` } });
    }
  };

  const handleAcceptOffer = (price: number) => {
    setFinalPrice(price);
    setShowBargainingChat(false);
  };

  const handleInsuranceSelect = (price: number) => {
    setInsurancePrice(price);
  };

  const handlePaymentComplete = (transactionId: string) => {
    const booking = {
      id: transactionId,
      packageName: package_?.name,
      destination: package_?.destination,
      startDate: new Date().toISOString().split('T')[0], // Today's date as a placeholder
      endDate: new Date(Date.now() + (package_?.duration || 0) * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Duration days from now
      price: finalPrice || package_?.price,
      status: 'upcoming' as const,
    };
    navigate('/booking-confirmation', { state: { booking } });
  };

  const handleBargainingUpdate = (userOffer: number, counterOffer: number | null) => {
    const initialPrice = package_?.price || 0;
    const savings = initialPrice - (counterOffer || userOffer);
    const savingsPercentage = ((savings / initialPrice) * 100).toFixed(2);
    
    const newHistoryItem: BargainingHistory = {
      timestamp: new Date().toLocaleString(),
      userOffer,
      counterOffer,
      savings,
      savingsPercentage: `${savingsPercentage}%`,
    };

    setBargainingHistory([...bargainingHistory, newHistoryItem]);
  };

  const totalPrice = (finalPrice || (package_?.price || 0)) + insurancePrice;

  if (loading) {
    return <div className="text-center py-8">Loading package details...</div>;
  }

  if (!package_) {
    return <div className="text-center py-8">Package not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{package_.name}</h1>
      <img src={package_.image} alt={package_.name} className="w-full h-64 object-cover rounded-lg mb-4" />
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center">
          <MapPin className="mr-2" size={20} />
          <span>{package_.destination}</span>
        </div>
        <div className="flex items-center">
          <Calendar className="mr-2" size={20} />
          <span>{package_.duration} days</span>
        </div>
        <div className="flex items-center">
          <Users className="mr-2" size={20} />
          <span>Group size: {package_.groupSize}</span>
        </div>
        <div className="flex items-center">
          <Star className="mr-2" size={20} />
          <span>Rating: {package_.rating}/5</span>
        </div>
      </div>
      <p className="text-gray-700 mb-4">{package_.description}</p>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Amenities</h2>
        <ul className="grid grid-cols-2 gap-2">
          {package_.amenities.map((amenity, index) => (
            <li key={index} className="flex items-center">
              <Check className="mr-2" size={20} />
              {amenity}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Price</h2>
        <p className="text-3xl font-bold text-[#02314c]">
          <DollarSign className="inline-block" size={24} />
          {finalPrice || package_.price}
        </p>
        {!finalPrice && (
          <button
            onClick={handleStartBargaining}
            className="mt-2 bg-[#02314c] text-white py-2 px-4 rounded-md hover:bg-[#02314c]/80 transition duration-300"
          >
            {user ? "Start Bargaining" : "Sign In to Bargain"}
          </button>
        )}
      </div>

      {bargainingHistory.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Bargaining History</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">Timestamp</th>
                  <th scope="col" className="px-6 py-3">Your Offer</th>
                  <th scope="col" className="px-6 py-3">Counter Offer</th>
                  <th scope="col" className="px-6 py-3">Savings</th>
                </tr>
              </thead>
              <tbody>
                {bargainingHistory.map((history, index) => (
                  <tr key={index} className="bg-white border-b">
                    <td className="px-6 py-4">{history.timestamp}</td>
                    <td className="px-6 py-4">${history.userOffer}</td>
                    <td className="px-6 py-4">{history.counterOffer ? `$${history.counterOffer}` : 'N/A'}</td>
                    <td className="px-6 py-4">${history.savings} ({history.savingsPercentage})</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {finalPrice && (
        <>
          <TravelInsurance packagePrice={finalPrice} onInsuranceSelect={handleInsuranceSelect} />
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Price Summary</h2>
            <div className="flex justify-between items-center mb-2">
              <span>Package Price:</span>
              <span>${finalPrice}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span>Travel Insurance:</span>
              <span>${insurancePrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center font-bold text-lg border-t pt-2">
              <span>Total Price:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button
              onClick={() => setShowPaymentProcessor(true)}
              className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}

      <WeatherForecast destination={package_.destination} />
      <TravelTipsRecommendations destination={package_.destination} />
      <ReviewSystem packageId={package_.id} reviews={[]} onAddReview={() => {}} />
      
      {showBargainingChat && (
        <BargainingChat
          packageDetails={package_}
          onClose={() => setShowBargainingChat(false)}
          onAccept={handleAcceptOffer}
          onUpdate={handleBargainingUpdate}
        />
      )}

      {showPaymentProcessor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <PaymentProcessor
              amount={totalPrice}
              packageName={package_.name}
              onPaymentComplete={handlePaymentComplete}
            />
            <button
              onClick={() => setShowPaymentProcessor(false)}
              className="mt-4 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageDetails;