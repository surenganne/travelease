import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-12">
      <div className="border-t border-gray-200 pt-10">
        <div className="container mx-auto px-4 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="mb-8 md:mb-0">
              <img 
                src="https://www.incepta.ai/logo-site.png" 
                alt="Incepta" 
                className="h-8 w-auto mb-6"
              />
              <p className="text-sm text-gray-600">Your ultimate travel companion for hassle-free adventures.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-600 hover:text-gray-800">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-600 hover:text-gray-800">Contact</Link></li>
                <li><Link to="/faq" className="text-gray-600 hover:text-gray-800">FAQ</Link></li>
                <li><Link to="/terms" className="text-gray-600 hover:text-gray-800">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-gray-800"><Facebook size={24} /></a>
                <a href="#" className="text-gray-600 hover:text-gray-800"><Twitter size={24} /></a>
                <a href="#" className="text-gray-600 hover:text-gray-800"><Instagram size={24} /></a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-grow px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#02314c]"
                />
                <button type="submit" className="bg-[#02314c] text-white px-4 py-2 rounded-r-md hover:bg-[#02314c]/80 transition duration-300">
                  <Mail size={24} />
                </button>
              </form>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center">
            <p className="text-gray-600">&copy; 2024 Incepta. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;