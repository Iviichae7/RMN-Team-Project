import React, { useEffect, useState } from "react";
import { FaReply, FaTimes } from "react-icons/fa";
import axios from "../../config/axiosConfig";

const TicketDetails = ({ ticket, onClose }) => {
  const [correspondence, setCorrespondence] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showReply, setShowReply] = useState(false);
  const [colors, setColors] = useState({});

  useEffect(() => {
    const fetchCorrespondence = async () => {
      try {
        const response = await axios.get(
          `/api/ticket-correspondence/${ticket.Ticket_ID}`
        );
        setCorrespondence(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        setCorrespondence([]);
      }
    };

    fetchCorrespondence();
  }, [ticket.Ticket_ID]);

  const getUserInitials = (firstName, lastName) => {
    if (!firstName || !lastName) return "U";
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    const newColors = {
      [ticket.Ticket_ID]: getRandomColor(),
      ...correspondence.reduce((acc, message) => {
        if (!acc[message.Ticket_ID]) {
          acc[message.Ticket_ID] = getRandomColor();
        }
        return acc;
      }, {}),
    };
    setColors(newColors);
  }, [correspondence, ticket.Ticket_ID]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const response = await axios.post("/api/ticket-correspondence", {
        ticketId: ticket.Ticket_ID,
        message: newMessage,
        sender: "IT Support",
      });

      if (response.status === 201) {
        setCorrespondence((prev) => [...prev, response.data]);
        setNewMessage("");
        setShowReply(false);
      }
    } catch (error) {
      console.error("Error sending message:", error);
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
        <div className="flex items-center mb-4">
          <div
            className="w-8 h-8 text-white rounded-md flex items-center justify-center"
            style={{
              backgroundColor: colors[ticket.Ticket_ID],
            }}
          >
            {getUserInitials(ticket.First_Name, ticket.Second_Name)}
          </div>
          <div className="ml-4">
            <p className="font-bold text-blue-600">
              {ticket.First_Name} {ticket.Second_Name}
            </p>
            <p className="text-gray-500 text-sm">
              {new Date(ticket.Created_At).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="ml-12">
          <p className="text-md font-semibold mb-2">
            Subject: {ticket.Subject}
          </p>
          <p className="text-md">Category: {ticket.Category}</p>
          <p className="my-10">{ticket.Description}</p>
          {correspondence.map((message, index) => (
            <div key={index} className="mt-4 flex items-start">
              <div
                className="w-8 h-8 text-white rounded-md flex items-center justify-center mr-4"
                style={{ backgroundColor: colors[message.Ticket_ID] }}
              >
                {getUserInitials(
                  message.Sender === "IT Support" ? "IT" : message.First_Name,
                  message.Sender === "IT Support" ? "" : message.Second_Name
                )}
              </div>
              <div className="bg-gray-200 p-2 rounded-md flex-1">
                <p className="font-bold text-blue-600">
                  {message.Sender === "IT Support"
                    ? "IT Support"
                    : `${message.First_Name} ${message.Second_Name}`}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  {new Date(message.Created_At).toLocaleString()}
                </p>
                <p className="text-gray-600 mx-2">{message.Message}</p>
              </div>
            </div>
          ))}
          <div className="mt-4 flex justify-center space-x-4">
            <button
              onClick={() => setShowReply(!showReply)}
              className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md flex items-center justify-center space-x-2"
            >
              <FaReply className="text-gray-600" />
              <span>Reply</span>
            </button>
          </div>
        </div>
      </div>
      {showReply && (
        <div className="bg-white shadow rounded-lg p-4 mt-6">
          <div className="p-4 bg-gray-100 rounded-md">
            <form onSubmit={handleSendMessage}>
              <div className="ml-12">
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows="5"
                  placeholder="Type your reply here..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                ></textarea>
                <div className="flex justify-between items-center mt-4">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Send
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowReply(false)}
                    className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketDetails;
