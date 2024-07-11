import React, { useState } from "react";

const RDPSupportRequests = [
  {
    id: 1,
    user: "user@rmn.com",
    status: "Pending",
    requestDate: "2024-07-10",
  },
];

const RDPSupport = () => {
  const [requests, setRequests] = useState(RDPSupportRequests);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">RDP Support Requests</h2>
      <div className="bg-white shadow-md rounded-lg p-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
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
                <td className="px-6 py-4 whitespace-nowrap">{request.user}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {request.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {request.requestDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:text-blue-900">
                    View
                  </button>
                  <button className="ml-2 text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RDPSupport;
