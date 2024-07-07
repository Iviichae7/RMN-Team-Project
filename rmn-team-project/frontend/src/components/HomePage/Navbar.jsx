import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ openModal }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleServicesClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const element = document.getElementById('services');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/#services');
    }
  };

  useEffect(() => {
    if (location.hash === '#services' && location.pathname === '/') {
      const element = document.getElementById('services');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const getLinkClass = (path) => {
    return location.pathname === path 
      ? "relative block mt-4 lg:inline-block lg:mt-0 text-black px-4 py-2 hover:text-gray-700 hover:border hover:border-gray-700 hover:rounded-md transition duration-300 before:content-[''] before:absolute before:w-full before:h-0.5 before:bottom-0 before:left-0 before:bg-blue-500 before:scale-x-100 before:transition-transform before:duration-300"
      : "relative block mt-4 lg:inline-block lg:mt-0 text-black px-4 py-2 hover:text-gray-700 hover:border hover:border-gray-700 hover:rounded-md transition duration-300 before:content-[''] before:absolute before:w-full before:h-0.5 before:bottom-0 before:left-0 before:bg-blue-500 before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300";
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-white p-6">
      <div className="flex items-center text-black mr-6 ml-4">
        <img src="/assets/RMN_transparent.png" alt="Logo" className="max-w-20 h-auto" />
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-black border-black hover:text-black hover:border-black">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0zM0 9h20v2H0zM0 15h20v2H0z"/>
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="lg:flex-grow"></div>
        <div className="text-sm lg:flex-grow text-center space-x-8">
          <a href="/" className={getLinkClass('/')}>Home</a>
          <a href="#services" onClick={handleServicesClick} className={getLinkClass('/#services')}>Services</a>
          <a href="/about" className={getLinkClass('/about')}>About Us</a>
          <a href="/contact" className={getLinkClass('/contact')}>Contact Us</a>
        </div>
        <div className="lg:flex-grow"></div>
        <div className="flex items-center space-x-4 mr-12">
          <button onClick={openModal} className="inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-transparent hover:text-white hover:bg-black mt-4 lg:mt-0">Login</button>
          <a href="/register" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white bg-blue-500 border-blue-500 hover:border-transparent hover:bg-blue-700 mt-4 lg:mt-0">Register</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
