import React from 'react';
import { FaUser, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';

const Header = ({ handleSignOut }) => {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <img src="/assets/RMN_transparent.png" alt="Logo" className="max-w-20 h-auto ml-2" />
      </div>
      <div className="flex-1 flex justify-center">
      <button className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-6 py-3 rounded-full shadow-lg 
                        transform transition duration-300 ease-in-out hover:scale-105 hover:bg-gradient-to-r 
                        hover:from-blue-500 hover:to-blue-700 hover:shadow-xl">
                        Request Remote Support
      </button>

      </div>
      <div className="flex items-center space-x-8 mr-6">
        <FaUser className="text-2xl cursor-pointer transition-transform duration-200 transform hover:scale-125 hover:text-blue-500" />
        <FaShoppingCart className="text-2xl cursor-pointer transition-transform duration-200 transform hover:scale-125 hover:text-yellow-500" />
        <FaSignOutAlt className="text-2xl cursor-pointer transition-transform duration-200 transform hover:scale-125 hover:text-red-500" 
          onClick={handleSignOut} 
          />
      </div>
    </header>
  );
};

export default Header;
