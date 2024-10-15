import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Check, Calendar, MapPin, DollarSign } from 'lucide-react';

interface Booking {
  id: string;
  packageName: string;
  destination: string;
  startDate: string;
  endDate: string;
  price: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

const BookingConfirmation: React.FC = () => {
  const location = useLocation();
  const booking = location.state?.booking as Booking;

  useEffect(() => {
    if (booking) {
      // Add the new booking to localStorage
      const savedBookings = localStorage.getItem('userBookings');
      const bookings = savedBookings ? JSON.parse(savedBookings) : [];
      const updatedBookings = [...bookings, booking];
      localStorage.setItem('userBookings', JSON.stringify(updatedBookings));

      // Trigger a storage event for other components to update
      window.dispatchEvent(new Event('storage'));
    }
  }, [booking]);

  if (!booking) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Booking Confirmation</h1>
        <p>No booking information available.</p>
        <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        <Check className="text-green-500 mr-2" size={32} />
        <h1 className="text-2xl font-bold">Booking Confirmed</h1>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{booking.packageName}</h2>
        <p className="text-gray-600 flex items-center">
          <MapPin size={16} className="mr-2" />
          {booking.destination}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="font-semibold">Booking ID</p>
          <p>{booking.id}</p>
        </div>
        <div>
          <p className="font-semibold">Status</p>
          <p className="text-green-600">{booking.status}</p>
        </div>
        <div>
          <p className="font-semibold">Dates</p>
          <p className="flex items-center">
            <Calendar size={16} className="mr-2" />
            {booking.startDate} to {booking.endDate}
          </p>
        </div>
        <div>
          <p className="font-semibold">Total Price</p>
          <p className="flex items-center">
            <DollarSign size={16} className="mr-2" />
            {booking.price}
          </p>
        </div>
      </div>
      <p className="text-gray-600 mb-6">
        Thank you for booking with us. We hope you enjoy your trip!
      </p>
      <div className="flex justify-between">
        <Link
          to="/profile"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          View My Bookings
        </Link>
        <Link
          to="/"
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition duration-300"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default BookingConfirmation;