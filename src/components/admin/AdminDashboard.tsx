import React, { useState } from 'react';
import { Users, Package, DollarSign, Menu, LogOut, BarChart2, UserPlus } from 'lucide-react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AdminDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-[#02314c] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <button onClick={toggleSidebar} className="text-white focus:outline-none focus:text-gray-300 mr-4">
              <Menu size={24} />
            </button>
            <h1 className="text-2xl font-semibold">Admin</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center text-white hover:text-gray-300 transition duration-150 ease-in-out"
          >
            <LogOut size={20} className="mr-2" />
            Logout
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div 
          className={`bg-gray-800 text-white ${isSidebarOpen ? 'w-64' : 'w-16'} space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <nav>
            <Link to="/admin" className={`block py-2.5 px-4 rounded transition duration-200 ${location.pathname === '/admin' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
              <Users size={20} className="inline-block mr-2" />
              {(isSidebarOpen || isHovered) && <span>Dashboard</span>}
            </Link>
            <Link to="/admin/analytics" className={`block py-2.5 px-4 rounded transition duration-200 ${location.pathname === '/admin/analytics' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
              <BarChart2 size={20} className="inline-block mr-2" />
              {(isSidebarOpen || isHovered) && <span>Analytics</span>}
            </Link>
            <Link to="/admin/packages" className={`block py-2.5 px-4 rounded transition duration-200 ${location.pathname === '/admin/packages' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
              <Package size={20} className="inline-block mr-2" />
              {(isSidebarOpen || isHovered) && <span>Manage Packages</span>}
            </Link>
            <Link to="/admin/vendors" className={`block py-2.5 px-4 rounded transition duration-200 ${location.pathname === '/admin/vendors' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
              <Users size={20} className="inline-block mr-2" />
              {(isSidebarOpen || isHovered) && <span>Vendor Management</span>}
            </Link>
            <Link to="/admin/bookings" className={`block py-2.5 px-4 rounded transition duration-200 ${location.pathname === '/admin/bookings' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
              <DollarSign size={20} className="inline-block mr-2" />
              {(isSidebarOpen || isHovered) && <span>Booking Management</span>}
            </Link>
            <Link to="/admin/users" className={`block py-2.5 px-4 rounded transition duration-200 ${location.pathname === '/admin/users' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
              <UserPlus size={20} className="inline-block mr-2" />
              {(isSidebarOpen || isHovered) && <span>User Management</span>}
            </Link>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>

      {/* Admin Footer */}
      <footer className="bg-[#02314c] text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Incepta Admin. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;