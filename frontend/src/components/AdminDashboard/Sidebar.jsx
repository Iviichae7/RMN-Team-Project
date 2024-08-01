import React from "react";
import {
  FaBars,
  FaChartLine,
  FaTicketAlt,
  FaEnvelope,
  FaUserPlus,
  FaDesktop,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col min-h-full">
      <div className="p-4 pl-6 flex items-center justify-between">
        <FaBars className="text-xl" />
      </div>
      <nav className="flex flex-col flex-grow p-4 space-y-4">
        <Link
          to="/admin"
          className="flex items-center p-2 hover:bg-gray-700 rounded"
        >
          <FaChartLine className="mr-3" /> Dashboard
        </Link>
        <Link
          to="/admin/tickets"
          className="flex items-center p-2 hover:bg-gray-700 rounded"
        >
          <FaTicketAlt className="mr-3" /> Tickets
        </Link>
        <Link
          to="/admin/emails"
          className="flex items-center p-2 hover:bg-gray-700 rounded"
        >
          <FaEnvelope className="mr-3" /> Emails
        </Link>
        <Link
          to="/admin/addUser"
          className="flex items-center p-2 hover:bg-gray-700 rounded"
        >
          <FaUserPlus className="mr-3" /> User Management
        </Link>
        <Link
          to="/admin/rdpSupport"
          className="flex items-center p-2 hover:bg-gray-700 rounded"
        >
          <FaDesktop className="mr-3" /> RDP Support
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
