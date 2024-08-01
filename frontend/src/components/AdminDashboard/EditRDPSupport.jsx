import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const EditRDPSupport = ({ request, onClose, onUpdateRequest }) => {
  const [status, setStatus] = useState(request.status);

  useEffect(() => {
    setStatus(request.status);
  }, [request]);

  const handleUpdateStatus = async () => {
    try {
      await onUpdateRequest(request.id, { status });
      onClose();
    } catch (error) {
      console.error("Error updating ticket status:", error);
    }
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
            User: {request.First_Name} {request.Second_Name}
          </p>
          <p className="text-md">AnyDesk ID: {request.anydesk_id}</p>
          <p className="my-10">Description: {request.description}</p>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleUpdateStatus}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRDPSupport;
