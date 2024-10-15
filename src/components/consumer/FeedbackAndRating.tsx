import React, { useState } from 'react';
import { Star, Send } from 'lucide-react';

interface FeedbackAndRatingProps {
  bookingId: string;
  packageName: string;
  onSubmit: (bookingId: string, rating: number, feedback: string) => void;
}

const FeedbackAndRating: React.FC<FeedbackAndRatingProps> = ({ bookingId, packageName, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0) {
      onSubmit(bookingId, rating, feedback);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Rate Your Experience</h3>
      <p className="mb-4">How was your trip to {packageName}?</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={32}
                className={`cursor-pointer ${
                  star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">
            Your Feedback (Optional)
          </label>
          <textarea
            id="feedback"
            rows={4}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#02314c]"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your experience..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-[#02314c] text-white py-2 px-4 rounded-md hover:bg-[#02314c]/80 transition duration-300 flex items-center justify-center"
          disabled={rating === 0}
        >
          <Send size={20} className="mr-2" />
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackAndRating;