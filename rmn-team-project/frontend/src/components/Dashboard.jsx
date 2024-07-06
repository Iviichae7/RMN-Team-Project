import React, { useState } from 'react';
import { FaBars, FaUser, FaShoppingCart, FaSignOutAlt, FaCommentDots, FaChartLine, FaTicketAlt, FaReply, FaTimes, FaPaperPlane } from 'react-icons/fa';

const Dashboard = () => {
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [showCorrespondence, setShowCorrespondence] = useState(false);
  const [showReply, setShowReply] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleViewClick = () => {
    setShowCorrespondence(!showCorrespondence);
  };

  const handleReplyClick = () => {
    setShowReply(!showReply);
  };

  return (
    <div className="flex min-h-screen bg-gray-10">
      <div className="w-64 bg-gray-900 text-white flex flex-col min-h-full">
        <div className="p-4 pl-6 flex items-center justify-between">
          <FaBars className="text-xl" />
        </div>
        <nav className="flex flex-col flex-grow p-4 space-y-4">
          <a href="/" className="flex items-center p-2 hover:bg-gray-700 rounded">
            <FaChartLine className="mr-3" /> Dashboard
          </a>
          <a href="/" className="flex items-center p-2 hover:bg-gray-700 rounded">
            <FaTicketAlt className="mr-3" /> Plans
          </a>
          <a href="/" className="flex items-center p-2 hover:bg-gray-700 rounded">
            <FaTicketAlt className="mr-3" /> Create a Ticket
          </a>
        </nav>
      </div>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src="/assets/RMN_transparent.png" alt="Logo" className="max-w-20 h-auto ml-2" />
          </div>
          <div className="flex-1 flex justify-center">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Request Remote Support</button>
          </div>
          <div className="flex items-center space-x-8 mr-6">
            <FaUser className="text-2xl" />
            <FaShoppingCart className="text-2xl" />
            <FaSignOutAlt className="text-2xl" />
          </div>
        </header>

        <main className="flex-1 p-6">
          <div className="bg-white shadow rounded-lg p-4">
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
                <div className="bg-gray-100 rounded-lg p-4 shadow-md grid grid-cols-6 gap-4">
                  <div className="flex items-center justify-center">
                    <div className="w-8 h-8 bg-red-500 text-white rounded-md flex items-center justify-center">M</div>
                  </div>
                  <div className="flex items-center justify-center text-center">Ticket Submitted</div>
                  <div className="flex items-center justify-center text-center">Cybersecurity</div>
                  <div className="flex items-center justify-center text-center">-</div>
                  <div className="flex items-center justify-center text-center">...</div>
                  <div className="flex items-center justify-center">
                    <button onClick={handleViewClick} className="text-blue-500 hover:text-blue-700">
                      <i className="fas fa-eye"></i> View
                    </button>
                  </div>
                </div>

                <div className="bg-gray-100 rounded-lg p-4 shadow-md grid grid-cols-6 gap-4">
                  <div className="flex items-center justify-center">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-md flex items-center justify-center">R</div>
                  </div>
                  <div className="flex items-center justify-center text-center">Ticket Submitted</div>
                  <div className="flex items-center justify-center text-center">General Support</div>
                  <div className="flex items-center justify-center text-center">-</div>
                  <div className="flex items-center justify-center text-center">...</div>
                  <div className="flex items-center justify-center">
                    <button onClick={handleViewClick} className="text-blue-500 hover:text-blue-700">
                      <i className="fas fa-eye"></i> View
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
                  {/* Just a filler text to show the correspondence. This will be replaced */}
                    <p className="font-bold text-blue-600">ICT Support <span className="text-gray-500">from</span></p>
                    <p className="text-gray-500 text-sm">10 hours ago (Mon, 1 Jan 2024 at 1:00 AM)</p>
                  </div>
                </div>
                {/* filler info  */}
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

        <div className={`fixed bottom-14 right-20 p-4 ${isChatOpen ? 'block' : 'hidden'}`}>
          <div className="bg-white shadow-lg rounded-lg w-80 h-96 flex flex-col">
            <div className="flex justify-between items-center bg-blue-500 text-white p-4 rounded-t-lg">
              <h2 className="text-lg font-bold">Chat Bot / Live Chat</h2>
              <button onClick={toggleChat} className="text-white hover:text-gray-300">
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
        <button onClick={toggleChat} className="fixed bottom-20 right-10 bg-blue-500 text-white p-4 rounded-full shadow-xl hover:bg-blue-600">
          <FaCommentDots />
        </button>


        <footer className="bg-gray-900 text-white py-4 mt-auto flex justify-between items-center">
          <div className="text-center flex-1">
            &copy; 2023 RMN. All Rights Reserved.
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-gray-400">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <i className="fab fa-facebook-f"></i>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
