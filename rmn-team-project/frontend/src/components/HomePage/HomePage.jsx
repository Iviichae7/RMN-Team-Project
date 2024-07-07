import React, { useState } from 'react';
import FeaturesSection from './FeaturesSection';
import PricingPlansSection from './PricingPlansSection';
import FAQSection from './FAQSection';
import ConsultationSection from './ConsultationSection';
import Footer from './Footer';
import Navbar from './Navbar';
import LoginModal from './LoginModal';

const HomePage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3001/auth/google';
  };

  return (
    <div className={`transition-filter duration-300 ${modalIsOpen ? 'blur-sm' : ''}`}>
      <Navbar openModal={openModal} />
      
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
      <LoginModal isOpen={modalIsOpen} onRequestClose={closeModal} handleGoogleLogin={handleGoogleLogin} />
    </div>
  );
}

export default HomePage;
