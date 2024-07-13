import React, { useState } from "react";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

const LoginModal = ({
  isOpen,
  onRequestClose,
  handleGoogleLogin,
  handleMicrosoftLogin,
  openRegisterModal,
  redirectToPlans,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/login",
        formData,
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("Login Successful!", {
          position: "bottom-left",
        });
        setTimeout(async () => {
          onRequestClose();
          const roleResponse = await axios.get(
            "http://localhost:3001/api/userRole",
            { withCredentials: true }
          );
          if (roleResponse.data.role === "admin") {
            navigate("/admin");
          } else if (redirectToPlans) {
            navigate("/dashboard/plans");
          } else {
            navigate("/dashboard");
          }
        }, 2000);
      } else {
        toast.error("Login failed. Please try again.", {
          position: "bottom-left",
        });
      }
    } catch (error) {
      toast.error("Login failed. Please try again.", {
        position: "bottom-left",
      });
    }
  };

  const handleOpenRegisterModal = (e) => {
    e.preventDefault();
    onRequestClose();
    openRegisterModal();
  };

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
          <button
            onClick={onRequestClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>
        <button
          onClick={handleGoogleLogin}
          className="w-full py-2 rounded-md flex items-center justify-center mb-4 border border-gray-300"
        >
          <img
            src="/assets/icons/google.png"
            alt="Google Icon"
            className="w-6 h-6 mr-2"
          />
          <span>Continue with Google</span>
        </button>
        <button
          onClick={handleMicrosoftLogin}
          className="w-full py-2 rounded-md flex items-center justify-center mb-4 border border-gray-300"
        >
          <img
            src="/assets/icons/microsoft-icon.png"
            alt="Microsoft Icon"
            className="w-10 h-8"
          />
          <span>Continue with Microsoft</span>
        </button>
        <div className="flex justify-center mb-4">
          <span className="text-gray-500">or</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Your email"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <a
            href="#"
            onClick={handleOpenRegisterModal}
            className="text-blue-500 hover:underline"
          >
            Don't have an account? Register
          </a>
        </div>
        <ToastContainer />
      </div>
    </Modal>
  );
};

export default LoginModal;
