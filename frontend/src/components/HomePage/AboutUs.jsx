import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const openRegisterModal = () => setRegisterModalIsOpen(true);
  const closeRegisterModal = () => setRegisterModalIsOpen(false);
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3001/auth/google";
  };

  const handleContactUsClick = () => {
    navigate("/contact");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar openModal={openModal} openRegisterModal={openRegisterModal} />
      <main
        className={`flex-grow bg-gray-100 transition-filter duration-300 ${
          modalIsOpen || registerModalIsOpen ? "blur-sm" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto p-6">
          <div className="bg-white shadow-lg rounded-lg p-12 flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2">
              <h2 className="text-lg font-semibold text-gray-600 uppercase mb-2">
                About Us
              </h2>
              <h1 className="text-4xl font-bold mb-6">
                Helping businesses deliver{" "}
                <span className="text-blue-500 underline">exceptional</span> IT
                services.
              </h1>
              <p className="text-lg mb-6">
                We provide top-notch IT support and services tailored to your
                business needs. Our team of experts is dedicated to ensuring
                your technology infrastructure is reliable, secure, and
                efficient.
              </p>
              <p className="text-lg mb-6">
                From cybersecurity to network management, our comprehensive
                solutions are designed to help your business thrive in the
                digital age. Partner with us to experience unparalleled IT
                support and services.
              </p>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                onClick={handleContactUsClick}
              >
                Contact Us
              </button>
            </div>
            <div className="lg:w-1/2 lg:pl-12 mt-12 lg:mt-0 flex justify-center">
              <img src="/assets/servicesdesk.png" alt="IT Services" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <LoginModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        handleGoogleLogin={handleGoogleLogin}
      />
      <RegisterModal
        isOpen={registerModalIsOpen}
        onRequestClose={closeRegisterModal}
        openLoginModal={openModal}
      />
    </div>
  );
};

export default AboutUs;
