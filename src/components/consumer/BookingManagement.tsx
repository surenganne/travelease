import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, DollarSign, Clock, X, MessageSquare } from 'lucide-react';
import FeedbackAndRating from './FeedbackAndRating';
import { useAuth } from '../../contexts/AuthContext';

interface Booking {
  id: string;
  packageName: string;
  destination: string;
  startDate: string;
  endDate: string;
  price: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  rating?: number;
  feedback?: string;
}

const BookingManagement: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showFeedback, setShowFeedback] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    // Load bookings from localStorage
    const loadBookings = () => {
      const savedBookings = localStorage.getItem('userBookings');
      if (savedBookings) {
        setBookings(JSON.parse(savedBookings));
      }
    };

    loadBookings();

    // Add event listener for storage changes
    window.addEventListener('storage', loadBookings);

    return () => {
      window.removeEventListener('storage', loadBookings);
    };
  }, []);

  useEffect(() => {
    // Save bookings to localStorage whenever they change
    localStorage.setItem('userBookings', JSON.stringify(bookings));
  }, [bookings]);

  const handleCancelBooking = (bookingId: string) => {
    const updatedBookings = bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: 'cancelled' as const } : booking
    );
    setBookings(updatedBookings);
  };

  const handleFeedbackSubmit = (bookingId: string, rating: number, feedback: string) => {
    const updatedBookings = bookings.map(booking =>
      booking.id === bookingId ? { ...booking, rating, feedback } : booking
    );
    setBookings(updatedBookings);
    setShowFeedback(null);
  };

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'upcoming': return 'text-blue-600';
      case 'ongoing': return 'text-green-600';
      case 'completed': return 'text-gray-600';
      case 'cancelled': return 'text-red-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{booking.packageName}</h3>
                  <p className="text-gray-600 flex items-center mt-1">
                    <MapPin size={16} className="mr-1" />
                    {booking.destination}
                  </p>
                </div>
                <span className={`font-semibold ${getStatusColor(booking.status)}`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2 text-gray-500" />
                  <span>{booking.startDate} to {booking.endDate}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign size={16} className="mr-2 text-gray-500" />
                  <span>${booking.price}</span>
                </div>
              </div>
              {booking.status === 'upcoming' && (
                <button
                  onClick={() => handleCancelBooking(booking.id)}
                  className="mt-4 flex items-center text-red-600 hover:text-red-800"
                >
                  <X size={16} className="mr-1" />
                  Cancel Booking
                </button>
              )}
              {booking.status === 'completed' && !booking.rating && (
                <button
                  onClick={() => setShowFeedback(booking.id)}
                  className="mt-4 flex items-center text-blue-600 hover:text-blue-800"
                >
                  <MessageSquare size={16} className="mr-1" />
                  Leave Feedback
                </button>
              )}
              {booking.rating && (
                <div className="mt-4">
                  <p className="font-semibold">Your Rating: {booking.rating}/5</p>
                  {booking.feedback && <p className="text-gray-600 mt-1">{booking.feedback}</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {showFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <FeedbackAndRating
              bookingId={showFeedback}
              packageName={bookings.find(b => b.id === showFeedback)?.packageName || ''}
              onSubmit={handleFeedbackSubmit}
            />
            <button
              onClick={() => setShowFeedback(null)}
              className="mt-4 text-gray-600 hover:text-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingManagement;