import React, { useState, useEffect } from "react";
import axios from "../../config/axiosConfig";
import EditRDPSupport from "./EditRDPSupport";
import { FaEye, FaClipboard } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RDPSupport = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("/api/remote-support-tickets");
        setRequests(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching RDP support requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
  };

  const handleCloseRequest = () => {
    setSelectedRequest(null);
  };

  const handleUpdateRequest = async (requestId, updates) => {
    try {
      await axios.put(`/api/remote-support-tickets/${requestId}`, updates);
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.id === requestId ? { ...req, ...updates } : req
        )
      );
    } catch (error) {
      console.error("Error updating request:", error);
    }
  };

  const handleCopyAnyDeskID = (anydeskID) => {
    navigator.clipboard.writeText(anydeskID);
    toast.success("AnyDesk ID copied to clipboard.", {
      position: "bottom-left",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">RDP Support Requests</h2>
      <div className="bg-white shadow-md rounded-lg p-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ticket#
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                AnyDesk#ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Request Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requests.map((request) => (
              <tr key={request.id}>
                <td className="px-6 py-4 whitespace-nowrap">{request.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {request.First_Name} {request.Second_Name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {request.anydesk_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {request.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(request.request_date).toLocaleDateString()}{" "}
                  {new Date(request.request_date).toLocaleTimeString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="text-blue-600 hover:text-blue-900"
                    onClick={() => handleViewRequest(request)}
                  >
                    <FaEye size={20} />
                  </button>
                  <button
                    className="ml-2 text-green-600 hover:text-green-900"
                    onClick={() => handleCopyAnyDeskID(request.anydesk_id)}
                  >
                    <FaClipboard size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedRequest && (
        <EditRDPSupport
          request={selectedRequest}
          onClose={handleCloseRequest}
          onUpdateRequest={handleUpdateRequest}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default RDPSupport;
