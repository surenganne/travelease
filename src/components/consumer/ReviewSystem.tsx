import React, { useState } from 'react';
import { Star, Send } from 'lucide-react';

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewSystemProps {
  packageId: number;
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'date'>) => void;
}

const ReviewSystem: React.FC<ReviewSystemProps> = ({ packageId, reviews, onAddReview }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0 && comment.trim()) {
      onAddReview({
        user: 'Current User', // In a real app, this would be the logged-in user
        rating,
        comment: comment.trim(),
      });
      setRating(0);
      setComment('');
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
      <div className="mb-6">
        <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Your Rating</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={24}
                  className={`cursor-pointer ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="comment" className="block text-gray-700 text-sm font-bold mb-2">Your Review</label>
            <textarea
              id="comment"
              rows={4}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-[#02314c] text-white py-2 px-4 rounded-md hover:bg-[#02314c]/80 transition duration-300 flex items-center justify-center"
          >
            <Send size={20} className="mr-2" />
            Submit Review
          </button>
        </form>
      </div>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">{review.user}</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={`${star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-700 mb-2">{review.comment}</p>
            <p className="text-sm text-gray-500">{review.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSystem;