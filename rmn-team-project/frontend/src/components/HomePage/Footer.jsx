import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center space-y-6">
        <div className="text-center">
          <p className="text-sm">&copy; 2024 RMN. All Rights Reserved.</p>
        </div>
        <div className="flex space-x-6">
          <a href="https://x.com" className="text-white hover:text-gray-300">
            <img
              src="/assets/icons/twitter.png"
              alt="Twitter"
              className="h-6 w-6 shadow-lg"
            />
          </a>
          <a
            href="https://instagram.com"
            className="text-white hover:text-gray-300"
          >
            <img
              src="/assets/icons/instagram.png"
              alt="Instagram"
              className="h-6 w-6 shadow-lg"
            />
          </a>
          <a
            href="https://facebook.com"
            className="text-white hover:text-gray-300"
          >
            <img
              src="/assets/icons/facebook.png"
              alt="Facebook"
              className="h-6 w-6 shadow-lg"
            />
          </a>
        </div>
        <div className="flex space-x-4 mt-4">
          <Link
            to="/privacy-policy"
            className="text-sm text-white hover:text-gray-300"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms-of-service"
            className="text-sm text-white hover:text-gray-300"
          >
            Terms of Service
          </Link>
          <Link
            to="/contact"
            className="text-sm text-white hover:text-gray-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
