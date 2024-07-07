import React, { useState } from 'react';
import FeaturesSection from './FeaturesSection';
import PricingPlansSection from './PricingPlansSection';
import FAQSection from './FAQSection';
import ConsultationSection from './ConsultationSection';
import Footer from './Footer';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const HomePage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3001/auth/google';
  };

  return (
    <div className={`transition-filter duration-300 ${modalIsOpen ? 'blur-sm' : ''}`}>
      {/* Navbar */}
      <nav className="flex items-center justify-between flex-wrap bg-white p-6">
        <div className="flex items-center text-black mr-6 ml-4">
          <img src="/assets/RMN_transparent.png" alt="Logo" className="max-w-20 h-auto" />
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-black border-black hover:text-black hover:border-black">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0zM0 9h20v2H0zM0 15h20v2H0z"/></svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="lg:flex-grow"></div>
          <div className="text-sm lg:flex-grow text-center space-x-8">
            <a href="/" className="relative block mt-4 lg:inline-block lg:mt-0 text-black px-4 py-2 hover:text-gray-700 hover:border hover:border-gray-700 hover:rounded-md transition duration-300 before:content-[''] before:absolute before:w-full before:h-0.5 before:bottom-0 before:left-0 before:bg-blue-500 before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300">Home</a>
            <a href="/services" className="relative block mt-4 lg:inline-block lg:mt-0 text-black px-4 py-2 hover:text-gray-700 hover:border hover:border-gray-700 hover:rounded-md transition duration-300 before:content-[''] before:absolute before:w-full before:h-0.5 before:bottom-0 before:left-0 before:bg-blue-500 before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300">Services</a>
            <a href="/about" className="relative block mt-4 lg:inline-block lg:mt-0 text-black px-4 py-2 hover:text-gray-700 hover:border hover:border-gray-700 hover:rounded-md transition duration-300 before:content-[''] before:absolute before:w-full before:h-0.5 before:bottom-0 before:left-0 before:bg-blue-500 before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300">About Us</a>
            <a href="/contact" className="relative block mt-4 lg:inline-block lg:mt-0 text-black px-4 py-2 hover:text-gray-700 hover:border hover:border-gray-700 hover:rounded-md transition duration-300 before:content-[''] before:absolute before:w-full before:h-0.5 before:bottom-0 before:left-0 before:bg-blue-500 before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300">Contact Us</a>
          </div>
          <div className="lg:flex-grow"></div>
          <div className="flex items-center space-x-4 mr-12">
            <button onClick={openModal} className="inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-transparent hover:text-white hover:bg-black mt-4 lg:mt-0">Login</button>
            <a href="/register" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white bg-blue-500 border-blue-500 hover:border-transparent hover:bg-blue-700 mt-4 lg:mt-0">Register</a>
          </div>
        </div>
      </nav>
      
      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Login Modal"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Sign in</h2>
            <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
              &times;
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

      {/* main section */}
      <main className="flex flex-col items-center justify-center min-h-screen py-2">
        <section className="flex flex-col lg:flex-row items-center text-center lg:text-left">
          <div className="lg:w-1/2 px-4">
            <h1 className="text-4xl font-bold mb-4">Professional IT Support Services</h1>
            <p className="text-lg mb-6">Your Trusted Partner for Reliable IT Solutions</p>
            <div className="flex justify-center lg:justify-start mb-6">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">Get Started</button>
              <button className="bg-transparent hover:bg-gray-200 text-black font-bold py-2 px-4 rounded border border-gray-500">Learn More</button>
            </div>
          </div>
          <div className="lg:w-1/2 px-4">
            <img src="/assets/landingpagevector.png" alt="3D Illustration" className="w-full h-full object-cover"/>
          </div>
        </section>
      </main>
      <FeaturesSection />
      <PricingPlansSection />
      <FAQSection />
      <ConsultationSection />
      <Footer />
    </div>
    
  );
}

export default HomePage;
