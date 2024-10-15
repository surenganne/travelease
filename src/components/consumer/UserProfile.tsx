import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save } from 'lucide-react';
import TravelPlanner from './TravelPlanner';
import BookingManagement from './BookingManagement';
import LoyaltyProgram from './LoyaltyProgram';
import CurrencyConverter from './CurrencyConverter';
import TravelChecklist from './TravelChecklist';
import TravelJournal from './TravelJournal';
import TravelTipsRecommendations from './TravelTipsRecommendations';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

interface UserDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  birthdate: string;
}

const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: user?.username || '',
    email: user?.email || '',
    phone: '',
    address: '',
    birthdate: '',
  });

  const loyaltyData = {
    points: 1500,
    tier: 'Silver',
    nextTier: 'Gold',
    pointsToNextTier: 500,
  };

  useEffect(() => {
    // Load user details from localStorage or API
    const savedDetails = localStorage.getItem('userDetails');
    if (savedDetails) {
      setUserDetails(JSON.parse(savedDetails));
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save user details to localStorage or API
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t('Personal Details')}</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <User className="mr-2 text-gray-400" />
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={userDetails.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            ) : (
              <span>{userDetails.name}</span>
            )}
          </div>
          <div className="flex items-center">
            <Mail className="mr-2 text-gray-400" />
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            ) : (
              <span>{userDetails.email}</span>
            )}
          </div>
          <div className="flex items-center">
            <Phone className="mr-2 text-gray-400" />
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={userDetails.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            ) : (
              <span>{userDetails.phone || 'Not provided'}</span>
            )}
          </div>
          <div className="flex items-center">
            <MapPin className="mr-2 text-gray-400" />
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={userDetails.address}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            ) : (
              <span>{userDetails.address || 'Not provided'}</span>
            )}
          </div>
          <div className="flex items-center">
            <Calendar className="mr-2 text-gray-400" />
            {isEditing ? (
              <input
                type="date"
                name="birthdate"
                value={userDetails.birthdate}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            ) : (
              <span>{userDetails.birthdate || 'Not provided'}</span>
            )}
          </div>
        </div>
        <div className="mt-4">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-[#02314c] text-white px-4 py-2 rounded-md hover:bg-[#02314c]/80 transition duration-300 flex items-center"
            >
              <Save className="mr-2" />
              Save Changes
            </button>
          ) : (
            <button
              onClick={handleEdit}
              className="bg-[#02314c] text-white px-4 py-2 rounded-md hover:bg-[#02314c]/80 transition duration-300 flex items-center"
            >
              <Edit2 className="mr-2" />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <TravelPlanner />
      <BookingManagement />
      <LoyaltyProgram {...loyaltyData} />
      <CurrencyConverter />
      <TravelChecklist />
      <TravelJournal />
      <TravelTipsRecommendations />
    </div>
  );
};

export default UserProfile;