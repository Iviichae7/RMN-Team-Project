import React, { useState } from 'react';

const TicketSubmissionForm = ({ onSubmit }) => {
  const [TicketInfo, setTicketInfo] = useState({
    title: '',
    description: '',
    category: '',
    priority: '',
    user: '', //Connect to real user ID
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const ticketSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/submit-ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(TicketInfo),
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
      } else {
        console.error('Error submitting ticket');
      }
    } catch (error) {
      console.error('Error submitting ticket:', error);
    }
  };

  return (
    <main className="flex-1 p-6">
      <div className="bg-gray-100 shadow-xl rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Submit a Ticket</h2>
        <form onSubmit={ticketSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Title:</label>
            <input
              type="text"
              name="title"
              value={TicketInfo.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700">Description:</label>
            <textarea
              name="description"
              value={TicketInfo.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="5"
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700">Category:</label>
            <input
              type="text"
              name="category"
              value={TicketInfo.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700">Priority:</label>
            <select
              name="priority"
              value={TicketInfo.priority}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Submit
          </button>
        </form>
      </div>
    </main>
  );
};

export default TicketSubmissionForm;