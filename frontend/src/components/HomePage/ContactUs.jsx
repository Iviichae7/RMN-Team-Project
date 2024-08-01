import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LoginModal from "./LoginModal";

const ContactUs = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    message: "",
  });

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3001/auth/google";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const validateForm = () => {
    const { name, email, category, message } = formData;
    return name && email && category && message;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar openModal={openModal} />
      <main
        className={`flex-grow bg-gray-100 p-6 transition-filter duration-300 ${
          modalIsOpen ? "blur-sm" : ""
        }`}
      >
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
          <p className="text-lg mb-4 text-center">
            If you have any questions or need assistance, please do not hesitate
            to contact us. We are here to help you.
          </p>
          <p className="text-lg mb-6 text-center">
            You can reach us by email or through our online contact form. We
            will respond to your inquiry as soon as possible.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-lg font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Email"
                required
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-lg font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a category</option>
                <option value="general">General Question</option>
                <option value="cybersecurity">Cybersecurity</option>
                <option value="network">Network Management</option>
                <option value="training">IT Training</option>
                <option value="backup">Data Backup and Recovery</option>
                <option value="cloud">Cloud Services</option>
                <option value="onsite">On-site Support</option>
                <option value="consultation">Consultation</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-lg font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Message"
                rows="5"
                required
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 ${
                  validateForm() ? "" : "opacity-50 cursor-not-allowed"
                }`}
                disabled={!validateForm()}
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
      <LoginModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        handleGoogleLogin={handleGoogleLogin}
      />
    </div>
  );
};

export default ContactUs;
