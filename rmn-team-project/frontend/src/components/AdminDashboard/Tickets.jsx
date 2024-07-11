import React, { useState } from "react";

const mockTickets = [
  { id: 1, subject: "Login Issue", status: "Open", priority: "High" },
  { id: 2, subject: "Payment Failure", status: "On Hold", priority: "Medium" },
  {
    id: 3,
    subject: "Bug in Application",
    status: "Unassigned",
    priority: "Low",
  },
];

const Tickets = () => {
  const [tickets, setTickets] = useState(mockTickets);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tickets</h2>
      <div className="bg-white shadow-md rounded-lg p-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td className="px-6 py-4 whitespace-nowrap">{ticket.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {ticket.subject}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{ticket.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {ticket.priority}
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

export default Tickets;
