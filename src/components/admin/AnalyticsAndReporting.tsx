import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Calendar, DollarSign, MapPin, Users, Download, FileText } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

const AnalyticsAndReporting: React.FC = () => {
  const [revenueData, setRevenueData] = useState<any>(null);
  const [popularDestinations, setPopularDestinations] = useState<any>(null);
  const [customerDemographics, setCustomerDemographics] = useState<any>(null);

  useEffect(() => {
    // Fetch data from API in a real application
    fetchMockData();
  }, []);

  const fetchMockData = () => {
    // Revenue Trends
    setRevenueData({
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Revenue',
          data: [12000, 19000, 15000, 25000, 22000, 30000],
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }
      ]
    });

    // Popular Destinations
    setPopularDestinations({
      labels: ['Bali', 'Paris', 'Tokyo', 'New York', 'Rome'],
      datasets: [
        {
          data: [300, 250, 200, 180, 150],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
          ],
        }
      ]
    });

    // Customer Demographics
    setCustomerDemographics({
      labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
      datasets: [
        {
          label: 'Age Groups',
          data: [15, 30, 25, 18, 12],
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
        }
      ]
    });
  };

  const exportToCSV = () => {
    // Implement CSV export functionality
    console.log('Exporting to CSV');
  };

  const exportToPDF = () => {
    // Implement PDF export functionality
    console.log('Exporting to PDF');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Analytics and Reporting</h1>
        <div className="flex space-x-2">
          <button 
            onClick={exportToCSV} 
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 flex items-center"
          >
            <Download className="inline-block mr-2" size={16} />
            Export CSV
          </button>
          <button 
            onClick={exportToPDF} 
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 flex items-center"
          >
            <FileText className="inline-block mr-2" size={16} />
            Export PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <DollarSign className="mr-2" />
            Revenue Trends
          </h2>
          {revenueData && <Line data={revenueData} />}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <MapPin className="mr-2" />
            Popular Destinations
          </h2>
          {popularDestinations && <Pie data={popularDestinations} />}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Users className="mr-2" />
            Customer Demographics
          </h2>
          {customerDemographics && <Bar data={customerDemographics} />}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Calendar className="mr-2" />
            Booking Trends
          </h2>
          <p className="text-gray-600">
            Implement a chart or table showing booking trends over time here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsAndReporting;