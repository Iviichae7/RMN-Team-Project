import React, { useState } from "react";
import axios from "../../../config/axiosConfig";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateTicket = () => {
  const [ticketInfo, setTicketInfo] = useState({
    subject: "",
    description: "",
    category: "",
    status: "open",
  });
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketInfo({
      ...ticketInfo,
      [name]: value,
    });
  };

  const ticketSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/submit-ticket", { ...ticketInfo, userId });
      toast.success("Ticket Submitted!", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      toast.error("Error submitting a ticket, try again", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <main className="flex-1 p-6">
      <div className="bg-gray-100 shadow-xl rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Submit a Ticket</h2>
        <form onSubmit={ticketSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Subject:</label>
            <input
              type="text"
              name="subject"
              value={ticketInfo.subject}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Category:</label>
            <select
              name="category"
              value={ticketInfo.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select a category</option>
              <option value="cybersecurity">Cybersecurity</option>
              <option value="network">Network</option>
              <option value="software">Software</option>
              <option value="hardware">Hardware</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Status:</label>
            <input
              type="text"
              name="status"
              value={ticketInfo.status}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-200 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-gray-700">Description:</label>
            <textarea
              name="description"
              value={ticketInfo.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="5"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </main>
  );
};

export default CreateTicket;
