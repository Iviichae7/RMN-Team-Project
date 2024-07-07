import React from 'react';
import { FaBars, FaChartLine, FaTicketAlt } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col min-h-full">
      <div className="p-4 pl-6 flex items-center justify-between">
        <FaBars className="text-xl" />
      </div>
      <nav className="flex flex-col flex-grow p-4 space-y-4">
        <a href="/" className="flex items-center p-2 hover:bg-gray-700 rounded">
          <FaChartLine className="mr-3" /> Dashboard
        </a>
        <a href="/" className="flex items-center p-2 hover:bg-gray-700 rounded">
          <FaTicketAlt className="mr-3" /> Plans
        </a>
        <a href="/" className="flex items-center p-2 hover:bg-gray-700 rounded">
          <FaTicketAlt className="mr-3" /> Create a Ticket
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
