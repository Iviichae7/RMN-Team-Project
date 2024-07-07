import React from "react";
import { FaCommentDots, FaTimes, FaPaperPlane } from "react-icons/fa";

const Chat = ({ isChatOpen, toggleChat }) => {
  return (
    <>
      <div
        className={`fixed bottom-14 right-20 p-4 ${
          isChatOpen ? "block" : "hidden"
        }`}
      >
        <div className="bg-white shadow-lg rounded-lg w-80 h-96 flex flex-col">
          <div className="flex justify-between items-center bg-blue-500 text-white p-4 rounded-t-lg">
            <h2 className="text-lg font-bold">Chat Bot / Live Chat</h2>
            <button
              onClick={toggleChat}
              className="text-white hover:text-gray-300"
            >
              <FaTimes />
            </button>
          </div>
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="flex items-start mb-4">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3">
                U
              </div>
              <div className="bg-gray-100 p-2 border border-black rounded shadow flex-1">
                <p className="text-black">Hello Chat!</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-200 p-4 rounded-b-lg flex items-center">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 p-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600">
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={toggleChat}
        className="fixed bottom-20 right-10 bg-blue-500 text-white p-4 rounded-full shadow-xl hover:bg-blue-600"
      >
        <FaCommentDots />
      </button>
    </>
  );
};

export default Chat;
