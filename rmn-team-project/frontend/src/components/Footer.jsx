import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center space-y-6">
        <div className="text-center">
          <p className="text-sm">&copy; 2024 RMN. All Rights Reserved.</p>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="text-white hover:text-gray-300">
            <img src="/assets/icons/twitter.png" alt="Twitter" className="h-6 w-6 shadow-lg" />
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            <img src="/assets/icons/instagram.png" alt="Instagram" className="h-6 w-6 shadow-lg" />
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            <img src="/assets/icons/facebook.png" alt="Facebook" className="h-6 w-6 shadow-lg" />
          </a>
        </div>
        <div className="flex space-x-4 mt-4">
          <a href="#" className="text-sm text-white hover:text-gray-300">Privacy Policy</a>
          <a href="#" className="text-sm text-white hover:text-gray-300">Terms of Service</a>
          <a href="#" className="text-sm text-white hover:text-gray-300">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
