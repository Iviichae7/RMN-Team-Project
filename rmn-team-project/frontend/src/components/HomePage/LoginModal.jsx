import React from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';

Modal.setAppElement('#root');

const LoginModal = ({ isOpen, onRequestClose, handleGoogleLogin }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Login Modal"
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Sign in</h2>
          <button onClick={onRequestClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>
        <button onClick={handleGoogleLogin} className="w-full py-2 rounded-md flex items-center justify-center mb-4 border border-gray-300">
          <img src="/assets/icons/google.png" alt="Google Icon" className="w-4 h-4 mr-2" />
          <span>Continue with Google</span>
        </button>
        <div className="flex justify-center mb-4">
          <span className="text-gray-500">or</span>
        </div>
        <form>
          <div className="mb-4">
            <input type="email" className="w-full p-2 border rounded-md" placeholder="Your email" />
          </div>
          <div className="mb-4">
            <input type="password" className="w-full p-2 border rounded-md" placeholder="Your password" />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">Login</button>
        </form>
        <div className="mt-4 text-center">
          <a href="/register" className="text-blue-500 hover:underline">Don't have an account? Register</a>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
