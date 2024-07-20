import React, { useEffect, useState } from "react";
import { FaEye, FaReply, FaTimes } from "react-icons/fa";
import axios from "../../config/axiosConfig";

const MainContent = ({
  userId,
  handleViewClick,
  handleReplyClick,
  showCorrespondence,
  setShowCorrespondence,
  showReply,
  setShowReply,
}) => {
  const [tickets, setTickets] = useState([]);
  const [colors, setColors] = useState({});
  const [correspondence, setCorrespondence] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showFullThread, setShowFullThread] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      if (userId) {
        try {
          const response = await axios.get(`/api/tickets/${userId}`);
          const ticketsData = Array.isArray(response.data) ? response.data : [];
          setTickets(ticketsData);

          const newColors = {};
          ticketsData.forEach((ticket) => {
            newColors[ticket.Ticket_ID] = getRandomColor();
          });
          setColors(newColors);
        } catch (error) {
          setTickets([]);
        }
      }
    };

    fetchTickets();
  }, [userId]);

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

  const fetchCorrespondence = async (ticketId) => {
    try {
      const response = await axios.get(
        `/api/ticket-correspondence/${ticketId}`
      );
      setCorrespondence(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      setCorrespondence([]);
    }
  };

  const toggleCorrespondence = async (ticket) => {
    if (
      showCorrespondence &&
      showCorrespondence.Ticket_ID === ticket.Ticket_ID
    ) {
      setShowCorrespondence(null);
    } else {
      await fetchCorrespondence(ticket.Ticket_ID);
      setShowCorrespondence(ticket);
      setShowReply(false);
      setShowFullThread(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await axios.post("/api/ticket-correspondence", {
        ticketId: showCorrespondence.Ticket_ID,
        message: newMessage,
        sender: "user",
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
    <main className="flex-1 p-6">
      <div className="bg-gray-100 shadow-xl rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Your Open Tickets</h2>
        <div className="overflow-x-auto">
          <div className="grid grid-cols-6 gap-4 bg-gray-800 text-white p-4 rounded-t-lg">
            <div className="text-center font-semibold">Contact</div>
            <div className="text-center font-semibold">Subject</div>
            <div className="text-center font-semibold">Category</div>
            <div className="text-center font-semibold">Agent</div>
            <div className="text-center font-semibold">Status</div>
            <div className="text-center font-semibold">Actions</div>
          </div>
          <div className="space-y-4">
            {tickets.length > 0 ? (
              tickets.map((ticket) => (
                <div
                  key={ticket.Ticket_ID}
                  className="bg-gray-100 rounded-lg p-4 shadow-md grid grid-cols-6 gap-4 border border-black border-opacity-15 mt-4"
                >
                  <div className="flex items-center justify-center">
                    <div
                      className="w-8 h-8 text-white rounded-md flex items-center justify-center"
                      style={{ backgroundColor: colors[ticket.Ticket_ID] }}
                    >
                      {getUserInitials(ticket.First_Name, ticket.Second_Name)}
                    </div>
                  </div>
                  <div className="flex items-center justify-center text-center">
                    {ticket.Subject}
                  </div>
                  <div className="flex items-center justify-center text-center">
                    {ticket.Category}
                  </div>
                  <div className="flex items-center justify-center text-center">
                    {ticket.Agent || "-"}
                  </div>
                  <div className="flex items-center justify-center text-center">
                    {ticket.Status}
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => toggleCorrespondence(ticket)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEye />{" "}
                      {showCorrespondence &&
                      showCorrespondence.Ticket_ID === ticket.Ticket_ID
                        ? "Close"
                        : "View"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center p-4">No tickets found.</div>
            )}
          </div>
        </div>
      </div>
      {showCorrespondence && (
        <div className="bg-white shadow rounded-lg p-4 mt-6 relative">
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 m-4"
            onClick={() => setShowCorrespondence(null)}
          >
            <FaTimes size={25} />
          </button>
          <div className="p-4 bg-gray-100 rounded-md">
            <div className="flex items-center mb-4">
              <div
                className="w-8 h-8 text-white rounded-md flex items-center justify-center"
                style={{
                  backgroundColor: colors[showCorrespondence.Ticket_ID],
                }}
              >
                {getUserInitials(
                  showCorrespondence.First_Name,
                  showCorrespondence.Second_Name
                )}
              </div>
              <div className="ml-4">
                <p className="font-bold text-blue-600">
                  {showCorrespondence.First_Name}{" "}
                  {showCorrespondence.Second_Name}{" "}
                </p>
                <p className="text-gray-500 text-sm">
                  {new Date(showCorrespondence.Created_At).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="ml-12">
              <p className="text-md font-semibold mb-2">
                Subject: {showCorrespondence.Subject}
              </p>
              <p className="text-md">Category: {showCorrespondence.Category}</p>
              <p className="my-10">{showCorrespondence.Description}</p>
              {correspondence
                .slice(0, showFullThread ? correspondence.length : 1)
                .map((message, index) => (
                  <div key={index} className="mt-4 flex items-start">
                    <div
                      className="w-8 h-8 text-white rounded-md flex items-center justify-center mr-4"
                      style={{ backgroundColor: colors[message.Ticket_ID] }}
                    >
                      {getUserInitials(
                        message.Sender === "IT Support"
                          ? "IT"
                          : showCorrespondence.First_Name,
                        message.Sender === "IT Support"
                          ? ""
                          : showCorrespondence.Second_Name
                      )}
                    </div>
                    <div className="bg-gray-200 p-2 rounded-md flex-1">
                      <p className="font-bold text-blue-600">
                        {message.Sender === "IT Support"
                          ? "IT Support"
                          : `${showCorrespondence.First_Name} ${showCorrespondence.Second_Name}`}
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        {new Date(message.Created_At).toLocaleString()}
                      </p>
                      <p className="text-gray-600 mx-2">{message.Message}</p>
                    </div>
                  </div>
                ))}
              <div className="mt-4 flex justify-center space-x-4">
                {correspondence.length > 1 && (
                  <button
                    className="relative bg-gray-200 text-gray-600 px-4 py-2 rounded-md"
                    onClick={() => setShowFullThread(!showFullThread)}
                  >
                    <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center -mt-3 -mr-3">
                      {correspondence.length}
                    </span>
                    ...
                  </button>
                )}
                {Array.isArray(correspondence) &&
                correspondence.some((msg) => msg.Sender === "IT Support") ? (
                  <button
                    onClick={() => setShowReply(!showReply)}
                    className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md flex items-center justify-center space-x-2"
                  >
                    <FaReply className="text-gray-600" />
                    <span>Reply</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setShowReply(!showReply)}
                    className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md flex items-center justify-center space-x-2"
                  >
                    <span>Add More</span>
                  </button>
                )}
              </div>
            </div>
          </div>
          {showReply && (
            <div className="bg-white shadow rounded-lg p-4 mt-6">
              <div className="p-4 bg-gray-100 rounded-md">
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
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                      onClick={handleSendMessage}
                    >
                      Send
                    </button>
                    <button
                      onClick={() => setShowReply(false)}
                      className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default MainContent;
