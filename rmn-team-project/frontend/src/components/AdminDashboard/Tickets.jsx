import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../config/axiosConfig";
import TicketDetails from "./TicketDetails";
import EditTicket from "./EditTicket";
import { FaEye, FaEdit } from "react-icons/fa";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [editTicket, setEditTicket] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get("/api/tickets");
        setTickets(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        setTickets([]);
      }
    };

    fetchTickets();
  }, []);

  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleEditTicket = (ticket) => {
    setEditTicket(ticket);
  };

  const handleCloseTicketDetails = () => {
    setSelectedTicket(null);
  };

  const handleCloseEditTicket = () => {
    setEditTicket(null);
  };

  const handleUpdateTicket = async (ticketId, updates) => {
    try {
      await axios.put(`/api/tickets/${ticketId}`, updates);
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.Ticket_ID === ticketId ? { ...ticket, ...updates } : ticket
        )
      );
    } catch (error) {
      console.error("Error updating ticket:", error);
    }
  };

  const filteredTickets = () => {
    const searchParams = new URLSearchParams(location.search);
    const status = searchParams.get("status");
    if (status) {
      return tickets.filter((ticket) =>
        status === "unassigned"
          ? !ticket.Agent_First_Name && !ticket.Agent_Second_Name
          : ticket.Status.toLowerCase() === status
      );
    }
    return tickets;
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
        ) : editTicket ? (
          <EditTicket
            ticket={editTicket}
            onClose={handleCloseEditTicket}
            onUpdateTicket={handleUpdateTicket}
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
                  Agent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTickets().map((ticket) => (
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
                    {ticket.Agent_First_Name
                      ? `${ticket.Agent_First_Name} ${ticket.Agent_Second_Name}`
                      : "Not Assigned"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="text-blue-600 hover:text-blue-900"
                      onClick={() => handleViewTicket(ticket)}
                    >
                      <FaEye />
                    </button>
                    <button
                      className="ml-2 text-yellow-600 hover:text-yellow-900"
                      onClick={() => handleEditTicket(ticket)}
                    >
                      <FaEdit />
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
