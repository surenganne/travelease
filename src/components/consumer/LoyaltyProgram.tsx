import React from 'react';
import { Award, Gift, TrendingUp } from 'lucide-react';

interface LoyaltyProgramProps {
  points: number;
  tier: string;
  nextTier: string;
  pointsToNextTier: number;
}

const LoyaltyProgram: React.FC<LoyaltyProgramProps> = ({ points, tier, nextTier, pointsToNextTier }) => {
  const rewards = [
    { name: 'Free Airport Lounge Access', pointsCost: 5000 },
    { name: '10% Off Next Booking', pointsCost: 2000 },
    { name: 'Priority Check-in', pointsCost: 1000 },
    { name: 'Extra Baggage Allowance', pointsCost: 3000 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <Award className="mr-2 text-[#02314c]" />
        Loyalty Program
      </h2>
      <div className="mb-6">
        <p className="text-lg font-semibold">Your Current Status</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-3xl font-bold text-[#02314c]">{tier}</span>
          <span className="text-xl font-semibold">{points} points</span>
        </div>
        <div className="mt-2">
          <p className="text-sm text-gray-600">
            Earn {pointsToNextTier} more points to reach {nextTier}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
            <div
              className="bg-[#02314c] h-2.5 rounded-full"
              style={{ width: `${(points / (points + pointsToNextTier)) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <Gift className="mr-2 text-[#02314c]" />
          Available Rewards
        </h3>
        <ul className="space-y-2">
          {rewards.map((reward, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{reward.name}</span>
              <button
                className={`px-3 py-1 rounded-full text-sm ${
                  points >= reward.pointsCost
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
                disabled={points < reward.pointsCost}
              >
                {reward.pointsCost} points
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <TrendingUp className="mr-2 text-[#02314c]" />
          How to Earn More Points
        </h3>
        <ul className="list-disc list-inside text-sm text-gray-600">
          <li>Book a trip: Earn 1 point per $1 spent</li>
          <li>Write a review: Earn 100 points per review</li>
          <li>Refer a friend: Earn 500 points when they book their first trip</li>
          <li>Complete your profile: Earn 200 points</li>
        </ul>
      </div>
    </div>
  );
};

export default LoyaltyProgram;