import React from 'react';
import { FaEye, FaReply } from 'react-icons/fa';

const MainContent = ({ handleViewClick, handleReplyClick, showCorrespondence, showReply }) => {
  return (
    <main className="flex-1 p-6">
      <div className="bg-gray-100 shadow-xl rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Your Open Tickets</h2>
        <div className="overflow-x-auto">
          <div className="grid grid-cols-6 gap-4 bg-gray-800 text-white p-4 rounded-t-lg">
            <div className="text-center font-semibold">Contact</div>
            <div className="text-center font-semibold">Subject</div>
            <div className="text-center font-semibold">Service</div>
            <div className="text-center font-semibold">Agent</div>
            <div className="text-center font-semibold">Status</div>
            <div className="text-center font-semibold">Actions</div>
          </div>
          <div className="space-y-4">
            <div className="bg-gray-100 rounded-lg p-4 shadow-md grid grid-cols-6 gap-4 border border-black border-opacity-15 mt-4">
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 bg-red-500 text-white rounded-md flex items-center justify-center">M</div>
              </div>
              <div className="flex items-center justify-center text-center">Ticket Submitted</div>
              <div className="flex items-center justify-center text-center">Cybersecurity</div>
              <div className="flex items-center justify-center text-center">-</div>
              <div className="flex items-center justify-center text-center">...</div>
              <div className="flex items-center justify-center">
                <button onClick={handleViewClick} className="text-blue-500 hover:text-blue-700">
                  <FaEye />View
                </button>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 grid grid-cols-6 gap-4 border border-black border-opacity-15">
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 bg-green-500 text-white rounded-md flex items-center justify-center">R</div>
              </div>
              <div className="flex items-center justify-center text-center">Ticket Submitted</div>
              <div className="flex items-center justify-center text-center">General Support</div>
              <div className="flex items-center justify-center text-center">-</div>
              <div className="flex items-center justify-center text-center">...</div>
              <div className="flex items-center justify-center">
                <button onClick={handleViewClick} className="text-blue-500 hover:text-blue-700">
                  <FaEye /> View
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showCorrespondence && (
        <div className="bg-white shadow rounded-lg p-4 mt-6">
          <div className="p-4 bg-gray-100 rounded-md">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-md flex items-center justify-center">IT</div>
              <div className="ml-4">
                <p className="font-bold text-blue-600">ICT Support <span className="text-gray-500">from</span></p>
                <p className="text-gray-500 text-sm">10 hours ago (Mon, 1 Jan 2024 at 1:00 AM)</p>
              </div>
            </div>
            <div className="ml-12">
              <p>To: user.email@rmn.ie</p>
              <p>Cc: other.support@rmn.ie, other.support@rmn.ie</p>
              <p className="mt-4">Hi User,<br />
                If you can provide specific details, we'll review your case.<br />
                Regards,<br />
                IT Support Team
              </p>
              <p className="mt-4">Ticket: <a href="https://rmn.helpdesk.com/helpdesk/tickets/100" className="text-blue-500 hover:underline">https://rmn.helpdesk.com/helpdesk/tickets/100</a></p>
            </div>
            <div className="mt-4 flex justify-center space-x-4">
              <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md">...</button>
              <button onClick={handleReplyClick} className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md flex items-center justify-center space-x-2">
                <FaReply className="text-gray-600" />
                <span>Reply</span>
              </button>
            </div>
          </div>
          {showReply && (
            <div className="bg-white shadow rounded-lg p-4 mt-6">
              <div className="p-4 bg-gray-100 rounded-md">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-md flex items-center justify-center">IT</div>
                  <div className="ml-4">
                    <p className="font-bold text-blue-600">ICT Support <span className="text-gray-500">from</span></p>
                    <p className="text-gray-500 text-sm">10 hours ago (Mon, 1 Jan 2024 at 1:00 AM)</p>
                  </div>
                </div>
                <div className="ml-12">
                  <p>To: user.email@rmn.ie</p>
                  <p>Cc: other.support@rmn.ie, other.support@rmn.ie</p>
                  <div className="mt-4">
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded-md"
                      rows="5"
                      placeholder="Type your reply here..."
                    ></textarea>
                    <div className="flex justify-between items-center mt-4">
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Send</button>
                      <button onClick={handleReplyClick} className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md">
                        Cancel
                      </button>
                    </div>
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
