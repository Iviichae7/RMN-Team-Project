import React from "react";

const SignOutModal = ({ isOpen, onRequestClose, onConfirm }) =>
  isOpen ? (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Confirm Sign Out</h2>
        <p className="mb-4">Are you sure you want to sign out?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onRequestClose}
            className="bg-gray-200 text-gray-600 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  ) : null;

export default SignOutModal;
