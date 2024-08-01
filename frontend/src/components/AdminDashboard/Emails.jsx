import React, { useState } from "react";

const mockEmails = [
  {
    id: 1,
    sender: "user1@example.com",
    subject: "Inquiry about pricing",
    date: "2024-07-10",
  },
  {
    id: 2,
    sender: "user2@example.com",
    subject: "Support needed for setup",
    date: "2024-07-11",
  },
];

const Emails = () => {
  const [emails] = useState(mockEmails);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Emails</h2>
      <div className="bg-white shadow-md rounded-lg p-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sender
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {emails.map((email) => (
              <tr key={email.id}>
                <td className="px-6 py-4 whitespace-nowrap">{email.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{email.sender}</td>
                <td className="px-6 py-4 whitespace-nowrap">{email.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap">{email.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:text-blue-900">
                    View
                  </button>
                  <button className="ml-2 text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Emails;
