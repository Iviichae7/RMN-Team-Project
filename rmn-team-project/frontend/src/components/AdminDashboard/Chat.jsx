import React, { useState, useEffect } from "react";
import { FaCommentDots, FaTimes, FaPaperPlane } from "react-icons/fa";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:3001");

const Chat = ({ isChatOpen, toggleChat }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);
  const [user, setUser] = useState({ firstName: "", lastName: "" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/user", {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUser();

    socket.on("chat message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
      if (!isChatOpen) {
        setUnreadCount((prevCount) => prevCount + 1);
      }
    });

    return () => {
      socket.off("chat message");
    };
  }, [isChatOpen]);

  useEffect(() => {
    if (isChatOpen) {
      setUnreadCount(0);
    }
  }, [isChatOpen]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        text: newMessage,
        userInitials: `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`,
        sender: `${user.firstName} ${user.lastName}`,
      };
      socket.emit("chat message", message);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage(e);
    }
  };

  return (
    <>
      <div
        className={`fixed bottom-14 right-20 p-4 ${
          isChatOpen ? "block" : "hidden"
        }`}
      >
        <div className="bg-white shadow-lg rounded-lg w-80 h-96 flex flex-col">
          <div className="flex justify-between items-center bg-blue-500 text-white p-4 rounded-t-lg">
            <h2 className="text-lg font-bold">Chat</h2>
            <button
              onClick={toggleChat}
              className="text-white hover:text-gray-300"
            >
              <FaTimes />
            </button>
          </div>
          <div className="flex-1 p-6 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className="flex items-start mb-4">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3">
                  {msg.userInitials}
                </div>
                <div className="bg-gray-100 p-2 border border-black rounded shadow flex-1">
                  <p className="text-black">{msg.text}</p>
                  <small>{msg.sender}</small>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-200 p-4 rounded-b-lg flex items-center">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 p-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={toggleChat}
        className="fixed bottom-20 right-10 bg-blue-500 text-white p-4 rounded-full shadow-xl hover:bg-blue-600 z-10 w-12 h-12 flex items-center justify-center"
      >
        <FaCommentDots className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-block w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full text-center">
            {unreadCount}
          </span>
        )}
      </button>
    </>
  );
};

export default Chat;
