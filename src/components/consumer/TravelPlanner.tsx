import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Plus, Trash2, Save } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface TravelPlan {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  activities: string[];
}

const TravelPlanner: React.FC = () => {
  const [plans, setPlans] = useState<TravelPlan[]>([]);
  const [newPlan, setNewPlan] = useState<TravelPlan>({
    id: '',
    destination: '',
    startDate: '',
    endDate: '',
    activities: [],
  });
  const [showForm, setShowForm] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const savedPlans = localStorage.getItem('travelPlans');
    if (savedPlans) {
      setPlans(JSON.parse(savedPlans));
    }
  }, []);

  const savePlans = (updatedPlans: TravelPlan[]) => {
    localStorage.setItem('travelPlans', JSON.stringify(updatedPlans));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPlan({ ...newPlan, [name]: value });
  };

  const handleAddActivity = () => {
    setNewPlan({ ...newPlan, activities: [...newPlan.activities, ''] });
  };

  const handleActivityChange = (index: number, value: string) => {
    const updatedActivities = [...newPlan.activities];
    updatedActivities[index] = value;
    setNewPlan({ ...newPlan, activities: updatedActivities });
  };

  const handleRemoveActivity = (index: number) => {
    const updatedActivities = newPlan.activities.filter((_, i) => i !== index);
    setNewPlan({ ...newPlan, activities: updatedActivities });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPlan.destination && newPlan.startDate && newPlan.endDate) {
      const updatedPlans = [...plans, { ...newPlan, id: Date.now().toString() }];
      setPlans(updatedPlans);
      savePlans(updatedPlans);
      setNewPlan({
        id: '',
        destination: '',
        startDate: '',
        endDate: '',
        activities: [],
      });
      setShowForm(false);
    }
  };

  const handleDeletePlan = (id: string) => {
    const updatedPlans = plans.filter(plan => plan.id !== id);
    setPlans(updatedPlans);
    savePlans(updatedPlans);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4">{t('Travel Planner')}</h2>
      {plans.map(plan => (
        <div key={plan.id} className="mb-4 p-4 border rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-semibold">{plan.destination}</h3>
            <button onClick={() => handleDeletePlan(plan.id)} className="text-red-500">
              <Trash2 size={20} />
            </button>
          </div>
          <p className="text-gray-600 mb-2">
            <Calendar size={16} className="inline mr-2" />
            {plan.startDate} to {plan.endDate}
          </p>
          <h4 className="font-semibold mt-2 mb-1">{t('Activities')}:</h4>
          <ul className="list-disc list-inside">
            {plan.activities.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
        </div>
      ))}
      {showForm ? (
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="destination">
              {t('Destination')}
            </label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={newPlan.destination}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4 flex space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
                {t('Start Date')}
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={newPlan.startDate}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
                {t('End Date')}
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={newPlan.endDate}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {t('Activities')}
            </label>
            {newPlan.activities.map((activity, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  value={activity}
                  onChange={(e) => handleActivityChange(index, e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                  placeholder={t('Enter an activity')}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveActivity(index)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddActivity}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
            >
              <Plus size={20} className="inline mr-2" />
              {t('Add Activity')}
            </button>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              <Save size={20} className="inline mr-2" />
              {t('Save Plan')}
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="bg-[#02314c] hover:bg-[#02314c]/80 text-white font-bold py-2 px-4 rounded"
        >
          <Plus size={20} className="inline mr-2" />
          {t('Create New Plan')}
        </button>
      )}
    </div>
  );
};

export default TravelPlanner;