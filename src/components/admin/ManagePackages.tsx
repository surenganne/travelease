import React, { useState, useEffect } from 'react';
import { Package, Edit, Trash2, Plus, X } from 'lucide-react';
import Pagination from '../common/Pagination';

interface TravelPackage {
  id: string;
  name: string;
  destination: string;
  price: number;
  duration: number;
  description: string;
}

const ManagePackages: React.FC = () => {
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [isAddingPackage, setIsAddingPackage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [packagesPerPage] = useState(10);
  const [newPackage, setNewPackage] = useState<Omit<TravelPackage, 'id'>>({
    name: '',
    destination: '',
    price: 0,
    duration: 0,
    description: '',
  });

  useEffect(() => {
    // In a real application, you would fetch this data from your API
    const mockPackages: TravelPackage[] = Array.from({ length: 50 }, (_, index) => ({
      id: `${index + 1}`,
      name: `Package ${index + 1}`,
      destination: `Destination ${index + 1}`,
      price: Math.floor(Math.random() * 2000) + 500,
      duration: Math.floor(Math.random() * 14) + 1,
      description: `Description for Package ${index + 1}`
    }));
    setPackages(mockPackages);
  }, []);

  const handleEdit = (id: string) => {
    // Implement edit functionality
    console.log('Edit package', id);
  };

  const handleDelete = (id: string) => {
    // Implement delete functionality
    setPackages(packages.filter(pkg => pkg.id !== id));
  };

  const handleAddPackage = () => {
    setIsAddingPackage(true);
  };

  const handleCancelAdd = () => {
    setIsAddingPackage(false);
    setNewPackage({
      name: '',
      destination: '',
      price: 0,
      duration: 0,
      description: '',
    });
  };

  const handleSubmitNewPackage = () => {
    const packageToAdd: TravelPackage = {
      ...newPackage,
      id: Date.now().toString(),
    };
    setPackages([...packages, packageToAdd]);
    setIsAddingPackage(false);
    setNewPackage({
      name: '',
      destination: '',
      price: 0,
      duration: 0,
      description: '',
    });
  };

  // Get current packages
  const indexOfLastPackage = currentPage * packagesPerPage;
  const indexOfFirstPackage = indexOfLastPackage - packagesPerPage;
  const currentPackages = packages.slice(indexOfFirstPackage, indexOfLastPackage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Manage Packages</h1>
        <button
          onClick={handleAddPackage}
          className="bg-[#02314c] text-white px-4 py-2 rounded-md hover:bg-[#02314c]/80 transition duration-300 flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Add New Package
        </button>
      </div>

      {isAddingPackage && (
        <div className="mb-6 p-4 border rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add New Package</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Package Name"
              value={newPackage.name}
              onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Destination"
              value={newPackage.destination}
              onChange={(e) => setNewPackage({ ...newPackage, destination: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
            <input
              type="number"
              placeholder="Price"
              value={newPackage.price}
              onChange={(e) => setNewPackage({ ...newPackage, price: Number(e.target.value) })}
              className="w-full px-3 py-2 border rounded-md"
            />
            <input
              type="number"
              placeholder="Duration (days)"
              value={newPackage.duration}
              onChange={(e) => setNewPackage({ ...newPackage, duration: Number(e.target.value) })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <textarea
            placeholder="Description"
            value={newPackage.description}
            onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}
            className="w-full px-3 py-2 border rounded-md mb-4"
            rows={3}
          ></textarea>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleCancelAdd}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300 mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitNewPackage}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
            >
              Add Package
            </button>
          </div>
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentPackages.map((pkg) => (
                <tr key={pkg.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Package size={20} className="text-[#02314c] mr-2" />
                      <div className="text-sm font-medium text-gray-900">{pkg.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{pkg.destination}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${pkg.price}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{pkg.duration} days</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => handleEdit(pkg.id)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                      <Edit size={20} />
                    </button>
                    <button onClick={() => handleDelete(pkg.id)} className="text-red-600 hover:text-red-900">
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        itemsPerPage={packagesPerPage}
        totalItems={packages.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ManagePackages;