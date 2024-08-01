import React, { useState, useEffect } from "react";
import axios from "../../config/axiosConfig";
import { FaTimes } from "react-icons/fa";

const EditTicket = ({ ticket, onClose, onUpdateTicket }) => {
  const [status, setStatus] = useState(ticket.Status);
  const [priority, setPriority] = useState(ticket.Priority || "Medium");
  const [assignedAgent, setAssignedAgent] = useState(ticket.Agent || "");
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get("/api/admins");
        setAdmins(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        setAdmins([]);
      }
    };

    fetchAdmins();
  }, []);

  const handleApplyChanges = async () => {
    const updates = {
      Status: status,
      Priority: priority,
      Agent: assignedAgent,
    };
    if (status === "Resolved") {
      updates.StatusID = 1;
    } else {
      updates.StatusID = 0;
    }
    await onUpdateTicket(ticket.Ticket_ID, updates);
    onClose();
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 mt-6 relative">
      <button
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 m-4"
        onClick={onClose}
      >
        <FaTimes size={25} />
      </button>
      <div className="p-4 bg-gray-100 rounded-md">
        <div className="ml-12">
          <p className="text-md font-semibold mb-2">
            Subject: {ticket.Subject}
          </p>
          <p className="text-md">Category: {ticket.Category}</p>
          <p className="my-10">{ticket.Description}</p>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="Open">Open</option>
              <option value="Assigned">Assigned</option>
              <option value="On-hold">On Hold</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Assign to Agent
            </label>
            <select
              value={assignedAgent}
              onChange={(e) => setAssignedAgent(e.target.value)}
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Unassigned</option>
              {admins.map((admin) => (
                <option key={admin.User_ID} value={admin.User_ID}>
                  {admin.First_Name} {admin.Second_Name.charAt(0)}.
                </option>
              ))}
            </select>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleApplyChanges}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTicket;
