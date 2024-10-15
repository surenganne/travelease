import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import Notifications from '../consumer/Notifications';
import { User, LogOut } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleAuthClick = () => {
    navigate('/auth');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center">
            <img 
              src="https://www.incepta.ai/logo-site.png" 
              alt="Incepta" 
              className="h-8 w-auto"
            />
          </Link>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            {user ? (
              <div className="flex items-center space-x-4">
                <Notifications />
                <Link to="/profile" className="text-[#02314c] hover:text-[#02314c]/80 font-medium flex items-center">
                  <User size={20} className="mr-1" />
                  {user.username}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-[#02314c] hover:text-[#02314c]/80 font-medium flex items-center"
                >
                  <LogOut size={20} className="mr-1" />
                  {t('Logout')}
                </button>
              </div>
            ) : (
              <button
                onClick={handleAuthClick}
                className="text-[#02314c] hover:text-[#02314c]/80 font-medium"
              >
                {t('Sign In / Register')}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;