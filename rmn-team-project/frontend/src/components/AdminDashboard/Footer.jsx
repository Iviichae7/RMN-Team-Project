import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 mt-auto flex justify-between items-center">
      <div className="text-center flex-1">
        &copy; 2023 RMN. All Rights Reserved.
      </div>
      <div className="flex space-x-4">
        <a href="#" className="text-white hover:text-gray-400">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#" className="text-white hover:text-gray-400">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="#" className="text-white hover:text-gray-400">
          <i className="fab fa-facebook-f"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
