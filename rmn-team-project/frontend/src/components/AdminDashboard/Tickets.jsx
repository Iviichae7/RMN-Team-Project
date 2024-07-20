import React, { useState, useEffect } from "react";
import axios from "../../config/axiosConfig";
import TicketDetails from "./TicketDetails";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get("/api/tickets");
        setTickets(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setTickets([]);
      }
    };

    fetchTickets();
  }, []);

  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleCloseTicketDetails = () => {
    setSelectedTicket(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tickets</h2>
      <div className="bg-white shadow-md rounded-lg p-4">
        {selectedTicket ? (
          <TicketDetails
            ticket={selectedTicket}
            onClose={handleCloseTicketDetails}
          />
        ) : (
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
                <tr key={ticket.Ticket_ID}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {ticket.Ticket_ID}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {ticket.Subject}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {ticket.Status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {ticket.Priority || "Medium"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="text-blue-600 hover:text-blue-900"
                      onClick={() => handleViewTicket(ticket)}
                    >
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
        )}
      </div>
    </div>
  );
};

export default Tickets;
