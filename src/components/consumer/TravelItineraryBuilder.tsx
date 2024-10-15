import React, { useState } from 'react';
import { Plus, Trash2, Save, Calendar, Clock, MapPin } from 'lucide-react';

interface ItineraryItem {
  id: string;
  time: string;
  activity: string;
  location: string;
}

interface DayPlan {
  id: string;
  date: string;
  items: ItineraryItem[];
}

const TravelItineraryBuilder: React.FC = () => {
  const [itinerary, setItinerary] = useState<DayPlan[]>([]);
  const [currentDay, setCurrentDay] = useState<DayPlan>({
    id: '',
    date: '',
    items: [],
  });

  const handleAddDay = () => {
    if (currentDay.date) {
      setItinerary([...itinerary, { ...currentDay, id: Date.now().toString() }]);
      setCurrentDay({ id: '', date: '', items: [] });
    }
  };

  const handleAddItem = () => {
    setCurrentDay({
      ...currentDay,
      items: [
        ...currentDay.items,
        { id: Date.now().toString(), time: '', activity: '', location: '' },
      ],
    });
  };

  const handleItemChange = (id: string, field: keyof ItineraryItem, value: string) => {
    setCurrentDay({
      ...currentDay,
      items: currentDay.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  const handleRemoveItem = (id: string) => {
    setCurrentDay({
      ...currentDay,
      items: currentDay.items.filter((item) => item.id !== id),
    });
  };

  const handleSaveItinerary = () => {
    // Here you would typically send the itinerary data to your backend
    console.log('Saving itinerary:', itinerary);
    // You could also show a success message to the user
    alert('Itinerary saved successfully!');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Travel Itinerary Builder</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
          Date
        </label>
        <div className="flex items-center">
          <Calendar className="text-gray-400 mr-2" size={20} />
          <input
            type="date"
            id="date"
            value={currentDay.date}
            onChange={(e) => setCurrentDay({ ...currentDay, date: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      {currentDay.items.map((item) => (
        <div key={item.id} className="mb-4 p-4 border rounded-lg">
          <div className="flex items-center mb-2">
            <Clock className="text-gray-400 mr-2" size={20} />
            <input
              type="time"
              value={item.time}
              onChange={(e) => handleItemChange(item.id, 'time', e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center mb-2">
            <input
              type="text"
              value={item.activity}
              onChange={(e) => handleItemChange(item.id, 'activity', e.target.value)}
              placeholder="Activity"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center mb-2">
            <MapPin className="text-gray-400 mr-2" size={20} />
            <input
              type="text"
              value={item.location}
              onChange={(e) => handleItemChange(item.id, 'location', e.target.value)}
              placeholder="Location"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            onClick={() => handleRemoveItem(item.id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={20} />
          </button>
        </div>
      ))}
      <div className="flex justify-between">
        <button
          onClick={handleAddItem}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <Plus size={20} className="inline mr-2" />
          Add Item
        </button>
        <button
          onClick={handleAddDay}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          <Plus size={20} className="inline mr-2" />
          Add Day
        </button>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Your Itinerary</h3>
        {itinerary.map((day) => (
          <div key={day.id} className="mb-4 p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">{day.date}</h4>
            <ul>
              {day.items.map((item) => (
                <li key={item.id} className="mb-2">
                  <span className="font-medium">{item.time}</span> - {item.activity} at {item.location}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {itinerary.length > 0 && (
        <button
          onClick={handleSaveItinerary}
          className="bg-[#02314c] hover:bg-[#02314c]/80 text-white font-bold py-2 px-4 rounded mt-4"
        >
          <Save size={20} className="inline mr-2" />
          Save Itinerary
        </button>
      )}
    </div>
  );
};

export default TravelItineraryBuilder;