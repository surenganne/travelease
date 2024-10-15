import React from 'react';
import { Users, Package, DollarSign, BarChart2, Activity } from 'lucide-react';

const AdminOverview: React.FC = () => {
  const recentActivities = [
    { id: 1, action: 'New booking', details: 'John Doe booked Bali Getaway', time: '2 hours ago' },
    { id: 2, action: 'Package updated', details: 'Paris Adventure price changed', time: '4 hours ago' },
    { id: 3, action: 'New vendor', details: 'ABC Tours added as a new vendor', time: '1 day ago' },
    { id: 4, action: 'Booking cancelled', details: 'Tokyo Explorer booking cancelled', time: '2 days ago' },
    { id: 5, action: 'New user registered', details: 'Jane Smith created an account', time: '3 days ago' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <Users className="text-blue-500 mr-4" size={40} />
          <div>
            <p className="text-gray-500">Total Users</p>
            <p className="text-2xl font-semibold">5,000</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <Package className="text-green-500 mr-4" size={40} />
          <div>
            <p className="text-gray-500">Total Packages</p>
            <p className="text-2xl font-semibold">50</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <DollarSign className="text-yellow-500 mr-4" size={40} />
          <div>
            <p className="text-gray-500">Total Revenue</p>
            <p className="text-2xl font-semibold">$500,000</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <BarChart2 className="text-purple-500 mr-4" size={40} />
          <div>
            <p className="text-gray-500">Conversion Rate</p>
            <p className="text-2xl font-semibold">3.2%</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Activity className="mr-2" />
          Recent Activity
        </h2>
        <ul className="space-y-4">
          {recentActivities.map((activity) => (
            <li key={activity.id} className="flex items-start">
              <div className="bg-blue-100 rounded-full p-2 mr-4">
                <Activity className="text-blue-500" size={16} />
              </div>
              <div>
                <p className="font-semibold">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.details}</p>
                <p className="text-xs text-gray-400">{activity.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminOverview;