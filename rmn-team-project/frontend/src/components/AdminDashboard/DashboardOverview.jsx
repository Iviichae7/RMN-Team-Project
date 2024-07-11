import React from "react";
import { Link } from "react-router-dom";

const DashboardOverview = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-3 gap-4">
        <Link
          to="/admin/tickets?status=open"
          className="bg-white p-4 shadow rounded"
        >
          <h3 className="text-lg font-semibold">Open</h3>
          <p className="text-2xl">0</p>
        </Link>
        <Link
          to="/admin/tickets?status=on-hold"
          className="bg-white p-4 shadow rounded"
        >
          <h3 className="text-lg font-semibold">On hold</h3>
          <p className="text-2xl">0</p>
        </Link>
        <Link
          to="/admin/tickets?status=unassigned"
          className="bg-white p-4 shadow rounded"
        >
          <h3 className="text-lg font-semibold">Unassigned</h3>
          <p className="text-2xl">0</p>
        </Link>
      </div>
    </div>
  );
};

export default DashboardOverview;
