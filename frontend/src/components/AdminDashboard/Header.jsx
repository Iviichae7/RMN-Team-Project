import React from "react";
import { FaUser, FaSignOutAlt } from "react-icons/fa";

const Header = ({ handleSignOut }) => {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <img
          src="/assets/RMN_transparent.png"
          alt="Logo"
          className="max-w-20 h-auto ml-2"
        />
      </div>
      <div className="flex items-center space-x-8 mr-6">
        <FaUser className="text-2xl cursor-pointer transition-transform duration-200 transform hover:scale-125 hover:text-blue-500" />
        <button
          className="bg-red-500 text-white px-3 py-2 rounded-full shadow-lg 
                     transform transition duration-300 ease-in-out hover:scale-105 hover:bg-red-600 hover:shadow-xl"
          onClick={handleSignOut}
        >
          <FaSignOutAlt className="text-xl" />
        </button>
      </div>
    </header>
  );
};

export default Header;
