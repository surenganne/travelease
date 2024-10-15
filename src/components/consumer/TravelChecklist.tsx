import React, { useState, useEffect } from 'react';
import { Check, Plus, Trash2, Save, List } from 'lucide-react';

interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

const TravelChecklist: React.FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [newItemText, setNewItemText] = useState('');

  useEffect(() => {
    // Load saved checklist from localStorage
    const savedChecklist = localStorage.getItem('travelChecklist');
    if (savedChecklist) {
      setItems(JSON.parse(savedChecklist));
    }
  }, []);

  const saveChecklist = (updatedItems: ChecklistItem[]) => {
    localStorage.setItem('travelChecklist', JSON.stringify(updatedItems));
  };

  const addItem = () => {
    if (newItemText.trim()) {
      const newItem: ChecklistItem = {
        id: Date.now().toString(),
        text: newItemText.trim(),
        checked: false,
      };
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      saveChecklist(updatedItems);
      setNewItemText('');
    }
  };

  const toggleItem = (id: string) => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);
    saveChecklist(updatedItems);
  };

  const removeItem = (id: string) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    saveChecklist(updatedItems);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <List className="mr-2" />
        Travel Checklist
      </h2>
      <div className="mb-4">
        <div className="flex">
          <input
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder="Add new item..."
            className="flex-grow mr-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#02314c]"
          />
          <button
            onClick={addItem}
            className="bg-[#02314c] text-white px-4 py-2 rounded-md hover:bg-[#02314c]/80 transition duration-300"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="flex items-center">
            <button
              onClick={() => toggleItem(item.id)}
              className={`flex-shrink-0 w-6 h-6 mr-2 border rounded-md ${
                item.checked ? 'bg-green-500 border-green-500' : 'border-gray-300'
              }`}
            >
              {item.checked && <Check size={20} className="text-white" />}
            </button>
            <span className={`flex-grow ${item.checked ? 'line-through text-gray-500' : ''}`}>
              {item.text}
            </span>
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-500 hover:text-red-700 ml-2"
            >
              <Trash2 size={20} />
            </button>
          </li>
        ))}
      </ul>
      {items.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            {items.filter(item => item.checked).length} of {items.length} items checked
          </p>
        </div>
      )}
    </div>
  );
};

export default TravelChecklist;