import React from 'react';
import { Package, DollarSign, Star, BarChart2 } from 'lucide-react';

const VendorDashboard: React.FC = () => {
  const packages = [
    { id: 1, name: 'Sunset Beach Resort', destination: 'Bali', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=80&h=80&fit=crop' },
    { id: 2, name: 'Alpine Ski Lodge', destination: 'Aspen', image: 'https://images.unsplash.com/photo-1548777123-e216912df7d8?w=80&h=80&fit=crop' },
    { id: 3, name: 'Cultural Expedition', destination: 'Kyoto', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=80&h=80&fit=crop' },
    { id: 4, name: 'Tropical Island Getaway', destination: 'Fiji', image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=80&h=80&fit=crop' },
    { id: 5, name: 'Historical Landmarks Tour', destination: 'Egypt', image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=80&h=80&fit=crop' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* ... (previous code remains unchanged) ... */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ... (Recent Bookings table remains unchanged) ... */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Package Performance</h2>
          <ul className="space-y-4">
            {packages.map((package_) => (
              <li key={package_.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={package_.image}
                    alt={package_.name}
                    className="w-16 h-16 object-cover rounded-md mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">{package_.name}</h3>
                    <p className="text-sm text-gray-600">{package_.destination}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${Math.floor(Math.random() * 1000) + 500}</p>
                  <p className="text-sm text-gray-600">{Math.floor(Math.random() * 20) + 5} bookings</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;