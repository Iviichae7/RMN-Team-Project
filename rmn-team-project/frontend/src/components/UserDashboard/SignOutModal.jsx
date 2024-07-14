import React, { useEffect } from "react";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";

const SignOutModal = ({ isOpen, onRequestClose, onConfirm }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Sign Out Confirmation"
      className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto my-32 outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Sign Out</h2>
        <button
          onClick={onRequestClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <FaTimes />
        </button>
      </div>
      <p className="mb-6">Are you sure you want to sign out?</p>
      <div className="flex justify-end space-x-4">
        <button
          onClick={onRequestClose}
          className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    </Modal>
  );
};

export default SignOutModal;
