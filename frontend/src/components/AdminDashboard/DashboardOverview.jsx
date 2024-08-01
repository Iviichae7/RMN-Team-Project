import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../config/axiosConfig";

const DashboardOverview = () => {
  const [ticketCounts, setTicketCounts] = useState({
    open: 0,
    onHold: 0,
    unassigned: 0,
    resolved: 0,
  });

  useEffect(() => {
    const fetchTicketCounts = async () => {
      try {
        const response = await axios.get("/api/tickets");
        const tickets = Array.isArray(response.data) ? response.data : [];

        const open = tickets.filter(
          (ticket) => ticket.Status.toLowerCase() === "open"
        ).length;
        const onHold = tickets.filter(
          (ticket) => ticket.Status.toLowerCase() === "on-hold"
        ).length;
        const unassigned = tickets.filter(
          (ticket) => !ticket.Agent_First_Name && !ticket.Agent_Second_Name
        ).length;
        const resolved = tickets.filter(
          (ticket) => ticket.Status.toLowerCase() === "resolved"
        ).length;

        setTicketCounts({ open, onHold, unassigned, resolved });
      } catch (error) {
        console.error("Error fetching ticket counts:", error);
      }
    };

    fetchTicketCounts();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-4 gap-4">
        <Link
          to="/admin/tickets?status=open"
          className="bg-white p-4 shadow rounded"
        >
          <h3 className="text-lg font-semibold">Open</h3>
          <p className="text-2xl">{ticketCounts.open}</p>
        </Link>
        <Link
          to="/admin/tickets?status=on-hold"
          className="bg-white p-4 shadow rounded"
        >
          <h3 className="text-lg font-semibold">On hold</h3>
          <p className="text-2xl">{ticketCounts.onHold}</p>
        </Link>
        <Link
          to="/admin/tickets?status=unassigned"
          className="bg-white p-4 shadow rounded"
        >
          <h3 className="text-lg font-semibold">Unassigned</h3>
          <p className="text-2xl">{ticketCounts.unassigned}</p>
        </Link>
        <Link
          to="/admin/tickets?status=resolved"
          className="bg-white p-4 shadow rounded"
        >
          <h3 className="text-lg font-semibold">Resolved</h3>
          <p className="text-2xl">{ticketCounts.resolved}</p>
        </Link>
      </div>
    </div>
  );
};

export default DashboardOverview;
