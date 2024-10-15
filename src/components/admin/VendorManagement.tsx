import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Star, X, Search, ChevronUp, ChevronDown } from 'lucide-react';
import Pagination from '../common/Pagination';
import EditVendorModal from './EditVendorModal';

interface Vendor {
  id: string;
  name: string;
  serviceType: string;
  rating: number;
  contactPerson: string;
  email: string;
  phone: string;
}

const VendorManagement: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [isAddingVendor, setIsAddingVendor] = useState(false);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
  const [newVendor, setNewVendor] = useState<Omit<Vendor, 'id'>>({
    name: '',
    serviceType: '',
    rating: 0,
    contactPerson: '',
    email: '',
    phone: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [vendorsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterServiceType, setFilterServiceType] = useState('');
  const [sortField, setSortField] = useState<keyof Vendor>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    // In a real application, you would fetch vendors from an API
    const mockVendors: Vendor[] = Array.from({ length: 50 }, (_, index) => ({
      id: `${index + 1}`,
      name: `Vendor ${index + 1}`,
      serviceType: ['Accommodation', 'Transportation', 'Tours', 'Food'][Math.floor(Math.random() * 4)],
      rating: Math.floor(Math.random() * 5) + 1,
      contactPerson: `Contact ${index + 1}`,
      email: `vendor${index + 1}@example.com`,
      phone: `+1234567890${index}`
    }));
    setVendors(mockVendors);
  }, []);

  const handleAddVendor = () => {
    const vendor: Vendor = {
      ...newVendor,
      id: Date.now().toString(),
    };
    setVendors([...vendors, vendor]);
    setIsAddingVendor(false);
    setNewVendor({ name: '', serviceType: '', rating: 0, contactPerson: '', email: '', phone: '' });
  };

  const handleDeleteVendor = (id: string) => {
    setVendors(vendors.filter(vendor => vendor.id !== id));
  };

  const handleEditVendor = (vendor: Vendor) => {
    setEditingVendor(vendor);
  };

  const handleUpdateVendor = () => {
    if (editingVendor) {
      setVendors(vendors.map(v => v.id === editingVendor.id ? editingVendor : v));
      setEditingVendor(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingVendor(null);
  };

  const handleCancelAdd = () => {
    setIsAddingVendor(false);
    setNewVendor({ name: '', serviceType: '', rating: 0, contactPerson: '', email: '', phone: '' });
  };

  const handleSort = (field: keyof Vendor) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredVendors = vendors
    .filter(vendor => 
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.phone.includes(searchTerm)
    )
    .filter(vendor => 
      filterServiceType ? vendor.serviceType === filterServiceType : true
    )
    .sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  // Get current vendors
  const indexOfLastVendor = currentPage * vendorsPerPage;
  const indexOfFirstVendor = indexOfLastVendor - vendorsPerPage;
  const currentVendors = filteredVendors.slice(indexOfFirstVendor, indexOfLastVendor);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const uniqueServiceTypes = Array.from(new Set(vendors.map(vendor => vendor.serviceType)));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold mb-6">Vendor Management</h1>
      
      <div className="mb-4 flex flex-wrap items-center justify-between">
        <button
          onClick={() => setIsAddingVendor(true)}
          className="mb-2 sm:mb-0 bg-[#02314c] text-white px-4 py-2 rounded-md hover:bg-[#02314c]/80 transition duration-300 flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Add New Vendor
        </button>
        <div className="flex flex-wrap items-center">
          <div className="relative mr-2 mb-2 sm:mb-0">
            <input
              type="text"
              placeholder="Search vendors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#02314c]"
            />
            <Search size={20} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <select
            value={filterServiceType}
            onChange={(e) => setFilterServiceType(e.target.value)}
            className="mb-2 sm:mb-0 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#02314c]"
          >
            <option value="">All Service Types</option>
            {uniqueServiceTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {isAddingVendor && (
        <div className="mb-6 p-4 border rounded-md">
          <h2 className="text-xl font-semibold mb-4">Add New Vendor</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Vendor Name"
              value={newVendor.name}
              onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Service Type"
              value={newVendor.serviceType}
              onChange={(e) => setNewVendor({ ...newVendor, serviceType: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
            <input
              type="number"
              placeholder="Rating"
              value={newVendor.rating}
              onChange={(e) => setNewVendor({ ...newVendor, rating: Number(e.target.value) })}
              className="w-full px-3 py-2 border rounded-md"
              min="1"
              max="5"
            />
            <input
              type="text"
              placeholder="Contact Person"
              value={newVendor.contactPerson}
              onChange={(e) => setNewVendor({ ...newVendor, contactPerson: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
            <input
              type="email"
              placeholder="Email"
              value={newVendor.email}
              onChange={(e) => setNewVendor({ ...newVendor, email: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={newVendor.phone}
              onChange={(e) => setNewVendor({ ...newVendor, phone: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleCancelAdd}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300 mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handleAddVendor}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
            >
              Add Vendor
            </button>
          </div>
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Name', 'Service Type', 'Rating', 'Contact Person', 'Email', 'Phone', 'Actions'].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort(header.toLowerCase().replace(' ', '') as keyof Vendor)}
                  >
                    <div className="flex items-center">
                      {header}
                      {sortField === header.toLowerCase().replace(' ', '') && (
                        sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentVendors.map((vendor) => (
                <tr key={vendor.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{vendor.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{vendor.serviceType}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Star className="text-yellow-400 mr-1" size={16} />
                      {vendor.rating.toFixed(1)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{vendor.contactPerson}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{vendor.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{vendor.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => handleEditVendor(vendor)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                      <Edit2 size={20} />
                    </button>
                    <button onClick={() => handleDeleteVendor(vendor.id)} className="text-red-600 hover:text-red-900">
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
        itemsPerPage={vendorsPerPage}
        totalItems={filteredVendors.length}
        paginate={paginate}
        currentPage={currentPage}
      />

      {editingVendor && (
        <EditVendorModal
          vendor={editingVendor}
          onClose={handleCancelEdit}
          onSave={handleUpdateVendor}
        />
      )}
    </div>
  );
};

export default VendorManagement;