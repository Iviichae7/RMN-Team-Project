import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ openModal }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleServicesClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    if (location.pathname === "/") {
      const element = document.getElementById("services");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/#services");
    }
  };

  useEffect(() => {
    if (location.hash === "#services" && location.pathname === "/") {
      const element = document.getElementById("services");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
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
        <img
          src="/assets/RMN_transparent.png"
          alt="Logo"
          className="max-w-20 h-auto"
        />
      </div>
      <div className="block lg:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center px-3 py-2 border rounded text-black border-black hover:text-black hover:border-black focus:outline-none"
        >
          <svg
            className="fill-current h-6 w-6"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0zM0 9h20v2H0zM0 15h20v2H0z" />
          </svg>
        </button>
      </div>
      <div className="hidden lg:flex w-full lg:w-auto lg:flex-grow lg:items-center lg:justify-between">
        <div className="text-sm lg:flex-grow text-center space-x-8">
          <a href="/" className={getLinkClass("/")}>
            Home
          </a>
          <a
            href="#services"
            onClick={handleServicesClick}
            className={getLinkClass("/#services")}
          >
            Services
          </a>
          <a href="/about" className={getLinkClass("/about")}>
            About Us
          </a>
          <a href="/contact" className={getLinkClass("/contact")}>
            Contact Us
          </a>
        </div>
        <div className="flex items-center space-x-4 mr-12">
          <button
            onClick={openModal}
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-transparent hover:text-white hover:bg-black mt-4 lg:mt-0"
          >
            Login
          </button>
          <a
            href="/register"
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white bg-blue-500 border-blue-500 hover:border-transparent hover:bg-blue-700 mt-4 lg:mt-0"
          >
            Register
          </a>
        </div>
      </div>
      {menuOpen && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-all duration-300 ease-in-out ${
            menuOpen ? "backdrop-blur-sm" : "backdrop-blur-0"
          }`}
        >
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg shadow-lg p-6 rounded-lg w-80 max-w-md mt-20">
              <button
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 hover:text-gray-900 absolute top-4 right-4 focus:outline-none"
              >
                &times;
              </button>
              <div className="mt-12 text-center space-y-4">
                <a
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  className="block text-black py-2 hover:text-gray-700"
                >
                  Home
                </a>
                <a
                  href="#services"
                  onClick={handleServicesClick}
                  className="block text-black py-2 hover:text-gray-700"
                >
                  Services
                </a>
                <a
                  href="/about"
                  onClick={() => setMenuOpen(false)}
                  className="block text-black py-2 hover:text-gray-700"
                >
                  About Us
                </a>
                <a
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="block text-black py-2 hover:text-gray-700"
                >
                  Contact Us
                </a>
                <button
                  onClick={openModal}
                  className="block w-full text-left text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-transparent hover:text-white hover:bg-black mt-4"
                >
                  Login
                </button>
                <a
                  href="/register"
                  className="block w-full text-left text-sm px-4 py-2 leading-none border rounded text-white bg-blue-500 border-blue-500 hover:border-transparent hover:bg-blue-700 mt-4"
                >
                  Register
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
