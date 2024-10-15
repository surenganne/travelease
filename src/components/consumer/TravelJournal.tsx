import React, { useState, useEffect } from 'react';
import { Book, Camera, Edit, Trash2, Save } from 'lucide-react';

interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  images: string[];
}

const TravelJournal: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [newEntry, setNewEntry] = useState<JournalEntry>({
    id: '',
    date: '',
    title: '',
    content: '',
    images: [],
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Load saved journal entries from localStorage
    const savedEntries = localStorage.getItem('travelJournal');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  const saveEntries = (updatedEntries: JournalEntry[]) => {
    localStorage.setItem('travelJournal', JSON.stringify(updatedEntries));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewEntry(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setNewEntry(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEntry.title && newEntry.date) {
      const updatedEntry = {
        ...newEntry,
        id: newEntry.id || Date.now().toString(),
      };
      const updatedEntries = isEditing
        ? entries.map(entry => (entry.id === updatedEntry.id ? updatedEntry : entry))
        : [...entries, updatedEntry];
      setEntries(updatedEntries);
      saveEntries(updatedEntries);
      setNewEntry({ id: '', date: '', title: '', content: '', images: [] });
      setIsEditing(false);
    }
  };

  const handleEdit = (entry: JournalEntry) => {
    setNewEntry(entry);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    const updatedEntries = entries.filter(entry => entry.id !== id);
    setEntries(updatedEntries);
    saveEntries(updatedEntries);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <Book className="mr-2" />
        Travel Journal
      </h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={newEntry.date}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#02314c]"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={newEntry.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#02314c]"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={newEntry.content}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#02314c]"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-1">
            Upload Images
          </label>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleImageUpload}
            multiple
            accept="image/*"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#02314c]"
          />
        </div>
        <button
          type="submit"
          className="bg-[#02314c] text-white px-4 py-2 rounded-md hover:bg-[#02314c]/80 transition duration-300 flex items-center"
        >
          <Save className="mr-2" />
          {isEditing ? 'Update Entry' : 'Add Entry'}
        </button>
      </form>
      <div className="space-y-4">
        {entries.map(entry => (
          <div key={entry.id} className="border rounded-md p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold">{entry.title}</h3>
              <span className="text-sm text-gray-500">{entry.date}</span>
            </div>
            <p className="mb-2">{entry.content}</p>
            {entry.images.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {entry.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Journal entry ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                ))}
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => handleEdit(entry)}
                className="text-blue-500 hover:text-blue-700"
              >
                <Edit size={20} />
              </button>
              <button
                onClick={() => handleDelete(entry.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelJournal;